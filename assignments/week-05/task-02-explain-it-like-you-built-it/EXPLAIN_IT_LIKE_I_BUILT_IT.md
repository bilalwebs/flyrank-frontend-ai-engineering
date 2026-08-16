
---

# Explain It Like You Built It

## Topic I Chose

**How Tool Calling Works in My Project**

When I started building this project, I did not fully understand how the AI knew when to run a tool instead of just replying with normal text. After learning about the AI SDK and testing my project, I understood how tool calling works.

In my project, when a user types a message like **"Audit example.com"**, the AI first reads the request. Instead of writing an SEO report by itself, it decides to call the **`runSiteAudit`** tool because that tool is designed to perform website audits. The tool receives the website domain as input, validates it using a **Zod schema**, and then runs the `execute()` function. The function returns structured information such as the website domain, SEO score, grade, issues found, and the time the audit was completed.

The frontend does not display raw JSON. Instead, it passes the returned data to the **`AuditCard`** React component, which shows the results in a clean and user-friendly card. This makes the information much easier to read.

Working on this feature helped me understand that the AI is not doing everything itself. It can decide when to call a tool, receive structured data back, and then present the results through the user interface. This taught me how AI models, backend tools, and React components work together to build an interactive AI application.

---

## Why I Chose This Feature

I chose this feature because it was the most interesting part of my project. Before building it, I thought the AI generated every response by itself. After implementing tool calling, I learned that the AI can use backend functions to perform specific tasks and then display the results in a structured way. Understanding this made me much more confident in how AI-powered applications are built.

---
