import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Perplexity Decider v1.3: Locate & Pricing',
  description:
    'Perplexity Decider v1.3 adds Locate text-span extraction to an open-weight decision model. Pricing, limits, and a same-dataset comparison vs Gemini Decision 1.',
  alternates: { canonical: '/perplexity-decider-v1-3/' },
};

const faqs = [
  {
    q: 'What is Perplexity Decider v1.3?',
    a: 'An open-weight decision model released 12 November 2026. It reads a text, JSON, or image input (called state) and returns probabilities for named questions instead of generated text: yes/no (noul), one of your options (choice), a level on your rubric (score), and, new in v1.3, verbatim text spans (locate). The full model is pplx-decider-v1.3 (27B, built on Qwen3.8-27B); the smaller pplx-decider-flash-v1.3 (4B, distilled from Qwen3.5-4B) shares the same API contract. Weights ship under Apache 2.0 on Hugging Face.',
  },
  {
    q: 'What does Locate do that noul, choice, and score cannot?',
    a: 'Locate extracts the exact text that matches a description, with character offsets, instead of returning a probability. Ask for an "email address" or "extract the city where the job is located" and you get back spans: the verbatim substring, its start and end offsets in Unicode characters (end exclusive, so state[start:end] reproduces the text in Python), and a confidence score. When nothing matches, spans is an empty list rather than an invented span. It is built for named-entity recognition, PII detection, and extractive question answering.',
  },
  {
    q: 'How much does Perplexity Decider v1.3 cost?',
    a: 'Through Perplexity’s Decisions API, $0.02 per million input tokens for v1.3 and $0.01 for Flash v1.3, with output tokens free — there are none to bill. Both models are free on OpenRouter (perplexity/pplx-decider-v1.3:free and the Flash equivalent) with $0 posted pricing; Perplexity said on X the free window runs until 19 November 2026, so plan paid routing after that. Web grounding adds $0.001 per search, up to $0.10 per 100-question request.',
  },
  {
    q: 'How does Decider v1.3 compare with Gemini Decision 1?',
    a: 'On an independent tester’s same-dataset bench (782 items, 702 shared across five models), Gemini Decision 1 came first at 92.3%, then GPT-6 Luna at 91.6%, Decider v1.3 at 91.0%, Jev 1.14 at 90.3%, and Cloudflare Clef at 88.5%. Decider v1.3 won four of ten categories — triage, logs, confidence, and cost — and was the cheapest per decision in that test, but it was weakest on UI-defect screenshots (67.7% vs Jev’s 86.5%) and cannot read PDFs, which Gemini does. Perplexity’s own numbers — 91.6% mean accuracy across 63 internal classification tasks — come from a different test set and are not directly comparable.',
  },
  {
    q: 'Can I run the Decider v1.3 weights locally?',
    a: 'Yes, under Apache 2.0. Two local gotchas from the model card: the default mode="separate" answers each question in its own sequence, while mode="isolated" shares computation but changes 1.5–2.2% of top answers in Perplexity’s samples; and fast=True, the optimised local path, disables Locate. Mixing locate questions with noul, choice, or score in one request needs separate forward passes for the two types, adding latency.',
  },
  {
    q: 'What are the limits I should know before using it?',
    a: 'Locate only works on plain-text state — images, objects, or arrays return 400 — and only the v1.3 models answer locate questions; v1.2 returns 400. A request with a locate question caps at 128 questions, and locate does not work with web grounding. Locate was trained on inputs up to 8K tokens and evaluated up to 32K; longer inputs are accepted but span quality beyond that is unmeasured. The API input limit is 256K tokens, and each request body is capped at 32 MiB.',
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
  headline: 'Perplexity Decider v1.3: Locate & Pricing',
  description:
    'A guide to Perplexity’s Decider v1.3 decision model: the new Locate text-span extraction, $0.02 per million input tokens pricing, local-weight gotchas, and a same-dataset comparison with Gemini Decision 1.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-14',
  dateModified: '2026-11-14',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Decision models · 14 Nov 2026</p>
      <h1>Perplexity Decider v1.3: a Decision Model That Can Also Point at the Evidence</h1>
      <p className="lead">
        Perplexity released Decider v1.3 and Decider Flash v1.3 on 12 November 2026, a day
        after Google’s Gemini Decision 1. Both are decision models — they return
        probabilities, not text — but v1.3 adds something the category did not have:
        Locate, which extracts the exact text span that matches a description, with
        character offsets, instead of only scoring options. The weights are open under
        Apache 2.0, and both models are free on OpenRouter for a week.
      </p>

      <div className="prose">
        <h2>What it is — and what it is not</h2>
        <p>
          A decision model is a different kind of endpoint from a chat model. You send one
          shared input — text, JSON, or images, called <code>state</code> — plus named
          questions, and the model scores your candidate options in a single forward pass
          instead of generating answer text token by token. Every answer comes back as a
          probability with a confidence score, so your code can route ambiguous cases to
          a fallback or a human reviewer. Perplexity pitches it for the repetitive
          judgements inside agent workflows: classification, routing, grading against a
          rubric, moderation, and now extraction.
        </p>
        <p>
          The important boundary is the same as for every decision model: it never writes.
          It cannot summarise, explain, or justify — if your pipeline needs a written
          reason for a decision, that step still belongs to a generative model. Locate
          narrows the gap by returning the evidence verbatim, but it is still extraction,
          not explanation. The model is the second Perplexity decision model after v1.2
          (October 2026), and the fourth decision-model endpoint in about two months,
          after TypeSafe’s Jev, OpenAI’s Decisions API, and Google’s Gemini Decisions
          API. Read the{' '}
          <Link href="/gemini-decisions-api">Gemini Decisions API guide</Link> for the
          Google side of the same category.
        </p>

        <h2>The four question types</h2>
        <table>
          <thead>
            <tr><th>Type</th><th>What you ask</th><th>What you get back</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>noul</strong> (yes/no)</td><td>Does a condition hold? Instructions, criteria, or both.</td><td>Probability of yes, from 0 to 1.</td></tr>
            <tr><td><strong>choice</strong> (multiple choice)</td><td>Which of 1–255 options fits best?</td><td>The winning option and a probability for every option.</td></tr>
            <tr><td><strong>score</strong> (ordered rubric)</td><td>How does the input grade against a rubric of up to 10 levels?</td><td>A probability-weighted score plus per-level probabilities.</td></tr>
            <tr><td><strong>locate</strong> (new in v1.3)</td><td>Find text matching a label or instruction, e.g. “email address”.</td><td>Spans: verbatim text, start/end character offsets, and a score.</td></tr>
          </tbody>
        </table>
        <p>
          All four types can share one request against the same <code>state</code> — for
          example, a support message checked for whether it needs a ticket (noul), its
          priority (score), and the customer’s email address (locate) at once. But
          locate has its own contract: <code>state</code> must be a plain string (images,
          objects, and arrays return 400), a request with a locate question caps at 128
          questions, and locate does not work with web grounding. Only v1.3 models answer
          locate questions; asking v1.2 returns 400. When nothing matches,{' '}
          <code>spans</code> is an empty list — the model does not invent a span.
        </p>
        <p>
          Locate was trained on inputs of up to 8K tokens and evaluated on inputs of up to
          32K tokens. Longer inputs are accepted, but span quality on them is not
          measured — keep long documents chunked if the offsets have to be exact.
        </p>

        <h2>Pricing: a fifth of Gemini’s, free this week on OpenRouter</h2>
        <table>
          <thead>
            <tr><th>Item</th><th>Decider v1.3</th><th>Decider Flash v1.3</th></tr>
          </thead>
          <tbody>
            <tr><td>Input tokens (Decisions API)</td><td>$0.02 per million</td><td>$0.01 per million</td></tr>
            <tr><td>Output tokens</td><td>Free — there are none</td><td>Free — there are none</td></tr>
            <tr><td>Context window</td><td>256K tokens</td><td>256K tokens</td></tr>
            <tr><td>Parameters</td><td>27B (Qwen3.8-27B)</td><td>4B (distilled Qwen3.5-4B)</td></tr>
            <tr><td>OpenRouter (:free)</td><td>$0, free window to 19 Nov 2026</td><td>$0, free window to 19 Nov 2026</td></tr>
            <tr><td>Web grounding</td><td colSpan={2}>$0.001 per search, up to 100 questions per grounded request</td></tr>
          </tbody>
        </table>
        <p>
          The OpenRouter free window is the cheapest way to test the model, but two details
          matter. First, the 19 November end date comes from a Perplexity post on X; the
          OpenRouter model page shows $0 pricing with no end date, so do not build a
          production dependency on free access. Second, the OpenRouter endpoint runs on
          the Decisions API, not the chat-completions endpoint — a regular chat SDK will
          not work with it; use the decisions request shape below.
        </p>
        <p>
          Against the category, Decider v1.3 is the cheapest paid route: Gemini Decision 1
          and OpenAI’s Decisions API both charge $0.10 per million input tokens, and Jev
          charges $0.042. The price only matters if the accuracy holds on your tasks,
          which is why the comparison below uses one shared dataset rather than each
          vendor’s own chart.
        </p>

        <h2>How it compares: one shared dataset, five models</h2>
        <p>
          Vendor benchmarks in this category are not comparable — each vendor reports its
          own tests, on which its own model wins. The most useful head-to-head so far is
          an independent tester’s bench that ran all five decision models through the same
          782-item dataset of six decisions testers make regularly, scoring the 702 items
          all five models could handle. <strong>These are one tester’s results on one
          dataset, not a leaderboard.</strong>
        </p>
        <table>
          <thead>
            <tr><th>Model (702 shared items)</th><th>Accuracy</th><th>Best at</th></tr>
          </thead>
          <tbody>
            <tr><td>Gemini Decision 1</td><td><strong>92.3%</strong> (648)</td><td>Overall accuracy; only model that reads PDFs (77/80, 96.3%)</td></tr>
            <tr><td>GPT-6 Luna (OpenAI Decisions)</td><td>91.6% (643)</td><td>Trick questions</td></tr>
            <tr><td><strong>Perplexity Decider v1.3</strong></td><td><strong>91.0%</strong> (639)</td><td>Triage, logs, confidence, cost</td></tr>
            <tr><td>TypeSafe Jev 1.14</td><td>90.3% (634)</td><td>UI defects on screenshots (86.5%); fastest</td></tr>
            <tr><td>Cloudflare Clef</td><td>88.5% (621)</td><td>—</td></tr>
          </tbody>
        </table>
        <p>
          The gaps are small — 92.3% to 88.5% across the field — and the strengths split by
          task. Decider v1.3 got all 156 “does this log need a ticket?” items right, the
          best result of any model on that task, and whenever it reported high confidence
          it was right on all 594 such answers in the test. Its weak spot was UI-defect
          screenshots at 67.7%, against Jev’s 86.5%. On cost, Decider v1.3 used the fewest
          input tokens per decision (429 on average, vs 470 for Luna, 511 for Clef, 598
          for Gemini, and 830 for Jev) and was free at test time; the tester’s paid
          equivalents were $0.035 per 1,000 decisions for Jev, $0.047 for Luna, $0.060
          for Gemini, and $0.123 for Clef. Median response time was 454 ms for Decider
          v1.3, close behind Jev, the fastest.
        </p>
        <p>
          Perplexity’s own numbers tell a different, vendor-side story: 91.6% mean accuracy
          across 63 internal classification tasks, 6.54 points above its deployed
          classifiers, with references relabelled by a frontier LLM judge, and 93.98% on
          Perplexity’s own sample of real requests against 93.68% for v1.2. For Locate
          specifically, Perplexity reports an average of 69.0 across 17 out-of-domain
          extraction tasks for v1.3 (63.6 for Flash), against 43.3 for Liquid d1, 41.5 for
          Cloudflare Clairic, and 33.6 for GLiNER large v2.5 — but those averages combine
          different metrics (exact-span F1, character-level F1, field accuracy), so they
          are not a single extraction-accuracy percentage. <strong>None of these vendor
          figures has been independently replicated.</strong> For the hybrid pattern — a
          cheap decision model screens, an expensive frontier model reviews only the
          uncertain cases — read the{' '}
          <Link href="/jev-hybrid-routing">Jev + Opus hybrid routing guide</Link>.
        </p>

        <h2>How to start</h2>
        <ol>
          <li>
            <strong>Try it free on OpenRouter first.</strong> Use the{' '}
            <code>perplexity/pplx-decider-v1.3:free</code> endpoint before 19 November
            2026. Remember it runs on the Decisions API, so a chat-completions client
            will not work — send a decisions request, not a chat request.
          </li>
          <li>
            <strong>Call the Decisions API.</strong> The endpoint is{' '}
            <code>POST https://api.perplexity.ai/v1/decisions</code>, with model{' '}
            <code>pplx-decider-v1.3</code> (or the <code>pplx-decider-latest</code> alias,
            which follows the newest version). A minimal call, adapted from Perplexity’s
            documentation example:
            <pre><code>{`curl https://api.perplexity.ai/v1/decisions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "pplx-decider-v1.3",
    "state": "The AeroPress arrived with a cracked filter cap. I emailed help@brewco.example on Monday and nobody replied.",
    "questions": {
      "needs_ticket": {"type": "noul", "instructions": "Does this message need a support ticket?"},
      "contact_email": {"type": "locate", "instructions": "email address"}
    }
  }'`}</code></pre>
          </li>
          <li>
            <strong>Route on confidence, not just on the answer.</strong> Every answer
            carries a confidence score. Send low-confidence cases to a fallback model or
            a human reviewer, and measure calibration on your own labelled sample before
            routing production traffic on confidence alone — a leaderboard score does not
            transfer to your tasks.
          </li>
          <li>
            <strong>Use Locate where the evidence is the output.</strong> PII redaction,
            named-entity extraction, and extractive QA are the intended uses: the span
            offsets let you highlight or redact the exact characters in the source text,
            which a probability alone cannot do.
          </li>
          <li>
            <strong>Pick Flash for volume, v1.3 for nuance.</strong> Perplexity’s own
            guidance: start with v1.3 for detailed rubrics, long source text, or costly
            mistakes; use Flash for high-volume routing, labelling, or filtering where
            half the input price matters. Run both on your own labelled sample and keep
            Flash only if it meets your accuracy bar.
          </li>
        </ol>

        <h2>Running the weights locally</h2>
        <p>
          Both models are on Hugging Face under Apache 2.0, so self-hosting is an option
          the hosted-only decision models do not offer. Three details from the model
          card decide whether local results match the API:
        </p>
        <ul>
          <li><strong>Two inference modes.</strong> The default <code>mode="separate"</code> answers each question in its own sequence, including another read of the state; the evaluations were run this way. <code>mode="isolated"</code> shares computation over the state, but because the state also attends to the questions, changing the question set can change answers — 1.5–2.2% of top answers differed from separate mode in Perplexity’s samples.</li>
          <li><strong>fast=True disables Locate.</strong> The optimised local path turns Locate off; if you need extraction locally, do not use it.</li>
          <li><strong>Mixed requests cost two passes.</strong> A request that mixes locate questions with noul, choice, or score needs separate forward passes for the two types, adding latency. The Locate adapters stay unmerged because merging them degraded ordinary decision requests.</li>
        </ul>

        <h2>Limits at launch</h2>
        <ul>
          <li><strong>Locate is text-only.</strong> Images, objects, and arrays as <code>state</code> return 400 with a locate question; ordinary decision questions still accept images.</li>
          <li><strong>128-question cap with Locate.</strong> A request containing a locate question allows at most 128 questions; grounded requests cap at 100.</li>
          <li><strong>No web grounding with Locate.</strong> A grounded request with a locate question returns 400.</li>
          <li><strong>Locate’s long-context range is unmeasured.</strong> Trained up to 8K tokens, evaluated up to 32K; longer inputs are accepted but span quality beyond 32K is not measured.</li>
          <li><strong>Input limit 256K tokens, 32 MiB request body.</strong> Images count toward the input limit (about 1,000 tokens per megapixel in Perplexity’s tests on earlier decision models), up to 8 images per question, and images over 2,048 tiles of 32 × 32 pixels stall the request rather than failing fast.</li>
          <li><strong>Free on OpenRouter only until 19 November 2026</strong> according to Perplexity’s X post; the OpenRouter page itself lists no end date.</li>
        </ul>

        <h2>What is still unconfirmed</h2>
        <ul>
          <li>Every vendor figure on this page — the 91.6% mean across 63 tasks, the 93.98% real-request sample, the 69.0 Locate average, and the “6.54 points above deployed classifiers” claim — is Perplexity’s own data. Nobody outside Perplexity has repeated the tests.</li>
          <li>Whether Decider v1.3 stays well calibrated on tasks outside Perplexity’s 63-task suite. Calibration is measured per task, not assumed from a leaderboard — measure it on your own labelled sample before trusting confidence scores unattended.</li>
          <li>Whether the OpenRouter free window really ends on 19 November 2026. The date comes only from a Perplexity post on X; OpenRouter’s own page shows $0 pricing with no end date.</li>
          <li>How Locate performs on noisy OCR or scanned PDFs. Perplexity does not break out extraction quality for those inputs.</li>
          <li>Whether the $0.02 / $0.01 per million input tokens pricing holds once the free OpenRouter window closes and usage scales.</li>
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
          <li>Perplexity, Decisions API documentation (question types, locate contract, request limits, model table, pricing): the source for the four question types, the 128-question locate cap, the text-only locate rule, the 256K context window, and the $0.02 / $0.01 per million input tokens pricing. See <a href="https://docs.perplexity.ai/docs/decisions/quickstart" target="_blank" rel="noreferrer">docs.perplexity.ai/docs/decisions/quickstart</a>.</li>
          <li>Perplexity launch announcement, 12 November 2026 (community forum and @perplexitydevs on X): the release, Apache 2.0 weights on Hugging Face, the Qwen3.8-27B / Qwen3.5-4B backbones, and one free week on OpenRouter. The 19 November free-window end date comes from the X post, per independent write-ups; OpenRouter’s own page lists no end date.</li>
          <li>OpenRouter, Decider V1.3 (free) model page: $0 posted pricing, 262,144-token context window, 12 November 2026 release date, and the note that the endpoint runs on the Decisions API rather than the chat-completions endpoint. See <a href="https://openrouter.ai/perplexity/pplx-decider-v1.3:free" target="_blank" rel="noreferrer">openrouter.ai/perplexity/pplx-decider-v1.3:free</a>.</li>
          <li>Mohammad Adyatma, “Gemini Decision 1 vs Perplexity Decider v1.3: A Tester’s Bench” (Medium, 13 November 2026): the same-dataset comparison — 782 items, 702 shared, Gemini 92.3%, Luna 91.6%, Decider v1.3 91.0%, Jev 90.3%, Clef 88.5% — plus per-task strengths, token counts, cost per 1,000 decisions, and median response times. One tester’s dataset, quoted as such. See <a href="https://medium.com/@madyatma/gemini-decision-1-vs-perplexity-decider-v1-3-tester-bench-df79c1f9c4e3" target="_blank" rel="noreferrer">medium.com/@madyatma/gemini-decision-1-vs-perplexity-decider-v1-3-tester-bench</a>.</li>
          <li>AI Primer, “Perplexity open-sources Decider v1.3 with text-location outputs” (13 November 2026): the 91.6% / 63-task figure with the frontier-LLM relabelling detail, the 69.0 / 63.6 Locate averages with the mixed-metrics caveat, and the local-inference gotchas (separate vs isolated mode, fast=True disabling Locate). See <a href="https://www.ai-primer.com/engineer/stories/decider-v13-release" target="_blank" rel="noreferrer">ai-primer.com/engineer/stories/decider-v13-release</a>.</li>
          <li>Unconfirmed and deliberately not asserted here: any independent replication of Perplexity’s 91.6%, 93.98%, or 69.0 figures; the 19 November OpenRouter free-window end date beyond the X post; Locate quality on noisy OCR or scanned PDFs; and any price change after 14 November 2026.</li>
        </ul>
        <p><em>Data checked: 2026-11-14. This page reports Perplexity’s 12 November 2026 release; re-verify the Decisions API docs and the OpenRouter pricing page before reusing the numbers after November 2026.</em></p>

        <h2>Related tools</h2>
        <p>
          For the Google decision model in the same category, read the{' '}
          <Link href="/gemini-decisions-api">Gemini Decisions API guide</Link>. For the
          hybrid pattern — a cheap decision model screens, an expensive frontier model
          reviews only the uncertain cases — read the{' '}
          <Link href="/jev-hybrid-routing">Jev + Opus hybrid routing guide</Link>. For
          cheap-model cost per task, compare{' '}
          <Link href="/muse-ember-vs-haiku">Muse Ember vs Haiku 5.5</Link>.
        </p>
      </div>
    </div>
  );
}
