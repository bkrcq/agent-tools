import type { Metadata } from 'next';
import Link from 'next/link';
import { TokenCostCalculator } from '@/components/calculators';
export const metadata: Metadata = { title: 'AI Token Cost Calculator — Estimate LLM Token Usage Cost per Call, Day & Month', description: 'AI token usage calculator: estimate LLM input and output cost per call, per day, and per month from your own token counts and provider prices.', alternates: { canonical: '/ai-token-cost-calculator/' } };

const faqs = [
  {
    q: 'What does the AI token cost calculator do?',
    a: 'It estimates what an LLM call costs from your token counts and your provider prices. Enter input and output tokens per call, calls per day, and the input and output prices, and it shows the cost per call, per day, and per month. It is free and needs no signup.',
  },
  {
    q: 'How is the cost calculated?',
    a: 'Cost per call is input tokens multiplied by the input price plus output tokens multiplied by the output price. Daily cost is the per-call cost multiplied by calls per day, and monthly cost is the daily cost multiplied by 30. Replace the default prices with the rates on your provider official pricing page, because prices change.',
  },
  {
    q: 'Why does my estimate differ from my actual bill?',
    a: 'Token counts are estimates: tokenization varies by model, and cached input, reasoning tokens, tool calls, and retries can add tokens that a simple estimate misses. Treat the result as a budget estimate, then check it against one real billing period.',
  },
  {
    q: 'Is this calculator free?',
    a: 'Yes. It is a free online calculator with no signup and no account. You enter your own token counts and prices; the calculator does the arithmetic in your browser.',
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

export default function Page() { return <div className="shell page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} /><p className="eyebrow">Free online calculator</p><h1>AI Token Cost Calculator</h1><p className="lead">Estimate model spend from token usage, calls per day, and editable input/output prices.</p><div className="prose"><p>This free calculator estimates LLM token cost per call, per day, and per month. Enter how many input and output tokens one call uses, how many calls you make per day, and your provider&apos;s input and output prices per million tokens. The calculator multiplies input tokens by the input price and output tokens by the output price, then scales the per-call result to a day and a month. Use it to compare models, to size a budget before you ship an agent, or to check whether caching, shorter prompts, or a cheaper model would move the bill. Prices change often, so replace the defaults with the rates on your provider&apos;s official pricing page before using the result for a budget.</p></div><TokenCostCalculator /><div className="prose"><h2>Frequently asked questions</h2>{faqs.map((f) => (<div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>))}<h2>Use your provider’s current prices</h2><p>Prices change. Replace the defaults with the rates shown on your provider’s official pricing page before using the result for a budget.</p><h2>Related tools</h2><p>To plan the full budget, check <Link href="/ai-token-usage-guide">how token usage is estimated</Link>, then measure <Link href="/context-window-calculator">context window usage</Link> and the <Link href="/mcp-token-calculator">MCP token budget</Link> for your agent.</p></div></div>; }
