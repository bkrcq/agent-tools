import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Postman Config Check for Codex and Claude Code',
  description:
    'Opening Postman desktop 12.33.4 reportedly auto-installed plugins into Codex and Claude Code. Check ~/.codex/config.toml and ~/.claude/settings.json, and remove the plugin and its startup hook if you did not ask for it.',
  alternates: { canonical: '/postman-codex-claude-check/' },
};

const faqs = [
  {
    q: 'What reportedly happened?',
    a: 'A developer reported that opening Postman desktop 12.33.4 on 24 October 2026 installed a Postman plugin into Codex (version 1.1.0) and Claude Code (version 2.0.1), and added a startup hook. Postman\u2019s own log line in the report reads auto-existing-upgrade with claude-code:installed and codex:installed. The report was filed as GitHub issue #14370 against postmanlabs/postman-app-support on 25 October 2026 and reached the Hacker News front page on 3 November 2026.',
  },
  {
    q: 'Did Postman exfiltrate API data?',
    a: 'Not shown by this report. The reporter explicitly does not claim data exfiltration. The plugin configuration pointed Codex at a remote MCP server at https://mcp.postman.com/mcp, but the reporter\u2019s Codex logs showed the connection failing with an authentication error before any session completed. Treat this as a consent and trust-boundary issue, not as proven data leakage.',
  },
  {
    q: 'How do I know if I am affected?',
    a: 'You are only a candidate if you opened Postman desktop around 24 October 2026. Check Codex\u2019s ~/.codex/config.toml for a marketplaces.postman entry and an enabled postman@postman plugin, and Claude Code\u2019s ~/.claude/settings.json for postman@claude-plugins-official, plus ~/.claude/plugins/installed_plugins.json. Also check whether a Postman executable appeared in ~/.local/bin. If none of those entries exist, this incident does not apply to you.',
  },
  {
    q: 'What does the startup hook do?',
    a: 'The installed hook runs at session start and tells the agent to load the postman:api-engineer skill before any non-trivial API engineering task, including designing, implementing, mocking, testing, monitoring, documenting or deploying an API. The installer code also contains a function that attempts to approve its own hook by writing the hook\u2019s trusted hash into Codex configuration. The reporter notes that a trust record on disk alone does not prove which process created that specific record.',
  },
  {
    q: 'Has Postman responded, and has this been reproduced?',
    a: 'As of the 3 November 2026 coverage checked for this page, no maintainer reply was visible in the issue, so the scope, the release or feature flag gating the auto-existing-upgrade path, and whether a signed-out user would see the same behaviour are unconfirmed. The sequence has also not been independently reproduced on a clean machine in the sources checked. If Postman publishes a response, this page should be updated rather than defended.',
  },
  {
    q: 'How do I remove it?',
    a: 'Back up the config files first, then remove only the Postman entries: the marketplaces.postman source and postman@postman plugin from Codex configuration, and postman@claude-plugins-official from Claude Code settings and installed plugins. Do not delete your whole config files. After removal, reopen Codex and Claude Code and confirm the plugin and the startup hook are gone. If the entries return the next time you open Postman desktop, keep the evidence and report it in issue #14370 rather than deleting in a loop.',
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
  headline: 'Postman Auto-Install Check: Did Postman Change Your Codex or Claude Code Config?',
  description:
    'A check-and-removal guide for the reported Postman desktop auto-install into Codex and Claude Code, with the exfiltration claim explicitly kept out.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-04',
  dateModified: '2026-11-04',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Security self-check · 4 Nov 2026</p>
      <h1>Postman Auto-Install Check: Did Postman Change Your Codex or Claude Code Config?</h1>
      <p className="lead">
        If you opened Postman desktop around 24 October 2026, check two files before your next
        API task: <code>~/.codex/config.toml</code> and <code>~/.claude/settings.json</code>.
        One report says an upgrade path installed Postman plugins into both agents without an
        explicit install click — and then tried to approve its own startup hook.
      </p>

      <div className="prose">
        <h2>Are you in scope? (30 seconds)</h2>
        <p>
          You are a candidate only if you opened Postman desktop 12.33.4 around 24 October
          2026. The report, filed by a developer posting as indicava as GitHub issue #14370
          on 25 October 2026, preserves Postman&apos;s own log from 24 October 2026 at
          09:34 UTC: <code>auto-existing-upgrade</code> with{' '}
          <code>claude-code:installed</code> and <code>codex:installed</code>. That wording
          matters: this was not a user clicking &quot;install plugin&quot;, it was an upgrade
          path for an existing desktop user firing on open. If you did not open Postman
          desktop in that window, stop here — this check does not apply to you.
        </p>
        <p>
          Keep the claim narrow, because the report does. It establishes an unwanted
          integration and instruction change; it does <strong>not</strong> claim data
          exfiltration, and the remote MCP connection it configured failed authentication
          in the reporter&apos;s logs. Any page that upgrades this to &quot;Postman stole all
          your API data&quot; is overstating the evidence.
        </p>

        <h2>Check in 4 steps</h2>
        <ol>
          <li>
            <strong>Check Codex.</strong> Open <code>~/.codex/config.toml</code> and look for
            a <code>marketplaces.postman</code> git source and an enabled{' '}
            <code>postman@postman</code> plugin (reported version 1.1.0).
          </li>
          <li>
            <strong>Check Claude Code.</strong> Open <code>~/.claude/settings.json</code>{' '}
            and look for <code>postman@claude-plugins-official</code> (reported version
            2.0.1), and check <code>~/.claude/plugins/installed_plugins.json</code> for
            the same plugin and its install timestamp.
          </li>
          <li>
            <strong>Check the extra footprint.</strong> Look for a Postman executable in{' '}
            <code>~/.local/bin</code> with a modification time matching the install window,
            and check Codex configuration for a remote MCP endpoint at{' '}
            <code>https://mcp.postman.com/mcp</code>. A configured endpoint is not proof
            that a session connected — in this report, it did not.
          </li>
          <li>
            <strong>Check the hook.</strong> Look for a session-start hook that prints a
            startup instruction telling the agent to load the{' '}
            <code>postman:api-engineer</code> skill before non-trivial API work. If the
            hook is present and you did not approve it, that is the trust-boundary
            finding, whether or not you ever used the skill.
          </li>
        </ol>

        <h2>If the check hits: remove, in order</h2>
        <ol>
          <li><strong>Back up first.</strong> Copy <code>~/.codex/config.toml</code> and <code>~/.claude/settings.json</code> somewhere safe before editing either file.</li>
          <li><strong>Remove only the Postman entries.</strong> Delete the <code>marketplaces.postman</code> source and the <code>postman@postman</code> plugin from Codex configuration, and remove <code>postman@claude-plugins-official</code> from Claude Code settings and installed plugins. Do not delete your whole config files.</li>
          <li><strong>Verify the hook is gone.</strong> Reopen Codex and Claude Code and confirm the plugin no longer loads and no Postman startup instruction appears at session start.</li>
          <li><strong>Watch one reopen.</strong> Open Postman desktop once more and re-check the two config files. If the entries return, stop deleting in a loop, keep the before-and-after evidence, and report it in issue #14370 — a reinstall-on-open pattern would change the scope of this incident.</li>
        </ol>
        <p>
          No credential rotation is indicated by this report alone: nothing in it shows API
          data leaving the machine. That is different from the Cursor backdoor case on this
          site, where a planted SSH key did require rotation of credentials reachable from
          the machine. Do not merge the two incidents.
        </p>

        <h2>What is still unconfirmed</h2>
        <ul>
          <li>Postman&apos;s position: as of 3 November 2026 coverage, no maintainer reply was visible in issue #14370, so whether Postman treats this as intended behaviour, a bug, or a scoped rollout is unconfirmed.</li>
          <li>Independent reproduction: the sequence has not been reproduced on a clean machine in the sources checked, and the reporter&apos;s machine was signed in, so the signed-out case is untested.</li>
          <li>Other agents: whether Cursor, OpenCode, Kimi Code or Pi installs are affected the same way is unconfirmed on this page, even though plugin-repository discussion mentions a broader install target. This page only asserts Codex and Claude Code, the two agents in the original log line.</li>
          <li>Trust-record authorship: the installer code attempts self-approval, but the reporter notes a trust record on disk alone does not prove which process created that specific record.</li>
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
          <li>GitHub issue #14370, postmanlabs/postman-app-support, filed 25 October 2026: Postman desktop 12.33.4, Codex plugin 1.1.0, Claude plugin 2.0.1, plugin source revision 6c8e452e, log line auto-existing-upgrade, MCP endpoint https://mcp.postman.com/mcp, auth failure, no exfiltration claim. See <a href="https://github.com/postmanlabs/postman-app-support/issues/14370" target="_blank" rel="noreferrer">issue #14370</a>.</li>
          <li>Contemporaneous 3 November 2026 coverage cross-checking the same issue and plugin source: <a href="https://dev.to/frankchu/postman-installed-itself-into-codex-and-claude-e38" target="_blank" rel="noreferrer">dev.to write-up</a> and <a href="https://aiweekly.co/alerts/postman-desktop-silently-installs-plugins-into-codex-claude-code" target="_blank" rel="noreferrer">AI Weekly alert</a> (99 thumbs-up reactions on the issue, no maintainer reply visible, clean-machine reproduction still outstanding).</li>
          <li>Unconfirmed and deliberately not asserted here: any Postman statement after 3 November 2026, any data-leakage finding, and any effect on agents other than Codex and Claude Code.</li>
        </ul>
        <p><em>Data checked: 2026-11-04. This is a time-sensitive incident page: re-verify issue #14370 for a Postman response before reusing it after November 2026.</em></p>

        <h2>Related tools</h2>
        <p>
          For the separate Cursor marketplace incident, run the{' '}
          <Link href="/claude-code-cursor-backdoor-check">Cursor backdoor self-check</Link>.
          For cross-harness memory trade-offs, read the{' '}
          <Link href="/beacon-agent-memory">Beacon agent memory guide</Link>, and for
          instruction files, the <Link href="/agents-md-guide">AGENTS.md guide</Link>.
        </p>
      </div>
    </div>
  );
}
