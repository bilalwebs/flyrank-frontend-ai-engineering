import { tool } from 'ai';
import { z } from 'zod';

export const runSiteAudit = tool({
  description:
    'Run an SEO audit for a given website domain and return a structured score report (score, grade, issues found).',
  inputSchema: z.object({
    domain: z
      .string()
      .describe('The website domain to audit, e.g. "example.com"'),
  }),
  execute: async ({ domain }) => {
    await new Promise((r) => setTimeout(r, 600)); // simulate latency

    const score = Math.floor(Math.random() * 41) + 60; // 60-100
    const issues = [
      score < 90 ? 'Missing meta description on 3 pages' : null,
      score < 80 ? 'Slow LCP on mobile (3.2s)' : null,
      score < 70 ? 'No structured data (JSON-LD) detected' : null,
    ].filter(Boolean) as string[];

    return {
      domain,
      score,
      grade: (score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D') as
        | 'A'
        | 'B'
        | 'C'
        | 'D',
      issues,
      checkedAt: new Date().toISOString(),
    };
  },
});

export const deleteAuditReport = tool({
  description:
    'Permanently delete a previously generated SEO audit report for a domain. Destructive — requires user confirmation before running.',
  inputSchema: z.object({
    domain: z.string().describe('The domain whose report should be deleted'),
    reportId: z.string().describe('The ID of the report to delete'),
  }),
  execute: async ({ domain, reportId }) => {
    await new Promise((r) => setTimeout(r, 400));

    return {
      domain,
      reportId,
      deleted: true,
      deletedAt: new Date().toISOString(),
    };
  },
});

export const chatTools = {
  runSiteAudit,
  deleteAuditReport,
};
