# Deployment handoff checklist

The MVP is implemented in this folder and the production build passes locally.

## Required account actions before external publishing

1. Create or select a GitHub repository and add it as `origin`.
2. Push branch `main`.
3. Import the repository into Vercel and deploy.
4. Set the final production URL in `lib/site.ts`, `app/robots.ts`, and `app/sitemap.ts`, then push a follow-up commit and redeploy.
5. Add the final URL as a property in Google Search Console, verify ownership, submit `/sitemap.xml`, and request indexing for the homepage and tool pages.

The current placeholder host is `agent-tools.vercel.app`; replace it with the actual Vercel URL before Search Console submission.
