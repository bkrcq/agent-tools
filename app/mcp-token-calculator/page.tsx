import type { Metadata } from 'next';
import Link from 'next/link';
import { McpBudgetCalculator } from '@/components/calculators';
export const metadata: Metadata = { title: 'MCP Token Calculator — Estimate MCP Tool Schema & Response Token Budget', description: 'MCP token calculator: estimate how much of an agent’s token budget MCP tool schemas and repeated tool responses consume.', alternates: { canonical: '/mcp-token-calculator/' } };

const faqs = [
  {
    q: 'What is an MCP token budget?',
    a: 'It is the share of an agent token budget spent on MCP (Model Context Protocol) tools: the tool schemas sent with every call, plus the tool responses returned over a session. Schemas are small per tool but repeat on every call, so many tools add up fast.',
  },
  {
    q: 'What does this calculator do?',
    a: 'It estimates how tool definitions and repeated tool responses consume an agent token budget. Enter your tool count, schema size, and expected response volume, and it separates schema tokens from response tokens. It is free and needs no signup.',
  },
  {
    q: 'Why do MCP tools cost tokens even when they are not called?',
    a: 'Because the model needs the tool definitions in context to know what it can call. Every registered tool schema occupies context on every call, whether or not that tool is used in that turn.',
  },
  {
    q: 'How can I reduce MCP token usage?',
    a: 'Register only the tools the task needs, keep schemas short with only the fields the agent must fill, and return only the fields the agent needs from tool responses instead of full payloads.',
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

export default function Page() { return <div className="shell page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} /><p className="eyebrow">Free online calculator</p><h1>MCP Tool Budget Calculator</h1><p className="lead">Estimate how tool definitions and repeated tool responses consume an agent’s token budget.</p><div className="prose"><p>This free calculator estimates how much of an agent&apos;s token budget MCP tools consume. MCP tool schemas are sent with every call so the model knows what it can do, and tool responses add tokens on every turn they run. Enter your tool count, schema size, and expected response volume, and the calculator separates schema tokens from response tokens so you can see which side is eating the budget. Use it to decide whether to drop tools you rarely call, shorten schemas, or trim responses. It is a simple model: measure real payloads when you tune a production agent.</p></div><McpBudgetCalculator /><div className="prose"><h2>Frequently asked questions</h2>{faqs.map((f) => (<div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>))}<h2>What the estimate includes</h2><p>This simple model separates tool schema tokens from response tokens. Measure real payloads when you tune a production agent.</p><h2>Related tools</h2><p>Combine this with the <Link href="/context-window-calculator">context window calculator</Link> to see the full picture, and read the <Link href="/ai-token-usage-guide">AI token usage guide</Link> for how tool output adds up over a session.</p></div></div>; }
