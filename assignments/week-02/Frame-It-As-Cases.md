# Frame It as Cases: Work That Speaks for Itself

Student: Muhammad Bilal Hussain

Track: General AI Fluency

Week: 2

Assignment: Frame It as Cases: Work That Speaks for Itself

Repository: [https://github.com/bilalwebs/flyrank-frontend-ai-engineering](https://github.com/bilalwebs/flyrank-frontend-ai-engineering)

Date: July 2026

---

## Introduction

This document presents the framed case studies for my portfolio. Instead of simply listing projects, each case explains the problem, the decisions I made, and the outcome. The goal is to demonstrate my frontend development skills and AI-assisted workflow in a way that is meaningful to Frontend AI Engineering recruiters.

## Voice Card

Simple, practical, honest, beginner-friendly, no buzzwords.

## Case Study 1 – MentorOS

### MentorOS – AI Student Growth Platform

A Case Study by Muhammad Bilal Hussain

### The Problem

Most students don't have one place to manage their learning journey. Skills, certificates, projects, and career goals end up scattered across Google Docs, GitHub, LinkedIn, and random notes. On top of that, most AI tools don't remember anything about a student's progress — every conversation starts from zero.

MentorOS was built to fix this: one platform where students can track their academic and career journey, and get AI guidance that actually remembers their progress over time.

### Why I Built It

This came from my own experience. As a Software Engineering student, and while working on the FlyRank Frontend AI Engineering Internship, I was juggling my skills, certificates, projects, and learning resources across four or five different tools. Keeping track of my own progress was harder than it should have been.

I also noticed other students dealing with the same problem. That's what pushed me to build MentorOS — a centralized, AI-powered platform that helps students organize their journey and get guidance based on their long-term progress, not just a single conversation.

### Technical Decisions

Frontend: Next.js, TypeScript, and Tailwind CSS. Next.js gives a modern React setup with good routing and performance. TypeScript keeps the code reliable and catches mistakes early. Tailwind makes building responsive UI fast.

Backend: FastAPI with SQLAlchemy and SQLite (with PostgreSQL planned for production). FastAPI is fast, simple to build REST APIs with, and works naturally with Python-based AI tools. SQLite was the right choice for development because it's easy to set up, and the plan is to move to PostgreSQL once the project is ready for production.

AI Integration: Qwen API and ChromaDB. MentorOS is being built for the Qwen Global AI Hackathon, so the Qwen API powers the AI features. ChromaDB stores long-term memory, so the AI can recall important student information across sessions instead of starting fresh every time.

Each choice was made to fit the project's actual goal: a maintainable, AI-powered student platform with real memory — not just picking trendy tools.

### The Challenge

The hardest part wasn't a single bug — it was designing a backend architecture flexible enough to support future AI features without becoming messy. MentorOS needed to handle authentication, student profiles, career goals, skills, projects, certificates, and a persistent memory system, all without turning into a tangled codebase.

A related challenge was figuring out how the AI memory workflow should connect FastAPI with ChromaDB in a clean way, rather than bolting it on as an afterthought.

### How I Solved It

Instead of rushing to write code, I focused on planning the architecture first. I organized the backend into clear modules, each with one responsibility:

- Routes – handle incoming requests
- Models – define the database structure
- Schemas – validate requests and responses
- Services – hold the business logic
- Memory module – a separate module for ChromaDB, so the AI memory system can evolve on its own without affecting the rest of the app

This modular structure means new AI features can be added later without reworking the whole system.

### Outcome

MentorOS is currently a functional prototype under active development. The backend foundation is built — core project structure, authentication, database models, and REST API architecture are in place. The frontend is being built with Next.js, TypeScript, and Tailwind CSS. The AI memory workflow and personalized recommendations are designed into the architecture and are being implemented step by step.

It's not a finished product yet, but it demonstrates a solid system design and a clear development approach, and it's actively growing.

### What I Learned

The biggest lesson: good software starts with good architecture, not just writing code. Early on, I wanted to build features fast. I quickly realized that without a clear structure, the project would get hard to maintain as it grew. Planning the modules and the memory workflow before writing implementation code made everything more organized.

I also learned that AI tools work best when I understand the problem myself first, and use them as assistants — not as a replacement for thinking through the design.

### How AI Tools Helped

I used Claude and Cursor as assistants, not code generators.

- Claude helped me review the overall backend architecture and suggested organizing the project into separate modules (routes, models, schemas, services). It also explained AI memory concepts and helped me think through how ChromaDB could fit into MentorOS.
- Cursor helped while actually writing code — generating boilerplate, reviewing functions, suggesting improvements, and flagging errors. When I ran into FastAPI configuration issues, I used both tools to understand the errors and explore solutions step by step, instead of just copying whatever code was generated.

This approach let me keep learning the technologies while still making real progress on the project.

## Case Study 2 – Personal Portfolio Website

### The Problem

Recruiters often receive resumes and LinkedIn profiles that list skills and projects but provide little evidence of what a candidate can actually build. I wanted a portfolio that demonstrates my frontend development skills through real projects instead of simple claims.

### What I Did

I designed my portfolio with a clear structure focused on one goal: helping Frontend AI Engineering recruiters quickly understand who I am, what I have built, and how they can contact me.

The portfolio includes four main sections:

- Home
- Projects
- About Me
- Contact

Instead of adding unnecessary pages, I kept the design simple and focused. I also planned to present each project as a case study, explaining the problem, my decisions, and the outcome. Throughout the planning process, I used AI tools like Claude as a thinking partner to review my sitemap and improve the overall structure while keeping the final decisions my own.

### Outcome

The portfolio now has a clear purpose and supports my proof statement. Every section guides recruiters toward one action: contacting me for a Frontend AI Engineering Internship. It also provides a strong foundation for adding future projects and demonstrating my AI-assisted development workflow.

### What I Learned

I learned that a portfolio is not just a collection of projects. It should tell a clear story, show evidence of my skills, and make it easy for recruiters to understand my work and take the next step.

### How AI Helped

I used Claude to challenge my ideas, review my sitemap, and suggest practical improvements such as adding project case studies, making contact information visible on every page, and highlighting my AI-assisted workflow. I used its feedback to improve my planning while keeping the final portfolio decisions my own.

## Bio

I am Muhammad Bilal Hussain, a BS Software Engineering student and Frontend AI Engineering Intern at FlyRank. I build modern, responsive frontend applications using React, Next.js, TypeScript, and AI-assisted development tools, with a focus on writing clean, maintainable, and production-ready code. I'm continuously improving my skills through hands-on projects and the FlyRank internship, and I enjoy working closely with AI tools as part of my development process rather than relying on them to do the thinking for me.

## Contact / CTA

I'm currently looking for Frontend AI Engineering internship and entry-level opportunities where I can keep building production-ready applications and learning from real projects.

Email: [bil2023aljutt@gmail.com](mailto:bil2023aljutt@gmail.com)

GitHub: [https://github.com/bilalwebs](https://github.com/bilalwebs)

LinkedIn: [https://linkedin.com/in/bilalcode](https://linkedin.com/in/bilalcode)

Feel free to reach out — I'd be glad to walk you through MentorOS or my other projects in more detail.

## Before vs After

### Generic AI Version

"I am a results-driven frontend developer passionate about creating innovative solutions."

### My Edited Version

"I build clean, responsive frontend applications using React, Next.js, and AI-assisted development tools. I focus on creating practical, maintainable solutions and continuously improving my engineering skills."

## Reflection

When I first wrote the MentorOS case study, I noticed I was listing what I built instead of explaining why I built it that way. It read like a feature list, not like something I had actually made decisions about. Going back and adding the reasoning behind each choice — why FastAPI, why a separate memory module, why I planned the architecture before writing code — made the project sound like real engineering work instead of just a stack of tools.

Doing the same for my portfolio case study was harder, because that project is more about planning than code. I had to be honest that most of the value came from thinking through the structure with Claude's feedback, not from a technical challenge. Writing both cases side by side showed me that a case study is only convincing when I can explain the "why" behind a decision, not just the "what." That's something I'll carry into how I document every project going forward, not just this assignment.