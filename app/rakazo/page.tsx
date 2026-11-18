import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rakazo: Self-Hosted Grok Bot Alternative Guide',
  description:
    'Rakazo topped Product Hunt on 15 Nov 2026: an open-source, self-hosted Grok Bot alternative with persistent AI teammates, their own memory, routines and sandboxed computers. Self-hosting is free; hosted plans start at $15/mo — the model is not included.',
  alternates: { canonical: '/rakazo/' },
};

const faqs = [
  {
    q: 'What is Rakazo?',
    a: 'An open-source, self-hosted alternative to Grok Bot: persistent AI teammates with their own memory, routines, apps and a computer. You run it on your own machine, with your own model. It ships as a web app, an Electron desktop app and an Expo mobile app. The repository (elie222/rakazo) was created 13 August 2026, is Apache-2.0 licensed, and is explicitly in beta — v0.11.0 shipped 12 November 2026.',
  },
  {
    q: 'Is Rakazo free?',
    a: 'The software is free and self-hosting costs nothing beyond your own machine. You still pay for the model — an API key, a Claude or ChatGPT subscription you already hold, or a local model through Ollama or LM Studio — plus whatever the computer the bot runs on costs. The hosted version adds a cloud computer and a monthly allowance of computer hours.',
  },
  {
    q: 'Does the $15/mo hosted plan include the model?',
    a: 'No. The Standard plan is $15 a month ($12 a month billed yearly) for hosting: a bot computer is included (25 hours a month, 4 vCPU, 8 GB RAM) with a 7-day free trial, but you bring your own model key or subscription. Pro is $49 a month (100 hours, 8 vCPU, 16 GB RAM) and Max is $99 a month (200 hours, 16 vCPU, 32 GB RAM). Alternatively, Rakazo credits start at $20 a month and cover model usage at the provider\u2019s price with no markup.',
  },
  {
    q: 'How do I self-host Rakazo?',
    a: 'You need Docker Engine, the Compose plugin, curl and OpenSSL — no clone or Node install. Download the installer script and run it; it creates a .env with random secrets and starts Rakazo. Open http://127.0.0.1:5173, create an account, and connect a model. The same installer runs on a VPS for a server setup, with a sandbox provider (Docker, E2B, Daytona, CreateOS, Boat, Boxd, InstaBox, Novita, Railway and others) chosen in .env. The desktop app can also run Rakazo on Apple silicon Macs on macOS 26 or later without Docker.',
  },
  {
    q: 'How is Rakazo different from Grok Bot?',
    a: 'Grok Bot is xAI\u2019s hosted product: you install the app and the service stays in xAI\u2019s cloud, with Team Bots on a $30-per-user-per-month plan, and its FAQ says there is no model selector — the system decides which model handles each task. Rakazo is the same shape you host yourself: open source, your model, your computer, your data on your machine. The trade-off is that you operate it, and it is beta software that ships several releases a week.',
  },
  {
    q: 'Is Rakazo production-ready?',
    a: 'Not by its own description. The README and the project\u2019s own comparison page both call it beta, and the release cadence is fast — v0.3.5 on 25 October, v0.8.0 on 4 November, v0.11.0 on 12 November 2026 — so interfaces, deployment steps and stored data can change. Treat it as a self-hosted experiment you can run seriously, not a frozen platform. One caution from a third-party hands-on: the desktop \u201cThis Mac\u201d sandbox mode runs with your local user permissions and is explicitly unsafe for public or shared servers.',
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
  headline: 'Rakazo: Self-Hosted Grok Bot Alternative Guide',
  description:
    'What Rakazo is, how to self-host it, what the $15/mo hosted plan does and does not include, and how it compares with Grok Bot, OpenMausBot and OpenClaw.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-16',
  dateModified: '2026-11-16',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Open-source AI teammate · 16 Nov 2026</p>
      <h1>Rakazo: The Grok Bot Alternative You Host Yourself</h1>
      <p className="lead">
        On 15 November 2026 Rakazo took #1 Product of the Day on Product Hunt (304 upvotes,
        42 comments) as the open-source, self-hosted alternative to Grok Bot. Each bot is a
        persistent teammate with its own memory, routines and a sandboxed computer — a browser,
        a terminal, files and a full desktop — and it keeps working after you close the chat.
        You bring the model: a Claude or ChatGPT subscription, an API key, or a local model.
        Self-hosting is free; the hosted version starts at $15 a month, and the model is not
        included in that price.
      </p>

      <div className="prose">
        <h2>What it is</h2>
        <p>
          Rakazo is built around one idea: a bot is a continuing identity, not a prompt you
          re-explain every morning. It is made by Elie Steinbock (elie222) and the Inbox Zero
          team, and the repository was created 13 August 2026. When checked on 16 November
          2026 it had 8,659 stars, 1,559 forks and 3,838 commits, under the Apache-2.0 license.
          The current release is v0.11.0, dated 12 November 2026 — and the project is explicit
          that it is still in beta.
        </p>
        <ul>
          <li><strong>Every bot gets a computer.</strong> A browser, terminal, files and a full Linux desktop in a sandbox (Docker or a cloud provider such as E2B, Daytona, CreateOS, Boat, Boxd, InstaBox, Novita or Railway). You can watch it work, take control to sign in, and hand it back.</li>
          <li><strong>Memory and routines.</strong> Bots keep their own conversation history and memory, and routines run them on a schedule, from an email or from a webhook — inbox triage every morning, lead follow-ups, repository watching, expense filing.</li>
          <li><strong>Bots that work together.</strong> Put bots in a group, @mention them, and they split the work, check each other and report back. Bots can delegate to subagents or spawn peer bots.</li>
          <li><strong>Pages.</strong> Bots build live dashboards and documents you can open full screen, share by link and ask about.</li>
          <li><strong>Connected apps.</strong> Gmail, Slack, GitHub, Notion, Linear and thousands more, plus your own MCP servers and OpenAPI tools.</li>
          <li><strong>Any model, your keys.</strong> Connect a Claude or ChatGPT subscription, an API key (including OpenRouter), or a local model through Ollama or LM Studio. Each bot can use a different model.</li>
          <li><strong>On every device.</strong> Web, desktop, iPhone, iPad and Android, all talking to the same server.</li>
        </ul>
        <p>
          The important date correction: 15 November was Product Hunt launch day, not the
          product launch. Rakazo had already been public for about three months, and the
          Product Hunt win landed the same week Grok Bot left beta — Grok Bot 1.0 reached
          version 1.0 on 11 November 2026. The window here is the attention, not a new
          product.
        </p>

        <h2>Self-hosting in five steps</h2>
        <p>
          The published-image installer is the fastest path. From the README:
        </p>
        <pre><code>{`mkdir -p rakazo && cd rakazo &&
curl -fsSLO https://raw.githubusercontent.com/elie222/rakazo/main/infra/compose/install-images.sh &&
bash install-images.sh`}</code></pre>
        <ol>
          <li><strong>Prerequisites:</strong> Docker Engine, the Compose plugin, curl and OpenSSL. No clone or Node install.</li>
          <li><strong>Run the installer.</strong> It downloads the Compose files, creates a <code>.env</code> with random secrets, and starts Rakazo. It preserves an existing <code>.env</code> when rerun.</li>
          <li><strong>Open <code>http://127.0.0.1:5173</code></strong>, create an account, and connect a model.</li>
          <li><strong>Pick a sandbox.</strong> Local Docker computers are on by default. Optional remote providers — <code>e2b</code>, <code>novita</code>, <code>daytona</code>, <code>createos</code>, <code>boat</code>, <code>boxd</code>, <code>instabox</code> or <code>railway</code> — take a matching API key.</li>
          <li><strong>Keep it running.</strong> Bots stay on when the backend runs on a server: run the same installer on a VPS, put HTTPS in front of port 5173, and connect from the desktop app, the mobile app or a browser. The desktop app can also run Rakazo on Apple silicon Macs on macOS 26 or later without Docker.</li>
        </ol>
        <p>
          From source, the stack is TypeScript throughout (React 19 and Vite on the front end,
          Electron and Expo for the native clients, Hono and oRPC for the API, PostgreSQL with
          Prisma for state) and needs Node.js 24.15.0 or newer in the 24.x line, or Node.js
          26+, plus pnpm 12 and Docker. Connector credentials are encrypted on the server and
          are never returned by the API, according to the README — but traces and memory can
          still hold anything a bot was told, so do not paste secrets into a bot you do not
          fully control.
        </p>

        <h2>Pricing: the model is always extra</h2>
        <p>
          The pricing page is blunt — in the project&rsquo;s own words, &ldquo;Rakazo does not
          pay the model bill.&rdquo; Every plan assumes you bring the intelligence; the money
          buys hosting and computer hours.
        </p>
        <table>
          <thead>
            <tr><th>Plan</th><th>Price</th><th>What it includes</th></tr>
          </thead>
          <tbody>
            <tr><td>Self-hosted</td><td>Free</td><td>Open source, Apache-2.0. Your server or computer, your sandbox, any model you connect.</td></tr>
            <tr><td>Standard</td><td>$15/mo ($12/mo billed yearly)</td><td>Hosted by Rakazo. Claude, ChatGPT or any API key. Bot computer included: 25 hours a month, 4 vCPU, 8 GB RAM. 7-day free trial (includes 10 bot computer hours).</td></tr>
            <tr><td>Pro</td><td>$49/mo</td><td>100 bot computer hours a month, 8 vCPU, 16 GB RAM. 7-day free trial.</td></tr>
            <tr><td>Max</td><td>$99/mo</td><td>200 bot computer hours a month, 16 vCPU, 32 GB RAM. 7-day free trial.</td></tr>
            <tr><td>Rakazo credits</td><td>From $20/mo</td><td>Model usage with no markup, plus computer hours (from 20 hours a month). Hours count only while your bot uses its computer; it pauses when idle.</td></tr>
          </tbody>
        </table>
        <p>
          Read the table as two bills. The hosted plans cover the computer; the model is a
          separate bill to your model provider — unless you buy credits, which Rakazo charges
          at the provider&rsquo;s price with no markup. With a local model there is no model
          bill at all, and self-hosting is genuinely free apart from your own machine.
        </p>

        <h2>Rakazo vs Grok Bot vs the other open alternatives</h2>
        <p>
          The same shape — a named bot with a computer, memory and routines — now comes in
          four flavours. The differences that matter are who hosts it, who picks the model,
          and what you pay for.
        </p>
        <table>
          <thead>
            <tr><th></th><th>Rakazo</th><th>Grok Bot</th><th>OpenMausBot</th><th>OpenClaw</th></tr>
          </thead>
          <tbody>
            <tr><td>Built by</td><td>Elie Steinbock / Inbox Zero team, open source</td><td>xAI (SpaceX Super Intelligence), hosted</td><td>milind-soni, open source</td><td>OpenClaw Foundation, MIT</td></tr>
            <tr><td>You host it</td><td>Yes — Docker or a cloud sandbox provider</td><td>No — cloud computer, optional local commands</td><td>Yes</td><td>Yes — you run the Gateway</td></tr>
            <tr><td>Model</td><td>Your choice: subscription, API key, or local model</td><td>No selector — the system decides; included in the plan</td><td>Your signed-in Claude, Codex or Grok CLIs</td><td>Your key, including a server you host</td></tr>
            <tr><td>Named bots + routines</td><td>Yes</td><td>Yes — Team Bots, Routines, approvals</td><td>Yes — named Bots, channels, approval cards</td><td>Agents configured through the Gateway</td></tr>
            <tr><td>Computer use</td><td>Sandboxed Linux desktop: browser, terminal, files</td><td>Cloud computer; joins Slack, Teams and video calls</td><td>Computer operation via your CLIs</td><td>Runs on your machine</td></tr>
            <tr><td>Price</td><td>Free self-hosted; hosted from $15/mo, model extra</td><td>Team plan $30 per user per month</td><td>Free software; model via your existing CLI plans</td><td>No software fee; you pay models and the machine</td></tr>
            <tr><td>Status</td><td>Beta; v0.11.0 (12 Nov 2026)</td><td>1.0, out of beta 11 Nov 2026</td><td>Open source (check the repo)</td><td>Open source (check the repo)</td></tr>
          </tbody>
        </table>
        <p>
          The honest summary: if you want a Grok Bot-shaped teammate and you want to own the
          infrastructure, Rakazo is the closest open-source match — it is the only one of the
          four that is both open source and built around a plain interface for managing a
          roster of bots. If you want no setup at all, Grok Bot is the hosted answer, and you
          pay for that with $30 a seat and no model choice. OpenMausBot is the pick if your
          workflow already lives inside the Claude, Codex or Grok CLIs; OpenClaw is the pick
          if you want a gateway you configure yourself.
        </p>

        <h2>What this page does not claim</h2>
        <ul>
          <li>15 November 2026 was Product Hunt launch day, not the product launch. The repository was created 13 August 2026; the product is about three months old.</li>
          <li>Grok Bot 1.0&rsquo;s date has a wrinkle: xAI&rsquo;s launch post is dated 2 November on its page, the changelog&rsquo;s first 1.0 entry (1.0.1) is dated 11 November, and the X announcement went out 11 November at 18:30 UTC. This page uses 11 November as the date the app reached 1.0.</li>
          <li>Star counts move daily (8,659 for rakazo, checked 16 November 2026). Do not quote them as current after that date.</li>
          <li>The 8 November review on aiassistantlist.com discloses on the page itself: &ldquo;Rakazo is made by the company that runs this site.&rdquo; Its verdict — that Rakazo is the best choice in its catalog for people who want always-on bots they control — is vendor-adjacent, not independent, and is treated here as a source for the pricing and release-cadence facts it states, not as an endorsement.</li>
          <li>The &ldquo;This Mac&rdquo; desktop sandbox caution and the note that Claude Pro login is not yet in the Rakazo UI come from a third-party hands-on write-up, not from the README.</li>
          <li>Nothing here is a hands-on test. Install steps, features and prices come from the README and the official pricing page, both read 16 November 2026; hosted-plan details can change, so check rakazo.com/pricing before paying.</li>
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
          <li>GitHub, elie222/rakazo README (read 16 November 2026): open-source Grok Bot alternative, persistent teammates with memory, routines and a computer; quick-start installer, server setup, desktop and mobile clients, sandbox providers, Node/pnpm requirements, credential encryption. Repo: 8,659 stars, 1,559 forks, 3,838 commits, created 13 August 2026, Apache-2.0. See <a href="https://github.com/elie222/rakazo" target="_blank" rel="noreferrer">github.com/elie222/rakazo</a>.</li>
          <li>Rakazo pricing page (read 16 November 2026): self-hosted free; Standard $15/mo ($12/mo billed yearly), Pro $49/mo, Max $99/mo, credits from $20/mo; bot computer hours per tier; 7-day free trial; model usage at provider price with no markup on credits. See <a href="https://rakazo.com/pricing" target="_blank" rel="noreferrer">rakazo.com/pricing</a>.</li>
          <li>Rakazo, &ldquo;Best Personal AI Agents in 2026&rdquo; (updated 24 October 2026): &ldquo;Rakazo does not pay the model bill&rdquo;; comparison with Grok Bot, Muse, Dots, Instinct, OpenClaw and Hermes Agent; &ldquo;Rakazo is an open source AI agent for persistent teammates. It is in beta.&rdquo; See <a href="https://rakazo.com/alternatives/" target="_blank" rel="noreferrer">rakazo.com/alternatives</a>.</li>
          <li>Product Hunt via hunted.space, Rakazo dashboard (15 November 2026): #1 Product of the Day, 304 upvotes, 42 comments, launched 15 November 2026, hunted by Elie Steinbock. See <a href="https://hunted.space/dashboard/rakazo" target="_blank" rel="noreferrer">hunted.space</a>.</li>
          <li>AI Assistant List, &ldquo;Rakazo review: open-source bots that keep working, with your own model&rdquo; (updated 8 November 2026): disclosure that Rakazo is made by the company that runs the site; hosted plans do not include a model; release cadence v0.3.5 (25 Oct) to v0.8.0 (4 Nov); Pro and Max tiers added in v0.7.0. See <a href="https://aiassistantlist.com/tools/rakazo/" target="_blank" rel="noreferrer">aiassistantlist.com</a>.</li>
          <li>GrokBotWiki, &ldquo;What&rsquo;s new in Grok Bot 1.0&rdquo;: changelog 1.0.1 dated 11 November 2026 also covers 1.0.0; xAI launch post dated 2 November on its page; Grok Bot out of beta 11 November 2026. See <a href="https://www.grokbotwiki.com/guides/grok-bot-whats-new" target="_blank" rel="noreferrer">grokbotwiki.com</a>.</li>
          <li>Tenten Skills Atlas, &ldquo;Grok Bot alternatives and ecosystem&rdquo; (verified 4 November 2026): OpenMausBot uses signed-in Claude, Codex or Grok CLIs with named Bots, channels, computer operation and approval cards; Rakazo ranked 02 in the survey. See <a href="https://skills.tenten.co/en/docs/skills-atlas-grok-bot-open-source-ecosystem" target="_blank" rel="noreferrer">skills.tenten.co</a>.</li>
          <li>FollowAgents, &ldquo;Rakazo AI Teammates Review &amp; Setup Guide&rdquo;: latest release v0.11.0 (12 November 2026), beta, self-hosted service, free software with model costs paid separately. See <a href="https://followagents.com/en/agents/rakazo" target="_blank" rel="noreferrer">followagents.com</a>.</li>
          <li>Heatdrop, elie222/rakazo (updated 15 November 2026): &ldquo;This Mac&rdquo; desktop sandbox mode runs with local user permissions and is explicitly unsafe for public or shared servers; Claude Pro login not yet available in the Rakazo UI. See <a href="https://heatdrop.ai/repo/elie222/rakazo" target="_blank" rel="noreferrer">heatdrop.ai</a>.</li>
          <li>Unconfirmed and deliberately not asserted here: any independent hands-on test of Rakazo&rsquo;s routines, memory or sandbox behaviour; whether the 214 contributors counted on 15 November 2026 are still current; hosted-plan computer-hour accounting beyond what the pricing page states.</li>
        </ul>
        <p><em>Data checked: 2026-11-16. This is a launch-week page: re-check the README, the releases page and rakazo.com/pricing before relying on it — a beta shipping several releases a week moves fast.</em></p>

        <h2>Related tools</h2>
        <p>
          Looking for a personal agent that runs on your own machine? Read the{' '}
          <Link href="/nod-by-n8n">Nod by n8n setup guide</Link> — a private VM, 200+
          connections, and the costs you still pay. And for keeping memory consistent across
          the agents that will use a tool like this, read the{' '}
          <Link href="/beacon-agent-memory">Beacon agent memory guide</Link>.
        </p>
      </div>
    </div>
  );
}
