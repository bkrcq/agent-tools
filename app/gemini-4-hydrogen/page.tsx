import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gemini 4 Hydrogen Guide: Pricing, Orchestrator',
  description:
    'Gemini 4 Hydrogen: Google\u2019s fast execution model for coding agents — 1M context, $1.50/$7.50 per million tokens, Antigravity Orchestrator with Carbon.',
  alternates: { canonical: '/gemini-4-hydrogen/' },
};

const faqs = [
  {
    q: 'What is Gemini 4 Hydrogen?',
    a: 'The fast execution model in Google\u2019s Gemini 4 family, launched 12 November 2026. It is built for everyday coding and agentic workflows \u2014 writing code, running tests, and verifying changes \u2014 rather than the deep, long-horizon reasoning that Carbon and Argon handle. It has a 1 million-token context window and costs $1.50 per million input tokens and $7.50 per million output tokens, flat across the whole window.',
  },
  {
    q: 'How is Hydrogen different from Carbon and Argon?',
    a: 'Google splits the family by role, not just by size. Carbon is the strongest model, for long-horizon reasoning and security work; Argon sits between the two for long tasks. Hydrogen is the execution layer: it scores 51 on the Artificial Analysis Intelligence Index at its default high thinking level (54 at xhigh), ahead of Argon\u2019s 50 and below Carbon\u2019s 60, and is designed to be paired with Carbon in multi-model workflows rather than to replace it.',
  },
  {
    q: 'How much does Gemini 4 Hydrogen cost?',
    a: '$1.50 per million input tokens and $7.50 per million output tokens, flat across the 1 million-token context window, with no long-context surcharge. Implicit prompt caching drops cached input to $0.075 per million tokens, and batch pricing is $0.75/$3.75. It is available on the Gemini API free tier (rate-limited), unlike Carbon, which is paid-only. Prices are per Google\u2019s Gemini API pricing page; see the pricing section for the scheduled changes to the older models.',
  },
  {
    q: 'What is Orchestrator in Google Antigravity?',
    a: 'A model option in Antigravity that pairs Hydrogen with Carbon (or Argon) inside one session and switches between them dynamically as the task evolves \u2014 Carbon plans, Hydrogen executes and verifies, and control passes back to Carbon when Hydrogen gets stuck. Google reports near-Carbon task success while using 24% less quota and finishing 19% faster. Orchestrator (Carbon) is for Google AI Ultra subscribers; Orchestrator (Argon) is for Ultra and paid Pro subscribers. Note the benchmark version: Google\u2019s main announcement cites Terminal-Bench 4.0, while Antigravity\u2019s own post cites Terminal-Bench 4.1 for the same figures.',
  },
  {
    q: 'Where can I use Gemini 4 Hydrogen?',
    a: 'Through the Gemini API in Google AI Studio and Android Studio (all tiers, including the free tier), in the Gemini app model dropdown, in Google Search for all users, in Gemini for business, in Gemini in Google Sheets for Pro and Ultra subscribers, and in Google Antigravity for paid Google AI Pro and Ultra subscribers. The API model ID is gemini-4-hydrogen.',
  },
  {
    q: 'What are the four thinking levels?',
    a: 'Low, medium, high (the default), and a new xhigh tier. They trade reasoning depth against latency and cost in a smooth progression, so routine edits can run cheap and fast while harder tasks get more thinking. The Artificial Analysis Intelligence Index score rises from 51 at the default high level to 54 at xhigh.',
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
  headline: 'Gemini 4 Hydrogen Guide: Pricing, Orchestrator',
  description:
    'A guide to Google\u2019s Gemini 4 Hydrogen: the fast execution model for coding agents, $1.50/$7.50 per million tokens, four thinking levels, Google\u2019s own benchmark numbers, and Antigravity\u2019s Orchestrator pairing with Carbon.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-12',
  dateModified: '2026-11-13',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Gemini 4 family · 12 Nov 2026</p>
      <h1>Gemini 4 Hydrogen: Google&rsquo;s Fast Execution Model for Agentic Workflows</h1>
      <p className="lead">
        Google launched Gemini 4 Hydrogen on 12 November 2026, the third Gemini 4
        release in about six weeks after Argon (30 September) and Carbon (28–29
        October). It is the execution layer of the family: a fast model for everyday
        coding and agentic work, with a 1 million-token context window and flat
        pricing of $1.50 per million input tokens and $7.50 per million output
        tokens. In Antigravity it ships alongside Orchestrator, a mode that pairs
        it with Carbon inside a single session.
      </p>

      <div className="prose">
        <h2>What it is — and what it is not</h2>
        <p>
          Hydrogen is built for rapid execution: repository coding and debugging,
          interactive web development, and multimodal workflows, including the
          agent loops where a model writes code, runs tests, and verifies the
          result. Google&rsquo;s framing is explicit — Carbon and Argon handle deep,
          long-horizon reasoning on the hardest problems, while Hydrogen does the
          everyday work fast. That makes it a complement to the frontier models,
          not a replacement: the intended pattern is Hydrogen on its own for
          routine work, or Hydrogen as the execution engine next to Carbon or
          Argon in multi-model workflows.
        </p>
        <p>
          Do not read it as &ldquo;the strongest Gemini 4.&rdquo; On the Artificial
          Analysis Intelligence Index it scores 51 at its default high thinking
          level and 54 at its highest xhigh setting — ahead of Argon&rsquo;s 50,
          below Carbon&rsquo;s 60. Its selling point is speed and efficiency at a
          useful intelligence level, not topping the reasoning charts.
        </p>

        <h2>Pricing: flat across the 1M window</h2>
        <table>
          <thead>
            <tr><th>Item</th><th>Price</th></tr>
          </thead>
          <tbody>
            <tr><td>Input tokens</td><td>$1.50 per million</td></tr>
            <tr><td>Output tokens (thinking included)</td><td>$7.50 per million</td></tr>
            <tr><td>Cached input (implicit caching)</td><td>$0.075 per million</td></tr>
            <tr><td>Batch API</td><td>$0.75 input / $3.75 output per million</td></tr>
          </tbody>
        </table>
        <p>
          The price is flat across the entire 1 million-token context window, with
          no long-context surcharge. Hydrogen is available on the Gemini API free
          tier (rate-limited), unlike Carbon, which is paid-only. The model ID is{' '}
          <code>gemini-4-hydrogen</code>, and it works through the GenerateContent
          and Interactions APIs.
        </p>
        <p>
          Two dated pricing notes, both from Google&rsquo;s pricing page: Gemini 3.8
          Flash — the model Hydrogen replaces — stays at $0.75/$3.75 per million
          tokens through 31 December 2026, then rises to $1.50/$7.50 on 1 January
          2027, the same rate as Hydrogen. Carbon and Argon, currently $2/$10,
          are scheduled to rise to $4/$20 on 1 December 2026. The comparison only
          holds at today&rsquo;s prices; re-check the pricing page before budgeting
          past those dates.
        </p>

        <h2>The four thinking levels</h2>
        <p>
          Hydrogen offers four thinking levels — low, medium, high (the default),
          and a new xhigh tier — so you pay and wait only for the reasoning depth
          a task needs. Google describes the progression as smooth and
          predictable: routine edits run at low or medium, harder debugging at
          high, and the toughest everyday work at xhigh, where the Artificial
          Analysis Intelligence Index score reaches 54 against 51 at the default.
          Across levels, Google says Hydrogen matches or beats competing models
          in its class while often finishing faster and using fewer output tokens.
        </p>

        <h2>Benchmarks: Google&rsquo;s own numbers</h2>
        <p>
          Every figure in this section is Google&rsquo;s own, from the launch
          announcement and the model card. <strong>None of it has been
          independently replicated.</strong> Treat the table as Google&rsquo;s
          self-reported scorecard, not as measured fact.
        </p>
        <table>
          <thead>
            <tr><th>Benchmark</th><th>Hydrogen</th><th>Comparison</th></tr>
          </thead>
          <tbody>
            <tr><td>Artificial Analysis Intelligence Index</td><td><strong>51</strong> (high), <strong>54</strong> (xhigh)</td><td>Argon 50; Carbon 60</td></tr>
            <tr><td>Terminal-Bench 4.1</td><td><strong>57%</strong></td><td>Gemini 3.8 Flash 18.2%</td></tr>
            <tr><td>Task speed vs 3.8 Flash</td><td><strong>2.5x faster</strong> (high default)</td><td>Partner tests: 2–2.8x faster, 12–23% fewer tokens</td></tr>
            <tr><td>Agent Arena (live benchmark)</td><td><strong>#5</strong></td><td>—</td></tr>
            <tr><td>HLE-Diamond</td><td><strong>58.8%</strong></td><td>Leads its class</td></tr>
            <tr><td>Vals Tax Agent Bench</td><td><strong>52.3%</strong></td><td>#1 overall</td></tr>
            <tr><td>Vals Legal Research Bench</td><td><strong>55.8%</strong></td><td>Tied #1</td></tr>
            <tr><td>Multimodal Knowledge Agent (MKA)</td><td><strong>53.4%</strong></td><td>Leads its class</td></tr>
            <tr><td>Agents&rsquo; Last Exam v1.1</td><td><strong>71.6%</strong></td><td>—</td></tr>
          </tbody>
        </table>
        <p>
          The most useful comparison for teams migrating off Flash is the
          Terminal-Bench jump: 57% against 3.8 Flash&rsquo;s 18.2%, with Google
          also claiming fabricated claims cut by more than 5x. On the safety side,
          Google reports overreach in agentic tasks down up to 81% and
          under-service down up to 79% versus 3.8 Flash, misaligned actions and
          task shortcutting down 12x, a 96.7% honesty rate on its internal agent
          honesty evaluation, 99.9% chain-of-thought legibility, and more than
          2.3x greater resilience to indirect prompt injection on the Gray Swan
          IPI benchmark. All vendor claims; none independently verified.
        </p>

        <h2>Orchestrator: Carbon plans, Hydrogen executes</h2>
        <p>
          The most interesting part of the launch is not the model alone but how
          Antigravity uses it. Orchestrator is a model option in Google
          Antigravity that dynamically switches between Carbon and Hydrogen
          within a single session, instead of assigning one model to the whole
          task. The Antigravity team&rsquo;s example flow: Carbon starts in a
          read-only phase, explores dependencies, resolves ambiguities, and
          builds a concrete plan with explicit re-planning triggers; Hydrogen
          then writes the edits, updates packages, and runs tests; if Hydrogen
          hits friction, control hands back to Carbon to inspect the state,
          repair the plan, and resume execution. For parallel-agent work, Carbon
          can act as coordinator while Hydrogen powers worker and verifier agents
          across isolated workspaces.
        </p>
        <p>
          Google&rsquo;s reported result: Orchestrator reaches near-Carbon task
          success rates while, on average, consuming 24% less quota and
          completing 19% faster. One discrepancy to know about: the main
          announcement cites <strong>Terminal-Bench 4.0</strong> for those
          figures, while Antigravity&rsquo;s own post cites{' '}
          <strong>Terminal-Bench 4.1</strong>. This page follows the main
          announcement (4.0) and flags the mismatch rather than picking one
          silently. Either way, the underlying success rate is not published —
          &ldquo;near-Carbon&rdquo; is a relative claim, and no absolute number is
          given.
        </p>
        <p>
          Availability is tiered, and the tiers are easy to get wrong. Hydrogen
          itself rolls out in Antigravity to paid Google AI Pro and Ultra
          subscribers. Orchestrator comes in two flavours:{' '}
          <strong>Orchestrator (Carbon)</strong> for Google AI Ultra subscribers,
          and <strong>Orchestrator (Argon)</strong> for Ultra and paid Pro
          subscribers. Enterprises can access both through Gemini for business.
          Whether free or partner-bundled Pro accounts see Hydrogen in
          Antigravity is not settled by the official posts — some reports say
          bundled tiers show it as unavailable — so check the model dropdown on
          your own account rather than trusting a list.
        </p>

        <h2>The three Gemini 4 models, side by side</h2>
        <table>
          <thead>
            <tr><th>Model</th><th>Role</th><th>Price (input / output per 1M)</th><th>AA Intelligence Index</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Hydrogen</strong></td><td>Fast execution: everyday coding, agent loops, verification</td><td><strong>$1.50 / $7.50</strong></td><td>51 (high), 54 (xhigh)</td></tr>
            <tr><td><strong>Argon</strong></td><td>Long tasks, lower token use</td><td>$2 / $10 (rising to $4 / $20 on 1 Dec 2026)</td><td>50</td></tr>
            <tr><td><strong>Carbon</strong></td><td>Strongest: long-horizon reasoning, security work</td><td>$2 / $10 (rising to $4 / $20 on 1 Dec 2026)</td><td>60</td></tr>
          </tbody>
        </table>
        <p>
          Carbon and Argon prices are per Google&rsquo;s Gemini API pricing page,
          with the scheduled 1 December 2026 increase reported from the same
          page. The practical takeaway: Hydrogen is the cheapest of the three
          per token today, and the gap widens if the scheduled Carbon/Argon
          increase lands. But price per token is not price per task — Hydrogen
          is only cheaper in practice if it finishes the job without handing
          back to Carbon, which is exactly what Orchestrator is built to manage.
        </p>

        <h2>Where Hydrogen runs</h2>
        <ul>
          <li><strong>Developers:</strong> Gemini API in Google AI Studio and Android Studio, all tiers including the free tier; model ID <code>gemini-4-hydrogen</code>.</li>
          <li><strong>Antigravity:</strong> paid Google AI Pro and Ultra subscribers; Orchestrator (Carbon) for Ultra, Orchestrator (Argon) for Ultra and paid Pro. The Antigravity agent in Gemini Managed Agents now uses Hydrogen by default.</li>
          <li><strong>Consumers:</strong> Gemini app model dropdown and Google Search for all users globally.</li>
          <li><strong>Enterprises:</strong> Gemini for business via the API or model dropdown, Google Antigravity, and Gemini in Google Sheets for eligible business subscriptions; Sheets also for Pro and Ultra subscribers.</li>
        </ul>
        <p>
          Context is 1,048,576 tokens shared across input, thinking, and output,
          with up to 1 million output tokens; standard synchronous output is
          capped at 65,536 tokens per call, with longer output via background
          mode. Knowledge cutoff is March 2026, per the model card.
        </p>

        <h2>How to start</h2>
        <ol>
          <li>
            <strong>Try it in AI Studio first.</strong> The free tier covers
            prototyping (rate-limited). Pick a routine task — a small refactor,
            a test run, a dependency upgrade — and compare against what you
            currently run, on your own repo, before trusting any benchmark on
            this page.
          </li>
          <li>
            <strong>Call the API with the model ID.</strong> A minimal call with
            the <code>google-genai</code> SDK:
            <pre><code>{`from google import genai

client = genai.Client()
response = client.models.generate_content(
    model="gemini-4-hydrogen",
    contents="Refactor this function to handle retries and add a test.",
)
print(response.text)`}</code></pre>
          </li>
          <li>
            <strong>Set the thinking level per task.</strong> Start at the high
            default for coding work; drop to low or medium for mechanical edits
            where speed matters more than depth, and try xhigh only when a task
            keeps failing at high. The level is the main cost and latency lever
            you control.
          </li>
          <li>
            <strong>In Antigravity, try Orchestrator before hand-rolling a router.</strong>{' '}
            If you are on Ultra, pick Orchestrator (Carbon); on paid Pro, pick
            Orchestrator (Argon). Watch whether tasks actually hand back to
            Carbon — frequent hand-backs mean the task belongs on Carbon
            directly.
          </li>
          <li>
            <strong>Measure your own tasks.</strong> The 24% quota and 19%
            speed figures are Google&rsquo;s averages on Terminal-Bench. Your
            repos, your prompts, and your quota plan decide the real numbers —
            log task success, hand-back rate, and tokens per completed task for
            a week before routing production work through it.
          </li>
        </ol>

        <h2>What is still unconfirmed</h2>
        <ul>
          <li>Every benchmark figure on this page — the AA Index 51/54, Terminal-Bench 57%, the 2.5x speed claim, the Vals and HLE scores, and the safety percentages — is Google&rsquo;s own data. Nobody outside Google has repeated the tests yet.</li>
          <li>Which Terminal-Bench version Orchestrator&rsquo;s 24%/19% figures belong to: the main announcement says 4.0, Antigravity&rsquo;s post says 4.1. The absolute success rate behind &ldquo;near-Carbon&rdquo; is not published at all.</li>
          <li>Whether Hydrogen in Antigravity is visible to free or partner-bundled Pro accounts. The official posts say paid Pro and Ultra; third-party reports say bundled tiers show it as unavailable. Check your own account.</li>
          <li>Whether the $1.50/$7.50 price holds. No increase is scheduled for Hydrogen, but Carbon and Argon are scheduled to double on 1 December 2026 and 3.8 Flash to double on 1 January 2027 — pricing in this family is moving, so re-check before committing.</li>
          <li>How the 1M-token context behaves at the top end in practice. The flat price covers the whole window, but Google&rsquo;s latency and quality claims are measured at everyday task sizes, not at 1M-token prompts.</li>
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
          <li>Google, &ldquo;Introducing Gemini 4 Hydrogen for Agentic Workflows&rdquo; (12 November 2026, Koray Kavukcuoglu, Google DeepMind): the launch, pricing, thinking levels, benchmarks, safety figures, and availability. See <a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/" target="_blank" rel="noreferrer">blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen</a>.</li>
          <li>Google Antigravity, &ldquo;Gemini 4 Hydrogen and Orchestrator&rdquo; (12 November 2026): Orchestrator mechanics, the Terminal-Bench 4.1 citation, and the Pro/Ultra tier split for Orchestrator (Carbon) and Orchestrator (Argon). See <a href="https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity" target="_blank" rel="noreferrer">antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity</a>.</li>
          <li>Google AI Studio pricing page and model documentation (as read 12–13 November 2026): cached-input $0.075 and batch $0.75/$3.75 rates, free-tier availability, the 65,536-token synchronous output cap, the March 2026 knowledge cutoff, and the scheduled price rises for 3.8 Flash (1 January 2027) and Carbon/Argon (1 December 2026). Carbon/Argon $2/$10 current prices from the same page.</li>
          <li>Benchmark figures (AA Index, Terminal-Bench, Agent Arena, Vals, HLE-Diamond, MKA, Agents&rsquo; Last Exam, safety percentages): transcribed from Google&rsquo;s announcement. All figures are Google&rsquo;s own and are labelled as such on this page.</li>
          <li>Unconfirmed and deliberately not asserted here: any independent replication of Google&rsquo;s benchmarks, the absolute success rate behind Orchestrator&rsquo;s &ldquo;near-Carbon&rdquo; claim, Antigravity availability for free or bundled Pro accounts, and any future price change for Hydrogen itself.</li>
        </ul>
        <p><em>Data checked: 2026-11-13. This page reports Google&rsquo;s 12 November 2026 announcement; re-verify the source article and the AI Studio pricing page before reusing the numbers after November 2026.</em></p>

        <h2>Related tools</h2>
        <p>
          For the decision-model side of the same family, read the{' '}
          <Link href="/gemini-decisions-api">Gemini Decisions API guide</Link> —
          1,000 bounded questions in one pass for $0.10 per million input tokens.
          For the cheap-model screening pattern that pairs with a frontier
          reviewer, read the <Link href="/jev-hybrid-routing">Jev + Opus hybrid routing guide</Link>.
          For cheap-model cost per completed task, compare{' '}
          <Link href="/muse-ember-vs-haiku">Muse Ember vs Haiku 5.5</Link>, and
          for teaching your coding agent modern web patterns, read the{' '}
          <Link href="/modern-web-guidance">Modern Web Guidance 1.0 guide</Link>.
        </p>
      </div>
    </div>
  );
}
