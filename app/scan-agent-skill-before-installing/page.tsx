import type { Metadata } from "next";
import Link from "next/link";

// DROP-IN NOTE (do not ship this comment block as visible content):
// Place this file at app/scan-agent-skill-before-installing/page.tsx
// in the agent-tools Next.js repo. It is self-contained: it does not
// import a site constants module, so it works even if agent-tools has
// no "@/lib/site". If the repo already has one, replace SITE_URL below
// with that constant. Do NOT publish until the numbers in the
// "Sources and numbers" section have been re-verified on publish day.
const SITE_URL = "https://agent-tools-liard.vercel.app";
const PAGE_PATH = "/scan-agent-skill-before-installing";

export const metadata: Metadata = {
  title: "SkillSpector Checklist: Scan Agent Skills Before Installing",
  description:
    "Scan an agent skill with NVIDIA SkillSpector before installing: a 5-minute static checklist for directories, SKILL.md files, zips and Git links, how to read the 0-100 risk score, and how to handle false positives without auto-blocking.",
  keywords: [
    "SkillSpector",
    "scan agent skills before installing",
    "how to install skillspector",
    "how to use SkillSpector",
    "skillspector review",
    "agent skill security",
  ],
  openGraph: {
    type: "article",
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "Agent Tools",
    title: "SkillSpector Checklist: Scan Agent Skills Before Installing",
    description:
      "A 5-minute SkillSpector checklist: scan before you install, read every finding yourself, and treat the score as a torch, not a gate.",
  },
  alternates: {
    canonical: `${SITE_URL}${PAGE_PATH}`,
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is SkillSpector?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SkillSpector is NVIDIA's open-source security scanner for AI agent skills. Before installation, it statically checks a skill's instructions, scripts, dependencies, metadata and permissions, and returns a 0-100 risk score, severity labels, recommendations and a report. It does not run the scanned skill itself.",
      },
    },
    {
      "@type": "Question",
      name: "Does installing SkillSpector require an API key?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Static checks do not require one. An API key is only needed if you enable the optional LLM semantic review, which sends eligible file contents to a configured model provider. For static-only review, run the scan with --no-llm.",
      },
    },
    {
      "@type": "Question",
      name: "Does a SAFE result mean a skill is safe to install?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SAFE only means this scan did not find enough evidence to classify the skill as unsafe. Static checks cannot see runtime-only behaviour, encrypted or compiled content, or text inside images, and may miss non-English attacks. In sensitive environments, test the skill first in an isolated agent with no production credentials.",
      },
    },
    {
      "@type": "Question",
      name: "Why does SkillSpector flag official plugins as do not install?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Static patterns match on what code looks like, not on whether it discusses a threat or commits one. Official plugins that teach skill authoring, hooks or evaluation naturally mention executing code, reading configuration and spawning subprocesses, so they trigger the same patterns as genuine attacks. Read each finding yourself and accept known items with a baseline instead of trusting or disabling the scan outright.",
      },
    },
    {
      "@type": "Question",
      name: "How is SkillSpector different from Snyk, JFrog and similar scanners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scope. SkillSpector is narrowly focused on pre-install static checks for agent skill packages, including prompt injection, description-behaviour mismatch and MCP tool poisoning. Snyk, JFrog and similar platforms cover a much broader software supply chain. Choose based on whether you need a one-off install check or continuous supply-chain auditing.",
      },
    },
  ],
};

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "SkillSpector Checklist: Scan Agent Skills Before Installing",
  description:
    "A 5-minute SkillSpector checklist: scan before you install, read every finding yourself, and treat the score as a torch, not a gate.",
  author: { "@type": "Organization", name: "Agent Tools" },
  publisher: { "@type": "Organization", name: "Agent Tools" },
  datePublished: "2026-10-29",
  dateModified: "2026-10-29",
};

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-10 scroll-mt-20 text-2xl font-bold text-slate-900">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 text-xl font-semibold text-slate-900">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-relaxed text-slate-700">{children}</p>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">{children}</code>
  );
}

