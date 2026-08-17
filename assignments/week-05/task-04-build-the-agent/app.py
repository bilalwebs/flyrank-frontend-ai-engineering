"""AI Job Application Assistant — Streamlit UI.

Dark-mode-first SaaS dashboard. Pure UI layer — no AI logic here.
"""

from __future__ import annotations

import asyncio
import sys
import time
from pathlib import Path

import streamlit as st

_project_root = Path(__file__).resolve().parent
if str(_project_root) not in sys.path:
    sys.path.insert(0, str(_project_root))

from config.settings import settings
from models.schemas import AnalysisResult
from services.resume_service import analyze_uploaded_resume
from utils.logger import setup_logging

setup_logging()

# ---------------------------------------------------------------------------
# Page config
# ---------------------------------------------------------------------------
st.set_page_config(
    page_title="AI Job Application Assistant",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
PROVIDERS = ["openai", "groq", "gemini"]

PROVIDER_MODELS = {
    "openai": settings.OPENAI_MODEL,
    "groq": settings.GROQ_MODEL,
    "gemini": settings.GEMINI_MODEL,
}

PROVIDER_ICONS = {
    "openai": "🟢",
    "groq": "🟢",
    "gemini": "🟢",
}

LOADING_MESSAGES = [
    "Extracting resume content...",
    "Analyzing against job description...",
    "Calculating ATS compatibility score...",
    "Identifying missing skills...",
    "Generating improvement suggestions...",
]

# ---------------------------------------------------------------------------
# Custom CSS — Dark-mode SaaS theme
# ---------------------------------------------------------------------------
CUSTOM_CSS = """
<style>
/* ── Global ─────────────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

html, body, [class*="css"] {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #0F172A;
    color: #F9FAFB;
}

/* ── Hide Streamlit chrome ─────────────────────────────────────────── */
#MainMenu, footer, header[data-testid="stHeader"] {
    display: none !important;
}

/* ── Sidebar ───────────────────────────────────────────────────────── */
section[data-testid="stSidebar"] {
    background-color: #111827 !important;
    border-right: 1px solid #1F2937;
}

section[data-testid="stSidebar"] .block-container {
    padding-top: 1.5rem;
}

/* ── Status Cards (sidebar) ───────────────────────────────────────── */
.status-card {
    background: #1F2937;
    border: 1px solid #374151;
    border-radius: 10px;
    padding: 0.6rem 0.85rem;
    margin-bottom: 0.5rem;
}

.status-card .label {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9CA3AF;
    margin-bottom: 0.15rem;
}

.status-card .value {
    font-size: 0.92rem;
    font-weight: 600;
    color: #F9FAFB;
}

.status-card .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
}

.dot-green { background: #10B981; }
.dot-red   { background: #EF4444; }
.dot-yellow { background: #F59E0B; }

/* ── Hero ──────────────────────────────────────────────────────────── */
.hero-section {
    text-align: center;
    padding: 2rem 0 1rem 0;
}

.hero-title {
    font-size: 2.3rem;
    font-weight: 700;
    margin-bottom: 0.3rem;
    background: linear-gradient(135deg, #3B82F6, #8B5CF6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.05rem;
    color: #9CA3AF;
    max-width: 560px;
    margin: 0 auto 0.6rem auto;
    line-height: 1.55;
}

.hero-badges {
    display: flex;
    justify-content: center;
    gap: 0.6rem;
    flex-wrap: wrap;
    margin-top: 0.8rem;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: #1F2937;
    border: 1px solid #374151;
    border-radius: 999px;
    padding: 0.3rem 0.85rem;
    font-size: 0.78rem;
    color: #D1D5DB;
}

/* ── Input Cards ───────────────────────────────────────────────────── */
.input-card {
    background: #1F2937;
    border: 1px solid #374151;
    border-radius: 14px;
    padding: 1.5rem;
    height: 100%;
    transition: border-color 0.2s;
}

.input-card:hover {
    border-color: #3B82F6;
}

.input-card-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: #F9FAFB;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.45rem;
}

.format-tags {
    display: flex;
    gap: 0.4rem;
    margin-top: 0.6rem;
}

.format-tag {
    background: #111827;
    border: 1px solid #374151;
    border-radius: 6px;
    padding: 0.2rem 0.55rem;
    font-size: 0.72rem;
    color: #9CA3AF;
}

/* ── Analyze Button ────────────────────────────────────────────────── */
.analyze-btn {
    display: block;
    width: 100%;
    margin: 1.5rem auto;
}

div[data-testid="stButton"] > button[kind="primary"] {
    background: linear-gradient(135deg, #3B82F6, #2563EB);
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    padding: 0.85rem 2rem;
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    width: 100%;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
}

div[data-testid="stButton"] > button[kind="primary"]:hover {
    background: linear-gradient(135deg, #2563EB, #1D4ED8);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
    transform: translateY(-1px);
}

div[data-testid="stButton"] > button[kind="primary"]:active {
    transform: translateY(0);
}

/* ── Section Headers ───────────────────────────────────────────────── */
.section-header {
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* ── Output Cards ──────────────────────────────────────────────────── */
.output-card {
    background: #1F2937;
    border: 1px solid #374151;
    border-radius: 14px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    transition: border-color 0.2s;
}

.output-card:hover {
    border-color: #3B82F6;
}

.output-card-header {
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    color: #F9FAFB;
}

.output-card-subheader {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #9CA3AF;
    margin-bottom: 0.4rem;
}

/* ── ATS Score Ring ────────────────────────────────────────────────── */
.ats-ring-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
}

.ats-ring {
    position: relative;
    width: 160px;
    height: 160px;
}

.ats-ring svg {
    transform: rotate(-90deg);
    width: 160px;
    height: 160px;
}

.ats-ring-bg {
    fill: none;
    stroke: #374151;
    stroke-width: 10;
}

.ats-ring-fill {
    fill: none;
    stroke-width: 10;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s ease;
}

.ats-ring-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.ats-score-value {
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1;
}

.ats-score-label {
    font-size: 0.7rem;
    color: #9CA3AF;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

/* ── Skill Tags ────────────────────────────────────────────────────── */
.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
}

.skill-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: rgba(59, 130, 246, 0.12);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: #93C5FD;
    border-radius: 8px;
    padding: 0.35rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 500;
}

.skill-tag-present {
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #6EE7B7;
}

/* ── Suggestion Items ──────────────────────────────────────────────── */
.suggestion-item {
    display: flex;
    gap: 0.6rem;
    padding: 0.65rem 0;
    border-bottom: 1px solid #1F2937;
}

.suggestion-item:last-child {
    border-bottom: none;
}

.suggestion-icon {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    margin-top: 0.1rem;
}

.suggestion-icon-green {
    background: rgba(16, 185, 129, 0.15);
    color: #10B981;
}

.suggestion-icon-blue {
    background: rgba(59, 130, 246, 0.15);
    color: #3B82F6;
}

.suggestion-text {
    font-size: 0.88rem;
    color: #D1D5DB;
    line-height: 1.5;
}

/* ── List Items ────────────────────────────────────────────────────── */
.item-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.item-list li {
    padding: 0.4rem 0;
    padding-left: 1.1rem;
    position: relative;
    font-size: 0.88rem;
    color: #D1D5DB;
    line-height: 1.5;
}

.item-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75rem;
    width: 5px;
    height: 5px;
    border-radius: 50%;
}

.item-list.green li::before { background: #10B981; }
.item-list.red li::before   { background: #EF4444; }
.item-list.yellow li::before { background: #F59E0B; }
.item-list.blue li::before   { background: #3B82F6; }
.item-list.gray li::before   { background: #6B7280; }

/* ── Success Banner ────────────────────────────────────────────────── */
.success-banner {
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.25);
    border-radius: 12px;
    padding: 0.8rem 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.2rem;
}

.success-banner-icon {
    font-size: 1.2rem;
}

.success-banner-text {
    font-size: 0.9rem;
    color: #6EE7B7;
    font-weight: 500;
}

.success-banner-sub {
    font-size: 0.78rem;
    color: #9CA3AF;
}

/* ── Error Card ────────────────────────────────────────────────────── */
.error-card {
    background: rgba(239, 68, 68, 0.06);
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 12px;
    padding: 1rem 1.3rem;
    margin-bottom: 1rem;
}

.error-card-title {
    font-weight: 600;
    color: #FCA5A5;
    margin-bottom: 0.3rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.error-card-text {
    font-size: 0.88rem;
    color: #D1D5DB;
    line-height: 1.5;
}

/* ── Empty State ───────────────────────────────────────────────────── */
.empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: #6B7280;
}

.empty-state-icon {
    font-size: 3rem;
    margin-bottom: 0.8rem;
    opacity: 0.5;
}

.empty-state-text {
    font-size: 0.95rem;
    color: #9CA3AF;
}

/* ── Divider ───────────────────────────────────────────────────────── */
hr {
    border: none;
    border-top: 1px solid #1F2937;
    margin: 1rem 0;
}

/* ── Expander styling ──────────────────────────────────────────────── */
details[data-testid="stExpander"] {
    background: #1F2937 !important;
    border: 1px solid #374151 !important;
    border-radius: 10px !important;
}

details[data-testid="stExpander"] summary {
    font-weight: 600 !important;
    color: #F9FAFB !important;
}

/* ── Textarea / Input ──────────────────────────────────────────────── */
div[data-baseweb="textarea"] {
    background-color: #111827 !important;
    border-color: #374151 !important;
    border-radius: 10px !important;
}

div[data-baseweb="textarea"]:focus-within {
    border-color: #3B82F6 !important;
}

/* ── File uploader styling ─────────────────────────────────────────── */
section[data-testid="stFileUploadDropzone"] {
    background: #111827 !important;
    border: 2px dashed #374151 !important;
    border-radius: 12px !important;
    transition: border-color 0.2s;
}

section[data-testid="stFileUploadDropzone"]:hover {
    border-color: #3B82F6 !important;
}

/* ── Scrollbar ─────────────────────────────────────────────────────── */
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: #0F172A;
}
::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 3px;
}

/* ── Toast override ────────────────────────────────────────────────── */
div[data-baseweb="toast"] {
    background: #1F2937 !important;
    border: 1px solid #374151 !important;
    color: #F9FAFB !important;
}
</style>
"""


# ---------------------------------------------------------------------------
# Helper: CSS-escaped ring
# ---------------------------------------------------------------------------
def _score_color(score: int) -> str:
    if score >= 80:
        return "#10B981"
    if score >= 60:
        return "#F59E0B"
    return "#EF4444"


def _score_label(score: int) -> str:
    if score >= 80:
        return "Excellent"
    if score >= 60:
        return "Good"
    if score >= 40:
        return "Moderate"
    return "Needs Work"


def _ats_ring_html(score: int) -> str:
    color = _score_color(score)
    label = _score_label(score)
    circumference = 2 * 3.14159 * 65
    offset = circumference - (score / 100) * circumference

    return f"""
    <div class="ats-ring-container">
        <div class="ats-ring">
            <svg viewBox="0 0 160 160">
                <circle class="ats-ring-bg" cx="80" cy="80" r="65"/>
                <circle class="ats-ring-fill" cx="80" cy="80" r="65"
                    stroke="{color}"
                    stroke-dasharray="{circumference:.2f}"
                    stroke-dashoffset="{offset:.2f}"/>
            </svg>
            <div class="ats-ring-text">
                <div class="ats-score-value" style="color:{color}">{score}</div>
                <div class="ats-score-label">{label}</div>
            </div>
        </div>
    </div>
    """


# ---------------------------------------------------------------------------
# Sidebar
# ---------------------------------------------------------------------------
def _render_sidebar() -> None:
    with st.sidebar:
        st.markdown(
            '<div style="text-align:center; padding-bottom:0.5rem;">'
            '<div style="font-size:1.6rem;">🤖</div>'
            '<div style="font-size:1rem; font-weight:700; color:#F9FAFB; '
            'margin-top:0.2rem;">AI Job Application</div>'
            '<div style="font-size:0.8rem; color:#9CA3AF;">Assistant</div>'
            "</div>",
            unsafe_allow_html=True,
        )

        st.markdown("---")

        # Provider status card
        api_key_map = {
            "openai": settings.OPENAI_API_KEY,
            "groq": settings.GROQ_API_KEY,
            "gemini": settings.GEMINI_API_KEY,
        }
        selected = settings.PROVIDER.lower()
        has_key = bool(api_key_map.get(selected, ""))
        model_name = PROVIDER_MODELS.get(selected, "—")
        dot_class = "dot-green" if has_key else "dot-red"
        api_label = "Connected" if has_key else "No API Key"

        st.markdown(
            f'<div class="status-card">'
            f'<div class="label">Provider</div>'
            f'<div class="value">{PROVIDER_ICONS.get(selected, "⚪")} {selected.upper()}</div>'
            f"</div>"
            f'<div class="status-card">'
            f'<div class="label">Model</div>'
            f'<div class="value">{model_name}</div>'
            f"</div>"
            f'<div class="status-card">'
            f'<div class="label">API Status</div>'
            f'<div class="value"><span class="dot {dot_class}"></span>{api_label}</div>'
            f"</div>",
            unsafe_allow_html=True,
        )

        st.markdown("---")

        # About
        st.markdown(
            '<div style="font-size:0.78rem; color:#9CA3AF; line-height:1.6;">'
            "<strong style='color:#D1D5DB;'>About</strong><br>"
            "Upload your resume and paste a job description to get an "
            "AI-powered analysis with ATS scoring, missing skills detection, "
            "and improvement suggestions."
            "</div>",
            unsafe_allow_html=True,
        )

        st.markdown("---")

        st.markdown(
            '<div style="font-size:0.72rem; color:#6B7280;">'
            f"<strong>v{settings.APP_VERSION}</strong> · "
            "PDF · DOCX · TXT"
            "</div>",
            unsafe_allow_html=True,
        )


# ---------------------------------------------------------------------------
# Hero
# ---------------------------------------------------------------------------
def _render_hero() -> None:
    st.markdown(
        '<div class="hero-section">'
        '<div class="hero-title">🤖 AI Job Application Assistant</div>'
        '<div class="hero-subtitle">'
        "Analyze your resume against a job description using AI.<br>"
        "Get ATS scores, missing skills, and improvement suggestions."
        "</div>"
        '<div class="hero-badges">'
        '<span class="hero-badge">📊 ATS Score</span>'
        '<span class="hero-badge">🎯 Missing Skills</span>'
        '<span class="hero-badge">📄 Resume Review</span>'
        '<span class="hero-badge">💡 Suggestions</span>'
        "</div>"
        "</div>",
        unsafe_allow_html=True,
    )


# ---------------------------------------------------------------------------
# Input Section
# ---------------------------------------------------------------------------
def _render_inputs() -> tuple:
    col1, col2 = st.columns(2, gap="medium")

    with col1:
        st.markdown(
            '<div class="input-card">'
            '<div class="input-card-title">📂 Upload Resume</div>'
            "</div>",
            unsafe_allow_html=True,
        )
        uploaded_file = st.file_uploader(
            "Upload your resume",
            type=["pdf", "docx", "txt"],
            label_visibility="collapsed",
            key="resume_upload",
        )
        st.markdown(
            '<div class="format-tags">'
            '<span class="format-tag">PDF</span>'
            '<span class="format-tag">DOCX</span>'
            '<span class="format-tag">TXT</span>'
            "</div>",
            unsafe_allow_html=True,
        )
        if uploaded_file:
            size_kb = len(uploaded_file.read()) / 1024
            uploaded_file.seek(0)
            ext = Path(uploaded_file.name).suffix.upper().lstrip(".")
            st.markdown(
                f'<div style="margin-top:0.5rem; font-size:0.82rem; color:#9CA3AF;">'
                f"📎 <strong style='color:#D1D5DB;'>{uploaded_file.name}</strong>"
                f" · {ext} · {size_kb:.1f} KB"
                f"</div>",
                unsafe_allow_html=True,
            )

    with col2:
        st.markdown(
            '<div class="input-card">'
            '<div class="input-card-title">📝 Job Description</div>'
            "</div>",
            unsafe_allow_html=True,
        )
        job_description = st.text_area(
            "Job Description",
            height=230,
            placeholder="Paste the full job description here...\n\n"
            "Include the role title, requirements, responsibilities, "
            "and any preferred qualifications.",
            label_visibility="collapsed",
            key="jd_input",
        )
        if job_description:
            chars = len(job_description)
            st.markdown(
                f'<div style="text-align:right; font-size:0.72rem; color:#6B7280;">'
                f"{chars:,} characters</div>",
                unsafe_allow_html=True,
            )

    return uploaded_file, job_description


# ---------------------------------------------------------------------------
# Loading State
# ---------------------------------------------------------------------------
def _render_loading() -> None:
    placeholder = st.empty()
    progress = st.progress(0, text="Starting analysis...")

    for i, msg in enumerate(LOADING_MESSAGES):
        pct = int(((i + 1) / len(LOADING_MESSAGES)) * 100)
        progress.progress(pct, text=msg)
        time.sleep(0.4)

    return placeholder, progress


# ---------------------------------------------------------------------------
# Results
# ---------------------------------------------------------------------------
def _render_results(result: AnalysisResult, elapsed: float) -> None:
    # Success banner
    st.markdown(
        '<div class="success-banner">'
        '<span class="success-banner-icon">✅</span>'
        '<div>'
        '<div class="success-banner-text">Resume Successfully Analyzed</div>'
        f'<div class="success-banner-sub">Analysis completed in {elapsed:.1f}s</div>'
        "</div>"
        "</div>",
        unsafe_allow_html=True,
    )

    # ── Row 1: ATS Score + Resume Review ──────────────────────────────
    score_col, review_col = st.columns([1, 2], gap="medium")

    with score_col:
        st.markdown(
            '<div class="output-card">'
            '<div class="output-card-header">📊 ATS Score</div>'
            "</div>",
            unsafe_allow_html=True,
        )
        st.markdown(_ats_ring_html(result.ats_score), unsafe_allow_html=True)
        st.markdown(
            f'<div style="text-align:center; font-size:0.82rem; color:#9CA3AF; '
            f'margin-top:-0.5rem;">{result.ats_score_explanation}</div>',
            unsafe_allow_html=True,
        )

    with review_col:
        # Resume Review card
        st.markdown(
            '<div class="output-card">'
            '<div class="output-card-header">📄 Resume Review</div>'
            f'<div style="font-size:0.88rem; color:#D1D5DB; line-height:1.6;">'
            f"{result.resume_review}</div>"
            "</div>",
            unsafe_allow_html=True,
        )

        # Strengths & Weaknesses in sub-cards
        s_col, w_col = st.columns(2, gap="small")

        with s_col:
            items = "".join(
                f"<li>{s}</li>" for s in result.strengths
            )
            st.markdown(
                '<div class="output-card">'
                '<div class="output-card-subheader" style="color:#10B981;">✅ Strengths</div>'
                f'<ul class="item-list green">{items}</ul>'
                "</div>",
                unsafe_allow_html=True,
            )

        with w_col:
            items = "".join(
                f"<li>{w}</li>" for w in result.weaknesses
            )
            st.markdown(
                '<div class="output-card">'
                '<div class="output-card-subheader" style="color:#F59E0B;">⚠️ Weaknesses</div>'
                f'<ul class="item-list yellow">{items}</ul>'
                "</div>",
                unsafe_allow_html=True,
            )

    st.markdown('<div style="height:0.3rem;"></div>', unsafe_allow_html=True)

    # ── Row 2: Formatting / ATS Risks ────────────────────────────────
    fmt_col, risk_col = st.columns(2, gap="medium")

    with fmt_col:
        if result.formatting_issues:
            items = "".join(f"<li>{f}</li>" for f in result.formatting_issues)
            st.markdown(
                '<div class="output-card">'
                '<div class="output-card-header">🔧 Formatting Issues</div>'
                f'<ul class="item-list blue">{items}</ul>'
                "</div>",
                unsafe_allow_html=True,
            )
        else:
            st.markdown(
                '<div class="output-card">'
                '<div class="output-card-header">🔧 Formatting Issues</div>'
                '<div style="color:#10B981; font-size:0.88rem;">'
                "No formatting issues detected.</div>"
                "</div>",
                unsafe_allow_html=True,
            )

    with risk_col:
        if result.ats_risks:
            items = "".join(f"<li>{r}</li>" for r in result.ats_risks)
            st.markdown(
                '<div class="output-card">'
                '<div class="output-card-header">⚠️ ATS Risks</div>'
                f'<ul class="item-list red">{items}</ul>'
                "</div>",
                unsafe_allow_html=True,
            )
        else:
            st.markdown(
                '<div class="output-card">'
                '<div class="output-card-header">⚠️ ATS Risks</div>'
                '<div style="color:#10B981; font-size:0.88rem;">'
                "No ATS risks detected.</div>"
                "</div>",
                unsafe_allow_html=True,
            )

    st.markdown('<div style="height:0.3rem;"></div>', unsafe_allow_html=True)

    # ── Row 3: Missing Skills ────────────────────────────────────────
    st.markdown(
        '<div class="output-card">'
        '<div class="output-card-header">🎯 Missing Skills</div>'
        "</div>",
        unsafe_allow_html=True,
    )
    if result.missing_skills:
        tags = "".join(
            f'<span class="skill-tag">❌ {s}</span>' for s in result.missing_skills
        )
        st.markdown(
            f'<div class="skill-tags" style="padding:0 0 0.3rem 0;">{tags}</div>',
            unsafe_allow_html=True,
        )
    else:
        st.markdown(
            '<div class="skill-tags" style="padding:0.3rem 0;">'
            '<span class="skill-tag skill-tag-present">✅ No missing skills — strong match!</span>'
            "</div>",
            unsafe_allow_html=True,
        )

    st.markdown('<div style="height:0.3rem;"></div>', unsafe_allow_html=True)

    # ── Row 4: Suggestions ───────────────────────────────────────────
    st.markdown(
        '<div class="output-card">'
        '<div class="output-card-header">💡 Improvement Suggestions</div>'
        "</div>",
        unsafe_allow_html=True,
    )

    suggestion_html = ""
    for i, s in enumerate(result.suggestions, 1):
        icon_cls = "suggestion-icon-green" if i <= 2 else "suggestion-icon-blue"
        suggestion_html += (
            f'<div class="suggestion-item">'
            f'<div class="suggestion-icon {icon_cls}">{i}</div>'
            f'<div class="suggestion-text">{s}</div>'
            f"</div>"
        )

    st.markdown(
        f'<div class="output-card" style="border:none; background:transparent; padding:0.5rem 0;">'
        f"{suggestion_html}</div>",
        unsafe_allow_html=True,
    )


# ---------------------------------------------------------------------------
# Error UI
# ---------------------------------------------------------------------------
def _render_error(error: Exception) -> None:
    error_type = type(error).__name__
    message = str(error)

    if "400" in message:
        reason = "The provider returned an invalid request."
        hint = "Check that the selected model supports the request format."
    elif "401" in message or "403" in message:
        reason = "Authentication failed with the LLM provider."
        hint = "Verify your API key is correct and has sufficient credits."
    elif "429" in message:
        reason = "Rate limit exceeded."
        hint = "Wait a moment and try again."
    elif "connection" in message.lower() or "connect" in message.lower():
        reason = "Could not connect to the LLM provider."
        hint = "Check your internet connection."
    else:
        reason = "An unexpected error occurred during analysis."
        hint = "Try again later or switch to a different provider."

    st.markdown(
        f'<div class="error-card">'
        f'<div class="error-card-title">❌ Analysis Error</div>'
        f'<div class="error-card-text">'
        f"<strong>Reason:</strong> {reason}<br>"
        f"<strong>Hint:</strong> {hint}"
        f"</div>"
        f"</div>",
        unsafe_allow_html=True,
    )

    with st.expander("Technical Details"):
        st.code(f"{error_type}: {message}", language=None)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> None:
    # Inject CSS
    st.markdown(CUSTOM_CSS, unsafe_allow_html=True)

    _render_sidebar()
    _render_hero()

    uploaded_file, job_description = _render_inputs()

    st.markdown('<div style="height:0.5rem;"></div>', unsafe_allow_html=True)

    analyze = st.button("🚀  Analyze Resume", type="primary")

    if analyze:
        if not uploaded_file:
            _render_error(ValueError("Please upload a resume file."))
            return
        if not job_description or not job_description.strip():
            _render_error(ValueError("Please paste a job description."))
            return

        placeholder, progress_bar = _render_loading()
        start = time.time()

        try:
            result = asyncio.run(
                analyze_uploaded_resume(
                    file_content=uploaded_file.read(),
                    file_name=uploaded_file.name,
                    job_description=job_description,
                )
            )
            elapsed = time.time() - start
            placeholder.empty()
            progress_bar.empty()
            _render_results(result, elapsed)

        except Exception as e:
            elapsed = time.time() - start
            placeholder.empty()
            progress_bar.empty()
            _render_error(e)


if __name__ == "__main__":
    main()
