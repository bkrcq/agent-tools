import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Beacon Agent Memory for Claude Code and Codex',
  description:
    'Beacon shares agent memory across Claude Code, Codex and Cursor: what it captures, how Local differs from Beacon Cloud, and when plain AGENTS.md files are enough.',
  alternates: { canonical: '/beacon-agent-memory/' },
};

const faqs = [
  {
    q: 'What is Beacon, in one sentence?',
    a: 'Beacon, by Asymptote Labs, is an open-source, local-first memory layer that sits across coding-agent harnesses: it captures session history from Claude Code, Cursor, Codex, OpenCode, Cline and 20+ other harnesses into one OpenTelemetry-based trace format, then turns useful workflows, corrections and debugging patterns into reviewed knowledge that future agents can retrieve through MCP or Agent Skills. Its README sums it up as: a problem solved by one agent should not need to be learned from scratch by another.',
  },
  {
    q: 'Does Beacon replace CLAUDE.md or AGENTS.md?',
    a: 'No. Written instruction files are still the cheapest memory: they are explicit, version-controlled and free. Beacon adds what files cannot hold on their own — what actually happened in past sessions, including corrections and debugging patterns — and makes that history retrievable across harnesses. If you only use one harness, start with the files; see the AGENTS.md guide before adding a memory layer.',
  },
  {
    q: 'What is the difference between Local and Beacon Cloud?',
    a: 'Local keeps history on your machine in JSONL traces. Interactive setup signs in through beacon.sh and preselects Beacon Cloud, with an explicit Local opt-out. Signing in forwards nothing by itself, but confirming Beacon Cloud installs Beacon and starts forwarding your history to Asymptote Labs, and the confirm screen says so before you accept. You can disconnect a cloud endpoint any time with beacon endpoint disconnect.',
  },
  {
    q: 'Can secrets end up in a Beacon trace?',
    a: 'Yes. Beacon records prompts, responses, commands and file edits, so an API key or secret pasted into an agent can end up in a trace. That is the main reason to pick Local first, to check what was captured with beacon traces before forwarding anything, and to treat any forwarded destination — Cloud or a SIEM — as a place that receives prompts and commands, not just metadata.',
  },
  {
    q: 'Does Beacon capture everything equally in every harness?',
    a: 'No. Coverage differs by harness. In the project support table, Claude Code reports every column, while Codex CLI does not report file activity and Cursor does not report tokens. Do not assume a memory recalled in a second harness came from a complete trace; check the session it cites.',
  },
  {
    q: 'What should I check before trusting a recalled memory?',
    a: 'Three things: which past session it came from, whether that session went through the review step (Beacon drafts extracted knowledge for human review before agents reuse it, so expect to curate it rather than get perfect memory on day one), and whether the fact is still true — Beacon is designed to let temporary facts expire and contradictions resolve to the newest fact, but a recalled skill is still a claim to verify, not proof.',
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
  headline: 'Beacon Agent Memory: Claude Code, Codex & Cursor Guide',
  description:
    'What Beacon captures across coding-agent harnesses, how Local differs from Beacon Cloud, and when plain AGENTS.md files are enough.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-03',
  dateModified: '2026-11-03',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Guide + comparison · 3 Nov 2026</p>
      <h1>Beacon Agent Memory: One Memory Across Claude Code, Codex and Cursor</h1>
      <p className="lead">
        You fix a mistake in Claude Code. Tomorrow you open Codex or Cursor and correct
        the exact same mistake again, because each harness keeps its own memory.
        Beacon is the layer that stops that loop — but only if you install it in
        Local mode first and check what it actually captured.
      </p>

      <div className="prose">
        <h2>What Beacon is</h2>
        <p>
          Beacon, by Asymptote Labs, is an open-source (MIT-licensed) memory layer for
          coding agents. It captures session history from Claude Code, Cursor, Codex,
          OpenCode, Cline and 20+ other harnesses, normalizes it into one
          OpenTelemetry-based trace format, and writes local JSONL by default. Its loop
          is: run agents, capture history, evaluate what worked, extract useful
          knowledge, review and approve, then reuse across future agents through MCP or
          Agent Skills. The review step matters: expect to curate what Beacon extracts
          rather than get perfect memory on day one.
        </p>
        <p>
          Two timing facts, kept separate from the product claim. Asymptote Labs
          announced a $5.5 million seed round led by Tower Research Ventures on
          20 October 2026, as reported in contemporaneous coverage of the company
          announcement. Beacon also topped Product Hunt on its launch day in early
          November 2026 (third-party launch trackers list it first for that week).
          Neither fact says anything about whether Beacon fits your workflow; the
          comparison below is the decision part.
        </p>

        <h2>Install in Local mode first</h2>
        <p>
          The fastest path is to let your coding agent do it. Paste this into Claude
          Code, Codex or Cursor:
        </p>
        <pre><code>Read https://beacon.sh/start.md then set me up on Beacon</code></pre>
        <p>Or install by hand on macOS:</p>
        <pre><code>brew tap asymptote-labs/tap
brew install beacon
beacon endpoint install</code></pre>
        <p>
          On Linux, the installer script is published from the project releases page;
          if you prefer not to pipe a script into your shell, download it, read it,
          then run it. When <code>beacon endpoint install</code> asks for a
          destination, choose <strong>Local</strong>. Whichever destination you pick,
          the wizard installs the Beacon Skills into <code>~/.agents/skills</code>{' '}
          and <code>~/.claude/skills</code> unless you turn that off; redo it later
          with <code>beacon skills install</code> or undo it with{' '}
          <code>beacon skills uninstall</code>.
        </p>

        <h2>Check what Beacon captured, before you forward anything</h2>
        <pre><code>beacon traces</code></pre>
        <p>
          That opens a local terminal browser for traces, event timelines, token usage
          and retained content. Nothing is sent anywhere in that view. For a local web
          view, use <code>beacon endpoint dashboard</code>. Or read the raw event
          stream directly at <code>~/.beacon/endpoint/logs/runtime.jsonl</code> — it
          is plain JSONL, so you are never dependent on the UI. A good first test,
          run in a second harness after a session in the first:
        </p>
        <pre><code>Recall what Beacon learned about &lt;project task&gt; in this repo and tell me which past session it came from.</code></pre>
        <p>
          If the answer cannot name its session, treat it as ungrounded and do not act
          on it.
        </p>

        <h2>Beacon vs native harness memory</h2>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>What it remembers</th>
              <th>Where it works</th>
              <th>Weakness</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Beacon</strong></td>
              <td>Session history across harnesses, distilled into reviewed skills</td>
              <td>Claude Code, Cursor, Codex, OpenCode, Cline and 20+ harnesses</td>
              <td>Capture is uneven (see below); traces can contain secrets; needs curation</td>
            </tr>
            <tr>
              <td><strong>Claude Code native</strong></td>
              <td>CLAUDE.md, AGENTS.md and auto memory</td>
              <td>Claude Code only</td>
              <td>Does not follow you to Codex or Cursor</td>
            </tr>
            <tr>
              <td><strong>Codex native</strong></td>
              <td>AGENTS.md plus Memories</td>
              <td>Codex only</td>
              <td>Does not follow you to Claude Code or Cursor</td>
            </tr>
            <tr>
              <td><strong>Cursor native</strong></td>
              <td>Rules plus AGENTS.md</td>
              <td>Cursor only</td>
              <td>Does not follow you to other harnesses</td>
            </tr>
            <tr>
              <td><strong>claude-mem and similar tools</strong></td>
              <td>Unconfirmed on this page</td>
              <td>Unconfirmed on this page</td>
              <td>Not evaluated here — check its own repository README before comparing</td>
            </tr>
          </tbody>
        </table>
        <p>
          The honest summary: native files win on cost, control and auditability.
          Beacon wins only when the same lessons must survive a harness switch. If you
          use one harness, or your lessons are mostly stable rules and conventions,
          write them down in <Link href="/agents-md-guide">the AGENTS.md guide</Link>{' '}
          and skip the memory layer. If you switch harnesses daily and keep re-teaching
          the same corrections, Beacon is the tool built for that gap.
        </p>
        <p>
          One coverage caveat from the project&apos;s own support table: Claude Code
          reports every capture column, while Codex CLI does not report file activity
          and Cursor does not report tokens. A cross-harness memory built from partial
          traces is still useful, but it is not a complete replay of what happened.
          Beacon also does exact session replay well — each session becomes one trace
          with prompts, tool calls, commands, edits, approvals, MCP activity and
          tokens — and it can forward the same normalized history to a SIEM. Both
          features inherit the same privacy rule: forwarding sends prompts and
          commands off the machine.
        </p>

        <h2>When to pick what</h2>
        <ul>
          <li>
            <strong>Pick Beacon (Local) when:</strong> you switch between Claude Code,
            Codex and Cursor on the same repos, and the same correction keeps coming
            back in a new harness.
          </li>
          <li>
            <strong>Stick to files when:</strong> you use one harness, or your memory
            is mostly rules, conventions and project facts that fit in AGENTS.md.
          </li>
          <li>
            <strong>Do not forward yet when:</strong> you have pasted keys, customer
            data or internal URLs into any agent session. Audit{' '}
            <code>beacon traces</code> first, and only then decide about Cloud or SIEM
            forwarding.
          </li>
          <li>
            <strong>Skip it for now when:</strong> you need a guarantee rather than a
            reviewed suggestion. Recalled skills are drafts to verify, not ground truth.
          </li>
        </ul>

        <h2>Privacy checklist (do this before Cloud)</h2>
        <ol>
          <li>Install with destination Local, not the preselected Cloud option.</li>
          <li>Run <code>beacon traces</code> and confirm what a real session stored.</li>
          <li>Assume any pasted secret is in a trace; rotate it if it reached an agent.</li>
          <li>Install only dashboard lenses you trust with your traces — the project warns the sandbox cannot block every way a browser can send data out.</li>
          <li>Only then, if you need it, confirm Cloud or a SIEM destination knowing it receives prompts and commands. Disconnect Cloud any time with <code>beacon endpoint disconnect</code>; locally, <code>beacon mcp serve</code> never touches the network.</li>
        </ol>

        <h2>Sources and what was not verified</h2>
        <p>
          Product description, install steps, Local vs Cloud behaviour, coverage gaps
          and MCP commands follow the project&apos;s own documentation and setup guide
          as summarised in a 25 October 2026 walkthrough of Beacon in Local mode, plus
          the project README&apos;s runtime coverage table as reported in contemporaneous
          coverage. The $5.5 million seed round (20 October 2026, Tower Research
          Ventures led) and the Product Hunt launch-day first place are reported
          figures from company-announcement coverage and third-party launch trackers,
          not figures this page independently audited. Pricing for any Beacon Cloud
          paid tier was not published in the sources checked and is marked unconfirmed
          here — check the official site before paying. The claude-mem comparison was
          deliberately left unconfirmed: this page did not verify its current version
          or feature set, so it is listed as an alternative to check, not as a ranked
          rival. If any of these facts change, the page should be updated, not defended.
        </p>
        <p>
          Related reading on this site: <Link href="/agents-md-guide">AGENTS.md guide</Link>,{' '}
          <Link href="/ai-token-usage-guide">AI token usage guide</Link>, and the{' '}
          <Link href="/claude-code-agent-summary-cost">agent_summary cost calculator</Link>.
        </p>
      </div>
    </div>
  );
}
