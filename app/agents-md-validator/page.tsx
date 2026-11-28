import type { Metadata } from 'next';
import Link from 'next/link';
import Validator from '@/components/validator';
export const metadata: Metadata = { title: 'AGENTS.md Validator & Checker — Validate AGENTS.md, CLAUDE.md & Codex Files', description: 'Validate your AGENTS.md file: paste an AI coding instruction file and check whether it covers purpose, setup, tests, structure, style, commits, and safety rules.', alternates: { canonical: '/agents-md-validator/' } };

const faqs = [
  {
    q: 'What is AGENTS.md?',
    a: 'AGENTS.md is an instruction file at the root of a code repository that tells an AI coding agent how to work in that project: what the project is, how to set it up, how to run tests, what the code style is, and what it must not do. Claude Code reads CLAUDE.md, Codex reads AGENTS.md, and many agents read both.',
  },
  {
    q: 'What does this validator check?',
    a: 'It checks whether your file covers purpose, setup, tests, structure, style, commits, environment variables, and safety rules, and gives a fast checklist of missing project guidance. Paste the file, get the checklist, then add the missing sections.',
  },
  {
    q: 'Does this tool upload my file?',
    a: 'No. Your text stays in your browser. The checker runs locally in the page; nothing you paste is sent to a server.',
  },
  {
    q: 'Is this validator free?',
    a: 'Yes. It is a free browser-based checker with no signup and no account.',
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

export default function Page() { return <div className="shell page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} /><p className="eyebrow">Free browser-based checker</p><h1>AGENTS.md Validator</h1><p className="lead">Paste an AI coding instruction file and get a fast checklist of missing project guidance. Your text stays in your browser.</p><div className="prose"><p>This free checker validates your AGENTS.md, CLAUDE.md, or Codex instruction file in seconds. Paste the file and it checks whether it covers the seven areas agents actually need: purpose, setup, tests, structure, style, commits, and safety rules, plus environment variables. You get a checklist of what is missing, so you can add it before the agent starts guessing. A thin file is the usual cause of an agent running the wrong tests, editing the wrong files, or committing in the wrong style. Your text stays in your browser and is not uploaded. If you are starting from scratch, read the AGENTS.md guide for a section-by-section breakdown and a starter skeleton.</p></div><Validator /><div className="prose"><h2>Frequently asked questions</h2>{faqs.map((f) => (<div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>))}<h2>What this checker looks for</h2><p>Purpose, setup, tests, structure, style, commits, environment variables, and safety rules. Add project-specific guidance for better agent results.</p><h2>Related guides</h2><p>Not sure what a good file looks like? Read the <Link href="/agents-md-guide">AGENTS.md guide</Link> for a section-by-section breakdown and a starter skeleton. If the agent itself is not running, work through the <Link href="/ai-coding-agent-setup">AI coding agent setup checklist</Link>.</p></div></div>; }
