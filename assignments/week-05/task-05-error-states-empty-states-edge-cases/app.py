"""AI Job Application Assistant — Streamlit UI.

Dark-mode-first SaaS dashboard. Pure UI layer — no AI logic here.

Implements: empty states, loading states, error states, edge cases,
button states, user feedback, onboarding, and validation.
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
from utils.errors import AppError
from utils.logger import setup_logging, get_logger, log_error

setup_logging()
logger = get_logger(__name__)

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
    ("Extracting resume content...", 10),
    ("Analyzing against job description...", 30),
    ("Calculating ATS compatibility score...", 50),
    ("Identifying missing skills...", 70),
    ("Generating improvement suggestions...", 90),
]

MAX_FILE_SIZE_MB = 5

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

/* ── Onboarding Card ───────────────────────────────────────────────── */
.onboarding-card {
    background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08));
    border: 1px solid rgba(59,130,246,0.25);
    border-radius: 16px;
    padding: 2rem 2.5rem;
    margin: 1rem 0 2rem 0;
    text-align: center;
}

.onboarding-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #F9FAFB;
    margin-bottom: 0.5rem;
}

.onboarding-subtitle {
    font-size: 0.92rem;
    color: #9CA3AF;
    margin-bottom: 1.5rem;
}

.onboarding-steps {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.onboarding-step {
    text-align: center;
    max-width: 180px;
}

.onboarding-step-num {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3B82F6, #2563EB);
    color: #FFFFFF;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
}

.onboarding-step-title {
    font-size: 0.88rem;
    font-weight: 600;
    color: #F9FAFB;
    margin-bottom: 0.2rem;
}

.onboarding-step-desc {
    font-size: 0.78rem;
    color: #9CA3AF;
}

/* ── Skeleton Loading ──────────────────────────────────────────────── */
@keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
}

.skeleton-card {
    background: #1F2937;
    border: 1px solid #374151;
    border-radius: 14px;
    padding: 1.5rem;
    margin-bottom: 1rem;
}

.skeleton-line {
    height: 14px;
    border-radius: 6px;
    background: linear-gradient(90deg, #1F2937 25%, #374151 50%, #1F2937 75%);
    background-size: 800px 100%;
    animation: shimmer 1.5s infinite linear;
    margin-bottom: 0.7rem;
}

.skeleton-line-short { width: 40%; }
.skeleton-line-medium { width: 70%; }
.skeleton-line-long { width: 100%; }

.skeleton-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 1rem auto;
    background: linear-gradient(90deg, #1F2937 25%, #374151 50%, #1F2937 75%);
    background-size: 800px 100%;
    animation: shimmer 1.5s infinite linear;
}

.skeleton-tag {
    display: inline-block;
    height: 28px;
    width: 80px;
    border-radius: 8px;
    background: linear-gradient(90deg, #1F2937 25%, #374151 50%, #1F2937 75%);
    background-size: 800px 100%;
    animation: shimmer 1.5s infinite linear;
    margin: 0.2rem;
}

/* ── Warning Card ──────────────────────────────────────────────────── */
.warning-card {
    background: rgba(245, 158, 11, 0.06);
    border: 1px solid rgba(245, 158, 11, 0.25);
    border-radius: 12px;
    padding: 1rem 1.3rem;
    margin-bottom: 1rem;
}

.warning-card-title {
    font-weight: 600;
    color: #FCD34D;
    margin-bottom: 0.3rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.warning-card-text {
    font-size: 0.88rem;
    color: #D1D5DB;
    line-height: 1.5;
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
# Helpers
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


def _has_api_key() -> bool:
    """Check if the currently selected provider has an API key."""
    provider = settings.PROVIDER.lower().strip()
    key_map = {
        "openai": settings.OPENAI_API_KEY,
        "groq": settings.GROQ_API_KEY,
        "gemini": settings.GEMINI_API_KEY,
    }
    return bool(key_map.get(provider, ""))


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
# Empty States
# ---------------------------------------------------------------------------
def _render_empty_resume() -> None:
    """Shown when no resume is uploaded."""
    st.markdown(
        '<div class="empty-state">'
        '<div class="empty-state-icon">📄</div>'
        '<div class="empty-state-text"><strong>No resume uploaded yet.</strong></div>'
        '<div style="font-size:0.82rem; color:#6B7280; margin-top:0.4rem;">'
        "Upload a PDF, DOCX, or TXT file to get started."
        "</div>"
        "</div>",
        unsafe_allow_html=True,
    )


def _render_empty_jd() -> None:
    """Shown when no job description is provided."""
    st.markdown(
        '<div class="empty-state">'
        '<div class="empty-state-icon">📝</div>'
        '<div class="empty-state-text"><strong>Paste a Job Description to begin.</strong></div>'
        '<div style="font-size:0.82rem; color:#6B7280; margin-top:0.4rem;">'
        "Copy the full job posting into the text area."
        "</div>"
        "</div>",
        unsafe_allow_html=True,
    )


def _render_no_analysis_yet() -> None:
    """Shown when no analysis has been performed."""
    st.markdown(
        '<div class="empty-state">'
        '<div class="empty-state-icon">🔍</div>'
        '<div class="empty-state-text"><strong>No analysis available.</strong></div>'
        '<div style="font-size:0.82rem; color:#6B7280; margin-top:0.4rem;">'
        "Upload a resume and paste a job description, then click Analyze."
        "</div>"
        "</div>",
        unsafe_allow_html=True,
    )


# ---------------------------------------------------------------------------
# Onboarding Card
# ---------------------------------------------------------------------------
def _render_onboarding() -> None:
    """First-time welcome card shown when app opens fresh."""
    st.markdown(
        '<div class="onboarding-card">'
        '<div class="onboarding-title">Welcome to AI Job Application Assistant</div>'
        '<div class="onboarding-subtitle">'
        "Get AI-powered feedback on your resume in three simple steps."
        "</div>"
        '<div class="onboarding-steps">'
        '<div class="onboarding-step">'
        '<div class="onboarding-step-num">1</div>'
        '<div class="onboarding-step-title">Upload Resume</div>'
        '<div class="onboarding-step-desc">PDF, DOCX, or TXT format</div>'
        "</div>"
        '<div class="onboarding-step">'
        '<div class="onboarding-step-num">2</div>'
        '<div class="onboarding-step-title">Paste Job Description</div>'
        '<div class="onboarding-step-desc">The role you are applying for</div>'
        "</div>"
        '<div class="onboarding-step">'
        '<div class="onboarding-step-num">3</div>'
        '<div class="onboarding-step-title">Click Analyze</div>'
        '<div class="onboarding-step-desc">Get instant AI feedback</div>'
        "</div>"
        "</div>"
        "</div>",
        unsafe_allow_html=True,
    )


# ---------------------------------------------------------------------------
# Input Section
# ---------------------------------------------------------------------------
def _render_inputs(disabled: bool = False) -> tuple:
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
            disabled=disabled,
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
            size_bytes = len(uploaded_file.read())
            uploaded_file.seek(0)
            size_kb = size_bytes / 1024
            ext = Path(uploaded_file.name).suffix.upper().lstrip(".")

            # File size warning
            if size_bytes > MAX_FILE_SIZE_MB * 1024 * 1024:
                st.warning(
                    f"File is {size_kb:.0f} KB — exceeds {MAX_FILE_SIZE_MB} MB limit. "
                    "Please upload a smaller file."
                )

            st.markdown(
                f'<div style="margin-top:0.5rem; font-size:0.82rem; color:#9CA3AF;">'
                f"📎 <strong style='color:#D1D5DB;'>{uploaded_file.name}</strong>"
                f" · {ext} · {size_kb:.1f} KB"
                f"</div>",
                unsafe_allow_html=True,
            )
        else:
            _render_empty_resume()

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
            disabled=disabled,
        )

        if job_description:
            chars = len(job_description)
            st.markdown(
                f'<div style="text-align:right; font-size:0.72rem; color:#6B7280;">'
                f"{chars:,} characters</div>",
                unsafe_allow_html=True,
            )

            # Short JD warning
            if len(job_description.strip()) < 20:
                st.info(
                    "Job description seems very short. A more detailed description "
                    "will produce better analysis results."
                )
        else:
            _render_empty_jd()

    return uploaded_file, job_description


# ---------------------------------------------------------------------------
# Loading States
# ---------------------------------------------------------------------------
def _render_skeleton_loading() -> None:
    """Render skeleton placeholder cards while analysis runs."""
    score_col, review_col = st.columns([1, 2], gap="medium")

    with score_col:
        st.markdown(
            '<div class="skeleton-card">'
            '<div class="skeleton-line skeleton-line-short"></div>'
            '<div class="skeleton-circle"></div>'
            '<div class="skeleton-line skeleton-line-medium"></div>'
            "</div>",
            unsafe_allow_html=True,
        )

    with review_col:
        st.markdown(
            '<div class="skeleton-card">'
            '<div class="skeleton-line skeleton-line-short"></div>'
            '<div class="skeleton-line skeleton-line-long"></div>'
            '<div class="skeleton-line skeleton-line-long"></div>'
            '<div class="skeleton-line skeleton-line-medium"></div>'
            "</div>",
            unsafe_allow_html=True,
        )

    st.markdown(
        '<div class="skeleton-card">'
        '<div class="skeleton-line skeleton-line-short"></div>'
        '<div><span class="skeleton-tag"></span>'
        '<span class="skeleton-tag"></span>'
        '<span class="skeleton-tag"></span></div>'
        "</div>",
        unsafe_allow_html=True,
    )


def _render_loading(progress_bar) -> None:
    """Animate progress bar with stage-specific messages."""
    for msg, pct in LOADING_MESSAGES:
        progress_bar.progress(pct, text=msg)
        time.sleep(0.3)
    progress_bar.progress(100, text="Finalizing analysis...")


# ---------------------------------------------------------------------------
# Results
# ---------------------------------------------------------------------------
def _render_results(result: AnalysisResult, elapsed: float) -> None:
    # Success feedback
    st.success(
        f"Resume analyzed successfully in {elapsed:.1f}s."
    )

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

    # ── Row 1: ATS Score + Resume Review
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
        st.markdown(
            '<div class="output-card">'
            '<div class="output-card-header">📄 Resume Review</div>'
            f'<div style="font-size:0.88rem; color:#D1D5DB; line-height:1.6;">'
            f"{result.resume_review}</div>"
            "</div>",
            unsafe_allow_html=True,
        )

        s_col, w_col = st.columns(2, gap="small")

        with s_col:
            items = "".join(f"<li>{s}</li>" for s in result.strengths)
            st.markdown(
                '<div class="output-card">'
                '<div class="output-card-subheader" style="color:#10B981;">✅ Strengths</div>'
                f'<ul class="item-list green">{items}</ul>'
                "</div>",
                unsafe_allow_html=True,
            )

        with w_col:
            items = "".join(f"<li>{w}</li>" for w in result.weaknesses)
            st.markdown(
                '<div class="output-card">'
                '<div class="output-card-subheader" style="color:#F59E0B;">⚠️ Weaknesses</div>'
                f'<ul class="item-list yellow">{items}</ul>'
                "</div>",
                unsafe_allow_html=True,
            )

    st.markdown('<div style="height:0.3rem;"></div>', unsafe_allow_html=True)

    # ── Row 2: Formatting / ATS Risks
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

    # ── Row 3: Missing Skills
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

    # ── Row 4: Suggestions
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
    """Render a user-friendly error card. Never exposes stack traces."""
    if isinstance(error, AppError):
        user_msg = error.user_message
        severity = error.severity
        error_code = error.error_code
    else:
        user_msg = "An unexpected error occurred. Please try again."
        severity = "error"
        error_code = "UNKNOWN"

    if severity == "warning":
        st.warning(f"⚠️ {user_msg}")
    else:
        st.error(f"❌ {user_msg}")

    # Technical details in expander (never visible by default)
    with st.expander("Technical Details"):
        st.code(
            f"Error Code: {error_code}\n"
            f"Type: {type(error).__name__}\n"
            f"Details: {str(error)[:500]}",
            language=None,
        )


def _render_api_key_warning() -> None:
    """Warn when no API key is configured."""
    st.warning(
        "⚠️ No API key configured for the selected provider. "
        "Please set your API key in the `.env` file."
    )


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> None:
    st.markdown(CUSTOM_CSS, unsafe_allow_html=True)

    _render_sidebar()
    _render_hero()

    # ── Check if this is a fresh session (first open) ──
    if "analyzed" not in st.session_state:
        st.session_state.analyzed = False
    if "last_result" not in st.session_state:
        st.session_state.last_result = None
    if "last_error" not in st.session_state:
        st.session_state.last_error = None
    if "is_loading" not in st.session_state:
        st.session_state.is_loading = False

    # Show onboarding on first visit
    if not st.session_state.analyzed and st.session_state.last_result is None:
        _render_onboarding()

    # ── API key warning ──
    if not _has_api_key():
        _render_api_key_warning()

    # ── Inputs (disabled during loading) ──
    uploaded_file, job_description = _render_inputs(disabled=st.session_state.is_loading)

    st.markdown('<div style="height:0.5rem;"></div>', unsafe_allow_html=True)

    # ── Button states: disabled while loading ──
    btn_disabled = st_session_is_loading = st.session_state.is_loading
    btn_label = "⏳ Analyzing..." if btn_disabled else "🚀  Analyze Resume"

    analyze = st.button(
        btn_label,
        type="primary",
        disabled=btn_disabled,
    )

    # ── Retry button (shown after failure) ──
    retry = False
    if st.session_state.last_error is not None:
        st.info("💡 The previous analysis failed. You can try again.")
        retry = st.button("🔄  Retry Analysis", key="retry_btn")

    # ── Handle Analyze or Retry ──
    if analyze or retry:
        st.session_state.is_loading = True
        st.session_state.last_error = None

        # ── Pre-analysis validation with user feedback ──
        if not uploaded_file:
            st.session_state.is_loading = False
            st.error("❌ Please upload a resume file before analyzing.")
            return

        if not job_description or not job_description.strip():
            st.session_state.is_loading = False
            st.error("❌ Please paste a job description before analyzing.")
            return

        if job_description and len(job_description.strip()) < 20:
            st.warning(
                "⚠️ The job description is very short. Analysis quality may be reduced."
            )

        if not _has_api_key():
            st.session_state.is_loading = False
            st.error(
                "❌ No API key configured. Please set your API key in the `.env` file."
            )
            return

        # ── Run analysis with loading state ──
        progress_bar = st.progress(0, text="Starting analysis...")

        try:
            _render_loading(progress_bar)
            start = time.time()

            result = asyncio.run(
                analyze_uploaded_resume(
                    file_content=uploaded_file.read(),
                    file_name=uploaded_file.name,
                    job_description=job_description,
                )
            )
            elapsed = time.time() - start

            progress_bar.empty()
            st.session_state.analyzed = True
            st.session_state.last_result = result
            st.session_state.last_error = None
            st.session_state.is_loading = False

            _render_results(result, elapsed)

        except Exception as exc:
            progress_bar.empty()
            st.session_state.last_error = exc
            st.session_state.is_loading = False

            log_error(logger, exc, provider=settings.PROVIDER, context="ui_analysis")
            _render_error(exc)

    # ── Show previous results if available ──
    elif st.session_state.last_result is not None and not st.session_state.is_loading:
        _render_results(st.session_state.last_result, 0.0)

    # ── No analysis yet, no inputs → empty state ──
    elif (
        not st.session_state.analyzed
        and st.session_state.last_result is None
        and not uploaded_file
        and not job_description
    ):
        _render_no_analysis_yet()


if __name__ == "__main__":
    main()
