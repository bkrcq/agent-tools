import type { Metadata } from 'next';
import Link from 'next/link';
import { ContextWindowCalculator } from '@/components/calculators';
export const metadata: Metadata = { title: 'Context Window Calculator — Check Token Usage Against Any Model’s Context Limit', description: 'Context window usage calculator: see how much of a model’s context window your prompt, tool output, and conversation history occupy, and how much room is left.', alternates: { canonical: '/context-window-calculator/' } };

const faqs = [
  {
    q: 'What is a context window?',
    a: 'A context window is the maximum number of tokens a model can take in at once, including the system prompt, the user prompt, tool output, and conversation history. Once the total passes that limit, the oldest content is dropped or the call fails, depending on the provider.',
  },
  {
    q: 'What does this calculator do?',
    a: 'It estimates how much of a model context window is occupied by prompts, tool output, and conversation history, and how much room is left. Enter the model maximum context window and your estimated token usage. It is free and needs no signup.',
  },
  {
    q: 'What happens when the context window is full?',
    a: 'The model loses the oldest context first, so it may forget instructions or earlier turns, or the provider may reject the call. Summarize old turns, trim tool output, or switch to a model with a larger context window before that point.',
  },
  {
    q: 'How can I reduce context usage?',
    a: 'Keep system instructions concise and remove repeated examples, summarize old conversation turns instead of carrying them forever, and limit tool output to only the fields the agent needs.',
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

export default function Page() { return <ToolPage title="Context Window Calculator" intro="Estimate how much of an AI model context window is occupied by prompts, tool output, and conversation history."><ContextWindowCalculator /></ToolPage>; }
function ToolPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) { return <div className="shell page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} /><p className="eyebrow">Free online calculator</p><h1>{title}</h1><p className="lead">{intro}</p><div className="prose"><p>This free calculator checks your token usage against any model&apos;s context limit. Enter the model&apos;s maximum context window, then add up the tokens from your system prompt, user prompt, tool output, and conversation history. The result shows how much of the window is used, how much room is left, and whether you are close to the limit. Use it before a long agent run: if the estimate is near 100%, summarize old turns, trim tool output, or pick a model with a larger window. The result is an estimate, not a guarantee, because provider limits and tokenization can vary.</p></div>{children}<div className="prose"><h2>Frequently asked questions</h2>{faqs.map((f) => (<div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>))}<h2>How to use this calculator</h2><p>Enter the model’s maximum context window and your estimated token usage. The result is an estimate, not a guarantee: provider limits and tokenization can vary.</p><h2>Common ways to reduce context usage</h2><ul><li>Keep system instructions concise and remove repeated examples.</li><li>Summarize old conversation turns instead of carrying them forever.</li><li>Limit tool output and return only fields the agent needs.</li></ul><h2>Related tools</h2><p>Token counts feed directly into cost: try the <Link href="/ai-token-cost-calculator">AI token cost calculator</Link> and read the <Link href="/ai-token-usage-guide">AI token usage guide</Link> for estimation methods.</p></div></div>; }
