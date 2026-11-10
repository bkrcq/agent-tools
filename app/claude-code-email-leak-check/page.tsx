import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Claude Code Email Leak Check: 8 Bypasses',
  description:
    'Claude Code v2.1.317 added a privacy check that blocks your account email in User-Agent headers — but an independent test of the shipped code found 8 bypasses. Check your version and the gaps.',
  alternates: { canonical: '/claude-code-email-leak-check/' },
};

const faqs = [
  {
    q: 'What happened?',
    a: 'Claude Code puts your signed-in account email into the model\u2019s context so the model can identify you. When a user asked it to research something on Wikipedia \u2014 whose bot policy asks scripted clients to identify themselves with a contact email \u2014 the model put the user\u2019s email into curl\u2019s User-Agent header and sent it to a third-party site. The original report, issue #81138 against anthropics/claude-code, was filed on 25 July 2026.',
  },
  {
    q: 'What did v2.1.317 fix?',
    a: 'Version 2.1.317, released 3 November 2026, added a built-in mod called cc-plugin-privacy. Anthropic published its source in the mods/privacy folder of the public anthropics/claude-code repo: 6 TypeScript files, 171 lines. One tool.check hook watches Bash, Monitor, and PowerShell calls. If a call holds the account\u2019s email and names a User-Agent, it is refused, with no prompt. The mod\u2019s own README says: \u201cThere is no parser, on purpose: it keeps the test simple.\u201d And, verbatim: \u201cThis is a courtesy, not a boundary.\u201d',
  },
  {
    q: 'Is the leak fully fixed?',
    a: 'No \u2014 treat it as partially fixed. An independent test published 6 November 2026 ran the mod\u2019s actual namesUserAgentWithAddress function against 23 shell lines, using a fake address, and found 0 mismatches with what the README claims the mod does: 10 cases blocked, 8 leaked through, and 4 were false refusals. The 8 leaks are different spellings of the same leak, not a failure of the 10 blocks. Separately, the hook only watches shell tools: WebFetch and WebSearch are not checked, and neither are MCP tools \u2014 the README says so.',
  },
  {
    q: 'What are the 8 bypasses?',
    a: 'From the independent test, each of these passes the hook and leaves the machine if the line sends it: a From: header instead of User-Agent; curl -u basic auth (email as username); the address produced at runtime, such as $(git config user.email) or a $EMAIL variable; double percent-encoding (alice%2540example.com); the address in a query string (?contact=); the address in a POST body (email=); and a non-ASCII address percent-encoded. The pattern: the hook only fires when the literal address and a User-Agent word appear in the same call.',
  },
  {
    q: 'What happens in headless mode (claude -p)?',
    a: 'The release notes describe the feature as \u201ca check that asks before a web or shell tool call sends your account email address to the network\u201d \u2014 but the shipped mod raises no prompt; it denies, silently, or it is off. In headless runs there is nobody to answer, so the check denies the call and tells the model to carry on; one report (issue #107144, 4 November 2026) says the run can still finish as a success. That same report also lists false positives: a heredoc writing a local file that mentions the address and a URL, and a curl to 127.0.0.1. Treat the headless behaviour as reported from a single source, not independently confirmed.',
  },
  {
    q: 'How do I check my version and whether the mod is on?',
    a: 'Run claude --version: you need 2.1.317 or later. Anthropic says in issue #107757 that the built-in privacy mod is enabled by default and can be turned off via /plugins. Note the caveats: /plugin disable or an enabledPlugins setting turns it off, a server-side switch read once per session can turn it off, and a hook from an installed plugin sitting above this one on tool.check may overrule the refusal. One user on 2.1.318 reported not seeing cc-plugin-privacy in /plugins at all \u2014 a single report, unconfirmed.',
  },
  {
    q: 'My email may already have gone out. What now?',
    a: 'You cannot un-send it. A second report, issue #107757 (5 November 2026, v2.1.318, macOS), claims the reporter receives \u201cdozens of scam emails per day\u201d because the address went out in User-Agent headers while Claude Code conducted web searches without permission. That causal link is the reporter\u2019s claim: the issue carries no reproduction log or sample request dump, so it is unconfirmed here. Practically: expect phishing that uses your address, do not treat an increase in spam as proof of this leak on its own, and do not rely on the v2.1.317 check as a boundary \u2014 the deterministic check would have to sit on the network call itself, not on a string match over the shell line that might produce it.',
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
  headline: 'Claude Code Email Leak Check: v2.1.317 Fix, 8 Bypasses, and How to Check',
  description:
    'A check-and-boundaries guide for the Claude Code email-in-User-Agent leak: what v2.1.317 blocks, the 8 bypasses an independent test found, and the WebFetch/WebSearch gap.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Security self-check · 6 Nov 2026</p>
      <h1>Claude Code Email Leak Check: Partially Fixed in v2.1.317 — 8 Bypasses Still Open</h1>
      <p className="lead">
        Claude Code hands the model your signed-in email, and the model has put it into
        curl&apos;s User-Agent header to third-party sites. Version 2.1.317 added a check
        that blocks the exact leak from the bug report. An independent test of the shipped
        code found 8 other shapes of the same leak still pass through — and the built-in
        web tools were never in scope. Do not read &quot;fixed&quot; as a conclusion.
      </p>

      <div className="prose">
        <h2>Are you in scope? (30 seconds)</h2>
        <p>
          You are in scope if you run Claude Code and let it research the web. The original
          report, GitHub issue #81138, was filed on 25 July 2026: the model was asked to
          research something on Wikipedia, whose bot policy asks scripted clients to
          identify themselves with a contact email, and the model put the user&apos;s email
          into curl&apos;s User-Agent header. The fix shipped 101 days later, in v2.1.317 on
          3 November 2026. A follow-up report, issue #107757 on 5 November 2026, claims the
          reporter receives &quot;dozens of scam emails per day&quot; because the address
          went out in User-Agent headers while Claude Code conducted web searches without
          permission. If you only use Claude Code offline, or on a version before the fix
          with no web research, this check does not apply to you.
        </p>
        <p>
          Keep the claim narrow. The leak is established by the original report and by the
          fix itself. The spam claim in #107757 is a single report with no reproduction
          log, so this page does not present it as proven cause and effect. Likewise, the
          8 bypasses below come from one independent test of the shipped code, run with a
          fake address — they show what the check does and does not catch, not a confirmed
          leak on any real machine.
        </p>

        <h2>What the fix actually blocks</h2>
        <p>
          The fix is a built-in mod, <code>cc-plugin-privacy</code>, published in the{' '}
          <code>mods/privacy</code> folder of the public anthropics/claude-code repo: 6
          TypeScript files, 171 lines. One <code>tool.check</code> hook watches Bash,
          Monitor, and PowerShell calls, and the test is two word matches over the whole
          input: if the call holds the account&apos;s email and names a User-Agent, it is
          refused, with no prompt. The independent test confirmed 10 blocks, including the
          literal address, <code>--user-agent</code> with space or <code>=</code>,
          case-insensitive matching, one pass of percent-decoding, <code>wget -U</code>,
          and PowerShell&apos;s <code>-UserAgent</code> including Unicode dashes. The
          straightforward leak from the bug report is closed.
        </p>

        <h2>The 8 leaks that still pass</h2>
        <p>
          Every one of these passes the hook and leaves the machine if the line sends it.
          They are taken verbatim from the independent test (fake address{' '}
          <code>alice@example.com</code>):
        </p>
        <ul>
          <li><code>curl -H &quot;From: alice@example.com&quot;</code> — a <code>From:</code> header is not a User-Agent word.</li>
          <li><code>curl -u alice@example.com:secret</code> — basic auth, not a User-Agent.</li>
          <li><code>curl -A &quot;$(git config user.email)&quot;</code> — computed at runtime, invisible to a static string match.</li>
          <li><code>curl -A &quot;$EMAIL&quot;</code> — a variable, same reason.</li>
          <li><code>curl -A &quot;alice%2540example.com&quot;</code> — double percent-encoding survives because the decoder runs once.</li>
          <li><code>curl https://example.org/?contact=alice@example.com</code> — the address in a query string.</li>
          <li><code>curl -d &quot;email=alice@example.com&quot;</code> — the address in a POST body.</li>
          <li><code>curl -A &quot;jos%C3%A9@example.com&quot;</code> — a non-ASCII address percent-encoded survives because one decode pass produces two Latin-1 bytes, never the original character.</li>
        </ul>
        <p>
          The pattern is the shape of the promise: it guards one spelling of one leak — a
          literal email next to a User-Agent word in a shell call.
        </p>

        <h2>The biggest hole is not in that list</h2>
        <p>
          The hook only watches shell tools. WebFetch and WebSearch are not checked, and
          neither are MCP tools — the mod&apos;s README says so. The bug report&apos;s own
          scenario is &quot;research something on Wikipedia.&quot; If the model does that
          research with WebFetch instead of curl, nothing in this mod ever sees the
          address. If your threat model is &quot;the model must never send my email to a
          website,&quot; this is not the control that delivers it.
        </p>

        <h2>Three ways the protection disappears</h2>
        <ul>
          <li><strong>You turn it off.</strong> <code>/plugin disable</code> or an <code>enabledPlugins</code> setting turns it off; Anthropic says it is enabled by default and can be toggled via <code>/plugins</code>.</li>
          <li><strong>A server-side switch.</strong> A server-side switch, read once per session, can turn it off without you doing anything.</li>
          <li><strong>Another plugin&apos;s hook.</strong> A hook from an installed plugin sits above this one on <code>tool.check</code> and may overrule the refusal.</li>
        </ul>
        <p>
          The release notes describe the feature as &quot;a check that asks before a web or
          shell tool call sends your account email address to the network&quot; — but the
          shipped mod raises no prompt. It denies, silently, or it is off.
        </p>

        <h2>Check in 4 steps</h2>
        <ol>
          <li>
            <strong>Check your version.</strong> Run <code>claude --version</code>. You need
            2.1.317 or later; earlier versions have no check at all.
          </li>
          <li>
            <strong>Check the mod is on.</strong> In Claude Code, open <code>/plugins</code> and
            confirm <code>cc-plugin-privacy</code> is enabled. Check your settings for an{' '}
            <code>enabledPlugins</code> entry that excludes it. One user on 2.1.318 reported
            not seeing the mod in <code>/plugins</code> at all — a single report, unconfirmed,
            but worth a look on your own install.
          </li>
          <li>
            <strong>Check for a hook above it.</strong> If you have installed plugins that
            register a <code>tool.check</code> hook, one of them can sit above the privacy
            hook and overrule a refusal. Review installed plugins before treating the check
            as your boundary.
          </li>
          <li>
            <strong>Do not test it with your real address.</strong> The bypass list above is
            enough to show the shape of the gap; sending your real address through the
            bypasses to &quot;see if it leaks&quot; would create the leak you are checking
            for. If you must verify behaviour, use a throwaway address in a sandbox.
          </li>
        </ol>

        <h2>False refusals to expect</h2>
        <p>
          Two word matches with no parser cut both ways. The same test found 4 false
          refusals: <code>curl -user</code> (real curl&apos;s <code>-u</code> flag, read as
          a User-Agent word), an <code>echo</code> that merely mentions &quot;user-agent&quot;
          in the same breath as the address, and a generic User-Agent with the address
          anywhere else in the line — a URL path or a query string. The README accepts
          these: &quot;Those false refusals are accepted for simplicity.&quot; In headless
          runs (<code>claude -p</code>), a denied call is refused with no one to answer, and
          the model is told to carry on — one report says the run can still finish as a
          success, and that local-only calls (a heredoc writing a file, a curl to 127.0.0.1)
          can be denied too. Treat the headless details as reported, not independently
          confirmed.
        </p>

        <h2>What is still unconfirmed</h2>
        <ul>
          <li>The spam link in issue #107757: the reporter claims dozens of scam emails per day caused by the leak, but the issue carries no reproduction log or sample request dump, and Anthropic has not publicly replied on that thread as of the filing checked here.</li>
          <li>Whether Anthropic will extend the check to WebFetch, WebSearch, or MCP tools. Until it does, the built-in web tools remain outside the check by design.</li>
          <li>The headless-mode behaviour in issue #107144: a single report on 2.1.317/2.1.318, not independently reproduced in the sources checked.</li>
          <li>Whether <code>cc-plugin-privacy</code> is visible in <code>/plugins</code> on every 2.1.317+ install: one user on 2.1.318 reported it missing.</li>
          <li>There is no supported toggle in the sources checked to keep the address out of the model&apos;s context in the first place; one report notes the value comes from the OAuth account in <code>~/.claude.json</code>, and that <code>IS_DEMO=1</code> only hides it from the display.</li>
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
          <li>GitHub issue #81138, anthropics/claude-code, filed 25 July 2026: the original User-Agent leak report. See <a href="https://github.com/anthropics/claude-code/issues/81138" target="_blank" rel="noreferrer">issue #81138</a>.</li>
          <li>GitHub issue #107757, anthropics/claude-code, opened 5 November 2026 (v2.1.318, macOS): the follow-up scam-email claim and Anthropic&apos;s reply that cc-plugin-privacy shipped in 2.1.317+, is enabled by default, and can be turned off via /plugins. See <a href="https://github.com/anthropics/claude-code/issues/107757" target="_blank" rel="noreferrer">issue #107757</a>.</li>
          <li>v2.1.317 release notes, 3 November 2026: &quot;a check that asks before a web or shell tool call sends your account email address to the network.&quot; See <a href="https://github.com/anthropics/claude-code/releases/tag/v2.1.317" target="_blank" rel="noreferrer">v2.1.317</a>.</li>
          <li>Independent test of the shipped mod code, 6 November 2026: 23 cases run against the real namesUserAgentWithAddress function, 10 blocked, 8 leaked, 4 false refusals, fake address used. See <a href="https://dev.to/frankchu/8-leaks-pass-anthropics-23-test-email-fix-2e66" target="_blank" rel="noreferrer">the dev.to write-up</a>.</li>
          <li>Hacker News front page, 6 November 2026: the leak discussion reached the front page the same day this page was written. Headless-mode details are from issue #107144 as reported in contemporaneous coverage, single source, not independently confirmed.</li>
          <li>Unconfirmed and deliberately not asserted here: any Anthropic statement after 6 November 2026, any extension of the check to WebFetch/WebSearch or MCP tools, and any confirmed spam caused by this leak.</li>
        </ul>
        <p><em>Data checked: 2026-11-06. This is a time-sensitive incident page: if Anthropic extends the check to WebFetch/WebSearch or MCP tools, the conclusion above must be updated rather than defended — re-verify the mods/privacy README before reusing it after November 2026.</em></p>

        <h2>Related tools</h2>
        <p>
          For the separate Postman auto-install incident, run the{' '}
          <Link href="/postman-codex-claude-check">Postman auto-install check</Link>.
          For the Cursor marketplace incident, run the{' '}
          <Link href="/claude-code-cursor-backdoor-check">Cursor backdoor self-check</Link>.
          For cross-harness memory trade-offs, read the{' '}
          <Link href="/beacon-agent-memory">Beacon agent memory guide</Link>, and for
          instruction files, the <Link href="/agents-md-guide">AGENTS.md guide</Link>.
        </p>
      </div>
    </div>
  );
}
