import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Claude Code to Pi: Should You Switch? A 2026 Guide',
  description:
    'A developer quit Claude Code for Pi after a year, and the post hit the Hacker News front page. What Pi actually is, what it deliberately leaves out (no permission system, no sub-agents), and whether switching saves you money.',
  alternates: { canonical: '/claude-code-to-pi/' },
};

const faqs = [
  {
    q: 'Is Pi free?',
    a: 'Pi itself is free and MIT-licensed. The model is not: you bring your own access, either a subscription connected with /login inside Pi or your own API keys, and you pay that provider per token or per plan. Switching harness does not make coding free.',
  },
  {
    q: 'Does Pi support MCP?',
    a: 'Yes. Pi\u2019s official documentation has a full MCP Servers guide: Pi connects to MCP servers over stdio or streamable HTTP (pi mcp add, config in ~/.pi/agent/mcp.json or .pi/mcp.json). MCP support arrived in Pi 0.99.0 on 29 September 2026, before the 1.0 release \u2014 so comparison pages that say Pi has no MCP predate that version.',
  },
  {
    q: 'Does Pi have permission controls?',
    a: 'No built-in permission system. Pi\u2019s README states it plainly: \u201cPi does not include a built-in permission system for restricting filesystem, process, network, or credential access. By default, it runs with the permissions of the user and process that launched it.\u201d If you need stronger boundaries, the README says to containerize or sandbox Pi. Community permission extensions exist; verify the one you install before trusting it.',
  },
  {
    q: 'Can I use my Claude subscription with Pi?',
    a: 'There is an Earendil-maintained pi-claude-code extension for using an Anthropic subscription inside Pi, mentioned in the Hacker News discussion of the switch. It is an extension, not Pi core, so check its README for current status before relying on it.',
  },
  {
    q: 'Does switching to Pi save money?',
    a: 'Only the harness is free. Claude Code runs on a $20\u2013$200/month subscription; with Pi you pay for the model instead \u2014 a subscription via /login or per-token API keys. Whether you save anything depends on your token bill, not on the harness price. Use the token cost calculator on this site to compare before deciding.',
  },
  {
    q: 'Are the \u201c244 releases\u201d and \u201c3,000 tokens\u201d claims verified?',
    a: 'They are the author\u2019s own counts, quoted from his post, not an independent audit. The post says 244 Claude Code releases shipped this year and over three-quarters changed the system prompt or tool descriptions, and that the default Bash tool description is almost 3,000 tokens, mostly about git and GitHub pull requests. Treat them as one developer\u2019s measured frustration, not a benchmark.',
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
  headline: 'Claude Code to Pi: Should You Switch? A 2026 Guide',
  description:
    'What the \u201cGoodbye Claude, hello Pi\u201d post actually claims, what Pi is and is not, and the permission risk to settle before switching coding agent harnesses.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-09',
  dateModified: '2026-11-09',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Coding agent guide · 9 Nov 2026</p>
      <h1>Switching from Claude Code to Pi: What the &lsquo;Goodbye Claude&rsquo; Post Gets Right &mdash; and the Risks It Skips</h1>
      <p className="lead">
        On 8 November 2026, a developer&rsquo;s post &ldquo;Goodbye Claude, Hello Pi&rdquo; hit the Hacker News
        front page (643 points, 410 comments). After more than a year on Claude Code, he retired it
        as his main coding harness and moved his setup to Pi. This page separates what he actually
        complained about from what Pi is &mdash; and what Pi deliberately does not do.
      </p>

      <div className="prose">
        <h2>Why he switched: three complaints, in his words</h2>
        <p>
          The post is a personal switching story, not a benchmark. Its three sharpest claims, all
          the author&rsquo;s own counts and experience rather than an independent audit:
        </p>
        <ol>
          <li>
            <strong>244 releases in a year, most of them behaviour-changing.</strong> At the time of
            writing, 244 Claude Code releases had shipped this year, and over three-quarters of
            them changed the system prompt or tool descriptions &mdash; changes that can
            substantially alter how the model performs, sometimes contradicting user prompts or
            repo conventions.
          </li>
          <li>
            <strong>A ~3,000-token Bash tool description.</strong> The default Bash tool&rsquo;s
            description is almost 3,000 tokens, most of it about using git and opening pull
            requests on GitHub. The author&rsquo;s point: the models already know how to do this
            without detailed instructions, so the overhead buys little.
          </li>
          <li>
            <strong>A bug open since December 2025, closed as a duplicate.</strong> He uses Claude
            Code inside VSCode, where only one session can be &ldquo;connected&rdquo; to the IDE at a
            time; a second tab cannot receive text-selection events. The issue was reported at
            least as far back as December 2025 and closed as a duplicate of an unrelated bug.
          </li>
        </ol>
        <p>
          Around those sits the friction that the author says epitomizes the decision: Claude Code
          ignored <code>AGENTS.md</code>, so users copied or symlinked <code>CLAUDE.md</code> files
          across hobby repos. A day after he made his decision, Anthropic announced Claude Code
          would finally start supporting <code>AGENTS.md</code> &mdash; which he jokes was an
          effort to get him to stay, and calls too little, too late. He also stresses that
          Anthropic built a genuinely cool product and that running a harness first is a hard
          job; later tools like Pi have the benefit of hindsight.
        </p>

        <h2>What Pi actually is</h2>
        <p>
          Pi is a minimal, extensible terminal coding agent harness, open source under the MIT
          license. It was created by Mario Zechner (author of the libGDX game framework) and now
          lives at <code>earendil-works/pi</code>, maintained by Earendil since April 2026. Its
          design thesis, from Zechner&rsquo;s original write-up, is that a thin harness around a
          capable model beats a thick one: four tools (<code>read</code>, <code>write</code>,{' '}
          <code>edit</code>, <code>bash</code>) and a system prompt of roughly 200 tokens, with
          the rest built by the user through TypeScript extensions, skills, prompt templates,
          themes and lifecycle hooks.
        </p>
        <ul>
          <li><strong>Models:</strong> Anthropic, OpenAI, Google, DeepSeek, Mistral, Groq, xAI, Cerebras and more, plus OpenRouter and local models via Ollama, LM Studio, llama.cpp or vLLM. Connect a subscription or API key with <code>/login</code> inside Pi.</li>
          <li><strong>Versions:</strong> 1.0 shipped 1 October 2026, 1.3.0 followed 15 October, and 1.5.0 on 2 November 2026 (per the repository&rsquo;s releases).</li>
          <li><strong>Install:</strong> <code>curl -fsSL https://pi.dev/install.sh | sh</code> (or <code>npm install -g --ignore-scripts @earendil-works/pi-coding-agent</code>); requires Node.js 22.19 or newer. Then <code>cd</code> into a project and run <code>pi</code>.</li>
          <li><strong>Price:</strong> the harness is free (MIT). The model is a separate bill &mdash; see the cost section below.</li>
        </ul>

        <h2>What Pi deliberately does not have</h2>
        <p>
          This is the part the viral post barely touches, and it decides whether Pi fits you.
        </p>
        <ul>
          <li>
            <strong>No built-in permission system &mdash; the biggest risk.</strong> Pi&rsquo;s README
            states it plainly: &ldquo;Pi does not include a built-in permission system for
            restricting filesystem, process, network, or credential access. By default, it runs
            with the permissions of the user and process that launched it.&rdquo; There is no
            per-action approval prompt before it edits files. If you need stronger boundaries,
            the README says to containerize or sandbox Pi. Community permission extensions
            exist, but they are add-ons, not the default &mdash; do not switch assuming Pi is
            &ldquo;safer out of the box&rdquo; than Claude Code. It is the opposite by design.
          </li>
          <li>
            <strong>No sub-agents, no plan mode.</strong> The README: &ldquo;Pi ships with powerful
            defaults but skips features like sub-agents and plan mode.&rdquo; If your workflow leans
            on Claude Code&rsquo;s agent teams, sub-agents or plan mode, you would be rebuilding
            those yourself with extensions &mdash; or giving them up.
          </li>
          <li>
            <strong>MCP: yes &mdash; and this settles a stale debate.</strong> Some comparison pages
            say Pi has no MCP support and others say it does. The official documentation is the
            authority: Pi has a full MCP Servers guide, connects to MCP servers over stdio or
            streamable HTTP (<code>pi mcp add</code>, config in <code>~/.pi/agent/mcp.json</code>{' '}
            or project <code>.pi/mcp.json</code>), and MCP support arrived in 0.99.0 on
            29 September 2026, before 1.0. Comparisons claiming &ldquo;no MCP&rdquo; predate that version.
          </li>
        </ul>

        <h2>Does switching save money?</h2>
        <p>
          Only the harness is free. Claude Code runs on a $20&ndash;$200/month subscription; with Pi
          you pay for the model instead &mdash; a subscription connected via <code>/login</code> or
          your own per-token API keys. Whether you come out ahead depends on your token bill, not
          on the harness price. Before switching on cost grounds, estimate your actual usage with
          the <Link href="/ai-token-cost-calculator">AI token cost calculator</Link> and the{' '}
          <Link href="/claude-code-agent-summary-cost">agent_summary cost check</Link> on this
          site. The honest saving Pi offers is overhead: a ~200-token system prompt and four tool
          descriptions leave more of every request for your code, not for harness instructions.
        </p>

        <h2>Try it safely: 4 steps</h2>
        <ol>
          <li><strong>Install and log in.</strong> Run the installer above, then <code>/login</code> inside Pi to connect a subscription or API key.</li>
          <li><strong>Start in a scratch repo, not your main project.</strong> Because Pi runs with your full user permissions and asks before nothing, first runs belong in a disposable directory or a container.</li>
          <li><strong>Decide your boundary before your first real task.</strong> Either run Pi sandboxed/containerized (the README&rsquo;s own advice) or install a community permission extension and verify what it actually gates.</li>
          <li><strong>Port your context files deliberately.</strong> Pi reads context files; check which filenames it picks up in your project rather than assuming your <code>CLAUDE.md</code> or <code>AGENTS.md</code> is loaded. Keep one canonical file and symlink the other if you still use both harnesses.</li>
        </ol>

        <h2>Should you switch? A short decision check</h2>
        <ul>
          <li><strong>Switch if:</strong> you want a stable, minimal harness you can extend yourself; you are comfortable sandboxing an agent that runs with your full permissions; you mostly work solo in the terminal and do not rely on sub-agents or plan mode.</li>
          <li><strong>Stay if:</strong> you rely on Claude Code&rsquo;s permission prompts, sub-agents, agent teams or plan mode; you want the harness to ask before editing; or your team standardizes on Claude Code and shares its config.</li>
          <li><strong>Try both if:</strong> you are unsure &mdash; Pi is free to install, and running it on a side project for a week costs nothing but the model tokens you would spend anyway.</li>
        </ul>

        <h2>A separate story: Goldman Sachs</h2>
        <p>
          The same day the Pi post topped Hacker News, another front-page item reported Goldman
          Sachs pulling Claude Code from bankers and traders (433 points). That is enterprise
          trust and procurement news, not a personal harness decision, and the two should not be
          read as one cause: one developer leaving over prompt overhead and a bank restricting a
          tool for its staff are different questions with different evidence.
        </p>

        <h2>Frequently asked questions</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>Sources</h2>
        <ul>
          <li>&ldquo;Goodbye Claude, Hello Pi&rdquo;, caleb.software (reached the Hacker News front page 8 November 2026, 643 points / 410 comments): the 244 releases, ~3,000-token Bash description, December 2025 VSCode bug, AGENTS.md timing and the author&rsquo;s praise for Anthropic are all quoted from the post itself. See <a href="https://caleb.software/posts/claude-to-pi.html" target="_blank" rel="noreferrer">the original post</a>.</li>
          <li>Pi repository and documentation, earendil-works/pi (README, Permissions &amp; Containerization, MCP Servers guide, How Pi Works): no built-in permission system, no sub-agents or plan mode, MCP over stdio/streamable HTTP, install commands, Node.js 22.19+ requirement. See <a href="https://github.com/earendil-works/pi" target="_blank" rel="noreferrer">github.com/earendil-works/pi</a> and <a href="https://pi.dev" target="_blank" rel="noreferrer">pi.dev</a>.</li>
          <li>Release dates (1.0 on 1 October 2026, 1.3.0 on 15 October, 1.5.0 on 2 November 2026) and MCP arriving in 0.99.0 (29 September 2026) per the repository&rsquo;s releases and independent guides checked 9 November 2026; star counts and download figures are not asserted here because they move daily.</li>
          <li>Goldman Sachs item: Hacker News front page, 8 November 2026 (433 points), reported via thestateofai.com &mdash; cited only as a separate enterprise story, not as evidence about Pi.</li>
          <li>Unconfirmed and deliberately not asserted here: any benchmark showing Pi faster or cheaper than Claude Code on the same task; the author&rsquo;s release and token counts beyond his own post; and any claim that switching harnesses alone lowers a monthly bill.</li>
        </ul>
        <p><em>Data checked: 2026-11-09. This is a fast-moving story page: re-verify the Pi releases and the pi-claude-code extension status before reusing it after November 2026.</em></p>

        <h2>Related tools</h2>
        <p>
          Before switching, estimate the model bill with the{' '}
          <Link href="/ai-token-cost-calculator">AI token cost calculator</Link> and check
          hidden background-agent spend with the{' '}
          <Link href="/claude-code-agent-summary-cost">agent_summary cost calculator</Link>.
          For the instruction-file side of the switch, read the{' '}
          <Link href="/agents-md-guide">AGENTS.md guide</Link>, and for cross-harness memory
          trade-offs, the <Link href="/beacon-agent-memory">Beacon agent memory guide</Link>.
        </p>
      </div>
    </div>
  );
}
