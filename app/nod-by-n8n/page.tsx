import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nod by n8n: Personal Agent Setup Guide',
  description:
    'Nod by n8n is a free, open-source personal agent that runs on your own computer, works in your apps and on real websites, and asks before it acts.',
  alternates: { canonical: '/nod-by-n8n/' },
};

const faqs = [
  {
    q: 'Is Nod the same as n8n?',
    a: 'No. n8n is the workflow automation platform where you build automations with nodes, usually shared by a team. Nod is a standalone desktop app from n8n Labs, a new team inside n8n that experiments outside the core product. It is built for one person, needs no n8n account, and you chat with it instead of building workflows. You can optionally connect an n8n instance so Nod can work with your workflows, but that is not required.',
  },
  {
    q: 'Is Nod really free?',
    a: 'The app itself is free and open source under Apache 2.0 — there is no software price. What you pay for is the AI: you bring your own model provider (OpenAI, Anthropic, OpenRouter, 30+ providers in total), your ChatGPT Plus or Pro plan, or a local model through Ollama, LM Studio, vLLM or llama.cpp. Every task burns your provider credits, so "free" means no Nod bill, not no bill at all.',
  },
  {
    q: 'What does the 98% completion figure actually mean?',
    a: 'It is n8n\u2019s own test, not an independent result: 226 distinct errands attempted three times each (678 runs) in October 2026, scored at 98% completion with GPT-6.1 Sol, in simulated accounts and websites. The same snapshot reports zero actions taken without permission across those 678 runs. Your results depend on the model you choose and the sites you use — treat the figure as the vendor\u2019s benchmark, not a guarantee.',
  },
  {
    q: 'What does Nod cost to run day to day?',
    a: 'Model fees are whatever your provider charges, and early testers found some tasks cost more than expected. Nod has four guardrails: every task ends with a receipt showing what it cost, you can set a monthly spending limit, Nod checks in with you once a task passes $5 (you can change that amount), and each schedule shows its estimated monthly cost. Use the cost calculator on this site to sanity-check a provider\u2019s rates before you hand Nod a big job.',
  },
  {
    q: 'How is Nod different from Grok Bot?',
    a: 'Both are personal agents with their own computer and browser, but they sit on opposite sides of the local-versus-cloud line. Nod runs on your own machine, is open source, lets you choose the model, and costs nothing beyond model fees — but it stops when your laptop sleeps. Grok Bot (xAI, public beta August 2026) runs on a Cursor-hosted cloud computer, keeps working with your laptop closed, and picks the model for you; since 12 October 2026 it comes with the X Premium subscription ($30/month) and up, with a weekly usage allowance. Pick Nod if you want local control and no second subscription; pick Grok Bot if you want always-on cloud execution and already pay for X Premium.',
  },
  {
    q: 'What are the limits of the research preview?',
    a: 'Nod launched 10 November 2026 as a research preview (v0.6 at launch, per launch-week write-ups), and n8n warns to expect rough edges and frequent updates. The hard limits today: it stops when the laptop running it sleeps, each installation has one owner, it cannot make phone calls, and Windows 11 support is a preview. A hosted always-on version, phone calls and team use are on the roadmap, not in the app yet.',
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
  headline: 'Nod by n8n: Personal Agent Setup Guide',
  description:
    'What n8n Labs\u2019 Nod is — a free, open-source personal agent that runs on your own computer — how to set it up, what it costs, how it compares with Grok Bot, and where the vendor\u2019s own numbers come from.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-12',
  dateModified: '2026-11-12',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Personal agent guide · 12 Nov 2026</p>
      <h1>Nod by n8n: A Personal Agent That Lives on Your Computer</h1>
      <p className="lead">
        On 10 November 2026, n8n Labs released Nod as a research preview: a free,
        open-source personal agent that runs on your own Mac or Windows PC, works inside
        your apps and on real websites, and asks before it acts. It is not n8n — it is a
        standalone desktop app for one person, built by a new team inside n8n that
        experiments outside the core workflow product.
      </p>

      <div className="prose">
        <h2>Nod is not n8n — the one distinction to get right</h2>
        <p>
          n8n is the workflow automation platform: you build automations with nodes, usually
          for a team, on a shared instance. Nod is the opposite shape. It is a single-player
          app for one person&rsquo;s jobs — business or household — and you do not need an
          n8n account to use it. You talk to it in one conversation, in the app or on
          Telegram or WhatsApp, and it runs several jobs in parallel in the background.
          There is no server or cloud service to set up first. If you already use n8n, you
          can connect your instance so Nod can work with your workflows, but that is an
          optional bridge, not the product.
        </p>
        <p>
          The launch blog puts it plainly: your chat assistant is where you think and write,
          n8n runs your shared processes, and Nod takes the ongoing jobs that are yours
          alone. If you go in expecting a visual workflow builder, you have the wrong app.
        </p>

        <h2>What it actually does</h2>
        <p>
          Because Nod has its own computer — a private virtual machine on your machine —
          with its own browser, it can finish jobs a chat tool would hand back to you as a
          to-do list. It works in the apps you connect and on websites that have no
          integration at all:
        </p>
        <ul>
          <li><strong>Errands:</strong> cancel a subscription, turn down the retention offers and ask for a refund; watch a price and tell you when it drops; find a hotel that fits your trip and book it once you say go.</li>
          <li><strong>Paperwork:</strong> sign in to supplier portals each month, download the invoices and file them for your accountant; pull last week&rsquo;s numbers from a dashboard with no export and put them in your weekly report.</li>
          <li><strong>Proactive work:</strong> it reads your connected apps and offers jobs it could take off your plate — a morning brief, a price check — and jobs that repeat can run on a schedule.</li>
          <li><strong>Memory:</strong> it remembers months of conversation, learns how you write from your sent mail so drafts sound like you, and writes down how it got a task done so it can reuse the steps next time. You can see, edit or delete anything it keeps about you.</li>
        </ul>
        <p>
          App connections run through n8n and Composio by default, with an app catalog of
          200+ apps — Gmail, Calendar, Drive, Slack, Notion, Linear and more (one hands-on
          reviewer counted 227 in their install). Notion, Linear and n8n itself connect
          through their own MCP servers. X is not in the catalog.
        </p>

        <h2>Setup: about ten minutes, five stages</h2>
        <ol>
          <li><strong>Install the app.</strong> Download from nod.n8n.io. macOS 14 or later (Apple silicon or Intel); Windows 11 is a preview; Linux x64 is available as a Flatpak preview; or host it on your own server for one person. The code is on GitHub under Apache 2.0.</li>
          <li><strong>Connect an AI provider.</strong> Any of 30+ providers — OpenAI, Anthropic, Google, OpenRouter — or your ChatGPT Plus or Pro plan. Local models work through Ollama, LM Studio, vLLM or llama.cpp, but a local model needs tool calling and a 64,000-token context, and small models are less reliable at the safety check.</li>
          <li><strong>Connect your apps.</strong> Gmail, Slack, Notion, Drive, Calendar and the rest connect with one sign-in each through the Composio-powered catalog.</li>
          <li><strong>Save website logins.</strong> Logins and cards are encrypted on your machine and entered through private forms the model cannot read. Nod never sees your passwords.</li>
          <li><strong>Hand it one job.</strong> Start with something low-stakes — a price watch, a refund — and watch the receipt it produces before you trust it with anything that moves money.</li>
        </ol>
        <p>
          One honest warning from launch day: a first-time setup with the wrong model can be
          slow. One reviewer&rsquo;s first question on the free Gemini tier took 14 minutes
          to answer, and a Claude Premium plan would not connect because Nod wanted an API
          key and credits instead. Pick your provider before you pick your first job.
        </p>

        <h2>What it costs — and the four guardrails</h2>
        <p>
          Nod itself is free. You pay your model provider for the AI you use, and some early
          testers found tasks cost more than they expected, so cost has been a focus of
          n8n&rsquo;s recent releases. Four guardrails keep spending from running away:
        </p>
        <ul>
          <li><strong>Receipt per task.</strong> Every task shows what it cost, and a finished task ends with a receipt.</li>
          <li><strong>Monthly spending limit.</strong> You set a cap; Nod stops at it.</li>
          <li><strong>$5 check-in.</strong> Nod checks in with you once a task passes $5 — and you can change that amount.</li>
          <li><strong>Schedule estimates.</strong> Each schedule shows its estimated monthly cost before it runs.</li>
        </ul>
        <p>
          Before handing Nod a big job, estimate the model bill with the{' '}
          <Link href="/ai-token-cost-calculator">AI token cost calculator</Link> on this
          site. The receipt is the number that matters, not the headline benchmark.
        </p>

        <h2>Nod vs Grok Bot: local and free, or cloud and always-on</h2>
        <p>
          Grok Bot is the closest comparable product: xAI&rsquo;s personal agent app,
          in public beta since August 2026, built and hosted by Cursor. You create named
          bots with jobs; all of them share one cloud computer with a browser, files and a
          terminal. The comparison comes down to where the agent lives and who picks the
          model:
        </p>
        <table>
          <thead>
            <tr><th></th><th>Nod by n8n</th><th>Grok Bot (xAI)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Where it runs</strong></td><td>Your own Mac / Windows PC / server, in a private VM</td><td>Cursor-hosted cloud computer; keeps working with your laptop closed</td></tr>
            <tr><td><strong>Price</strong></td><td>Free app; you pay your model provider</td><td>Included with X Premium ($30/month) and up since 12 Oct 2026, with a weekly usage allowance</td></tr>
            <tr><td><strong>Model choice</strong></td><td>You choose: 30+ providers, ChatGPT Plus/Pro, or a local model</td><td>The app picks the model for you (Grok 4.6); no model picker</td></tr>
            <tr><td><strong>Source</strong></td><td>Open source, Apache 2.0</td><td>Closed source</td></tr>
            <tr><td><strong>Devices</strong></td><td>macOS 14+, Windows 11 preview, Linux Flatpak preview</td><td>macOS, Windows, Linux, iPhone, iPad, Android</td></tr>
            <tr><td><strong>Biggest catch</strong></td><td>Stops when your laptop sleeps; research preview</td><td>Subscription gate plus a weekly allowance that tightened in November 2026</td></tr>
          </tbody>
        </table>
        <p>
          A third option in the same shape is Turnstone, a free Mac app that runs on the AI
          subscriptions you already pay for — worth a look if you are Mac-only and want
          Nod&rsquo;s local, bring-your-own-model shape with a team of agents instead of
          one. The honest summary: Nod wins on control and cost, Grok Bot wins on
          always-on cloud execution and device coverage.
        </p>

        <h2>What the numbers actually show</h2>
        <p>
          There is no independent reproduction of Nod&rsquo;s headline figures yet. Here is
          what each number is, and where it comes from:
        </p>
        <ul>
          <li>
            <strong>98% completion, 678 runs, zero actions without permission.</strong>{' '}
            n8n&rsquo;s own test: 226 distinct errands attempted three times each, scored
            at 98% completion on 17 October 2026 with GPT-6.1 Sol, in simulated accounts
            and websites. Errand types were drawn from 900,000+ anonymised production
            workflows. The launch blog itself does not use the 98% figure — it lives on
            the product page and the benchmark methodology page. Treat it as the
            vendor&rsquo;s benchmark, not a guarantee: your results depend on your model
            and the sites you use.
          </li>
          <li>
            <strong>LongMemEval 93.2%.</strong> The launch blog reports this directly: on
            LongMemEval, a public benchmark for long-term memory, Nod scored 93.2%,
            &ldquo;among the best published memory systems.&rdquo; That is n8n&rsquo;s
            reading of a public benchmark, not an independent test of the shipping app.
          </li>
          <li>
            <strong>Product Hunt #2 of the day, 4.82/5.</strong> Nod launched on Product
            Hunt on 11 November 2026 and finished #2 Product of the Day with 292 upvotes
            and 37 comments; 78 reviews average 4.82/5. Some launch-day write-ups called
            it #1 — the recorded result is #2.
          </li>
        </ul>

        <h2>Before you install: four things to know</h2>
        <ul>
          <li>
            <strong>Your connections route through n8n and Composio by default.</strong>{' '}
            Nod stores your database, files, memory and saved logins on the machine that
            runs it, but app connections use n8n&rsquo;s hosted connection service and
            Composio, which stores app credentials such as OAuth tokens, encrypted, on
            its own cloud. Composio offers self-hosted and private-VPC options if the
            default does not suit you. Basic usage telemetry is also on by default for new
            installs and can be turned off in Settings.
          </li>
          <li>
            <strong>The permission check is itself a model and can make mistakes.</strong>{' '}
            n8n says so on the launch blog. Nod asks before it sends, pays, posts or
            deletes anything you did not ask for — but the check is a model&rsquo;s
            judgement, not a hard rule. Start with low-stakes accounts and jobs.
          </li>
          <li>
            <strong>It stops when your laptop sleeps.</strong> Schedules only keep running
            if the machine stays on and awake. Some testers keep it on an always-on Mac
            mini or run it on their own server; a managed hosted version is on the
            roadmap, not in the app yet.
          </li>
          <li>
            <strong>It is a research preview, v0.6 at launch.</strong> Expect rough edges
            and frequent updates — the forum announcement says so outright. Do not write a
            fixed feature list into your plans; check the docs and the GitHub repository
            for the current state before you install.
          </li>
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
          <li>n8n Blog, &ldquo;Meet Nod: a standalone personal agent from n8n Labs that runs on your computer&rdquo; (10 November 2026): research preview from n8n Labs, standalone app separate from n8n, no n8n account required, private VM + own browser, Gmail/Calendar/Drive/Slack, asks before it acts, Apache 2.0, free with bring-your-own model, receipt per task, monthly limit, $5 check-in, schedule cost estimates, LongMemEval 93.2%, stops when the laptop sleeps, one owner, no phone calls, hosted version on the roadmap. See <a href="https://blog.n8n.io/meet-nod/" target="_blank" rel="noreferrer">blog.n8n.io/meet-nod</a>.</li>
          <li>Nod product page, nod.n8n.io: 678 test runs with zero actions without permission (October 2026, GPT-6.1 Sol, errand types from 900,000+ anonymised production workflows), 30+ model providers, local models via Ollama/LM Studio/vLLM/llama.cpp (tool calling + 64K context required), macOS 14+ / Windows 11 preview / Linux x64 Flatpak preview, app connections use n8n and Composio by default, usage data can be turned off in Settings. See <a href="https://nod.n8n.io/" target="_blank" rel="noreferrer">nod.n8n.io</a> and <a href="https://nod.n8n.io/docs/" target="_blank" rel="noreferrer">nod.n8n.io/docs</a>.</li>
          <li>Product Hunt launch dashboard (hunted.space, tracking Product Hunt&rsquo;s official ranking): launched 11 November 2026, #2 Product of the Day, 292 upvotes, 37 comments, 78 reviews averaging 4.82/5. See <a href="https://hunted.space/dashboard/n8n-io" target="_blank" rel="noreferrer">hunted.space/dashboard/n8n-io</a>.</li>
          <li>98% methodology: 226 errands × 3 runs = 678, scored 17 October 2026 with GPT-6.1 Sol in simulated accounts and websites, per the benchmark methodology page as reported by launch-week hands-on reviews (aireiter.com, dishantsharma.dev, blog.promise.legal).</li>
          <li>Grok Bot: xAI agent app, public beta 11 August 2026, built and hosted by Cursor, named bots sharing one cloud computer, included with X Premium ($30/month) and up since 12 October 2026, no model picker, runs Grok 4.6 — per Turnstone&rsquo;s Grok Bot comparison (myturnstone.ai/comparisons/grok-bot) and the Muse vs Grokbot vs ChatGPT Dots comparison (aiextracash.com).</li>
          <li>App catalog: 200+ apps via Composio; one hands-on reviewer counted 227 apps in their install and confirmed X is not in the catalog (frontendworld.substack.com, Grok Bot vs n8n Nod).</li>
          <li>Unconfirmed and deliberately not asserted here: any independent reproduction of the 98% / LongMemEval figures; the exact current version after v0.6; whether the hosted version or phone calls have shipped since launch.</li>
        </ul>
        <p><em>Data checked: 2026-11-12. Nod is a research preview under active development: re-check the docs and the GitHub repository before installing.</em></p>

        <h2>Related tools</h2>
        <p>
          Before handing Nod a big job, estimate the model bill with the{' '}
          <Link href="/ai-token-cost-calculator">AI token cost calculator</Link>. For
          keeping memory consistent across the agents you run, read the{' '}
          <Link href="/beacon-agent-memory">Beacon agent memory guide</Link>, and for the
          setup around it, the{' '}
          <Link href="/ai-coding-agent-setup">AI coding agent setup checklist</Link>.
        </p>
      </div>
    </div>
  );
}