export default function SkillSpectorChecklistPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Scan Agent Skills Before Installing</span>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          SkillSpector Checklist: Scan Agent Skills Before Installing
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Installing an agent skill means handing a stranger&apos;s instructions and scripts to
          your agent, with your permissions and your data. SkillSpector, NVIDIA&apos;s open-source
          scanner, answers a narrower question before you do that: are there risk signals worth
          looking at first?
        </p>

        <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="font-semibold text-indigo-900">Treat the scan as a torch, not a gate</p>
          <p className="mt-1 text-sm text-indigo-800">
            The score tells you where to look. The decision is always yours, made after you have
            read the findings yourself. That one rule drives every step below.
          </p>
        </div>

        <H2 id="what-it-scans">What it scans</H2>
        <P>
          SkillSpector does not run the scanned skill. It reads files and runs static checks, with
          an optional LLM semantic review for findings that need intent comparison. It accepts a
          directory, a single SKILL.md file, a zip file, or a Git link, all with the same command:
        </P>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
          {`skillspector scan ./my-skill/
skillspector scan ./SKILL.md
skillspector scan https://github.com/user/my-skill
skillspector scan ./my-skill.zip`}
        </pre>
        <P>
          For static-only review, without sending files to a model provider, add{" "}
          <Code>--no-llm</Code>:
        </P>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
          {`skillspector scan ./my-skill/ --no-llm`}
        </pre>
        <P>For a record you can keep or feed into CI, change the output format:</P>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
          {`skillspector scan ./my-skill/ --format json --output report.json
skillspector scan ./my-skill/ --format markdown --output report.md
skillspector scan ./my-skill/ --format sarif --output report.sarif`}
        </pre>
        <P>
          The output has three parts: a 0-100 risk score, each finding&apos;s severity and file
          location, and an install recommendation. Do not read only the first part.
        </P>

        <H2 id="install">Install</H2>
        <P>
          Per NVIDIA&apos;s official documentation, SkillSpector requires Python 3.12 or later:
        </P>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
          {`git clone https://github.com/NVIDIA/SkillSpector.git
cd SkillSpector
uv venv .venv && source .venv/bin/activate
make install`}
        </pre>
        <P>
          Without uv, use Python&apos;s built-in venv instead, then the same{" "}
          <Code>make install</Code>. A Docker image is also available if you would rather not
          install Python locally.
        </P>

        <H2 id="checklist">The 5-minute checklist</H2>
        <P>
          Five minutes is not enough to read an entire skill. It is enough to triage the signals
          that matter most, in order.
        </P>

        <H3>Minute 1: Pin down exactly what you scanned</H3>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          <li>Record the skill&apos;s source link, exact commit or version, and author.</li>
          <li>Record your SkillSpector version. Pattern counts change between versions, so do not quote them as fixed numbers.</li>
          <li>If the skill updates later, scan it again. An old report does not cover a new version.</li>
        </ul>

        <H3>Minute 2: Read CRITICAL and HIGH first, not the total score</H3>
        <P>
          A total score can be diluted by many low-risk items, or inflated by a few false
          positives. Sort by severity and read CRITICAL and HIGH first. Prioritise these five
          categories:
        </P>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Hidden instructions:</strong> HTML comments, zero-width characters, homoglyphs
            and right-to-left overrides that a human reading SKILL.md cannot see, but a model can.
          </li>
          <li>
            <strong>Data exfiltration paths:</strong> not “it read an environment variable” on its
            own, but “it read a credential-like variable and sent it to an external address.” A
            taint path from source to sink is what makes it serious.
          </li>
          <li>
            <strong>Capability mismatch:</strong> the description says “organise documents,” but the
            code reads <Code>.ssh</Code> or <Code>.aws</Code>, deletes files, changes startup items
            or makes network calls. Description, permissions and code disagreeing is itself a signal.
          </li>
          <li>
            <strong>MCP poisoning and least privilege:</strong> instructions hidden in tool
            descriptions, or tool permissions far broader than the job the tool claims to do.
          </li>
          <li>
            <strong>Supply chain:</strong> dependencies with known vulnerabilities. SkillSpector
            checks OSV.dev, with a small built-in list as an offline fallback. No match does not mean
            no risk.
          </li>
        </ul>

        <H3>Minute 3: Ask three questions about every HIGH finding</H3>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          <li>Is it actually executing, or only discussing, quoting or defending against a threat?</li>
          <li>Are the external domains, files and commands it touches ones this skill&apos;s stated job genuinely needs?</li>
          <li>If you removed this behaviour, could the skill still do its stated core job?</li>
        </ul>
        <P>
          If you cannot answer all three, do not install yet, and do not condemn it either. Read the
          original file and its context first.
        </P>

        <H3>Minute 4: Handle false positives, do not switch the scan off</H3>
        <P>
          Static scanning deliberately over-flags: it would rather catch a harmless pattern than
          miss a real one. That is a design trade-off, not a bug. Three false-positive shapes show
          up repeatedly in real reviews:
        </P>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>A defence flagged as an attack:</strong> a skill warns the agent that a folder
            might be named “ignore previous instructions” and says to treat such strings as inert
            labels. The hidden-instruction signature matches the quoted example phrase, so the guard
            itself gets flagged.
          </li>
          <li>
            <strong>An evaluation script flagged as theft:</strong> evaluation scripts legitimately
            read configuration, spawn subprocesses and run checks. The same read-environment-plus-subprocess
            pattern also catches a real key stealer.
          </li>
          <li>
            <strong>Official plugins flagged as do not install:</strong> in one third-party review,
            a static scan of 53 skills put 15 on “do not install,” almost all of them official
            vendor-published plugins. Wiring the scanner to auto-block would have removed much of
            the standard toolkit first.
          </li>
        </ul>
        <P>
          Accept known items so re-scans only surface new issues, instead of disabling whole rule
          categories:
        </P>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
          {`skillspector baseline ./my-skill/ -o .skillspector-baseline.yaml
skillspector scan ./my-skill/ --baseline .skillspector-baseline.yaml`}
        </pre>
        <P>
          For every accepted item, write down why you accepted it and who accepted it, so the next
          reviewer can check your reasoning.
        </P>

        <H3>Minute 5: Write a decision you can re-check</H3>
        <P>Keep a short record, not just a score:</P>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          <li>Target: source, commit or version</li>
          <li>Scan: SkillSpector version, whether LLM semantic review ran, report file location</li>
          <li>Result: score, how many CRITICAL and HIGH findings, and your verdict on each</li>
          <li>Decision: install, hold, or do not install, plus a next review date</li>
        </ul>
        <P>
          A usable triage rule, borrowed from NVIDIA&apos;s documentation: fix or formally accept
          CRITICAL and HIGH findings before release; remove hidden content and tool poisoning;
          rewrite the description or remove the behaviour when capability and description disagree;
          upgrade, pin a fixed version, or document why a known vulnerable dependency is acceptable.
        </P>

        <H2 id="how-to-read-the-score">How to read the score</H2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>A 0-100 score is a sorting tool, not a safety certificate.</strong> A score of
            100 does not prove malice, and 0 does not prove harmlessness. Both only mean what this
            scan did or did not find.
          </li>
          <li>
            <strong>Static is fast, semantic is slower, and they serve different jobs.</strong>{" "}
            Static checks need no API key and suit every install. LLM semantic review can filter
            false positives and explain findings, but it sends eligible files to a configured model
            provider, so do not enable it by default before assessing data-exposure risk.
          </li>
          <li>
            <strong>Label precision claims by source.</strong> Some material reports roughly 87%
            precision after LLM review, with the underlying paper reporting 86.7% precision and
            82.5% recall. Those are vendor and paper figures, not independent verification, and this
            page does not present them as a general guarantee.
          </li>
          <li>
            <strong>The scanner is not a sandbox.</strong> It never executes the skill, so it
            cannot observe runtime-only behaviour, encrypted or compiled content, or text inside
            images, and it may miss non-English attacks. Scanning decides whether a skill deserves
            a test. Isolation decides how much damage a missed problem can do.
          </li>
        </ul>
        <P>
          In sensitive environments, add one more step: install first in a test agent with no
          production credentials and only the files and tools the test needs, confirm the behaviour
          matches the description, and only then consider production use. Sending, publishing,
          payments, account changes and deletions should always stay behind human approval.
        </P>

        <H2 id="worked-example">A minimal example: what makes a finding serious</H2>
        <P>
          Consider a hypothetical helper script (not a real skill) with this logic: it reads an API
          key from an environment variable, then posts that key unchanged to an external address
          never mentioned in the skill&apos;s description.
        </P>
        <P>
          Reading an environment variable alone is normal. Making a network call alone is normal.
          What makes this serious is the path connecting them: a credential source flowing straight
          to an undocumented external sink. That is why taint-path findings can merit CRITICAL.
        </P>
        <P>
          Now reverse the facts: the description says the skill syncs a local report to your own
          API, and it names the address, the fields and the purpose. The same kind of network call
          should not be condemned outright. The test is always the same: do description, permissions
          and code agree?
        </P>

        <H2 id="other-tools">How it differs from broader tools</H2>
        <P>
          A direct Google read on 2026-10-28 for “SkillSpector” and “scan agent skills before
          installing” also surfaced Snyk Labs, JFrog Docs, Gen Digital, Mondoo and Cisco&apos;s
          skill-scanner. Most of those are parts of broader security platforms or scanning services.
          SkillSpector&apos;s cut is narrower: pre-install static checks specifically for agent
          skill packages, including instruction poisoning and description-behaviour mismatch.
        </P>
        <P>
          Do not pick by ranking them. Ask your own question first: do you need a fast check for one
          install, or continuous auditing across a whole supply chain? The first is what this
          checklist covers. The second is a platform decision, and this page does not make it for you.
        </P>

        <H2 id="faq">Frequently asked questions</H2>

        <H3>What is SkillSpector?</H3>
        <P>
          NVIDIA&apos;s open-source security scanner for AI agent skills. Before installation, it
          statically checks a skill&apos;s instructions, scripts, dependencies, metadata and
          permissions, and returns a 0-100 risk score, severity labels, recommendations and a report.
          It does not run the scanned skill itself.
        </P>

        <H3>Does installing SkillSpector require an API key?</H3>
        <P>
          Static checks do not. An API key is only needed if you enable the optional LLM semantic
          review, which sends eligible file contents to a configured model provider. For static-only
          review, run the scan with <Code>--no-llm</Code>.
        </P>

        <H3>Does a SAFE result mean a skill is safe to install?</H3>
        <P>
          No. SAFE only means this scan did not find enough evidence to classify the skill as
          unsafe. Static checks cannot see runtime-only behaviour, encrypted content or text inside
          images, and may miss non-English attacks. In sensitive environments, test first in an
          isolated agent with no production credentials.
        </P>

        <H3>Why does SkillSpector flag official plugins as do not install?</H3>
        <P>
          Static patterns match on what code looks like, not on whether it discusses a threat or
          commits one. Official plugins that teach skill authoring, hooks or evaluation naturally
          mention executing code, reading configuration and spawning subprocesses, so they trigger
          the same patterns as genuine attacks. Read each finding yourself and accept known items
          with a baseline, instead of trusting or disabling the scan outright.
        </P>

        <H3>How is SkillSpector different from Snyk, JFrog and similar scanners?</H3>
        <P>
          Scope. SkillSpector is narrowly focused on pre-install static checks for agent skill
          packages, including prompt injection, description-behaviour mismatch and MCP tool
          poisoning. Snyk, JFrog and similar platforms cover a much broader software supply chain.
          Choose based on whether you need a one-off install check or continuous supply-chain auditing.
        </P>

        <H2 id="sources">Sources and numbers</H2>
        <P>
          Verify every number below again on publish day. Stars and pattern counts change with
          versions and time; this page must not present them as fixed values.
        </P>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            Official documentation: NVIDIA Skill Documentation, “Scan Agent Skills Before
            Installation” —{" "}
            <Link href="https://docs.nvidia.com/skills/scanning-agent-skills" className="text-indigo-700 underline underline-offset-4">
              docs.nvidia.com/skills/scanning-agent-skills
            </Link>
          </li>
          <li>
            Official repository: NVIDIA/SkillSpector —{" "}
            <Link href="https://github.com/NVIDIA/SkillSpector" className="text-indigo-700 underline underline-offset-4">
              github.com/NVIDIA/SkillSpector
            </Link>
          </li>
          <li>Licence: Apache-2.0, per multiple sources; confirm against the repository LICENSE on publish day.</li>
          <li>
            Stars: about 22k on 2026-10-27 (two same-day independent records: about 22,600 and
            21,998), not the older about 8.4k figure that appeared in an earlier draft. Do not hard-code
            a star count without its record date.
          </li>
          <li>
            Pattern counts: v2.13-series material reports 71 patterns across 17 categories, while
            NVIDIA&apos;s documentation page at the same time reported 68 patterns across 17
            categories. Use the count for the version you verify at publish time, and name that version.
          </li>
          <li>
            Dataset figures: in a 42,447-skill dataset, 31,132 skills were analysed, with 26.1%
            containing vulnerabilities and 5.2% showing likely malicious intent. These are NVIDIA&apos;s
            own research figures, not independent verification, and must be cited as such.
          </li>
          <li>
            False-positive cases: a Workloft review (v2.11.2, static, 53 skills) and another
            production-skill review (3 of 11 HIGH findings genuine) are third-party case reports, not
            a general false-positive rate.
          </li>
          <li>
            Google SERP direct read: 2026-10-28, for “SkillSpector” and “scan agent skills before
            installing.” Both queries showed 0 ads; the top results were the official repository,
            official documentation and YouTube explainers. Results were personalised, so they are a
            competition reference, not a neutral ranking.
          </li>
        </ul>
        <P>
          <em>Data checked: 2026-10-28. Re-verify stars, version and pattern counts before publishing.</em>
        </P>

        <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <p className="font-semibold text-slate-900">Related on Agent Tools</p>
          <p className="mt-1 text-sm text-slate-600">
            TODO at integration time: replace this block with at least three real internal links
            to existing agent-tools pages. Do not invent slugs — use the repo&apos;s actual routes.
          </p>
          <Link href="/" className="mt-3 inline-block text-sm font-medium text-indigo-700 underline underline-offset-4">
            Back to Agent Tools home
          </Link>
        </div>
      </article>
    </main>
  );
}
