import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Claude Code Cursor Backdoor Self-Check: svc-telemetry Key & 2.1.312 / 2.1.313 Cleanup',
  description:
    'Did you install Claude Code 2.1.312 or 2.1.313 from the Cursor marketplace on 29 Oct 2026? Check for the svc-telemetry SSH key, remove persistence, update to 2.1.314, and rotate credentials.',
  alternates: { canonical: '/claude-code-cursor-backdoor-check/' },
};

const faqs = [
  {
    q: 'Which Claude Code versions were backdoored on Cursor?',
    a: 'Anthropic.claude-code versions 2.1.312 and 2.1.313 distributed through the Cursor VS Code extension marketplace on 29 October 2026, roughly 2:27 a.m. to 1:35 p.m. Pacific Time (about 11 hours). Cursor says these builds were not developed by Anthropic, and that it has no evidence other versions or the official distribution were affected. Cursor asks affected users to update to version 2.1.314.',
  },
  {
    q: 'How do I check for the svc-telemetry SSH key?',
    a: 'Look in your SSH authorized_keys file for a key commented svc-telemetry. On macOS or Linux, search that file for the string svc-telemetry. Because a comment can be changed, Phorion recommends also matching the key fingerprint itself: the victim-login key fingerprint published in its advisory is SHA256:0Z6R+DF64Do2nwQic8a7kkfDLNNk4IiK+2U2Rci4htk. If either check hits, treat the machine as affected even if you already uninstalled the extension.',
  },
  {
    q: 'Is uninstalling the extension enough?',
    a: 'No. Both Cursor and Phorion say the payload installs standalone persistence that survives uninstalling the extension: a LaunchAgent on macOS, a scheduled task on Windows, and cron logic for Linux in the analysed payload. Cursor confirms distribution of the tampered package for macOS and Windows only; the Linux persistence is payload logic described by Phorion, not a confirmed distribution channel. Remove the key, the persistence, and any running tunnel process, and use Cursor\u2019s platform remediation scripts.',
  },
  {
    q: 'Does finding the key mean someone logged in to my machine?',
    a: 'Not necessarily. Finding the key means the backdoor was installed, not that it was used. Cursor says enabling the local SSH service generally required administrator privileges that the extension typically lacked on macOS and Windows, and that bugs in the malicious code would break that step unless the editor ran with administrator privileges. Cursor also says the attacker server has been taken offline, so the reverse tunnel and host-detail beacon no longer function. Do not treat that as a clean bill of health: a planted key and persistence remain a risk until removed, and credentials reachable from the machine should still be rotated.',
  },
  {
    q: 'What did the backdoor collect?',
    a: 'According to Cursor and Phorion, the payload collected host and user information (hostname, username, operating system, architecture, home directory, working directory, configured Git email, public IP address) and the names, not the contents, of up to 40 environment variables matching credential-like patterns (KEY, TOKEN, SECRET, PASS, AWS, GCP and similar). The limited collection does not rule out later credential access over the backdoor, which is why Cursor advises rotating credentials accessible from an affected machine.',
  },
  {
    q: 'What should I do if my check comes back clean?',
    a: 'If you did not install or update to 2.1.312 or 2.1.313 from the Cursor marketplace on 29 October 2026, no action is needed for this incident. If you did install one of those versions and the key check is clean, still update to 2.1.314, check for unexpected persistence (LaunchAgent on macOS, scheduled task on Windows), and keep the incident in mind if anything odd appears later. A clean key check is reassuring, not proof that nothing else ran.',
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
  headline: 'Claude Code Cursor Backdoor Self-Check: svc-telemetry Key & 2.1.312 / 2.1.313 Cleanup',
  description:
    'Self-check guide for the backdoored Claude Code extension versions distributed through the Cursor marketplace on 29 October 2026.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-10-31',
  dateModified: '2026-10-31',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Security self-check · 31 Oct 2026</p>
      <h1>Claude Code Cursor Backdoor Self-Check</h1>
      <p className="lead">
        If you installed or updated Claude Code from the Cursor marketplace on 29 October 2026,
        uninstalling the extension is not enough. Check for the planted <code>svc-telemetry</code> SSH
        key first — that one check decides everything else on this page.
      </p>

      <div className="prose">
        <h2>Are you in scope? (30 seconds)</h2>
        <p>
          You are in scope only if <strong>all three</strong> are true: you use Cursor, you got
          the Claude Code extension from Cursor&apos;s own marketplace, and you installed or updated
          to version <strong>2.1.312 or 2.1.313</strong> during the window of about 2:27 a.m. to
          1:35 p.m. Pacific Time on 29 October 2026 (about 11 hours). Cursor says those builds
          were not developed by Anthropic, that at most about 5,000 users were affected, and that
          it has no evidence other versions or the official distribution were affected. If none of
          that applies to you, stop here — this incident does not need action from you.
        </p>
        <p>
          One naming trap to avoid: this is about the <em>extension distributed through Cursor&apos;s
          marketplace</em>, not about Claude Code itself, and not about the separate agent_summary
          token-cost issue. If you are here for token cost, see the{' '}
          <Link href="/claude-code-agent-summary-cost">agent_summary cost calculator</Link> instead.
        </p>

        <h2>Self-check in 4 steps</h2>
        <ol>
          <li>
            <strong>Check the SSH key.</strong> On macOS or Linux, search your{' '}
            <code>~/.ssh/authorized_keys</code> file for the string <code>svc-telemetry</code>.
            On Windows, check the same file (and the administrator account&apos;s copy) with
            PowerShell, as Cursor&apos;s notice describes. Phorion recommends matching the key
            fingerprint as well, not just the comment: the published victim-login fingerprint is{' '}
            <code>SHA256:0Z6R+DF64Do2nwQic8a7kkfDLNNk4IiK+2U2Rci4htk</code>. You can list the
            fingerprints in an authorized_keys file with <code>ssh-keygen -lf</code> and compare.
          </li>
          <li>
            <strong>Check persistence.</strong> Look for unexpected persistence the extension
            could not remove by uninstalling: a LaunchAgent on macOS, a scheduled task on
            Windows. The analysed payload also contained Linux cron logic, but Cursor confirms
            distribution only for macOS and Windows — check Linux persistence only if you have
            reason to believe a tampered build ran there.
          </li>
          <li>
            <strong>Check for a running tunnel process.</strong> The payload tried to reconnect
            roughly every 60 seconds. Cursor says the attacker server has since been taken offline,
            so a tunnel attempt today should fail — but a still-running process is still evidence
            the payload executed and should be stopped.
          </li>
          <li>
            <strong>Decide by the result, not by how you feel about it.</strong> Key or persistence
            found means affected: follow the cleanup below. Nothing found, and you were in scope,
            still means update and stay alert (see the last FAQ). Nothing found and you were never
            in scope means no action.
          </li>
        </ol>

        <h2>If the check hits: cleanup, in order</h2>
        <ol>
          <li><strong>Isolate the machine</strong> if there is any evidence the backdoor was installed or used, and do credential rotation from a different, trusted computer.</li>
          <li><strong>Remove the planted key</strong> from <code>authorized_keys</code>, and remove the persistence mechanism and any running tunnel process. Use Cursor&apos;s platform-specific remediation scripts for macOS and Windows rather than hand-editing alone.</li>
          <li><strong>Update to Claude Code for VS Code 2.1.314</strong> through a trusted source, as Cursor asks.</li>
          <li><strong>Rotate credentials accessible from that machine</strong> — especially anything matching the credential-like environment variable patterns the payload inventoried (API keys, tokens, cloud credentials). Rotate from a trusted machine, not the affected one.</li>
          <li><strong>Consider rebuilding the host</strong> rather than trusting a cleanup alone, as Cursor advises assessing. A rebuild is the conservative choice when the key was present or there is evidence of use.</li>
        </ol>
        <p>
          Do not copy commands from random threads for this cleanup. The check above is a search
          for a published indicator; the removal steps should come from Cursor&apos;s own notice
          and remediation scripts, which are the authoritative source for this incident.
        </p>

        <h2>What the backdoor did, in plain terms</h2>
        <p>
          The tampered build ran as soon as the extension loaded — no click or approval needed —
          collected host details and the names (not contents) of up to 40 credential-like
          environment variables, appended an attacker-controlled SSH key to{' '}
          <code>authorized_keys</code>, tried to enable the local SSH service, and opened a
          reverse SSH tunnel with persistence that restarts after reboot. Cursor says the SSH
          step generally required administrator privileges the extension typically lacked, and
          that bugs in the malicious code would break it unless the editor ran as administrator.
          That is why most in-scope installs may never have become remotely reachable — and why
          a planted key still has to be removed rather than assumed harmless.
        </p>
        <p>
          Cursor&apos;s response, per its notice: the tampered versions were removed and further
          distribution blocked, the whole marketplace was shut down as a precaution, access was
          audited with no other extensions found tampered with, keys were rotated, the
          marketplace was rebuilt and restored, and the attacker server was taken offline with
          its hosting provider. Cursor says it will reach out to affected users directly.
        </p>

        <h2>Frequently asked questions</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>Sources and what is still unconfirmed</h2>
        <ul>
          <li>Cursor security notice, updated 30 October 2026: affected versions 2.1.312 and 2.1.313, about 11-hour window on 29 October 2026, at most about 5,000 users, not developed by Anthropic, marketplace shutdown and rebuild, attacker server offline, remediation scripts, update to 2.1.314.</li>
          <li>Phorion advisory, updated 31 October 2026: backdoor in the official Claude Code extension bundle on the Cursor marketplace, macOS focus with Windows and Linux payload logic, svc-telemetry key and tunnel key fingerprints, fingerprint-over-comment matching advice. See <a href="https://phorion.io/blog/offical-claude-code-vsx-compromise/" target="_blank" rel="noreferrer">Phorion&apos;s advisory</a>.</li>
          <li>Contemporaneous coverage cross-checking the same notice: <a href="https://devops.com/malicious-claude-code-extension-affects-up-to-5000-cursor-users" target="_blank" rel="noreferrer">DevOps.com</a> and <a href="https://www.unite.ai/cursor-discloses-ssh-backdoor-attempt-in-malicious-claude-code-extension/" target="_blank" rel="noreferrer">Unite.AI</a> (window, version list, 5,000-user estimate, remediation advice).</li>
          <li>Unconfirmed / not assumed on this page: how the tampered package reached the Cursor marketplace, how many of the at-most-5,000 users actually ended up with the key on disk, any Linux distribution of the tampered build (Cursor confirms macOS and Windows only), and a separate Anthropic statement beyond Cursor&apos;s account. This page publishes no payload code and no attacker infrastructure details beyond the published key indicator needed for the check.</li>
        </ul>
        <p><em>Data checked: 2026-10-31. This is a time-sensitive incident page: re-verify the affected-version list and Cursor&apos;s notice before reusing it after October 2026.</em></p>

        <h2>Related tools</h2>
        <p>
          For the separate token-cost issue, use the{' '}
          <Link href="/claude-code-agent-summary-cost">agent_summary cost calculator</Link>.
          To plan the full budget, read the <Link href="/ai-token-usage-guide">AI token usage guide</Link>{' '}
          or run the <Link href="/ai-coding-agent-setup">AI coding agent setup checklist</Link>.
        </p>
      </div>
    </div>
  );
}
