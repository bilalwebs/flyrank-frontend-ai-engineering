"use client"

import Image from "next/image"

const articles = [
  {
    title: "Building RAG Pipelines That Actually Work in Production",
    date: "Aug 12, 2025",
    readTime: "8 min read",
    category: "AI Engineering",
    image: "/blog/rag-pipelines.jfif",
  },
  {
    title: "Why TypeScript Is the Future of AI-Powered Applications",
    date: "Jul 28, 2025",
    readTime: "6 min read",
    category: "Development",
    image: "/blog/typescript-ai.jfif",
  },
  {
    title: "A Practical Guide to Fine-Tuning LLMs on Custom Data",
    date: "Jun 15, 2025",
    readTime: "12 min read",
    category: "Machine Learning",
    image: "/blog/fine-tuning-llm.jfif",
  },
]

export default function Blog() {
  return (
    <section id="blog" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 hero-glow pointer-events-none opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Blog
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Thoughts on AI engineering, software development, and the future of
            technology.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="glass-card card-shine glass-card-hover group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-background-secondary to-background">
                {/*
                  BLOG IMAGES:
                  Place images at:
                    public/blog/rag-pipelines.jpg
                    public/blog/typescript-ai.jpg
                    public/blog/fine-tuning-llms.jpg
                */}
                <Image
                  src={article.image}
                  alt={article.title}
                  width={600}
                  height={338}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-secondary/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {article.category}
                </span>
                <h3 className="mt-2 text-base font-semibold text-white leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <div className="mt-4 flex items-center gap-3 text-xs text-text-secondary/60">
                  <span>{article.date}</span>
                  <span className="h-1 w-1 rounded-full bg-text-secondary/30" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
