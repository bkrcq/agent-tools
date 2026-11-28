import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bifura: See Your Site the Way AI Agents Do',
  description:
    'Bifura fetches your site the way AI crawlers do, scores Agent readiness, and lets you test fixes in a sandbox first. Free score, $14 full report.',
  alternates: { canonical: '/bifura/' },
};

const faqs = [
  {
    q: 'What is Bifura?',
    a: 'Bifura is a website audit tool that shows you your site the way AI agents and assistants see it. It fetches a page the way AI crawlers do — raw HTML without JavaScript, plus the rendered page, robots.txt, llms.txt, sitemap.xml and structured data — then shows what the agent gets, what it gets wrong, and what to change. It launched on Product Hunt on 24 November 2026 and finished #4 on 26 November 2026. The maker is Konrad Pacula. A free Agent readiness score takes under a minute and needs no sign-up.',
  },
  {
    q: 'What does the Agent readiness score actually measure?',
    a: 'Whether an AI can load, understand and act on a page correctly, on Bifura’s own Score v3 scale — it has nothing to do with Google ranking. The score is judged by a model (grok-4-1-fast-reasoning in the public example report) on top of code checks. Bifura’s own homepage scored 84 in its example scan of 17 November 2026. There is also a separate People check — 73 in the same scan — for how well the page works for people, and it is never blended into the Agent readiness score.',
  },
  {
    q: 'What does a Bifura scan check?',
    a: 'One page at a time: the raw HTML an AI crawler receives (no JavaScript) and the rendered page, robots.txt, llms.txt, sitemap.xml and structured data. It reports which AI crawlers your robots.txt allows — answer crawlers such as OAI-SearchBot, ChatGPT-User, Claude-SearchBot and PerplexityBot, and training crawlers such as GPTBot, ClaudeBot, Google-Extended and CCBot — plus a context budget (how many tokens the page costs an AI to read and how much of it is useful content), where the key facts sit on the page, and how much survives if an agent stops reading early at 20,000, 50,000 or 100,000 characters.',
  },
  {
    q: 'What is Fix Preview?',
    a: 'Fix Preview applies a recommended change to a sandbox copy of your page, rescores it, and shows the Agent readiness score and the People check before and after — your live site is not changed. It is on the Pro and Agency plans, not the single $14 report. The idea is to test the fix before you ship it: if the rescore barely moves, you skip the change.',
  },
  {
    q: 'How much does Bifura cost?',
    a: 'The Agent readiness score is free, with no sign-up. The full report for one site is $14, with no subscription. Subscriptions start at $19 a month and come in Starter, Pro and Agency tiers — Fix Preview, monitoring alerts and the API sit on the paid tiers. Bifura’s own example report recommends the company publish an exact per-tier deliverables table, so check the pricing page before paying rather than trusting this page’s summary.',
  },
  {
    q: 'How is Bifura different from Dedica?',
    a: 'Both audit a site, but they look through different lenses. Dedica runs 125 checks across discovery, access, usability and payments and sells a $30 one-time fix kit with instruction files for Claude Code, Codex, Cursor and Copilot. Bifura is narrower and agent-specific: raw versus rendered HTML, a context budget in tokens, an agent simulator that answers questions from the scanned page (“what does this cost?”, “who is this for?”), and Fix Preview, which rescores a sandbox copy. Pick Dedica for a broad site audit with a fix kit; pick Bifura when the question is specifically what an AI assistant gets from your page. Other names on the GEO shelf — RankSpot, Notra, GEO Stellar — were named in the 27 November 2026 roundup and were not separately verified here.',
  },
  {
    q: 'What should I fix first?',
    a: 'Bifura’s own example report lays out a 30/60/90 plan: in 30 days, add testimonials and review schema, insert an FAQ block with direct answers, and strengthen footer contact information; in 60 days, publish a plan comparison table with exact deliverables, add Service and FAQPage schema, and clean up the heading structure; in 90 days, add competitor comparison messaging, monitoring alerts and a first case study. Before paying, run the five-minute self-check below — it covers the same code checks Bifura runs, and several of them are free to verify by hand.',
  },
];

