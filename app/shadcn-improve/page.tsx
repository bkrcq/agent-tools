import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'shadcn improve: Audit with the Best, Run Cheap',
  description:
    'shadcn\u2019s improve skill audits your codebase with your best model and writes plans for cheaper models to execute in an isolated worktree. Free, MIT-licensed.',
  alternates: { canonical: '/shadcn-improve/' },
};

const faqs = [
  {
    q: 'What is shadcn/improve?',
    a: 'An open-source agent skill by shadcn (creator of shadcn/ui) that audits any codebase with your most capable model and writes self-contained implementation plans into a plans/ folder, for cheaper models — or any agent or human — to execute. The skill never implements anything itself. The plan is the product.',
  },
  {
    q: 'Does improve change my code?',
    a: 'No. Its hard rules say it never modifies source code itself and never runs commands that mutate your working tree — read, search and read-only analysis only. The only writes it makes go to plans/. When you ask it to execute a plan, it dispatches a cheaper executor into an isolated git worktree, reviews the diff, and reports a verdict. Merging is always your call.',
  },
  {
    q: 'How much does it cost to use?',
    a: 'The skill itself is free under the MIT license — no account, no payment, no API key. The cost is your agent session: the audit burns your best model\u2019s tokens, because judgment is the expensive part. The saving is in execution, where a cheaper model follows the plan. Do not describe it as cheap all the way through — the audit is the part you pay for.',
  },
  {
    q: 'Which agents does it work with?',
    a: 'Any agent that supports the Agent Skills format. The installer was verified writing the skill to .agents/skills/improve/ for Antigravity CLI, Codex, Gemini CLI, OpenCode and Pi, plus a symlink for Claude Code. The plans it writes are plain markdown, so any agent — or a human — can pick them up.',
  },
  {
    q: 'Is improve brand new?',
    a: 'No. The repository was created on 10 June 2026 and the example plan in its README dates from that month. It surged on 11 November 2026, reaching #4 on GitHub Trending\u2019s daily list with about 11,000 stars. The November attention is real; the project itself is five months old.',
  },
  {
    q: 'How is it different from GitHub Copilot Fusion?',
    a: 'Same cost idea, different mechanism. Both say: don\u2019t pay frontier prices for every step — plan and judge with the strong model, execute with a cheap one. Fusion is an automatic router built into Copilot: it picks the model per prompt and its Cascade pattern starts cheap, with a judge escalating to a stronger model only if needed. Improve is explicit and portable: a human-readable plan file in your repo, executed by a cheap model in an isolated worktree, with a human deciding the merge. Fusion routes inside Copilot; improve leaves an artifact any agent can run.',
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
  headline: 'shadcn improve: Audit with the Best, Run Cheap',
  description:
    'What shadcn\u2019s improve skill does, how its audit-to-plan loop works, what it costs, and how it compares with GitHub Copilot Fusion\u2019s automatic model routing.',
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
      <p className="eyebrow">Coding agent skill · 12 Nov 2026</p>
      <h1>shadcn improve: Your Best Model Audits, a Cheap Model Executes</h1>
      <p className="lead">
        On 11 November 2026, <code>shadcn/improve</code> reached #4 on GitHub Trending&rsquo;s
        daily list with about 11,000 stars. It is an agent skill with one idea, stated in its
        README: use your most capable model for the part where intelligence compounds —
        understanding the codebase, judging what&rsquo;s worth doing, writing the spec — and
        hand execution to cheaper models. The skill never implements anything itself. The
        plan is the product.
      </p>

      <div className="prose">
        <h2>The flip: the smart model stops coding</h2>
        <p>
          Most coding agents spend their best model on the cheapest work — typing out fixes.
          Improve inverts that. You run <code>/improve</code> with your strongest model
          acting as advisor; it audits the repo and writes self-contained implementation
          plans into <code>plans/</code>, one file per finding, plus an index with the
          recommended order. Then any agent — or a human — picks a plan up and executes
          it. The README&rsquo;s own diagram makes the split plain: you and the expensive
          model advise, the plan file is the handoff, and a cheap model implements, tests
          and ships.
        </p>
        <p>
          One correction before the details: this is not a brand-new project. The repository
          was created on 10 June 2026, and the example plan quoted in its README was written
          against shadcn/ui at a June commit. What happened in November is a surge of
          attention, not a launch — the skill had been sitting there for five months before
          GitHub Trending noticed it.
        </p>

        <h2>The nine audit categories</h2>
        <p>
          The audit fans out parallel subagents across nine categories, each finding carrying{' '}
          <code>file:line</code> evidence, impact, effort and confidence:
        </p>
        <ul>
          <li><strong>Correctness</strong> — bugs and wrong behaviour.</li>
          <li><strong>Security</strong> — vulnerabilities and unsafe patterns.</li>
          <li><strong>Performance</strong> — slow paths and wasteful work.</li>
          <li><strong>Test coverage</strong> — gaps where behaviour has no test.</li>
          <li><strong>Tech debt</strong> — duplicated or drifted code.</li>
          <li><strong>Dependencies &amp; migrations</strong> — outdated or risky deps.</li>
          <li><strong>DX</strong> — developer-experience friction.</li>
          <li><strong>Docs</strong> — missing or stale documentation.</li>
          <li><strong>Direction</strong> — feature suggestions, each required to cite evidence from the repo itself, not generic ideas.</li>
        </ul>
        <p>
          Before you see anything, the advisor vets its own findings: subagents over-report,
          so it re-reads every cited location itself, drops false positives, corrects wrong
          attributions and records rejections so they do not come back on the next run. In
          the README&rsquo;s example run against shadcn/ui, that process surfaced a
          duplicated shadow config that had already drifted between two files, and an
          O(n&sup2;) icon migration — and rejected a reported SSRF as by-design proxy
          behaviour, with the reason recorded.
        </p>

        <h2>How a run works</h2>
        <ol>
          <li><strong>Recon.</strong> The skill maps the repo — stack, conventions, the exact build/test/lint commands — and these become the verification gates in every plan. It also ingests intent and design docs when present (ADRs, PRDs, <code>CONTEXT.md</code>, <code>DESIGN.md</code>, <code>PRODUCT.md</code>), so decided tradeoffs are not re-flagged as findings.</li>
          <li><strong>Audit and vet.</strong> Parallel subagents cover the nine categories; the advisor re-reads every citation before showing you a findings table ordered by leverage (impact &divide; effort, weighted by confidence). You pick what becomes plans.</li>
          <li><strong>Plan.</strong> One file per selected finding in <code>plans/</code>, written for the weakest plausible executor — a model that never saw the advisor session and may be much smaller. All context is inlined, every step ends with a command and its expected output, and STOP conditions tell the executor when to stop and report instead of improvising. Each plan is stamped with the git commit it was written against, so executors run a mechanical drift check first.</li>
          <li><strong>Execute (optional).</strong> <code>/improve execute 001</code> spawns a cheaper executor subagent in an isolated git worktree, hands it the plan, then reviews the result like a tech lead: re-runs every done criterion, checks scope compliance, reads the diff against intent. The verdict is approve (merging stays your call), send back for revision (max 2 rounds), or block and refine the plan.</li>
          <li><strong>Reconcile.</strong> Next session, <code>/improve reconcile</code> cleans up the backlog: verifies what landed, investigates blocked plans, refreshes drifted ones, retires findings fixed independently.</li>
        </ol>
        <p>
          Scoped variants keep the cost down: <code>/improve quick</code> is a cheap pass
          over hotspots only, <code>/improve deep</code> is exhaustive,{' '}
          <code>/improve security</code> (also <code>perf</code>, <code>tests</code>,{' '}
          <code>bugs</code> and more) audits one category, <code>/improve branch</code>{' '}
          audits only what the current branch changes, and <code>/improve plan
          &lt;description&gt;</code> skips the audit to spec one thing directly. Plans
          can also be published as GitHub issues with <code>--issues</code>.
        </p>

        <h2>Install</h2>
        <p>One command, from the README:</p>
        <pre><code>npx skills add shadcn/improve</code></pre>
        <p>
          The installer (the Vercel skills CLI) clones the repository and writes the skill
          to <code>.agents/skills/improve/</code> in your project. A hands-on run verified
          it installing for Antigravity CLI, Codex, Gemini CLI, OpenCode and Pi, plus a
          symlink for Claude Code. The skill itself is small — a 122-line{' '}
          <code>SKILL.md</code> and three reference files (<code>audit-playbook.md</code>,{' '}
          <code>plan-template.md</code>, <code>closing-the-loop.md</code>). That same
          hands-on run reported the skill as Safe on skills.sh, with 0 Socket alerts and
          Snyk Low Risk. Before installing any skill into an agent, still run the{' '}
          <Link href="/scan-agent-skill-before-installing">scan-agent-skill checklist</Link> —
          a skill runs with your agent&rsquo;s permissions, and a clean scan is not a
          substitute for reading what it installs.
        </p>

        <h2>What it actually costs</h2>
        <p>
          The skill is free under the MIT license. The bill is your agent session — and the
          split is the whole point:
        </p>
        <ul>
          <li>
            <strong>Audit: the expensive part.</strong> The advisor run burns your best
            model&rsquo;s tokens. You pay for judgment once, per audit. A full{' '}
            <code>/improve</code> over a large codebase is the most expensive run;{' '}
            <code>/improve quick</code> and single-category audits exist precisely to keep
            this down.
          </li>
          <li>
            <strong>Execution: the cheap part.</strong> The executor follows a
            self-contained plan with machine-checkable done criteria, so a smaller, cheaper
            model can do it. The saving is here — not in the audit.
          </li>
          <li>
            <strong>Review: still yours.</strong> The skill reviews the executor&rsquo;s
            diff, but the merge decision — and the responsibility for it — stays with you.
            Budget human review time, not just tokens.
          </li>
        </ul>
        <p>
          To put numbers on it before a first run, estimate the advisor&rsquo;s token burn
          with the <Link href="/ai-token-cost-calculator">AI token cost calculator</Link>{' '}
          for the model you plan to audit with. Do not write, or believe, a claim that
          improve is &ldquo;cheap&rdquo; without saying which half you mean.
        </p>

        <h2>improve vs GitHub Copilot Fusion</h2>
        <p>
          The comparison the 11 November trend invites is with GitHub Copilot Fusion, which
          went generally available on 28 October 2026. Both start from the same observation
          — defaulting to the most capable model for every task wastes tokens — and
          GitHub&rsquo;s own cost guidance states the shared pattern plainly: plan with a
          strong reasoning model, then implement with a cheaper model. The mechanisms differ:
        </p>
        <table>
          <thead>
            <tr><th></th><th>shadcn/improve</th><th>Copilot Fusion</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>What it is</strong></td><td>An open-source agent skill (MIT) you install into any agent</td><td>A runtime model router and orchestrator built into Copilot</td></tr>
            <tr><td><strong>How models split the work</strong></td><td>Expensive advisor audits and writes a plan file; cheap executor runs it in an isolated worktree</td><td>Automatic per-prompt routing; Cascade starts with a cheap draft and a judge escalates to a stronger model only if needed</td></tr>
            <tr><td><strong>Artifact</strong></td><td>A human-readable plan in <code>plans/</code>, portable to any agent or human</td><td>No artifact — the routing happens inside the Copilot session</td></tr>
            <tr><td><strong>Who decides the merge</strong></td><td>Always you; the skill only recommends</td><td>You, in your normal Copilot review flow — but a rejected cascade draft&rsquo;s file edits are not undone automatically</td></tr>
            <tr><td><strong>Where it runs</strong></td><td>Any agent supporting Agent Skills (Claude Code, Codex, OpenCode, Gemini CLI, Pi, Antigravity)</td><td>VS Code, the Copilot app, Copilot CLI, JetBrains IDEs; Fusion Max needs Copilot Pro+ ($39), Pro and Free get Standard only</td></tr>
            <tr><td><strong>Published benchmark</strong></td><td>None — no benchmark claims for improve itself</td><td>Artificial Analysis Coding Agent Index v2.0: Fusion Max 59.9 at $5.59 per task, vs Claude Code with Opus 5.5 Max 61.7 at $11.42 — about half the cost for ~2 points</td></tr>
          </tbody>
        </table>
        <p>
          The honest summary: Fusion automates the routing inside one product; improve makes
          the split explicit, portable and human-reviewed. If you live in Copilot and want
          the choice made for you, Fusion is the shorter path. If you want the plan as a
          file you can read, hand to any model, or keep as a record, improve is the one
          that produces it. They are not the same workflow, and the &ldquo;expensive plans,
          cheap executes&rdquo; line describes improve directly — for Fusion it is one
          pattern among several, and its Cascade starts cheap rather than starting
          expensive.
        </p>

        <h2>Hard rules: what it will not do</h2>
        <ul>
          <li><strong>Never modifies source code itself.</strong> The only writes go to <code>plans/</code>; executors edit only in disposable worktrees, and merging is always yours.</li>
          <li><strong>Never runs commands that mutate your working tree</strong> — read, search and read-only analysis only.</li>
          <li><strong>Never reproduces secret values.</strong> Locations and credential types only; rotation always recommended.</li>
          <li><strong>Asked to implement, it declines</strong> and points at the plan (or offers <code>execute</code>).</li>
        </ul>

        <h2>What this page does not claim</h2>
        <ul>
          <li>Improve is not new: the repository dates to 10 June 2026. The November story is a Trending surge, not a launch.</li>
          <li>There is no benchmark for improve itself. The Fusion numbers above are Artificial Analysis&rsquo;s, not ours, and they measure Fusion, not improve.</li>
          <li>The skill does not make auditing cheap overall. The audit is the expensive half; the saving is in execution.</li>
          <li>Plans are only as good as the advisor&rsquo;s judgment and the repo&rsquo;s own docs. A plan written against a stale commit gets a drift check, not a guarantee.</li>
          <li>The installer safety note (skills.sh Safe, 0 Socket alerts, Snyk Low Risk) comes from one hands-on run on 11 November 2026, not from our own scan. Run the checklist before installing.</li>
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
          <li>shadcn/improve repository, README (github.com/shadcn/improve): the advisor/executor split, nine audit categories, plans/ format, isolated worktree execution, hard rules, install command, MIT license, repository created 10 June 2026, 11,366 stars at check on 12 November 2026. See <a href="https://github.com/shadcn/improve" target="_blank" rel="noreferrer">github.com/shadcn/improve</a>.</li>
          <li>AI Frontier Post, &ldquo;Hands-on with shadcn&rsquo;s improve&rdquo; (11 November 2026): verified install to <code>.agents/skills/improve/</code> for Antigravity CLI, Codex, Gemini CLI, OpenCode and Pi plus a Claude Code symlink; skill contents (122-line SKILL.md, three reference files); skills.sh Safe / 0 Socket alerts / Snyk Low Risk; &ldquo;the audit costs whatever your agent session costs.&rdquo; GitHub Trending daily, 11 November 2026: improve ranked #4. See <a href="https://aifrontierpost.com/articles/shadcn-improve-agent-skill-codebase-audit-tutorial/" target="_blank" rel="noreferrer">aifrontierpost.com</a>.</li>
          <li>GitHub docs, &ldquo;Optimizing your AI usage&rdquo;: &ldquo;always plan with a strong reasoning model, then implement the work with a cheaper model&rdquo;; Fusion effort levels (Standard / High / Max); subagents on cheaper models; 30% discount on Fusion model costs for paid plans through 30 November 2026. See <a href="https://docs.github.com/en/enterprise-cloud@latest/copilot/tutorials/optimize-ai-usage" target="_blank" rel="noreferrer">docs.github.com</a>.</li>
          <li>Copilot Fusion GA coverage (28 October 2026, GitHub Universe): Fusion is a runtime model router/orchestrator, not a model; execution patterns Single / Cascade / Critique; Fusion Max needs Copilot Pro+ ($39); Artificial Analysis Coding Agent Index v2.0 — Fusion Max 59.9 at $5.59 per task vs Claude Code Opus 5.5 Max 61.7 at $11.42. See <a href="https://app.getmegabrain.com/blog/github-copilot-fusion-vs-claude-code-cost-per-task-2026" target="_blank" rel="noreferrer">getmegabrain.com</a> and <a href="https://tech-tech.life/2026/11/07/github-copilot-fusion-you-stop-picking-models-and-that-changes-more-than-your-bill/" target="_blank" rel="noreferrer">tech-tech.life</a>.</li>
          <li>Unconfirmed and deliberately not asserted here: the exact number of stars improve gained on 11 November itself (sources disagree, roughly 330–360); any independent benchmark of improve&rsquo;s audit quality; whether Fusion&rsquo;s published cost advantage holds inside Copilot plans rather than at API list prices.</li>
        </ul>
        <p><em>Data checked: 2026-11-12. The skill is under active development: re-check the repository README before installing.</em></p>

        <h2>Related tools</h2>
        <p>
          Before installing, run the{' '}
          <Link href="/scan-agent-skill-before-installing">scan-agent-skill checklist</Link>{' '}
          and estimate the advisor&rsquo;s token burn with the{' '}
          <Link href="/ai-token-cost-calculator">AI token cost calculator</Link>. For the
          setup around it, read the{' '}
          <Link href="/ai-coding-agent-setup">AI coding agent setup checklist</Link>, and
          for another skill that landed the same week, the{' '}
          <Link href="/modern-web-guidance">Modern Web Guidance 1.0 guide</Link>.
        </p>
      </div>
    </div>
  );
}
