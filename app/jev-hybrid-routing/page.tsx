import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jev + Opus Routing: 98.8% at 4x Lower Cost',
  description:
    'Hightouch tested decision models as judges for identity resolution: Jev alone scored 95.6% at $0.05 per 1,000 identities, Claude Opus 5.5 scored 99.0% at $3.86. Routing only Jev\u2019s low-confidence cases (30\u201390%) to Opus reached 98.8% at $0.88 \u2014 near-frontier accuracy for a quarter of the cost.',
  alternates: { canonical: '/jev-hybrid-routing/' },
};

const faqs = [
  {
    q: 'What is the Jev + Opus hybrid routing pattern?',
    a: 'Let the cheap decision model judge everything first, then send only the uncertain cases to the expensive frontier model for a second opinion. In Hightouch\u2019s identity-resolution test, Jev judged all 1,000 identities and only the 22% whose confidence fell between 30% and 90% went to Claude Opus 5.5. The result was 98.8% accuracy at $0.88 per 1,000 identities, against 99.0% at $3.86 for Opus alone.',
  },
  {
    q: 'What is Jev?',
    a: 'Jev is TypeSafe AI\u2019s decision model, launched 15 September 2026. It is a "System One" model: instead of generating text, it returns a typed decision (a choice, a score, or a yes/no probability) with a calibrated confidence score. TypeSafe lists it at $0.042 per million input tokens with output free, and 70\u2013500 ms latency. It cannot write a sentence, summarise, or extract text \u2014 it only decides.',
  },
  {
    q: 'Why does Jev work as a router when Luna does not work as well?',
    a: 'Calibration. Most of Jev\u2019s mistakes come with low confidence, so a confidence band cleanly catches them. GPT-6 Luna scored higher alone (97.3% vs Jev\u2019s 95.6%), but its mistakes were overconfident \u2014 many sat in the 90\u2013100% bucket \u2014 so its hybrid only reached 98.5% at $0.33 per 1,000, and fell to 91.6% on the harder test while hybrid Jev held 95.3%. A higher solo score does not mean a better router; the calibration curve is what matters.',
  },
  {
    q: 'How much does hybrid routing actually save?',
    a: 'On Hightouch\u2019s first benchmark, Opus alone cost $3.86 per 1,000 identities at 99.0% accuracy; hybrid Jev cost $0.88 at 98.8% \u2014 about 4.4x cheaper for 0.2 points of accuracy \u2014 and answered in 0.63 seconds per identity instead of 2.2. The saving depends on how many cases fall in the low-confidence band: widen the band and accuracy rises toward Opus alone, but so does cost.',
  },
  {
    q: 'Can I use this pattern for my own agent?',
    a: 'Yes, if your task is a judgement call with a clear right answer \u2014 grading, triage, dedup, routing, scoring, or approval. First measure the decision model\u2019s calibration on your own data: plot accuracy against its confidence buckets and check that errors cluster at low confidence. If errors are overconfident, the band will miss them and the hybrid will not help. Then pick the band that trades cost against your accuracy floor, and re-measure whenever you swap the model or the task changes.',
  },
  {
    q: 'What can Jev not do?',
    a: 'Anything that needs generated text. Jev answers yes/no, picks a category, or returns a probability \u2014 it does not write, summarise, extract, or explain. If your pipeline needs a justification, a rewrite, or a free-form answer, that step still belongs to a frontier model. Treat Jev as a gate in front of the generator, not a replacement for it.',
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
  headline: 'Jev + Opus Hybrid Routing: 98.8% Accuracy at 4x Lower Cost (Hightouch Test)',
  description:
    'A decision-model-first routing guide based on Hightouch\u2019s identity-resolution benchmark: Jev screens, Opus reviews only the uncertain 30\u201390% band, and the hybrid lands within 0.2 points of Opus alone at about a quarter of the cost.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-07',
  dateModified: '2026-11-07',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Agent cost optimisation · 7 Nov 2026</p>
      <h1>Jev + Opus Hybrid Routing: 98.8% Accuracy at 4x Lower Cost</h1>
      <p className="lead">
        A cheap decision model judges everything; an expensive frontier model only reviews
        the cases the cheap model is unsure about. Hightouch tested this on grading identity
        resolution, and the hybrid landed within 0.2 points of Claude Opus 5.5 alone — for
        about a quarter of the cost.
      </p>

      <div className="prose">
        <h2>The test, in one paragraph</h2>
        <p>
          Hightouch needed a fast way to grade identity resolution — deciding whether a
          set of records (names, emails, addresses, birth dates) really describes one person
          or an accidental merge of two. Human sampling runs at roughly 50 identities an hour,
          so they built a 1,000-identity benchmark with pseudopeople, a simulator from the
          University of Washington: half the identities were one real person with noisy
          records, half were over-merges. Then they asked several models to judge each
          identity, and compared accuracy, time, and cost per 1,000 identities. The full
          results are in{' '}
          <a href="https://hightouch.com/blog/llm-judges-identity-resolution" target="_blank" rel="noreferrer">Hightouch’s write-up</a>.
        </p>

        <h2>Single models first: cheap, fast, and not quite frontier</h2>
        <table>
          <thead>
            <tr><th>Model</th><th>Accuracy</th><th>Time / identity</th><th>Cost / 1,000</th></tr>
          </thead>
          <tbody>
            <tr><td>Claude Opus 5.5</td><td>99.0%</td><td>2.2 s</td><td>$3.86</td></tr>
            <tr><td>Gemini 3.1 Pro</td><td>98.3%</td><td>4.2 s</td><td>$4.48</td></tr>
            <tr><td>GPT-6 Sol</td><td>98.3%</td><td>2.1 s</td><td>$2.50</td></tr>
            <tr><td>GPT-6 Luna, Decisions API</td><td>97.3%</td><td>0.17 s</td><td>$0.10</td></tr>
            <tr><td>Jev</td><td>95.6%</td><td>0.15 s</td><td>$0.05</td></tr>
          </tbody>
        </table>
        <p>
          Jev and Luna are a new class Hightouch calls decision models: they return a 0–1
          confidence score that a condition is true, instead of generating text. They are up
          to 90x cheaper and more than 10x faster than frontier models out of the box, but
          they trail Opus by about 6 points on the harder cases. That gap is the whole
          problem the hybrid is built to close.
        </p>

        <h2>What Jev is — and what it is not</h2>
        <p>
          Jev is TypeSafe AI’s first “System One” model, launched 15 September 2026.
          You send it application state plus typed questions; it answers all of them in one
          pass with a probability-weighted decision and a calibrated confidence score.
          TypeSafe lists $0.042 per million input tokens, output free, and 70–500 ms
          end-to-end latency. It cannot write a single word — no summaries, no
          extraction, no justification. That limitation is the point: a model that only
          decides is cheap enough to run on every item, and its confidence score is a
          machine-readable signal your code can act on.
        </p>

        <h2>The hybrid: Jev screens, Opus reviews the uncertain band</h2>
        <p>
          The rule is simple: Jev judges everything. Only identities whose Jev confidence
          falls inside a chosen band go to Opus for a second opinion. Everything outside
          the band keeps Jev’s answer.
        </p>
        <table>
          <thead>
            <tr><th>Sent to Opus</th><th>Share sent</th><th>Accuracy</th><th>Time / identity</th><th>Cost / 1,000</th></tr>
          </thead>
          <tbody>
            <tr><td>Nothing (Jev alone)</td><td>0%</td><td>95.6%</td><td>0.15 s</td><td>$0.05</td></tr>
            <tr><td>50–80% confidence</td><td>7%</td><td>97.5%</td><td>0.30 s</td><td>$0.31</td></tr>
            <tr><td>50–90% confidence</td><td>17%</td><td>97.9%</td><td>0.52 s</td><td>$0.71</td></tr>
            <tr><td><strong>30–90% confidence</strong></td><td><strong>22%</strong></td><td><strong>98.8%</strong></td><td><strong>0.63 s</strong></td><td><strong>$0.88</strong></td></tr>
            <tr><td>10–90% confidence</td><td>40%</td><td>98.8%</td><td>1.02 s</td><td>$1.58</td></tr>
            <tr><td>Everything (Opus alone)</td><td>100%</td><td>99.0%</td><td>2.2 s</td><td>$3.86</td></tr>
          </tbody>
        </table>
        <p>
          The 30–90% band is the sweet spot in this test: sending 22% of cases to Opus
          recovers almost all of Jev’s errors, because Jev’s errors cluster at low
          confidence. Widening the band to 10–90% sends nearly twice as many cases to
          Opus and gains nothing — accuracy stays 98.8% while cost nearly doubles.
        </p>

        <h2>Why Jev beats Luna as a router, even though Luna scores higher alone</h2>
        <p>
          Luna alone is the better judge: 97.3% against Jev’s 95.6%. But a router is not
          judged by its solo score — it is judged by whether its uncertainty points at
          its own mistakes. Most of Jev’s mistakes sit near 50% confidence, exactly where
          a band catches them. Luna’s mistakes are overconfident, many in the 90–100%
          bucket, so the band misses them: its best hybrid (10–90% to Opus) reaches
          98.5% at $0.33 per 1,000, sending only 6% of cases — cheaper, but a lower
          ceiling.
        </p>
        <p>
          The harder test makes the difference stark. On trickier cases only — typos on
          key fields, twins, juniors and seniors with the same name — Opus alone fell to
          95.1% ($5.39 per 1,000), hybrid Jev held 95.3% ($2.94), and hybrid Luna dropped
          to 91.6% ($1.15). Because Jev stays better calibrated as difficulty rises, the
          hybrid automatically sends more cases to Opus without any harness or prompting
          change. Picking the router by solo accuracy would have picked the wrong model.
        </p>

        <h2>How to apply this to your own agent</h2>
        <ol>
          <li>
            <strong>Use it for judgement calls, not generation.</strong> Grading, triage,
            dedup, routing, scoring, approval — any step where the answer is a choice
            with a clear right answer. If the step needs a written justification or a
            rewrite, that part still belongs to a frontier model.
          </li>
          <li>
            <strong>Measure calibration on your own data before you trust the band.</strong>{' '}
            Plot accuracy against the decision model’s confidence buckets on a labelled
            sample of your task. The hybrid only works if errors cluster at low
            confidence. If your errors are overconfident, widening the band will not save
            you — you need a different model or a different prompt.
          </li>
          <li>
            <strong>Pick the band by your accuracy floor, not by the headline number.</strong>{' '}
            Hightouch’s 30–90% band is tuned to their benchmark and their cost
            tolerance. Start narrow, measure the error rate on what the band lets through,
            and widen until the residual error is below what your use case can absorb.
          </li>
          <li>
            <strong>Re-measure when anything changes.</strong> Swap the decision model,
            swap the frontier reviewer, or change the task, and the calibration curve
            moves. A band tuned for Jev on identity resolution says nothing about Luna on
            support-ticket triage. Treat the band as a configuration that expires, not a
            constant.
          </li>
          <li>
            <strong>Keep the frontier review cheap by keeping it narrow.</strong> The
            reviewer only sees the uncertain slice, so give it a focused prompt — the
            decision, the conflicting evidence, and the specific question — not the
            whole pipeline context. The review call is where the money goes; every token
            there is multiplied by the share of cases you send.
          </li>
        </ol>

        <h2>What is still unconfirmed</h2>
        <ul>
          <li>Hightouch’s 98.8% is their benchmark on their data, not a general guarantee. Your accuracy will differ — measure it on your own labelled sample before quoting the number anywhere.</li>
          <li>Jev’s $0.042 per million input tokens is TypeSafe’s published list price. TypeSafe itself notes it cannot prove the price is not subsidised, and expects it to fall rather than rise; treat the price as current, not permanent.</li>
          <li>Whether other decision models calibrate as well as Jev on other tasks is untested here. Luna’s overconfidence in this one test does not prove it is a bad router everywhere — it proves calibration must be measured per task, not assumed from a leaderboard.</li>
          <li>The harder-test result where hybrid Jev (95.3%) edges Opus alone (95.1%) is a single benchmark run on synthetic data, not evidence that a hybrid generally beats the frontier model it reviews.</li>
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
          <li>Hightouch, “LLM Judges for Identity Resolution at 4x Lower Cost” (6 November 2026): the benchmark, all accuracy/cost/time tables, and the calibration analysis used on this page. See <a href="https://hightouch.com/blog/llm-judges-identity-resolution" target="_blank" rel="noreferrer">hightouch.com/blog/llm-judges-identity-resolution</a>.</li>
          <li>TypeSafe AI’s published Jev pricing and launch details (15 September 2026): $0.042 per million input tokens, output free, 70–500 ms latency, System One decision model. Cross-checked against independent write-ups of TypeSafe’s announcement; the vendor’s own caveat that the price may be subsidised is noted above.</li>
          <li>Unconfirmed and deliberately not asserted here: any Jev or Luna pricing change after 7 November 2026, any independent replication of Hightouch’s benchmark, and any claim that hybrid routing beats a frontier model in general.</li>
        </ul>
        <p><em>Data checked: 2026-11-07. This page reports Hightouch’s 6 November 2026 benchmark; re-verify the source article before reusing the numbers after November 2026, and re-measure calibration on your own task before adopting the 30–90% band.</em></p>

        <h2>Related tools</h2>
        <p>
          For the hidden token cost of agent summaries in Claude Code, read the{' '}
          <Link href="/claude-code-agent-summary-cost">agent_summary cost guide</Link>.
          For cross-harness memory trade-offs, read the{' '}
          <Link href="/beacon-agent-memory">Beacon agent memory guide</Link>, and for
          instruction files, the <Link href="/agents-md-guide">AGENTS.md guide</Link>.
        </p>
      </div>
    </div>
  );
}