const faqJson = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const articleJson = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Bifura: See Your Site the Way AI Agents Do',
  description:
    'What Bifura scans, how its Agent readiness score works, what Fix Preview does, and what it costs — plus a five-minute self-check you can run free.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-27',
  dateModified: '2026-11-27',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Bifura · 27 Nov 2026</p>
      <h1>Bifura: See Your Website the Way AI Agents Do</h1>
      <p className="lead">
        AI assistants now read websites on your buyers&rsquo; behalf — and what they read
        is not what you see in a browser. Bifura fetches your page the way AI crawlers
        do, shows what they get and what they get wrong, and lets you test a fix in a
        sandbox before you ship it. It launched on Product Hunt on 24 November 2026 and
        finished #4 on 26 November 2026. The free Agent readiness score takes under a
        minute and needs no sign-up; the full report is $14.
      </p>

      <div className="prose">
        <h2>What Bifura does</h2>
        <p>
          Bifura&rsquo;s pitch is that it is QA for a different user: not a person, a
          machine. A human sees your design; an agent sees the raw HTML, and if your
          content moved behind JavaScript, the agent may get a near-empty page. Bifura
          scans one page at a time and reports three things: what the agent can read,
          what it misunderstands, and what to change so it finds you, gets you right
          and recommends you. The scan covers the raw HTML without JavaScript and the
          rendered page, plus robots.txt, llms.txt, sitemap.xml and structured data.
        </p>
        <p>
          Two features set it apart from a generic SEO audit. First, an{' '}
          <strong>agent simulator</strong> answers questions from the scanned page —
          &ldquo;what does this cost?&rdquo;, &ldquo;who is this for?&rdquo; — so you can see
          whether the answer is actually in the page, quoted, or missing. Second,{' '}
          <strong>Fix Preview</strong> (Pro and Agency plans) applies a recommended
          change to a sandbox copy, rescores it, and shows the Agent readiness score
          and the People check before and after. Your live site is never touched.
          Around those sit monitoring alerts when your score drops, an access-log upload
          that shows which AI crawlers really visited — and which ones are impostors
          using a real bot&rsquo;s name — bulk audits for agencies, and an API so an agent
          or a CI step can score a page before it ships.
        </p>

        <h2>The score, and what it is not</h2>
        <p>
          The Agent readiness score is Bifura&rsquo;s own number on its Score v3 scale:
          a context-ready page is one an AI can load, understand and act on correctly.
          It is judged by a model — grok-4-1-fast-reasoning in the public example
          report — on top of measurements done by code. Bifura scanned its own homepage
          on 17 November 2026 and scored <strong>84</strong>, with a separate People
          check of <strong>73</strong>. The People check is a secondary score for how
          well the page works for people, and Bifura is explicit that it is never
          blended into Agent readiness.
        </p>
        <p>
          Say this plainly, because it is the easiest thing to misread: the score is
          not a Google ranking, not a traffic prediction, and not a promise that
          ChatGPT will recommend you. It measures whether an agent can read and use
          the page. A page can score well and still not rank, and a page that ranks
          can still confuse an agent. Treat the number as a readability gauge for
          machines, not as SEO.
        </p>

        <h2>What a scan actually measures</h2>
        <p>
          The example report for bifura.ai itself is the best tour of the product,
          because Bifura published it warts and all — including where its own site
          falls short. The scan found, by code: robots.txt present and allowing the
          answer crawlers (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User,
          PerplexityBot, Perplexity-User) and the training crawlers (GPTBot, ClaudeBot,
          Google-Extended, CCBot); llms.txt present; sitemap.xml present; structured
          data for Offer, Organization and Product present, but WebSite, Service,
          FAQPage and BreadcrumbList missing; canonical link present; Open Graph tags
          present; one H1; 98% of the text visible without JavaScript; links to privacy,
          terms and a contact email found.
        </p>
        <p>
          The more unusual measurement is the <strong>context budget</strong>: what the
          page costs an AI to read, and how much of it is useful. Bifura&rsquo;s own
          homepage arrived as 11,154 tokens to a crawler (1,677 tokens of text), and
          1,872 tokens of text once rendered — only 13.8% of the tokens an AI crawler
          receives were main content, with 62% going to HTML tags and attributes. The
          scan also tests what survives if an agent stops reading early: at a 20,000
          character budget (about 5,600 tokens) only 25% of the main content was kept,
          while at 50,000 and 100,000 characters the whole page fit. There is no
          standard budget — it varies by tool — but the point stands: key facts buried
          late in a long page may never be read at all.
        </p>
        <p>
          The model-judged findings on Bifura&rsquo;s own page were: add customer
          testimonials (high), add review schema (medium), insert an FAQ block
          (suggestion), and clarify plan deliverables with an exact per-tier table
          (suggestion). Where the model&rsquo;s advice disagreed with the code checks, the
          item is shown as a suggestion to review rather than a fact.
        </p>

        <h2>What it costs</h2>
        <table>
          <thead>
            <tr><th>Item</th><th>Price</th></tr>
          </thead>
          <tbody>
            <tr><td>Agent readiness score (one page)</td><td>Free, no sign-up</td></tr>
            <tr><td>Full report (one site)</td><td>$14, no subscription</td></tr>
            <tr><td>Subscriptions</td><td>From $19/month (Starter, Pro, Agency tiers)</td></tr>
            <tr><td>Fix Preview (sandbox fix + rescore)</td><td>Pro and Agency only</td></tr>
            <tr><td>Monitoring alerts, bulk audits, API</td><td>Paid tiers (check the pricing page for the tier split)</td></tr>
          </tbody>
        </table>
        <p>
          The pricing page is thin on per-tier detail — Bifura&rsquo;s own example report
          recommends it publish an exact deliverables table for Starter, Pro and Agency
          — so verify the tier split on bifura.ai before paying. The $14 report is the
          low-risk way in: one site, no subscription, and the public example report
          shows exactly what a report contains before you buy. On the roadmap, the
          maker says the next step is testing whether an agent can actually{' '}
          <em>do</em> things on a site — find the price, start a sign-up, book a demo,
          reach support — and show exactly what blocks it.
        </p>

        <h2>Bifura vs Dedica</h2>
        <p>
          The GEO shelf is crowded, and the split that matters is what the tool is
          actually looking at. Dedica, which launched 27 October 2026 and topped
          Product Hunt that day, runs 125 checks across discovery, access, usability
          and payments and sells a $30 one-time fix kit with instruction files for
          Claude Code, Codex, Cursor and Copilot — a broad site audit with a fix kit
          attached. Bifura is narrower and agent-specific: raw versus rendered HTML, a
          context budget counted in tokens, an agent simulator that answers questions
          from the page, and a sandbox rescore before you ship. Neither promises a
          ranking, and neither should be read as one.
        </p>
        <p>
          Pick Dedica when you want a wide audit and a fix kit you hand to a coding
          agent. Pick Bifura when the question is specifically what an AI assistant
          gets from your page — and whether the fix is worth shipping before you
          ship it. Other names on the shelf (RankSpot, Notra, GEO Stellar) were named
          in the 27 November 2026 keyword roundup and were not separately verified
          here, so this page makes no claims about them.
        </p>

        <h2>Do the five-minute self-check yourself</h2>
        <p>
          Before paying $14, you can verify most of Bifura&rsquo;s code checks by hand —
          they are the same checks in its public example report:
        </p>
        <ul>
          <li><strong>robots.txt</strong> — does it name the AI crawlers you want in (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot) instead of blocking them with a wildcard?</li>
          <li><strong>llms.txt</strong> — is there one, and does it point at the pages that matter?</li>
          <li><strong>sitemap.xml</strong> — present, and does it list the pages you actually want found?</li>
          <li><strong>Structured data</strong> — Offer, Organization and Product at minimum; add FAQPage and WebSite if they fit.</li>
          <li><strong>One H1, canonical link, Open Graph tags</strong> — all three present on the page.</li>
          <li><strong>Text without JavaScript</strong> — turn JavaScript off (or fetch the raw HTML) and check how much of the page is still there. Bifura&rsquo;s own site manages 98%.</li>
          <li><strong>Key facts up top</strong> — what it is, what it costs, who it is for, how to buy or contact you, all within the first screen of the raw HTML. Bifura&rsquo;s own scan found &ldquo;who it is for&rdquo; missing on its homepage.</li>
        </ul>
        <p>
          If any of those fail, fix them first and rescan — the free score will tell
          you whether the fix moved anything. The model-judged items (testimonials,
          FAQ wording, heading structure) are the part you cannot check by hand, and
          that is what the $14 report is for.
        </p>

        <h2>Who should try it</h2>
        <ul>
          <li><strong>Site owners after a redesign or migration</strong> — the classic regression Bifura is built for is content moving behind JavaScript, so AI crawlers suddenly get a near-empty page. Rescan after a theme or framework change.</li>
          <li><strong>Docs and developer sites</strong> — check that agents and coding assistants can read the docs without running scripts, and that llms.txt and robots.txt let the right bots in.</li>
          <li><strong>Agencies</strong> — audit client sites in bulk, compare a client with competitors, and use the report as a sales and roadmap document.</li>
          <li><strong>Not for:</strong> anyone looking for a ranking guarantee, or anyone who has not yet done the free checks above — the free score plus the checklist will already show most of what the paid report would.</li>
        </ul>

        <h2>Frequently asked questions</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>Sources</h2>
        <ul>
          <li>Bifura example report (bifura.ai/example-report, read 27 November 2026): scanned 17 November 2026, 11:45 AM UTC; Score v3; judging model grok-4-1-fast-reasoning; score 84; People check 73; scope (raw and rendered HTML, robots.txt, llms.txt, sitemap.xml, structured data); context budget (11,154 tokens as received, 1,677 tokens of text, 13.8% signal share); truncation budgets; code checks list; 30/60/90 plan; free score, $14 report, subscriptions from $19; Fix Preview on Pro and Agency.</li>
          <li>Product Hunt, “Bifura: See your website the way AI agents do” (producthunt.com/products/bifura): published 24 November 2026; #4 on the 26 November 2026 daily leaderboard; maker Konrad Pacula; free score under a minute, no sign-up; use cases (release/redesign checks, docs sites, pricing pages, agencies, access-log upload, API); roadmap (testing whether an agent can do things on a site).</li>
          <li>Bifura partner program (bifura.ai/partners, read 27 November 2026): 25% lifetime recurring commission plus $15 per paying customer; Agency plans cover client sites, team seats, white-label reports, bulk scans and a REST API.</li>
          <li>Dedica launch facts are from our own <a href="https://hailuoai.org/dedica">Dedica guide</a> (125 checks, free score, $30 fix kit, Product Hunt #1 on 27 October 2026).</li>
          <li>Unconfirmed and deliberately not asserted here: RankSpot, Notra and GEO Stellar positioning and pricing (named in the 27 November 2026 keyword roundup, not separately verified); exact per-tier deliverables for Bifura Starter, Pro and Agency (Bifura’s own example report says the comparison table is missing).</li>
        </ul>
        <p><em>Data checked: 2026-11-27. Prices are launch prices and move — re-check bifura.ai before paying.</em></p>

        <h2>Related tools</h2>
        <p>
          If you want a broad site audit with a fix kit instead, read the{' '}
          <a href="https://hailuoai.org/dedica">Dedica guide</a> — 125 checks and a
          $30 fix kit with instruction files for your coding agent. If your coding
          agent needs better instruction files first, read the{' '}
          <Link href="/agents-md-guide">AGENTS.md guide</Link>. For another audit-style
          launch that topped Product Hunt, read the{' '}
          <Link href="/modern-web-guidance">Modern Web Guidance 1.0 guide</Link> — a
          free agent skill that audits a codebase for modern web patterns. And if you
          want your coding agent to do outreach too, read the{' '}
          <Link href="/rankhog">Rankhog guide</Link> — Reddit marketing from Claude
          Code, from $99 a month.
        </p>
      </div>
    </div>
  );
}
