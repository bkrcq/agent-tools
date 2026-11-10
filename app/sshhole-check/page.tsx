import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'sshhole Check: Is Your SSH Server Exposed?',
  description:
    'CVE-2026-123158 (sshhole): a 257-byte password can log into locked accounts on musl Linux without PAM. Five read-only checks \u2014 no credentials needed.',
  alternates: { canonical: '/sshhole-check/' },
};

const faqs = [
  {
    q: 'Is sshole a tool I install?',
    a: 'No. sshole is the nickname for CVE-2026-123158, a password authentication bypass in OpenSSH on musl Linux without PAM \u2014 not a terminal-sharing or tunneling tool. The repository oz9un/sshole is the researcher\u2019s disclosure: a check script (check.sh), a Docker proof of concept and the upstream patch. Nothing in it is installed as a service.',
  },
  {
    q: 'Does it affect my Ubuntu, Debian or macOS server?',
    a: 'No. The bypass needs sshd built against musl libc and running without PAM. Debian, Ubuntu, Fedora, RHEL and other glibc distributions are not affected, nor are systems that check passwords through PAM, Dropbear, or non-Linux systems. If your server is not musl-based, you can stop here.',
  },
  {
    q: 'Does sshole bypass real passwords?',
    a: 'No. It only opens accounts whose password field in /etc/shadow is exactly a single asterisk (*), meaning the account was never supposed to accept a password at all. Accounts with a real password hash are not affected, and the flaw does not let an attacker read or guess any password.',
  },
  {
    q: 'My SSH banner says OpenSSH_10.2 \u2014 am I vulnerable?',
    a: 'The banner version alone cannot tell you. Alpine backported the fix into the OpenSSH version each branch already ships, so a patched server can still report an old version. Check the installed package release against the fixed-package table below instead of trusting the banner.',
  },
  {
    q: 'Has sshole been exploited in the wild?',
    a: 'Reported, but the evidence is one vendor\u2019s observation. Threat-intel firm Previdian told The Hacker News it saw the first exploitation attempt less than nine hours after disclosure and confirmed root access on an Alpine honeypot; other outlets noted on 6 November that exploitation had not been independently established. CISA has since added CVE-2026-123158 to its Known Exploited Vulnerabilities catalog. Patch on the strength of the bug itself, not on the exploitation claims.',
  },
  {
    q: 'Can I just run the researcher\u2019s check.sh?',
    a: 'Yes, on your own machine. It only inspects local configuration and prints a verdict \u2014 which condition is present or missing \u2014 and it sends nothing anywhere. Read it first, and run it with sudo because reading /etc/shadow needs root. If you would rather not run a downloaded script, the five manual checks below do the same thing.',
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
  headline: 'sshhole (CVE-2026-123158): Is Your SSH Server Exposed?',
  description:
    'Five read-only checks for the OpenSSH musl password bypass: who is exposed, who is not, and how to fix it by upgrading or turning off password logins.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">SSH security check &middot; 10 Nov 2026</p>
      <h1>sshhole (CVE-2026-123158): Is Your SSH Server Exposed?</h1>
      <p className="lead">
        On 5 November 2026, OpenSSH shipped 10.6p2 as an emergency workaround for a password
        authentication bypass on musl Linux without PAM. A password of 257 to 1,024 bytes can
        log into an account that was never supposed to accept a password at all &mdash; root on
        Alpine, key-only service accounts, LDAP users. The flaw is tracked as CVE-2026-123158
        (CVSS 8.1, High) and was reported by &Ouml;zg&uuml;n K&uuml;ltekin of Wakefield, who
        published the write-up under the name <em>sshhole</em>. This page is a self-check: five
        read-only conditions, all of which must be true for a server to be exposed. Nothing here
        asks for your passwords, keys or hostnames, and every check runs on your own machine.
      </p>

      <div className="prose">
        <h2>What sshole is &mdash; and what it is not</h2>
        <p>
          sshole is not a tunneling or terminal-sharing tool. It is the nickname for this bypass,
          and the name of the researcher&rsquo;s disclosure repository (
          <code>oz9un/sshole</code>, MIT-licensed), which ships a check script, a Docker proof of
          concept and the upstream patch. The mechanism, in plain language:
        </p>
        <ol>
          <li>
            <strong>Locked accounts are stored as a single asterisk.</strong> In{' '}
            <code>/etc/shadow</code>, an account that should never take a password has{' '}
            <code>*</code> as its password field. No password should ever match it.
          </li>
          <li>
            <strong>musl&rsquo;s crypt() gives up on long passwords by returning &ldquo;*&rdquo;.</strong>{' '}
            For SHA-256/SHA-512 hashes, musl refuses keys longer than 256 bytes and signals the
            failure by returning the string <code>*</code> &mdash; a behaviour dating to 2012.
          </li>
          <li>
            <strong>sshd compares the two asterisks and they match.</strong> Since a 2016 change
            (part of the fix for CVE-2016-6210), sshd borrows another account&rsquo;s salt when the
            stored field is too short to hold one. Feed it a 257&ndash;1,024 byte password, musl
            returns <code>*</code>, and <code>*</code> equals the stored <code>*</code>. Login
            succeeds on the first connection, with no retries.
          </li>
        </ol>
        <p>
          OpenSSH&rsquo;s own release notes call the root cause outside sshd but &ldquo;exploitable via
          sshd and can be avoided there&rdquo;, and 10.6p2 refuses a match when the stored hash is
          shorter than four characters. The musl maintainer&rsquo;s position, reported in coverage,
          is that this is not a musl vulnerability. Either way, the fix lives in sshd and in
          your distribution&rsquo;s patched package.
        </p>

        <h2>The 5-condition self-check</h2>
        <p>
          You are exposed only if <strong>all five</strong> of these are true. Check them in
          order; the first one that fails ends the check. All commands are read-only &mdash; they
          print configuration, they do not log in anywhere or change anything.
        </p>
        <ol>
          <li>
            <strong>The system uses musl libc.</strong> Alpine, OpenWrt, Buildroot, Yocto and
            similar. Check with <code>cat /etc/os-release</code>, or{' '}
            <code>ldd /usr/sbin/sshd | grep -i musl</code> (a musl loader in the output means
            musl). Debian, Ubuntu, Fedora and RHEL use glibc: not affected.
          </li>
          <li>
            <strong>sshd runs without PAM.</strong> Alpine&rsquo;s standard{' '}
            <code>openssh-server</code> package is built without PAM. Check the effective config:{' '}
            <code>sudo sshd -T | grep -i usepam</code> &mdash; you want <code>usepam no</code> or
            no line at all (no is the default). Running{' '}
            <code>openssh-server-pam</code> with <code>UsePAM yes</code> is safe.
          </li>
          <li>
            <strong>Password logins are on.</strong>{' '}
            <code>sudo sshd -T | grep -i passwordauthentication</code> &mdash;{' '}
            <code>passwordauthentication yes</code> is the OpenSSH default, and the bypass needs
            it. If it says <code>no</code>, the flaw has nothing to act on.
          </li>
          <li>
            <strong>At least one account has exactly <code>*</code> as its password field.</strong>{' '}
            <code>sudo awk -F: &apos;$2 == &quot;*&quot; &#123;print $1&#125;&apos; /etc/shadow</code>{' '}
            lists them. On Alpine this is usually root, plus any key-only service account and
            LDAP-backed users.
          </li>
          <li>
            <strong>At least one account has a real $5$ or $6$ password hash.</strong>{' '}
            <code>sudo awk -F: &apos;$2 ~ /^\$[56]\$/ &#123;print $1&#125;&apos; /etc/shadow</code>{' '}
            lists them. One user with a password is enough: sshd borrows that account&rsquo;s salt,
            which is what makes the comparison possible. A fresh Alpine image with no passwords
            set anywhere fails this condition.
          </li>
        </ol>
        <p>
          <strong>Verdict:</strong> all five true means exposed &mdash; patch now (below). Any
          one false means this bug cannot bite that server. If you prefer a script to the manual
          steps, the researcher&rsquo;s <code>check.sh</code> automates exactly this test:
        </p>
        <p>
          <code>curl -sO https://raw.githubusercontent.com/oz9un/sshole/main/check.sh</code>
          <br />
          <code>sudo sh check.sh</code>
        </p>
        <p>
          Read the script before running it as root. It prints which condition is missing if
          you are not exposed, and names the exposed accounts if you are.
        </p>

        <h2>Who is not affected</h2>
        <ul>
          <li><strong>glibc distributions</strong> (Debian, Ubuntu, Fedora, RHEL and derivatives) and any sshd linked against glibc.</li>
          <li><strong>sshd running with PAM</strong> (<code>UsePAM yes</code>), including Alpine&rsquo;s <code>openssh-server-pam</code> package configured that way.</li>
          <li><strong>PasswordAuthentication no</strong> &mdash; no password logins, no bypass.</li>
          <li><strong>Dropbear, OpenBSD, FreeBSD and macOS</strong> sshd.</li>
          <li><strong>Containers and images that do not run sshd at all</strong> &mdash; most Alpine-based Docker images have nothing to patch.</li>
        </ul>
        <p>
          One nuance: on Alpine, root is usually <code>root:*</code>, but the default{' '}
          <code>PermitRootLogin prohibit-password</code> blocks password logins for root, so root
          is not directly reachable this way unless that setting was loosened. The sharper risk
          is key-only service accounts, LDAP users, and the <code>alpine</code> user on
          Alpine&rsquo;s official AWS/Azure images, which ships with passwordless{' '}
          <code>doas</code> &mdash; logging in as that user is effectively root.
        </p>

        <h2>Fix it: upgrade, then restart sshd</h2>
        <p>
          Two options. Upgrading is the fix; turning off password logins is the mitigation if
          you cannot upgrade yet.
        </p>
        <ol>
          <li>
            <strong>Upgrade OpenSSH to 10.6p2 or your distribution&rsquo;s patched package.</strong>{' '}
            On Alpine: <code>apk upgrade -U -a</code>. Alpine backported the fix, so check the
            package release, not the version number:
          </li>
        </ol>
        <ul>
          <li>Alpine edge: <code>openssh 10.6_p2-r0</code></li>
          <li>Alpine 3.24: <code>openssh 10.3_p1-r2</code></li>
          <li>Alpine 3.23: <code>openssh 10.2_p1-r1</code></li>
          <li>Alpine 3.22: <code>openssh 10.0_p1-r11</code></li>
          <li>Alpine 3.21: <code>openssh 9.9_p2-r1</code></li>
          <li>Alpine 3.16&ndash;3.20 (past end of support, patched anyway): per the Alpine advisory</li>
        </ul>
        <ol start={2}>
          <li>
            <strong>Restart sshd.</strong> <code>rc-service sshd restart</code> (or your init
            system&rsquo;s equivalent). Upgrading alone does not replace the running daemon, so
            the old process keeps accepting logins with the old code until it is restarted.
          </li>
          <li>
            <strong>Or, if you cannot upgrade yet:</strong> set{' '}
            <code>PasswordAuthentication no</code> in <code>sshd_config</code> and restart sshd.
            That closes the bypass completely. OpenSSH maintainer Damien Miller&rsquo;s advice to
            operators of affected systems was to do this, or disable SSH, immediately.
          </li>
        </ol>
        <p>
          Fix status for OpenWrt, Buildroot and Yocto was <strong>unconfirmed</strong> as of
          6 November 2026 &mdash; check your vendor&rsquo;s advisory rather than assuming the
          Alpine table covers them.
        </p>

        <h2>Check your logs (optional, after patching)</h2>
        <p>
          If the server was exposed, look for password logins by accounts that have no password.
          On Alpine, auth events land in <code>/var/log/messages</code>; search it for{' '}
          <code>Accepted password</code> lines naming a <code>*</code> account. A match is
          evidence of exploitation, not a false positive &mdash; treat the host as compromised:
          rebuild it rather than trying to clean it in place. If the logs do not go back far
          enough, you cannot rule exploitation out from logs alone.
        </p>

        <h2>What this page does not do</h2>
        <ul>
          <li>No exploit steps. The researcher&rsquo;s repository contains a Docker proof of concept; this page deliberately does not reproduce it.</li>
          <li>No credential collection. The checks above read your own server&rsquo;s configuration files. Never paste a password, private key or hostname into any web page or tool that asks for one &mdash; including this site, which has no input form at all.</li>
          <li>Do not test servers you do not own or administer. Probing someone else&rsquo;s SSH port with oversized passwords is unauthorized access, not a self-check.</li>
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
          <li>OpenSSH 10.6p2 release notes (5 November 2026): &ldquo;a critical security workaround that affects Linux systems that use the musl libc and PAM disabled&rdquo;; the bypass is &ldquo;exploitable through sshd(8)&rdquo; and was reported by &Ouml;zg&uuml;n K&uuml;ltekin of Wakefield. See <a href="https://www.openssh.com/releasenotes.html" target="_blank" rel="noreferrer">openssh.com/releasenotes.html</a>.</li>
          <li>Researcher&rsquo;s repository and disclosure, oz9un/sshole (MIT license): the five exposure conditions, the check script, the Docker proof of concept and the upstream patch. See <a href="https://github.com/oz9un/sshole" target="_blank" rel="noreferrer">github.com/oz9un/sshole</a>. The researcher&rsquo;s full write-up is at sshhole.com (unreachable from our network at check time; the repository README carries the same facts).</li>
          <li>CVE-2026-123158, CVSS 3.1 score 8.1 (High) from MITRE, vector CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H. See <a href="https://nvd.nist.gov/vuln/detail/CVE-2026-123158" target="_blank" rel="noreferrer">NVD</a> and <a href="https://www.cve.org/CVERecord?id=CVE-2026-123158" target="_blank" rel="noreferrer">cve.org</a>.</li>
          <li>Alpine Linux security advisory (5 November 2026): fixed openssh packages for every branch back to 3.16, and the <code>apk upgrade -U -a</code> + <code>rc-service sshd restart</code> procedure. Version table as reproduced by <a href="https://www.fosslinux.com/163555/alpine-openssh-password-bypass.htm" target="_blank" rel="noreferrer">FOSS Linux</a> and <a href="https://jaroha.com/articles/main/openssh-10-6p2-fix-who-is-exposed-to-the-password-bypass-flaw-and-who-isn-t" target="_blank" rel="noreferrer">Jaroha</a>.</li>
          <li>Exploitation claims: The Hacker News, 8 November 2026, reporting threat-intel firm Previdian (first attempt under nine hours after disclosure; root on an Alpine honeypot). See <a href="https://thehackernews.com/2026/11/hackers-exploited-openssh-sshole-flaw.html" target="_blank" rel="noreferrer">thehackernews.com</a>. CISA KEV listing per <a href="https://app.opencve.io/cve/CVE-2026-123158" target="_blank" rel="noreferrer">OpenCVE</a> and the <a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-123158" target="_blank" rel="noreferrer">CISA catalog entry</a>.</li>
          <li>Hacker News attention: the disclosure reached the front page with 2,441 points (per The Diff newsletter, 6 November 2026). See <a href="https://buttondown.com/thediff/archive/no-034-claude-code-sends-your-email-to-websites/" target="_blank" rel="noreferrer">The Diff No. 034</a>.</li>
          <li>Unconfirmed and deliberately not asserted here: fix status for OpenWrt, Buildroot and Yocto as of 6 November 2026; any exploitation beyond the single-vendor Previdian report; and the researcher&rsquo;s prevalence counts, which the repository says may be published later.</li>
        </ul>
        <p><em>Data checked: 2026-11-10. This is a fast-moving disclosure: re-verify the fixed-package table and the OpenWrt/Buildroot/Yocto status before reusing it after November 2026.</em></p>

        <h2>Related tools</h2>
        <p>
          The same self-check pattern, for other tools on this site: the{' '}
          <Link href="/claude-code-cursor-backdoor-check">Claude Code Cursor backdoor self-check</Link>{' '}
          and the{' '}
          <Link href="/postman-codex-claude-check">Postman auto-install check</Link>. For
          cross-harness memory trade-offs, the{' '}
          <Link href="/beacon-agent-memory">Beacon agent memory guide</Link>.
        </p>
      </div>
    </div>
  );
}
