import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Claude Code Secret Leak: 'Don't Ask Again'",
  description:
    'Apiiro found 1,122 public copies of Claude Code’s .claude/settings.local.json holding real secrets. Search your GitHub org, check git history, and rotate anything that was committed — deleting the file is not enough.',
  alternates: { canonical: '/claude-code-secret-leak-check/' },
};

const faqs = [
  {
    q: 'What happened?',
    a: 'Security firm Apiiro published research on 5 November 2026 showing that when you pick "Yes, and don’t ask again" on a Bash command in Claude Code, the assistant saves that exact command — password or token included — as an allow rule in .claude/settings.local.json inside the project folder. If that file is committed and pushed, the secret goes public with it. Apiiro examined 104,185 public copies of the file on GitHub and classified 1,122 of them (about 1.1%) as holding a real secret, 1,379 distinct secrets in total.',
  },
  {
    q: 'Am I affected?',
    a: 'You are a candidate if you ever approved a Claude Code Bash command containing a credential with "Yes, and don’t ask again", and the project was pushed to a public repository. Search your GitHub organisation or user account for .claude/settings.local.json and .claude/settings.json: every hit on a public repository is a file anyone can read right now. Also check the allow rules in your local copies and your git history — a file that was committed once and later deleted still counts.',
  },
  {
    q: 'I deleted the file from the repo. Am I safe now?',
    a: 'No. Deleting the file does not stop the leak. In the median leaking repository the file had already sat on the default branch for 217 days, and older versions of it hold 734 more secrets across 509 repositories. Forks keep copies too: Apiiro counted 211 forks of 74 repositories propagating the same secrets. Any secret that appeared in a committed file must be rotated, even if the file is gone.',
  },
  {
    q: 'Will gitleaks or TruffleHog catch it?',
    a: 'Not reliably. Apiiro ran both scanners over all 104,185 files. Of the 1,122 files with a real secret, gitleaks flagged 564 and TruffleHog flagged 643 — and 215 were flagged by neither (19.2%). The misses are mostly passwords typed inline in commands, such as PGPASSWORD=..., sshpass -p, or mysql -p, rather than keys in a recognisable format. Run the scanners, but do not treat a clean scan as proof you are safe.',
  },
  {
    q: 'Were the leaked credentials actually used?',
    a: 'Not shown by this research. Apiiro states plainly that no credential was used or tested and no host was contacted, so the counts are classified exposures, not proven live credentials. One company the researchers notified on 2–3 November 2026 confirmed its exposed key had been live. Treat this as exposure risk, not as a demonstrated compromise — and rotate anyway, because "probably still valid" is the wrong bet to take with a database password.',
  },
  {
    q: 'Did Anthropic know about this?',
    a: 'The behaviour was reported on Claude Code’s GitHub tracker as early as 11 August 2025 (issue #5544), warning that approved commands with API keys and tokens were stored word for word in settings.local.json. Apiiro cites four related reports; none received a reply from Anthropic, and all four were closed by an automated bot, the most recent the day before the research was published. As of the 7 November 2026 coverage checked for this page, no vendor patch or statement was cited.',
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
  headline: "Claude Code Secret Leak Check: Did 'Don't Ask Again' Save Your Password to GitHub?",
  description:
    'A check-and-rotation guide for the Apiiro finding that Claude Code approval files on public GitHub hold real secrets, with the exposure claim kept to what the research actually shows.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-08',
  dateModified: '2026-11-08',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Security self-check · 8 Nov 2026</p>
      <h1>Claude Code Secret Leak Check: Did &lsquo;Don&rsquo;t Ask Again&rsquo; Save Your Password to GitHub?</h1>
      <p className="lead">
        One click in Claude Code can turn a database password into a public file. If you ever
        approved a Bash command containing a credential with &ldquo;Yes, and don&rsquo;t ask
        again&rdquo;, check your GitHub organisation before your next commit: Apiiro found
        1,122 public copies of <code>.claude/settings.local.json</code> holding real secrets.
      </p>

      <div className="prose">
        <h2>Are you in scope? (30 seconds)</h2>
        <p>
          You are a candidate only if two things are true: you use Claude Code, and you have
          at some point approved a command that contained a password, token, or key with{' '}
          <code>Yes, and don&rsquo;t ask again</code>. The research, published by Apiiro on
          5 November 2026, is specific about the mechanism: the approval is saved as an{' '}
          <code>allow</code> rule in <code>.claude/settings.local.json</code>, and the rule is
          the command string itself — secret included, word for word. If you never put a
          credential in a command line, stop here — this check does not apply to you.
        </p>
        <p>
          Keep the claim narrow, because the research does. It establishes an exposure risk,
          not a breach: Apiiro did not test whether any credential still works, and no host
          was contacted. One notified company confirmed its key had been live. Any page that
          upgrades this to &ldquo;1,122 passwords were stolen&rdquo; is overstating the
          evidence.
        </p>

        <h2>How a secret lands in the file</h2>
        <p>
          Ask Claude Code to check a database or call an API, and the command it proposes
          carries the secret from your config. It asks before running it. Pick{' '}
          <code>Yes, and don&rsquo;t ask again</code> and Claude Code saves that exact
          command as a standing approval, so it can run again without another prompt. The
          file is meant to stay on your machine — and the first time Claude Code writes it
          inside a git repository, it adds{' '}
          <code>**/.claude/settings.local.json</code> to your global git excludes file. That
          covers the common case, but Apiiro lists the gaps: a folder that becomes a
          repository later, a clone on another computer, or a file that was already
          committed. The rule never goes into the project&rsquo;s own{' '}
          <code>.gitignore</code>, so nothing in the repo marks the file as private. In 539
          of the 1,105 leaking repositories Apiiro traced, a commit co-authored by Claude
          had changed the file.
        </p>
        <p>
          Apiiro says this is &ldquo;Claude Code&rsquo;s own behavior, not the
          model&rsquo;s&rdquo;: it reproduced the behaviour with Opus 5.5 and Fable 5.1,
          and of 16 coding agents whose documentation it compared, Claude Code was the only
          one confirmed to write the full approved command to a project file by default.
        </p>

        <h2>What Apiiro found</h2>
        <ul>
          <li><strong>104,185</strong> public copies of <code>.claude/settings.local.json</code> in 103,617 repositories; <strong>1,122</strong> of them (about 1.1%) hold a real secret, <strong>1,379</strong> distinct secrets in total — 636 keys in a known provider format and 743 passwords or tokens next to a public host.</li>
          <li><strong>379</strong> database passwords, <strong>43</strong> SSH logins for public servers, <strong>42</strong> GitHub, GitLab or npm tokens, <strong>23</strong> AWS keys — plus 122 Supabase service-role keys. Named examples include a database vendor&rsquo;s own admin-level cloud key, a production Azure PostgreSQL password, a Square production token, and the owner password of a medical-records database.</li>
          <li><strong>2,539</strong> distinct secrets across <strong>1,994</strong> repositories and <strong>63</strong> organisations when git history, the shared <code>.claude/settings.json</code>, and saved agent transcripts are counted too — 1,160 more than the current local-file subset. Older versions of the file hold 734 more secrets across 509 repositories, and 298 of 76,011 public copies of the shared settings file hold secrets, mostly inside allow rules.</li>
          <li><strong>217 days</strong> is the median time a leaking file had already sat on its repository&rsquo;s default branch. Every file with a secret was still on its default branch as of 2 November 2026.</li>
          <li><strong>215 of 1,122</strong> files (19.2%) were flagged by neither gitleaks (564) nor TruffleHog (643).</li>
        </ul>

        <h2>Check in 5 steps</h2>
        <ol>
          <li>
            <strong>Search GitHub.</strong> In your organisation or user account, run a code
            search for <code>path:.claude/settings.local.json</code>, then repeat for{' '}
            <code>path:.claude/settings.json</code>. Each hit on a public repository is a file
            anyone can read right now. Apiiro&rsquo;s own advice is the same search.
          </li>
          <li>
            <strong>Read your local allow rules.</strong> Open{' '}
            <code>.claude/settings.local.json</code> in each project and look for allow rules
            containing a credential — inline passwords such as{' '}
            <code>PGPASSWORD=...</code>, <code>sshpass -p</code>, <code>mysql -p</code>, a{' '}
            <code>-u user:password</code> pair, or a pasted API key. The rule is the command,
            so the secret is visible in plain text.
          </li>
          <li>
            <strong>Check git history.</strong> Run{' '}
            <code>git log --all --oneline -- .claude/settings.local.json</code> in each repo.
            A file committed once and deleted later still counts: history and forks keep it.
            Apiiro counted 211 forks of 74 repositories propagating the same secrets.
          </li>
          <li>
            <strong>Check the shared file too.</strong>{' '}
            <code>.claude/settings.json</code> is committed on purpose by teams, and 298 of
            its 76,011 public copies held secrets, mostly inside allow rules. A separate
            open bug report says approvals sometimes land in this shared file instead of the
            local one.
          </li>
          <li>
            <strong>Run the scanners — then distrust a clean result.</strong> Run gitleaks
            and TruffleHog over the two files and your history. A clean scan does not prove
            you are safe: 215 of the 1,122 secret-bearing files slipped past both.
          </li>
        </ol>

        <h2>If the check hits: rotate, in order</h2>
        <ol>
          <li><strong>Rotate first.</strong> Every secret that appeared in a committed file must be rotated, even if the file was deleted minutes later. Deleting the file is not the fix — rotation is. The median leaking file had been public for 217 days.</li>
          <li><strong>Remove the file from the repo.</strong> Untrack it and add <code>**/.claude/settings.local.json</code> to the project&rsquo;s own <code>.gitignore</code> as belt-and-braces, on top of Claude Code&rsquo;s global exclude. Confirm the global exclude is actually in place on every machine you use.</li>
          <li><strong>Clean history if you can — but do not stop there.</strong> Rewriting history (git filter-repo or BFG) removes the secret from your repo, not from forks or anyone who already cloned it. History cleaning without rotation leaves the credential live.</li>
          <li><strong>Stop putting secrets in commands.</strong> Pass credentials through environment variables or a secrets manager, never inline in a shell command. And never approve &ldquo;don&rsquo;t ask again&rdquo; on a command that contains one — a standing approval is a standing copy of the secret.</li>
          <li><strong>Re-check the org search after cleanup.</strong> Confirm the public copies are gone, and check the shared <code>.claude/settings.json</code> the same way. If a fork you do not control still hosts the file, the rotation in step 1 is what protects you.</li>
        </ol>

        <h2>What is still unconfirmed</h2>
        <ul>
          <li>Whether any leaked credential beyond the one confirmed case was actually used — Apiiro tested none and contacted no host, so the scale of live misuse is unconfirmed.</li>
          <li>Whether Anthropic will change the behaviour: four bug reports since August 2025 received no reply and were closed by a bot, and no vendor patch or statement was cited in the 7 November 2026 coverage checked for this page.</li>
          <li>Exposure beyond public GitHub: Apiiro counted only what GitHub code search could see between 1 and 3 November 2026. The same file sits in plain text on every laptop where someone clicked &ldquo;don&rsquo;t ask again&rdquo;.</li>
          <li>The classification method itself: a &ldquo;real secret&rdquo; means a value matching a provider format or sitting beside a public host, reviewed with an LLM on masked candidates — Apiiro&rsquo;s method, not independently replicated.</li>
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
          <li>Apiiro research, published 5 November 2026 (Shmulik Cohen and Matan Giladi): 104,185 public copies, 1,122 with a real secret, 1,379 distinct secrets; 2,539 total across 1,994 repositories and 63 organisations; scanner counts; 217-day median; disclosure 2–3 November 2026. See <a href="https://apiiro.com/blog/coding-agents-leaking-secrets-github-dont-ask-again/" target="_blank" rel="noreferrer">the Apiiro write-up</a>.</li>
          <li>The Hacker News, 7 November 2026: the same figures, the 539-of-1,105 Claude-co-authored commits, and the four bug reports closed by bot. See <a href="https://thehackernews.com/2026/11/claude-codes-dont-ask-again-file.html" target="_blank" rel="noreferrer">the THN report</a>.</li>
          <li>Contemporaneous 7–8 November 2026 coverage cross-checking the same research: <a href="https://cybersecuritynews.com/claude-codes-yes-and-dont-ask-again/" target="_blank" rel="noreferrer">Cybersecurity News</a> (122 Supabase service-role keys) and <a href="https://madrobot.blog/2026/11/07/claude-code-dont-ask-again-secrets-github/" target="_blank" rel="noreferrer">madrobot</a>.</li>
          <li>Unconfirmed and deliberately not asserted here: any Anthropic statement or patch after 7 November 2026, any credential misuse beyond the single confirmed live key, and any exposure count beyond public GitHub.</li>
        </ul>
        <p><em>Data checked: 2026-11-08. This is a time-sensitive incident page: re-verify the Apiiro write-up for an Anthropic response before reusing it after November 2026.</em></p>

        <h2>Related tools</h2>
        <p>
          For the separate Cursor marketplace incident, run the{' '}
          <Link href="/claude-code-cursor-backdoor-check">Cursor backdoor self-check</Link>.
          For the Postman desktop auto-install report, run the{' '}
          <Link href="/postman-codex-claude-check">Postman auto-install check</Link>, and for
          instruction files, the <Link href="/agents-md-guide">AGENTS.md guide</Link>.
        </p>
      </div>
    </div>
  );
}
