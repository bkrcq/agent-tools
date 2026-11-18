import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Windows 11 Coding Agent Telemetry: Opt Out',
  description:
    'Windows 11 records which coding agents you use — Codex, Claude, Copilot, Cursor — and uploads it as optional diagnostic data. What it collects and how to opt out.',
  alternates: { canonical: '/windows-11-coding-agent-telemetry/' },
};

const faqs = [
  {
    q: 'Is Windows 11 really recording which coding agents I use?',
    a: 'According to a reverse-engineering finding published 16 November 2026 by researcher Xusheng Li, yes — on machines where the feature is active. Windows 11’s MissionControlAggregator.dll matches executable names such as codex.exe, claude.exe, copilot.exe and cursor.exe, records which ones were observed as a bitmap, and emits a Segments.SubCohorts diagnostic report. Microsoft has not confirmed the finding, and the feature was disabled by image default on a clean public-ISO install, so it is not active on every Windows 11 machine.',
  },
  {
    q: 'Does it record my prompts or source code?',
    a: 'No — not in this report. The researcher states he found no prompt text or source code in the Segments.SubCohorts report. The underlying Windows events also carry runtime, time in focus, interaction counters and resource usage, but this component appears to discard those details and record only a bitmap of which agents and tools were observed. The report’s timestamps describe the collection window, not how long each agent was used.',
  },
  {
    q: 'Which coding agents and tools are tracked?',
    a: 'Four CLI-agent slots check copilot.exe, claude.exe, codex.exe and agy.exe (with extensionless equivalents on the WSL route). Five desktop-agent slots check github.exe, claude.exe, codex.exe, cursor.exe and antigravity.exe. The same component also checks broader developer tools — node.exe, python.exe, dotnet.exe, gcc.exe, clang.exe, gdb.exe, javac.exe, devenv.exe and code.exe — feeding twelve broader tool categories. Some checks also verify the publisher: Node.js expects “Node.js Foundation”, Python expects “Python Software Foundation”, and .NET and Visual Studio expect “Microsoft Corporation”.',
  },
  {
    q: 'How do I stop Windows 11 uploading this data?',
    a: 'Turn off optional diagnostic data: Settings → Privacy & security → Diagnostics & feedback → turn off “Send optional diagnostic data”. You can also decline optional diagnostics during Windows setup. This report is treated as optional diagnostic data (its upload payload marks isRequired: false), so switching optional diagnostics off stops this upload. Required diagnostic data, which keeps Windows secure and up to date, is separate and stays on.',
  },
  {
    q: 'How can I check whether it is running on my machine?',
    a: 'In an administrative PowerShell session, run Get-Service DiagTrack to confirm the Connected User Experiences and Telemetry service is running, Get-Process AggregatorHost to see its child process, and tasklist /m MissionControlAggregator.dll to confirm the DLL is loaded inside AggregatorHost.exe. Finding the service running does not by itself prove the coding-agent feature flag is enabled on your build — the researcher’s test machine had the CLICodingAgentUsage feature (ID 62580080) enabled as a service experiment without him turning it on.',
  },
  {
    q: 'Does renaming a program fool the detection?',
    a: 'Yes, in the researcher’s test it did. He copied cmd.exe to a file named codex.exe and ran it; the name alone was enough for the component to recognize it as Codex and set CLI slot 2, and the emitted report carried CliAgentSubCohorts: 4 (1 << 2). Detection is by executable name (plus a publisher check for some tools), not by inspecting what the program does.',
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
  headline: 'Windows 11 Coding Agent Telemetry: Opt Out',
  description:
    'What Windows 11 records about coding-agent and developer-tool usage, how the report reaches Microsoft, and how to turn optional diagnostic data off.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-17',
  dateModified: '2026-11-17',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Windows 11 telemetry · 17 Nov 2026</p>
      <h1>Windows 11 Is Recording Which Coding Agents You Use — and How to Stop It</h1>
      <p className="lead">
        A reverse-engineering finding published on 16 November 2026 shows Windows 11
        recording which coding agents and developer tools you have used — Codex, Claude,
        Copilot, Cursor and others — and, unless you have opted out of optional diagnostic
        data, uploading that list to Microsoft. The report contains no prompts and no
        source code: it is a bitmap of which tools were observed. This page covers what
        was found, what it does and does not collect, how to check your own machine, and
        how to turn it off.
      </p>

      <div className="prose">
        <h2>What was found</h2>
        <p>
          Researcher Xusheng Li was asking an AI assistant to look through recent Windows
          binaries for undocumented features when a list of executable names stood out in{' '}
          <code>MissionControlAggregator.dll</code>: coding agents such as{' '}
          <code>codex.exe</code>, <code>claude.exe</code>, <code>copilot.exe</code> and{' '}
          <code>cursor.exe</code>, alongside developer tools such as{' '}
          <code>python.exe</code>, <code>dotnet.exe</code>, <code>gcc.exe</code> and{' '}
          <code>code.exe</code>. Following the references showed the names are used in
          comparisons — executable-name matchers — inside a running component that records
          which tools have been used, saves that state locally, and reports it to Windows
          Diagnostics. The finding reached the Hacker News front page on 17 November 2026.
          The feature guarding the new agent checks has the direct name{' '}
          <code>CLICodingAgentUsage</code>, feature ID <code>62580080</code>.
        </p>
        <p>
          The component does not scan running processes itself. It subscribes to existing
          Windows events — <code>KernelProcess.AppStateChangeSummary</code> and{' '}
          <code>Win32kTraceLogging.AppInteractivitySummary</code> for Windows programs, and{' '}
          <code>Microsoft.Windows.Lxss.Manager.Exec</code> for WSL — and passes the
          application identities to the matchers. A successful match sets a slot in the
          aggregator&rsquo;s state, persisted to{' '}
          <code>C:\ProgramData\Microsoft\Diagnosis\AggregatorStorage\MissionControlAggregator$</code>.
          Later, <code>ReportCohorts&lt;12,4,5&gt;</code> turns those slots into bitsets and
          emits an ETW report named <code>Segments.SubCohorts</code>: twelve broader tool
          categories, four CLI agents, five desktop agents. The DLL is loaded by{' '}
          <code>AggregatorHost.exe</code>, a child process of the DiagTrack service
          (Connected User Experiences and Telemetry).
        </p>

        <h2>Which tools are tracked</h2>
        <table>
          <thead>
            <tr><th>Group</th><th>Executables checked</th></tr>
          </thead>
          <tbody>
            <tr><td>CLI coding agents (4 slots)</td><td>copilot.exe, claude.exe, codex.exe, agy.exe — with extensionless equivalents on the WSL route</td></tr>
            <tr><td>Desktop coding agents (5 slots)</td><td>github.exe, claude.exe, codex.exe, cursor.exe, antigravity.exe</td></tr>
            <tr><td>Developer tools (12 categories)</td><td>node.exe, python.exe, dotnet.exe, gcc.exe, clang.exe, gdb.exe, javac.exe, devenv.exe, code.exe, among others</td></tr>
          </tbody>
        </table>
        <p>
          Some checks also verify the publisher: the Node.js slot expects{' '}
          <code>Node.js Foundation</code>, Python expects{' '}
          <code>Python Software Foundation</code>, and the .NET and Visual Studio slots
          expect <code>Microsoft Corporation</code>. The compiler/debugger group
          containing GCC and Clang has no additional publisher check in this path. Note
          the scope is wider than AI: this is a developer-tool usage report that happens
          to include coding agents as a new category.
        </p>

        <h2>What the report contains — and what it does not</h2>
        <ul>
          <li><strong>It contains:</strong> a bitmap of which agents and tools were observed during the reporting window — one bit per category or agent. The report&rsquo;s timestamps describe the collection window, not how long each agent was used.</li>
          <li><strong>It does not contain:</strong> prompt text or source code. The researcher states he found neither in the report. The source events also carry runtime, time in focus, interaction counters and resource usage, but this component appears to discard those details and record only the bitmap.</li>
          <li><strong>It is optional diagnostic data.</strong> The upload payload marks the report <code>isRequired: false</code>. The researcher found the emitted event in DiagTrack&rsquo;s upload queue (<code>AsimovEvents</code> table in <code>EventStore.db</code>) when optional diagnostic data was allowed — and optional diagnostic data was enabled by default in the US setup he tested.</li>
        </ul>
        <p>
          That last point is the one that matters most. A bitmap of &ldquo;which agents you
          use&rdquo; is far less invasive than prompts or code, but it is still usage data
          about your workflow leaving the machine, and it is on by default unless you
          opted out.
        </p>

        <h2>Is it actually running on a normal machine?</h2>
        <p>
          The researcher checked his Parallels Windows 11 ARM64 VM, build{' '}
          <code>26200.9974</code>, where <code>MissionControlAggregator.dll</code> was
          version <code>10.0.26100.9818</code> and <code>CLICodingAgentUsage</code> was
          already enabled as a service experiment — he had not manually enabled it.
          DiagTrack was already running with startup type Automatic, and{' '}
          <code>AggregatorHost.exe</code> was running as its child with the DLL loaded.
        </p>
        <p>
          He then tested it in practice: copying <code>cmd.exe</code> to a file named{' '}
          <code>codex.exe</code> and running it was enough for the component to recognize
          it as Codex — CLI slot 2 was set, and the emitted{' '}
          <code>Segments.SubCohorts</code> event carried{' '}
          <code>CliAgentSubCohorts: 4</code> (<code>1 &lt;&lt; 2</code>). A separate test
          with a copy named <code>gcc.exe</code> set developer-tool slot 3, and with
          optional diagnostic data allowed, the resulting event was found queued for
          upload with <code>SubCohorts: [8]</code> (<code>1 &lt;&lt; 3</code>).
        </p>
        <p>
          One important limit: a clean install from the public ISO had the coding-agent
          feature disabled by image default, so the evidence does not support saying it is
          active on every Windows 11 installation. Whether it is running on your machine
          depends on your build and on service experiments Microsoft has enabled for it.
        </p>

        <h2>How to check your machine</h2>
        <p>
          These administrative PowerShell commands show the service, its child process,
          and the loaded module — the same checks the researcher used:
        </p>
        <pre><code>{`Get-Service DiagTrack | Format-Table Name,Status,StartType -AutoSize
Get-Process AggregatorHost | Format-Table ProcessName,Id -AutoSize
tasklist /m MissionControlAggregator.dll`}</code></pre>
        <p>
          If DiagTrack is running and <code>AggregatorHost.exe</code> has{' '}
          <code>MissionControlAggregator.dll</code> loaded, the aggregator is active on
          your machine. That alone does not prove the <code>CLICodingAgentUsage</code>{' '}
          feature flag is enabled for your build — the flag is a service experiment, and
          Microsoft can enable it without you touching a setting.
        </p>

        <h2>How to turn it off</h2>
        <p>
          The upload stops when optional diagnostic data is off. Two ways to do it:
        </p>
        <ol>
          <li><strong>On an existing install:</strong> Settings → Privacy &amp; security → Diagnostics &amp; feedback → turn off &ldquo;Send optional diagnostic data&rdquo;. Microsoft&rsquo;s diagnostics and privacy guide explains the setting.</li>
          <li><strong>During setup:</strong> decline optional diagnostics when Windows asks. On a clean Windows 11 Home install with the region set to the United States, the researcher found the Diagnostic data toggle already enabled and labeled &ldquo;Include Optional&rdquo; before changing any privacy settings, with <code>AllowTelemetry</code> set to <code>3</code> after setup with those defaults — so the default is on, at least in the US setup tested.</li>
        </ol>
        <p>
          Turning off optional diagnostic data does not disable required diagnostic data,
          which Microsoft uses to keep Windows secure and up to date. If you rely on
          Windows Update or Microsoft&rsquo;s support diagnostics, those keep working.
        </p>

        <h2>What this page does not claim</h2>
        <ul>
          <li>This is a single-source reverse-engineering finding. Microsoft has not confirmed it, and no second independent reproduction had been published when this page was written (17 November 2026).</li>
          <li>The feature was disabled by image default on a clean public-ISO install. Do not assume it is active on every Windows 11 machine — check yours with the commands above.</li>
          <li>Detection is by executable name (plus a publisher check for some tools). Renaming any program to <code>codex.exe</code> was enough to trigger a match, so the data says which names were seen, not which tools were genuinely used.</li>
          <li>No prompt text, source code, file paths or command output was found in this report. The privacy concern is the usage bitmap itself, not the content of your work.</li>
          <li>Whether other regions default to optional diagnostics on, as the tested US setup did, is unconfirmed here — the researcher&rsquo;s default-on observation is specific to the US setup he tested.</li>
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
          <li>Xusheng Li, &ldquo;Windows 11 Is Collecting Data on Which Coding Agents and Developer Tools You Use&rdquo; (16 November 2026): MissionControlAggregator.dll, CLICodingAgentUsage feature ID 62580080, CLI/desktop agent executable lists, Segments.SubCohorts ETW report, codex.exe/gcc.exe rename tests, DiagTrack upload queue (AsimovEvents), optional diagnostic data enabled by default in the tested US setup, opt-out path. See <a href="https://xusheng.dev/posts/windows-coding-agent-telemetry/" target="_blank" rel="noreferrer">xusheng.dev</a>.</li>
          <li>Microsoft Support, &ldquo;Diagnostics, feedback, and privacy in Windows&rdquo; (linked from the source post): optional diagnostic data may include device activity and app-activity information; turning it off leaves the device just as secure and operating normally. See <a href="https://support.microsoft.com/en-us/windows/privacy/diagnostics-feedback-and-privacy-in-windows" target="_blank" rel="noreferrer">support.microsoft.com</a>.</li>
          <li>Hacker News front page, 17 November 2026 (105 points, 48 comments when the daily report captured it): the discussion thread for the finding.</li>
          <li>Unconfirmed and deliberately not asserted here: any Microsoft statement about CLICodingAgentUsage; whether the feature is enabled on builds other than 26200.9974; default diagnostic-data behavior in regions other than the United States.</li>
        </ul>
        <p><em>Data checked: 2026-11-17. This is a single-source finding from 16 November 2026: re-check the source post and Microsoft&rsquo;s diagnostics guidance before relying on it.</em></p>

        <h2>Related tools</h2>
        <p>
          If you run coding agents on Windows, also run the{' '}
          <Link href="/claude-code-secret-leak-check">Claude Code secret leak self-check</Link>{' '}
          — public settings files have leaked real API keys — and read the{' '}
          <Link href="/ai-coding-agent-setup">AI coding agent setup checklist</Link> before
          wiring an agent to a new machine.
        </p>
      </div>
    </div>
  );
}
