import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Muse Ember vs Haiku 5.5: Cost per Task',
  description:
    'Muse Ember ties Haiku 5.5 on the Artificial Analysis Index at a third of the cost per task \u2014 with identical token prices. Where the saving comes from, and the gaps.',
  alternates: { canonical: '/muse-ember-vs-haiku/' },
};

const faqs = [
  {
    q: 'Is Muse Ember actually cheaper than Claude Haiku 5.5?',
    a: 'Per token, no: both list $0.10 per million input tokens and $0.50 per million output tokens. Per finished task, yes, on Artificial Analysis\u2019s measurement: about $0.14 per Intelligence Index task for Ember against $0.41 for Haiku 5.5, both at maximum reasoning effort. The gap comes from cheaper cached input and fewer output tokens, not from a lower list price.',
  },
  {
    q: 'Why does Ember cost less per task if the token prices match?',
    a: 'Two reasons, both measured by Artificial Analysis: Ember\u2019s cached input is 60% cheaper than Haiku\u2019s ($0.004 vs $0.01 per million tokens), and Ember uses roughly a third as many output tokens as Haiku 5.5 to complete the same Index tasks. Cached input is most of the cost in AA\u2019s agentic evaluations, so those two effects compound into the roughly 3x per-task gap.',
  },
  {
    q: 'What happens to the price above 200,000 input tokens?',
    a: 'Meta\u2019s pricing documentation puts Ember on a second tier: above 200,000 input tokens, input rises to $0.30 and output to $1.50 per million tokens, and the higher rate applies to the whole request, not just the part above the line. Haiku 5.5 has its own step: above 100,000 input tokens it costs $0.50 input and $2.50 output. So for very long prompts Ember is cheaper per token than Haiku, not just cheaper per task.',
  },
  {
    q: 'Is Ember a full replacement for Haiku 5.5?',
    a: 'No. Ember ties Haiku on the overall Intelligence Index, but its knowledge is the weakest Artificial Analysis measured: 21.1% on AA-Omniscience against 34.7% for Haiku, mostly because it declines to answer 64% of the questions. It also trails Haiku on FrontierCode 2.0, 27.2% against 34.9%. For knowledge-heavy questions and mergeable engineering work, Haiku is still the stronger model.',
  },
  {
    q: 'What is Ember actually good at?',
    a: 'Repetitive agent execution, which is what Meta built it for: tool calls, coding subtasks, routing, extraction and long document parsing. On Artificial Analysis\u2019s numbers it scores 68.1% on AutomationBench-AA, level with Muse Wonder, and 46 on the Coding Agent Index inside Muse Code, ahead of Haiku 5.5 in Claude Code at 37. It also beats Haiku on Terminal-Bench 4.0 in AA\u2019s Index run, 40.9% against 32.8%.',
  },
  {
    q: 'Where can I use Muse Ember?',
    a: 'On the Meta Model API and in Muse Code as model ID muse-ember-1.0, with support for the Responses API. Meta also lists it on Google Cloud and Oracle Cloud. It accepts text, images, audio and video, with a 1M-token context window and up to 512K output tokens. The weights and parameter count are not disclosed, so there is no self-hosted option.',
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
  headline: 'Muse Ember vs Haiku 5.5: Cost per Task',
  description:
    'What Artificial Analysis\u2019s $0.14 vs $0.41 per-task figures actually measure, why identical token prices still produce a 3x cost gap, and where Ember falls behind Haiku 5.5.',
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
      <p className="eyebrow">Model cost comparison · 10 Nov 2026</p>
      <h1>Muse Ember vs Claude Haiku 5.5: Same Token Price, a Third of the Cost per Task</h1>
      <p className="lead">
        On 9 November 2026 Meta released Muse Ember, its smallest and most efficient model, built
        for the work agents repeat all day: tool calls, coding subtasks, routing, extraction and
        long document parsing. The headline sounds like a price cut &mdash; it matches Claude
        Haiku 5.5 on the Artificial Analysis Intelligence Index at about a third of the cost per
        task. It is not a price cut: the token prices are identical. This page separates the
        per-token price from the per-task cost, and keeps the parts where Ember loses.
      </p>

      <div className="prose">
        <h2>The headline number, and what it measures</h2>
        <p>
          Artificial Analysis ran both models on its Intelligence Index v5 at maximum reasoning
          effort. Muse Ember scored 36; Claude Haiku 5.5 also scored 36 (unrounded, 35.8 against
          36.2 &mdash; effectively tied). The cost per Intelligence Index task was about $0.14 for
          Ember and $0.41 for Haiku 5.5. That &ldquo;cost per task&rdquo; is the cost of running the
          whole Index, not a price per API call: it folds in how many tokens each model actually
          burns to finish the benchmark&rsquo;s tasks. Meta&rsquo;s own launch post states the same
          comparison, and Artificial Analysis confirmed it the same day.
        </p>
        <p>
          The comparison only holds at maximum reasoning effort, which is the default for Ember
          and the setting AA used for both models. Ember (xhigh) scores 34 for $0.12 per task, so
          dropping one effort level trades two index points for about two cents. Neither figure is
          a promise about your workload: your cost depends on your own prompts, cache reuse and
          output lengths.
        </p>

        <h2>Why the bill differs when the price list doesn&rsquo;t</h2>
        <p>
          Both models list $0.10 per million input tokens and $0.50 per million output tokens.
          The per-task gap comes from two measured differences, both reported by Artificial
          Analysis:
        </p>
        <ul>
          <li>
            <strong>Cached input is 60% cheaper.</strong> Ember charges $0.004 per million cached
            input tokens against Haiku 5.5&rsquo;s $0.01. Cached input is most of the cost in AA&rsquo;s
            agentic evaluations, because agents re-read the same context every turn &mdash; so a
            cache discount lands harder than the headline input rate suggests.
          </li>
          <li>
            <strong>Ember writes roughly a third as many output tokens.</strong> For the same
            Index tasks, Ember used about a third of Haiku&rsquo;s output tokens. Output is the
            expensive direction at $0.50 per million, so shorter answers are where most of the
            saving lives.
          </li>
        </ul>
        <p>
          An illustration, not a measurement: take a task with 100,000 cached input tokens. If
          Ember answers in 5,000 output tokens and Haiku needs 15,000 for the same task, the
          bill is $0.0029 for Ember ($0.0004 cached input + $0.0025 output) against $0.0085 for
          Haiku ($0.0010 cached input + $0.0075 output) &mdash; about a third, matching AA&rsquo;s
          measured ratio. The token counts are assumptions chosen to show the mechanism; the
          $0.14 vs $0.41 figures are AA&rsquo;s measured ones.
        </p>

        <h2>The price tiers that change the math</h2>
        <p>
          Both models get more expensive as prompts grow, but at different thresholds &mdash; and
          the higher rate applies to the whole request, not just the part above the line:
        </p>
        <ul>
          <li>
            <strong>Muse Ember:</strong> up to 200,000 input tokens, $0.10 input / $0.004 cached
            / $0.50 output per million tokens. Above 200,000 input tokens, $0.30 / $0.012 /
            $1.50 &mdash; a 3x step on the whole request.
          </li>
          <li>
            <strong>Claude Haiku 5.5:</strong> up to 100,000 input tokens, $0.10 input / $0.01
            cached / $0.50 output per million tokens. Above 100,000 input tokens, $0.50 / $0.05
            / $2.50 &mdash; a 5x step on the whole request.
          </li>
        </ul>
        <p>
          Two consequences worth knowing before you budget. First, between 100,000 and 200,000
          input tokens, Haiku is already on its expensive tier while Ember is still at base
          rates. Second, above 200,000 tokens Ember is cheaper per token than Haiku ($0.30
          against $0.50 input), not just cheaper per task. For the long-document work Meta
          advertises &mdash; a 1M-token context is only cheap for the first 200,000 tokens, on
          either model. Check the live pricing pages before building a forecast: Meta&rsquo;s
          pricing documentation for Ember, Anthropic&rsquo;s pricing page for Haiku.
        </p>

        <h2>Where Ember wins, where it loses</h2>
        <p>
          Same overall index score, different shape. All figures below are Artificial Analysis,
          at maximum reasoning effort, 9 November 2026:
        </p>
        <ul>
          <li>
            <strong>Agent workflows: Ember ahead.</strong> AutomationBench-AA 68.1%, level with
            Muse Wonder (max) and ahead of Haiku. Coding Agent Index: 46 for Ember inside Muse
            Code, against 37 for Haiku 5.5 inside Claude Code and 31 for GPT-6 Luna inside
            Codex. Terminal-Bench 4.0: 40.9% against 32.8% in AA&rsquo;s Index run.
          </li>
          <li>
            <strong>Real engineering work: Haiku ahead.</strong> FrontierCode 2.0, which judges
            tasks on mergeability, gives Ember 27.2% against Haiku&rsquo;s 34.9%. If the job is
            producing code that survives review, the cheaper model is not the better one on this
            measure.
          </li>
          <li>
            <strong>Knowledge: Ember&rsquo;s main weakness.</strong> AA-Omniscience accuracy is
            21.1% for Ember, the lowest of the similarly intelligent models AA compared, against
            34.7% for Haiku and 50.5% for Gemini 3.8 Flash. Most of the gap is abstention:
            Ember declines to answer 64% of the questions. That keeps its hallucination rate
            low &mdash; 17.4%, about half of Haiku&rsquo;s &mdash; but a model that stays silent
            two times in three is not a knowledge substitute.
          </li>
        </ul>
        <p>
          One footnote on Terminal-Bench: Meta&rsquo;s own launch table lists Haiku at 39.2% in
          its best published harness, against AA&rsquo;s 32.8% in its own Index run. The 40.9%
          for Ember is the same in both. The direction &mdash; Ember ahead on this benchmark
          &mdash; does not change; the size of the lead depends on the harness.
        </p>

        <h2>When to use which</h2>
        <p>
          No winner here &mdash; the right pick depends on what the task burns and what it
          punishes:
        </p>
        <ul>
          <li><strong>Use Ember when:</strong> the work is high-volume, repeatable agent steps &mdash; tool calls, routing, extraction, small coding subtasks &mdash; with short prompts, heavy cache reuse and short answers. That is exactly the shape where its per-task advantage comes from.</li>
          <li><strong>Use Haiku 5.5 when:</strong> the task needs factual knowledge, trivia-style recall, or code that has to pass merge review. FrontierCode and Omniscience both favour Haiku, and the gap there is larger than the overall index suggests.</li>
          <li><strong>Test both when:</strong> your prompts regularly cross 100,000 tokens. The tier steps flip the per-token comparison, so the cheaper model on your workload is a measurement, not a headline. Run the same prompts through both and compare the actual bill with the <Link href="/ai-token-cost-calculator">AI token cost calculator</Link>.</li>
        </ul>

        <h2>What this page does not claim</h2>
        <ul>
          <li>Ember&rsquo;s weights and parameter count are not disclosed by Meta, so there is no self-hosted option and no way to check the size claim independently.</li>
          <li>Audio and video input are Meta&rsquo;s claim. Artificial Analysis&rsquo;s published results cover text and image input; the other modalities have not been independently benchmarked yet.</li>
          <li>Quality at a full 1M-token context has not been independently tested. The 200,000-token price step means long-context work is also the most expensive work on either model.</li>
          <li>Prices move. The $0.14 vs $0.41 per-task figures are Artificial Analysis&rsquo;s 9 November 2026 measurement at maximum effort, not a standing quote.</li>
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
          <li>Meta, &ldquo;Introducing Our Smallest, Most Efficient Model: Muse Ember&rdquo; (9 November 2026): release, model ID <code>muse-ember-1.0</code>, $0.10 / $0.004 / $0.50 pricing, 1M context, 512K max output, Meta Model API and Muse Code, Google Cloud and Oracle Cloud. See <a href="https://research.meta.ai/blog/muse-ember" target="_blank" rel="noreferrer">research.meta.ai/blog/muse-ember</a>.</li>
          <li>Artificial Analysis, &ldquo;Meta&rsquo;s Muse Ember is the cheapest model scoring 36 on the Intelligence Index&rdquo; (9 November 2026): Intelligence Index 36 vs 36, $0.14 vs $0.41 per task at max effort, cached input 60% cheaper, roughly a third of the output tokens, FrontierCode 2.0 27.2% vs 34.9%, Terminal-Bench 4.0 40.9% vs 32.8%, AutomationBench-AA 68.1%, Coding Agent Index 46 vs 37, AA-Omniscience 21.1% vs 34.7% with a 64% decline rate. See <a href="https://artificialanalysis.ai/articles/meta-s-muse-ember-is-the-cheapest-model-scoring-36-on-the-intelligence-index" target="_blank" rel="noreferrer">artificialanalysis.ai</a>.</li>
          <li>Price tiers: Ember&rsquo;s 200,000-token step ($0.30 / $1.50 above) per Meta&rsquo;s pricing documentation as reported by multiple outlets on 10 November 2026; Haiku 5.5&rsquo;s 100,000-token step ($0.50 / $2.50 above, cache read $0.01) per Anthropic&rsquo;s pricing page as reported the same week. Haiku 5.5 released 7 October 2026, model ID <code>claude-haiku-5-5</code>, 1M context, 128K max output.</li>
          <li>Unconfirmed and deliberately not asserted here: audio/video input quality (Meta&rsquo;s claim only); quality at a full 1M-token context; any per-task cost on your own workload &mdash; the $0.14 vs $0.41 figures are AA&rsquo;s benchmark measurement, not a quote.</li>
        </ul>
        <p><em>Data checked: 2026-11-10. Prices and benchmark scores move quickly: re-check Meta&rsquo;s and Anthropic&rsquo;s pricing pages before budgeting.</em></p>

        <h2>Related tools</h2>
        <p>
          Before switching models on cost grounds, estimate your actual usage with the{' '}
          <Link href="/ai-token-cost-calculator">AI token cost calculator</Link> and check
          hidden background-agent spend with the{' '}
          <Link href="/claude-code-agent-summary-cost">agent_summary cost calculator</Link>.
          For the token math behind the comparison, read the{' '}
          <Link href="/ai-token-usage-guide">AI token usage guide</Link>.
        </p>
      </div>
    </div>
  );
}
