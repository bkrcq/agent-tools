import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Modern Web Guidance 1.0: Install & Audit Guide',
  description:
    'Google Chrome released Modern Web Guidance 1.0 on 10 November 2026: a free skill that teaches coding agents modern web patterns, now with a codebase audit.',
  alternates: { canonical: '/modern-web-guidance/' },
};

const faqs = [
  {
    q: 'What is Modern Web Guidance?',
    a: 'A free set of agent skills published by the Chrome team that embeds web platform expertise, best practices and browser compatibility data directly into coding agents. Each guide covers one real-world use case — a dialog, a passkey sign-in, an autofilled address form — and states the Baseline date for every feature it recommends, so the agent can decide whether a fallback is needed for your browser support policy.',
  },
  {
    q: 'Is 1.0 a brand-new Google product?',
    a: 'No. Modern Web Guidance shipped as an early preview at Google I/O in May 2026. Version 1.0, released 10 November 2026, is the graduation from preview: the headline addition is an audit for existing code, plus Firefox and Edge joining the project. Do not describe it as something Google just invented.',
  },
  {
    q: 'How do I install Modern Web Guidance?',
    a: 'The recommended path is the CLI built by the Chrome team: run `npx modern-web-guidance@latest install` in a project directory. It also ships through the plugin marketplaces of most popular coding agents — Claude Code, Copilot CLI, Antigravity, Gemini extensions, JetBrains WebStorm — or via `npx skills add GoogleChrome/modern-web-guidance`. Installing through the CLI enables automatic updates; most other paths do not.',
  },
  {
    q: 'What does the 1.0 audit actually do?',
    a: 'It scans a project\u2019s HTML, CSS, JavaScript and package.json for places that can be safely updated to modern web patterns, then walks the agent through the changes. The first iteration uses static analysis over a limited number of code patterns, so it will not catch everything. Google says it plans to expand the audit later, including audits where the agent reasons about the code being audited.',
  },
  {
    q: 'Does Modern Web Guidance send data back to Google?',
    a: 'Yes, by default. The project README documents anonymous usage collection: installation counts, the agent\u2019s name, the IDs of guides retrieved, and the search queries the agent generates. Raw user prompts are explicitly not collected. Set `DISABLE_TELEMETRY=1` in your shell profile to turn collection off. One independent check of an older version (0.0.177) found the query text stayed local in practice, so the exact payload can vary by version — read the README of the version you install.',
  },
  {
    q: 'Is there independent proof it works?',
    a: 'Not yet in the strict sense. The published numbers come from Google and from customers Google highlighted. Google runs a public eval dashboard where agents from Anthropic, OpenAI and Google run the same tasks nightly with and without the guidance: on nightly runs completed 8 November, guided runs passed 88% of automated checks against 56% unguided — but guided runs were also slower and burned more tokens, and those figures predate 1.0. Japan\u2019s note inc. ran two agents through six UI tasks across 180 test runs and saw browser-check scores rise; MetaMask runs it as automatic PR review and saw 43 of 102 flagged issues fully resolved in its first five weeks. Treat all of these as vendor-highlighted evidence, not independent reproduction.',
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
  headline: 'Modern Web Guidance 1.0: Install & Audit Guide',
  description:
    'What Google Chrome\u2019s Modern Web Guidance 1.0 adds over the May preview, how to install it in Claude Code, Codex, Copilot and other agents, what the new codebase audit can and cannot do, and what the published evidence actually shows.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-11',
  dateModified: '2026-11-11',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Coding agent skill · 11 Nov 2026</p>
      <h1>Modern Web Guidance 1.0: Teach Your Coding Agent Modern Web</h1>
      <p className="lead">
        On 10 November 2026 the Google Chrome team released Modern Web Guidance 1.0 — a free
        skill set that stops coding agents writing 2019-era JavaScript and points them at
        modern web primitives instead: layout, forms, speed, passkey sign-in and on-device
        language features. The project itself is not new — it previewed at Google I/O in May
        2026 — but 1.0 graduates it from preview and adds the feature teams have been asking
        for: an audit that runs over code you already have.
      </p>

      <div className="prose">
        <h2>What it is, and what 1.0 is not</h2>
        <p>
          Modern Web Guidance is a catalog of guides covering over 100 web development use
          cases, with a small CLI in front of it. The agent describes a goal in plain language,
          the CLI matches it against guide descriptions using an on-device embedding model, and
          the agent reads the matching guide before writing code. That order matters: it is a
          pre-write lookup, not a post-write check. The skill never reads your code to decide
          which guide applies — it matches the sentence you type.
        </p>
        <p>
          Each guide states a Baseline date for every feature it recommends. That is the
          mechanism that makes the guidance useful rather than merely fashionable: the agent
          checks the date against your browser support policy and decides whether a fallback is
          required. Without a declared policy, the agent has nothing to check against — set one
          in your <code>AGENTS.md</code> before you install. Google says each guide is now
          reviewed and approved by a domain tech lead, and user-facing feature guides get a
          dedicated accessibility review by experts who use assistive technologies daily.
        </p>
        <p>
          The project is also no longer Chrome-only. Firefox and Edge are joining, and a
          governance document uploaded to the project&rsquo;s GitHub repository on 9 November
          sets out six owner seats: two for Chrome, one each for Microsoft Edge and Mozilla,
          and two for independent web platform experts. One independent seat is currently open,
          and no seat belongs to Apple.
        </p>

        <h2>What&rsquo;s new in 1.0: the audit</h2>
        <p>
          The audit scans a project&rsquo;s HTML, CSS, JavaScript and <code>package.json</code>{' '}
          to find places that can be safely updated, then walks the agent through the changes.
          Two limits to keep in mind:
        </p>
        <ul>
          <li>
            <strong>First iteration, static analysis only.</strong> The audit looks at a
            limited number of code patterns. It will surface the obvious wins — a hand-rolled
            theme toggle the browser now does natively, a modal that should be a{' '}
            <code>&lt;dialog&gt;</code>, a hero image that is both high-priority and
            lazy-loaded — and it will miss subtler problems. Google says it plans to expand
            the audit, including audits where the agent reasons about the code it is auditing.
          </li>
          <li>
            <strong>It is not a linter and not a test suite.</strong> It suggests upgrades; it
            does not prove the result works. Run your own checks after the agent applies
            changes, and keep manual accessibility testing in the review — the public eval
            dashboard explicitly says its accessibility review is limited, not a full WCAG
            audit.
          </li>
        </ul>
        <p>
          The audit is the reason 1.0 matters for existing projects. Before it, the guidance
          only helped with code not yet written. Now it can be pointed at a legacy codebase —
          which is where most teams&rsquo; agents spend most of their time.
        </p>

        <h2>Install</h2>
        <p>
          The recommended method is the CLI built by the Chrome team. Run it in a project
          directory:
        </p>
        <pre><code>npx modern-web-guidance@latest install</code></pre>
        <p>
          Installing through the CLI enables automatic updates. If you installed during the
          preview, update with <code>npx modern-web-guidance@latest update</code>. Other
          install paths:
        </p>
        <ul>
          <li><strong>Claude Code:</strong> <code>claude plugin install modern-web-guidance@claude-plugins-official</code></li>
          <li><strong>Codex:</strong> <code>codex plugin marketplace add GoogleChrome/modern-web-guidance</code>, then <code>codex plugin add modern-web-guidance@googlechrome</code></li>
          <li><strong>Copilot CLI:</strong> <code>/plugin install modern-web-guidance@googlechrome</code></li>
          <li><strong>Antigravity CLI:</strong> <code>agy plugin install https://github.com/GoogleChrome/modern-web-guidance</code></li>
          <li><strong>Gemini CLI:</strong> <code>gemini extensions install https://github.com/GoogleChrome/modern-web-guidance --auto-update</code></li>
          <li><strong>Vercel Agent Skills:</strong> <code>npx skills add GoogleChrome/modern-web-guidance</code></li>
          <li><strong>JetBrains WebStorm:</strong> Skill Manager under Settings &gt; AI Assistant &gt; Skills.</li>
        </ul>
        <p>
          Most of these paths do not support automatic updates, so if you install outside the
          CLI, check for new versions yourself. Before installing any skill into an agent,
          run the <Link href="/scan-agent-skill-before-installing">scan-agent-skill checklist</Link> —
          a skill runs with your agent&rsquo;s permissions, and the installer&rsquo;s own
          scanners are not a substitute for reading what it installs.
        </p>

        <h2>How to run the audit</h2>
        <ol>
          <li><strong>Set a browser support policy first.</strong> Decide which browsers and versions you support and write it in your <code>AGENTS.md</code>. The guides give Baseline dates; the policy is what turns those dates into decisions.</li>
          <li><strong>Install the skill</strong> with the CLI command above, in the project you want audited.</li>
          <li><strong>Ask the agent to audit, not to rewrite.</strong> Start with a scoped area — shared layout components and the home page, for example — and ask for findings first. The audit reads the files, searches the guidance library for relevant topics, retrieves the full guides, then cross-references them against the actual code.</li>
          <li><strong>Review findings before applying them.</strong> Early users report a handful of concrete, fixable issues per run: missing <code>preconnect</code> hints for fonts, no skip link for keyboard users, lazy-loaded hero images. Check each one against your policy before accepting it.</li>
          <li><strong>Verify the result yourself.</strong> Run your build and your own checks after the agent applies fixes. The guidance improves what the agent writes; it does not verify what it wrote.</li>
        </ol>
        <p>
          Google also suggests pairing the guidance with Chrome DevTools for agents, so the
          agent can run the code it creates and test it inside the browser — running the audit
          and then executing the result closes the loop the guidance alone leaves open.
        </p>

        <h2>What the evidence actually shows</h2>
        <p>
          There is no independent reproduction of the 1.0 numbers yet. Everything below comes
          from Google or from customers Google highlighted, and should be read that way:
        </p>
        <ul>
          <li>
            <strong>Nightly evals: 88% guided vs 56% unguided.</strong> Google runs a public
            eval dashboard where coding agents from Anthropic, OpenAI and Google run the same
            tasks every night, with and without the guidance, and a real browser checks the
            DOM, styles and source of each finished app. On nightly runs completed 8 November
            (199–215 tasks per agent), guided runs passed 88% of the automated checks against
            56% unguided. Two caveats from the same source: those figures predate 1.0, and in
            most recent suites guided runs were slower and burned more tokens. The task prompts
            do not mention the guidance, so each agent has to work out on its own when a guide
            applies.
          </li>
          <li>
            <strong>note inc.: 180 test runs, scores up when the guidance is named.</strong>{' '}
            Japan&rsquo;s creator platform ran two coding agents through six UI tasks across
            180 test runs on clones of its production codebase, scoring each against 19
            browser checks. Agent One went from 60.8% unguided to 76.5% with the skill
            installed but unnamed in prompts, to 94.0% once prompts named it. Agent Two went
            75.8% → 86.2% → 90.0% under the same three conditions. The lesson is practical:
            installing is not enough — telling the agent to use the guidance measurably helps.
          </li>
          <li>
            <strong>MetaMask: 102 issues across 57 pull requests.</strong> MetaMask runs the
            guidance as automatic review on every pull request to its open-source browser
            extension. Through 21 October — the first five weeks — the bot identified 102
            issues across 57 feature and fix pull requests. Engineers fully resolved 43,
            partially resolved 3, declined 16 as false positives or not worth doing, left 20
            unaddressed, and the outcome of the other 20 is unknown. That is a realistic
            picture: roughly half the findings get fixed, a sixth are noise.
          </li>
        </ul>
        <p>
          One caution from the preview era still applies: accessibility consultant Adrian
          Roselli evaluated the May preview and found an animated accordion output that did
          not comply with WCAG and whose animation was not functional in Firefox. That was the
          preview, not 1.0 — but it is a reminder that guidance is only as good as the
          agent&rsquo;s ability to follow it, and that the accessibility review Google now
          promises per guide is there for a reason.
        </p>

        <h2>Telemetry: on by default, one variable to switch off</h2>
        <p>
          The project README documents anonymous usage collection: installation counts, the
          agent&rsquo;s name, the IDs of guides retrieved, and the search queries the agent
          generates. Raw user prompts are explicitly not collected. To turn collection off,
          set <code>DISABLE_TELEMETRY=1</code> in your shell profile.
        </p>
        <p>
          One nuance worth knowing: an independent check of an older version (0.0.177) found
          the query text stayed on the machine in practice — the payload was guide IDs,
          similarity scores, OS, package version, a bucketed latency and a success flag. The
          README&rsquo;s stated list and the observed payload can differ by version, so read
          the telemetry notes of the version you install. And remember that the guides you
          match are themselves a decent map of what you are building, even when no prompt
          text leaves the machine.
        </p>

        <h2>What this page does not claim</h2>
        <ul>
          <li>1.0 is not a new project: the preview shipped at Google I/O in May 2026. The 1.0 milestone is the audit plus Firefox and Edge joining.</li>
          <li>The 88% vs 56% eval figures are nightly-run data from 8 November, before 1.0, not a measurement of the 1.0 release.</li>
          <li>The note inc. and MetaMask results are official-blog and vendor-highlighted evidence. There is no independent reproduction yet.</li>
          <li>The audit&rsquo;s first iteration is static analysis over a limited set of code patterns. It will not catch everything, and it does not verify its own output.</li>
          <li>Apple holds no governance seat and has not joined the project; the six seats are Chrome (two), Edge, Mozilla and two independent experts.</li>
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
          <li>Chrome for Developers, Modern Web Guidance docs and get-started guide: skill description, install commands (<code>npx modern-web-guidance@latest install</code>, Claude Code / Copilot CLI / Antigravity / Gemini / npx skills paths), over 100 use cases, evals calibrated per use case. See <a href="https://developer.chrome.com/docs/modern-web-guidance" target="_blank" rel="noreferrer">developer.chrome.com/docs/modern-web-guidance</a>.</li>
          <li>Search Engine Journal, &ldquo;Google Releases Modern Web Guidance 1.0 For AI Coding Agents&rdquo; (10 November 2026): 1.0 announcement by Philip Walton, audit scope (HTML/CSS/JS + package.json, static analysis, limited patterns), Firefox and Edge joining, governance document (six seats, one independent seat open, no Apple seat), eval dashboard 88% vs 56% on nightly runs completed 8 November (199–215 tasks per agent), note inc. 180 test runs (Agent One 60.8% → 76.5% → 94.0%, Agent Two 75.8% → 86.2% → 90.0%), MetaMask 102 issues across 57 PRs through 21 October. See <a href="https://www.searchenginejournal.com/google-releases-modern-web-guidance-1-0-for-ai-coding-agents/596495/" target="_blank" rel="noreferrer">searchenginejournal.com</a>.</li>
          <li>Telemetry: project README as reported by multiple independent write-ups (utilitybend, alfy.blog, manasmehrotra.info, hienluong.dev): anonymous usage (install counts, agent name, guide IDs, agent-generated search queries), raw prompts not collected, <code>DISABLE_TELEMETRY=1</code> to opt out; hienluong.dev&rsquo;s check of v0.0.177 found query text stayed local in that version.</li>
          <li>Unconfirmed and deliberately not asserted here: any independent reproduction of the 1.0 audit or eval figures; the exact current telemetry payload for the 1.0 CLI (varies by version); when Apple might join governance.</li>
        </ul>
        <p><em>Data checked: 2026-11-11. The skill is under active development: re-check the Chrome docs and the project README before installing.</em></p>

        <h2>Related tools</h2>
        <p>
          Before installing any agent skill, run the{' '}
          <Link href="/scan-agent-skill-before-installing">scan-agent-skill checklist</Link>.
          For the setup around it, read the{' '}
          <Link href="/ai-coding-agent-setup">AI coding agent setup checklist</Link>, and for
          keeping memory consistent across the agents that will use these guides, read the{' '}
          <Link href="/beacon-agent-memory">Beacon agent memory guide</Link>.
        </p>
      </div>
    </div>
  );
}
