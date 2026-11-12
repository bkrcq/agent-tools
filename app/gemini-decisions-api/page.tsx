import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gemini Decisions API: 1,000 Questions, $0.10',
  description:
    'Gemini Decisions API scores up to 1,000 yes/no, choice, or rubric questions in one pass for $0.10 per million input tokens. Pricing, benchmarks, limits.',
  alternates: { canonical: '/gemini-decisions-api/' },
};

const faqs = [
  {
    q: 'What is the Gemini Decisions API?',
    a: 'A Google endpoint, launched 11 November 2026, for fast closed-set decisions. It is powered by the Gemini Decision 1 model (gemini-decision-1) and evaluates up to 1,000 yes/no, multiple-choice, or rubric-scoring questions against one shared multimodal input in a single pass. It returns probabilities and confidence scores, not generated text.',
  },
  {
    q: 'How is it different from a normal Gemini model?',
    a: 'A normal Gemini model generates text token by token. Gemini Decision 1 scores a fixed set of candidate options in one forward pass, so it answers in 150\u2013250 ms end to end and bills no output tokens \u2014 there are none. It cannot write, summarise, or explain; it only decides. Use it for the judgement step inside an agent, not for the writing step.',
  },
  {
    q: 'What are the three question types?',
    a: 'noul (yes/no) estimates the probability that a condition holds, with optional true/false criteria; choice picks a winner from 2 to 255 candidates and returns a normalised probability for each; score grades the input against an ordered rubric starting at 0 and returns a continuous weighted score with per-level probabilities. Every answer carries a confidence score from 0 to 1.',
  },
  {
    q: 'How much does the Gemini Decisions API cost?',
    a: '$0.10 per million input tokens, $0 for output tokens. The shared input is billed once per request no matter how many questions you evaluate; each question adds only its own instruction and criteria tokens. Google says there are no separate audio transcription or OCR charges, and that it is nearly 5x cheaper across its shared benchmark suite than Gemini 3.5 Flash-Lite with the Interactions API. A no-cost tier in Google AI Studio covers prototyping.',
  },
  {
    q: 'How does it compare with OpenAI\u2019s Decisions API and TypeSafe Jev?',
    a: 'On Google\u2019s own benchmark chart, Gemini Decision 1 leads JevBench at 92.2% against Jev 1.14 at 90.0% and OpenAI\u2019s GPT-6 Luna at 90.9%, and has the lowest calibration error (0.025 vs 0.049 vs 0.072). But Jev wins two of the nine tests \u2014 including When2Call at 82.0% \u2014 and is cheapest across the seven shared tests ($0.68 vs $0.88 for Decision 1). OpenAI\u2019s Decisions API is also $0.10 per million input tokens, but takes only text, images, and JSON, and caps requests at 400 questions. All benchmark figures are Google\u2019s own and have not been independently replicated.',
  },
  {
    q: 'What can I not do with it yet?',
    a: 'Access runs through the Gemini Developer API v1beta only. Context caching, the Batch API, and Flex or Priority inference are not supported at launch, and support in Gemini in Google Cloud is listed as coming soon. The free tier is capped at 200 requests a minute and 10,000 a day, and free-tier data may be used to improve Google\u2019s products, while paid use is not.',
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
  headline: 'Gemini Decisions API: 1,000 Questions, $0.10',
  description:
    'A guide to Google\u2019s Gemini Decisions API: the three question types, $0.10 per million input tokens pricing, Google\u2019s own benchmark comparison with Jev and GPT-6 Luna, and the v1beta launch limits.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-12',
  dateModified: '2026-11-12',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Decision models · 12 Nov 2026</p>
      <h1>Gemini Decisions API: 1,000 Decisions in One Pass for $0.10 per Million Tokens</h1>
      <p className="lead">
        Google launched the Gemini Decisions API on 11 November 2026, powered by the new
        Gemini Decision 1 model. It answers up to 1,000 bounded questions about one
        multimodal input in a single pass \u2014 and returns probabilities and confidence
        scores instead of text. It is the third decision-model endpoint in about a month,
        after TypeSafe\u2019s Jev and OpenAI\u2019s Decisions API, and the first to take
        audio and video as well as text, images, and PDFs.
      </p>

      <div className="prose">
        <h2>What it is \u2014 and what it is not</h2>
        <p>
          A decision model is a different kind of endpoint from a chat model. You send one
          shared input \u2014 text, images, audio, video, or a PDF, up to 256K tokens \u2014
          plus up to 1,000 independent questions, and the model scores your candidate
          options in a single forward pass instead of generating answer text token by
          token. Every answer comes back as a probability with a confidence score from 0
          to 1, so your code can route ambiguous cases to a fallback or a human reviewer.
          Google pitches it for the repetitive judgements inside agent workflows: tool
          selection, policy checks, model routing, and context grading.
        </p>
        <p>
          The important boundary is that it never writes. It cannot summarise, extract,
          or justify \u2014 if your pipeline needs a written reason for a decision, that
          step still belongs to a generative model. Think of it as the gate in front of
          the generator, not a replacement for it. The same distinction applies to the
          other two decision models in this race: TypeSafe Jev, launched 15 September
          2026, and OpenAI\u2019s Decisions API, unveiled 29 September 2026 and now
          generally available, with Microsoft\u2019s Microsoft-Decision-1 following behind.
        </p>

        <h2>The three question types</h2>
        <table>
          <thead>
            <tr><th>Type</th><th>What it answers</th><th>What you get back</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>noul</strong> (yes/no)</td><td>Does a condition hold? Optional true/false description criteria.</td><td>Probability the condition holds (0.01\u20130.99 per the API docs), plus confidence.</td></tr>
            <tr><td><strong>choice</strong> (multiple choice)</td><td>Which of 2\u2013255 candidates fits best?</td><td>The winning option and a normalised probability for every candidate.</td></tr>
            <tr><td><strong>score</strong> (ordered rubric)</td><td>How does the input grade against an ordered rubric starting at 0?</td><td>A continuous weighted score and per-level probabilities.</td></tr>
          </tbody>
        </table>
        <p>
          You can mix all three types in one request against the same shared input \u2014
          for example, a photo of a breakroom counter plus a text note, checked for a
          spill (noul), the right cleanup action (choice), and the mess severity (score)
          at once. Modalities can be combined too: a call recording with account
          metadata, or a scanned PDF claim with damage photos. Image and video
          resolution is tunable, so you can trade visual detail against token cost.
        </p>

        <h2>Pricing: the shared input is billed once</h2>
        <table>
          <thead>
            <tr><th>Item</th><th>Price</th></tr>
          </thead>
          <tbody>
            <tr><td>Input tokens</td><td>$0.10 per million</td></tr>
            <tr><td>Output tokens</td><td>$0 \u2014 there are no output tokens to bill</td></tr>
            <tr><td>Audio transcription / OCR</td><td>No separate charge</td></tr>
            <tr><td>Thinking tokens</td><td>None billed</td></tr>
          </tbody>
        </table>
        <p>
          The pricing only makes sense because of one rule: the shared input is billed
          once per request, no matter how many questions you evaluate. Each extra
          question adds only its own instruction and criteria tokens, so asking 100
          questions about the same document costs little more than asking one. Google
          says the result is nearly 5x cheaper across its shared benchmark suite than
          running the same jobs on Gemini 3.5 Flash-Lite with the Interactions API \u2014
          a Google claim, not an independent measurement.
        </p>
        <p>
          Latency follows the same flat shape. Google reports median model compute of
          50\u2013100 ms and 150\u2013250 ms end to end, across multimodal inputs and
          contexts up to 16K tokens, remaining nearly flat from 1 to 100 questions per
          request. That is what makes the endpoint usable as a live router inside an
          agent loop, where a generative call would add seconds.
        </p>

        <h2>How it compares: Google\u2019s own scorecard</h2>
        <p>
          Google\u2019s announcement chart compares Gemini Decision 1 directly with
          TypeSafe Jev 1.14 and OpenAI\u2019s GPT-6 Luna, the model behind OpenAI\u2019s
          Decisions API. <strong>These are Google\u2019s own figures and have not been
          independently checked.</strong> Decision 1 tops seven of Google\u2019s nine
          tests, but Jev wins two \u2014 including web-browsing decisions \u2014 and
          comes out cheapest overall.
        </p>
        <table>
          <thead>
            <tr><th>Google\u2019s test</th><th>Gemini Decision 1</th><th>TypeSafe Jev 1.14</th><th>OpenAI GPT-6 Luna</th></tr>
          </thead>
          <tbody>
            <tr><td>JevBench (TypeSafe\u2019s own benchmark)</td><td><strong>92.2%</strong></td><td>90.0%</td><td>90.9%</td></tr>
            <tr><td>New Yorker caption contest</td><td><strong>79.7%</strong></td><td>72.0%</td><td>68.4%</td></tr>
            <tr><td>When2Call (when to use a tool)</td><td>79.9%</td><td><strong>82.0%</strong></td><td>70.4%</td></tr>
            <tr><td>Calibration error (lower is better)</td><td><strong>0.025</strong></td><td>0.049</td><td>0.072</td></tr>
            <tr><td>Cost of seven shared tests</td><td>$0.88</td><td><strong>$0.68</strong></td><td>$0.93</td></tr>
          </tbody>
        </table>
        <p>
          Calibration is the number that matters most for routing. A well-calibrated
          model that says 90% is right about nine times in ten, so software can trust
          its confidence scores to decide what gets escalated. Decision 1\u2019s
          calibration error of 0.025 is roughly half Jev\u2019s 0.049 and a third of
          Luna\u2019s 0.072 \u2014 on Google\u2019s tests. The audio and video tests have
          no Jev or Luna score, because neither accepts those inputs.
        </p>
        <p>
          The three endpoints differ in scope as well as price. OpenAI\u2019s Decisions
          API is also $0.10 per million input tokens, but it takes only text, images,
          and JSON, and caps requests at 400 questions against Decision 1\u2019s 1,000.
          Jev is cheaper per token at $0.042 per million input tokens with output free,
          and reports 70\u2013500 ms latency. Gemini Decision 1\u2019s edge is breadth:
          the widest input range in the category for now, plus the lowest reported
          calibration error. For a deeper look at how a cheap decision model can screen
          cases for an expensive frontier model, read the{' '}
          <Link href="/jev-hybrid-routing">Jev + Opus hybrid routing guide</Link>.
        </p>

        <h2>Where teams are already using it</h2>
        <p>
          Google says its own teams use the Decisions API as a low-latency control plane:
        </p>
        <ul>
          <li><strong>Gemini Notebook</strong> uses it as a real-time router, sending each query to the right model tier and thinking level \u2014 Google says everyday queries run with up to 40% lower latency, while deep reasoning models are reserved for complex tasks.</li>
          <li><strong>Stitch</strong> uses it in a rapid canvas experiment to generate playable wireframes of a product flow in seconds and apply voice or tap edits almost instantly.</li>
          <li><strong>CC from Google Labs</strong> uses it to pick the right emoji reaction from a palette of more than 200 options in a fraction of a second.</li>
          <li><strong>Google Search</strong> uses it as a safety layer for MCP tools, detecting adversarial behaviour and content against adversarial evals within the latency envelope.</li>
        </ul>
        <p>
          The pattern is the same in each case: the decision is a small, bounded
          judgement that used to need either a hand-built classifier or a slow
          generative call, and it now ships by defining options instead.
        </p>

        <h2>How to start</h2>
        <ol>
          <li>
            <strong>Get an API key in Google AI Studio.</strong> The no-cost tier covers
            prototyping, capped at 200 requests a minute and 10,000 a day. Note the
            data terms: free-tier data may be used to improve Google\u2019s products,
            while paid use is not.
          </li>
          <li>
            <strong>Call the v1beta endpoint.</strong> The SDK call goes to the Gemini
            Developer API v1beta, with model <code>gemini-decision-1</code>. Python,
            JavaScript, and REST guides are published, and demo apps (Doorstep Parcels,
            Speed Sketch, Find the Zoo Keeper) are available in AI Studio.
          </li>
          <li>
            <strong>Define one shared input and your questions.</strong> The{' '}
            <code>input</code> field uses the same Content block format as the
            Interactions API. A minimal call, adapted from Google\u2019s announcement:
            <pre><code>{`from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})
result = client.decisions.create(
    model="gemini-decision-1",
    input=[{"type": "text", "text": "Breakroom counter check before the 9 AM client meeting."}],
    questions={
        "has_spill": {
            "type": "noul",
            "instructions": "Is there an uncleaned liquid spill on the counter?",
        },
        "severity": {
            "type": "score",
            "instructions": "Rate the severity of the counter mess.",
            "criteria": ["Clean and ready.", "Minor localized spill.", "Major spill or safety hazard."],
        },
    },
)`}</code></pre>
          </li>
          <li>
            <strong>Route on confidence, not just on the answer.</strong> Every answer
            carries a 0\u20131 confidence score. Send low-confidence cases to a fallback
            model or a human reviewer, and log the confidence distribution so you can
            see whether the model is calibrated on your data before you trust it
            unattended.
          </li>
          <li>
            <strong>Check the ecosystem integrations.</strong> Integrations are rolling
            out across OpenRouter, LangChain, Vercel, LiteLLM, Pydantic AI, Pipecat,
            LiveKit, and OpenCode, alongside the <code>google-genai</code> SDKs.
          </li>
        </ol>

        <h2>Limits at launch</h2>
        <ul>
          <li><strong>v1beta only.</strong> Access runs through the Gemini Developer API v1beta; support in Gemini in Google Cloud is listed as coming soon.</li>
          <li><strong>No context caching, no Batch API, no Flex or Priority inference</strong> at launch.</li>
          <li><strong>Free-tier caps and data terms.</strong> 200 requests a minute, 10,000 a day; free-tier data may be used to improve Google\u2019s products, while paid use is not.</li>
          <li><strong>Latency claims are bounded.</strong> The 150\u2013250 ms end-to-end figure is for multimodal inputs and contexts up to 16K tokens; the input itself can run to 256K tokens, but Google does not promise the same latency at that size.</li>
          <li><strong>No regional limits announced</strong> beyond the countries where the Gemini API is already offered.</li>
        </ul>

        <h2>What is still unconfirmed</h2>
        <ul>
          <li>Every benchmark figure on this page \u2014 JevBench 92.2%, the New Yorker and When2Call scores, the 0.025 calibration error, and the \u201cnearly 5x cheaper\u201d claim \u2014 is Google\u2019s own data. Nobody outside Google has repeated the tests yet.</li>
          <li>Whether Decision 1 stays well calibrated on tasks outside Google\u2019s nine-test suite. Calibration is measured per task, not assumed from a leaderboard \u2014 measure it on your own labelled sample before routing production traffic on confidence alone.</li>
          <li>When Gemini in Google Cloud support, context caching, and the Batch API will actually land; Google lists them as coming soon with no date.</li>
          <li>Whether the $0.10 per million input tokens price holds once the endpoint leaves v1beta.</li>
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
          <li>Google, \u201cGemini Decisions API: Fast multimodal decisions\u201d (11 November 2026, Min Choi and Felix Yu, Google DeepMind): the launch, the three question types, pricing, latency, internal use cases, and integrations. See <a href="https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/" target="_blank" rel="noreferrer">blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api</a>.</li>
          <li>Google AI Studio documentation (Decisions API, Gemini Decision model, pricing, rate limits): 262,144-token context window, noul probability range 0.01\u20130.99, free-tier caps of 200 requests a minute and 10,000 a day, and the free-tier data-use terms. Cross-checked via independent write-ups of the docs.</li>
          <li>Benchmark chart figures (JevBench, New Yorker caption contest, When2Call, calibration error, seven-test cost): transcribed from Google\u2019s announcement chart. All figures are Google\u2019s own and are labelled as such on this page.</li>
          <li>OpenAI Decisions API details (generally available, $0.10 per million input tokens, text/images/JSON only, 400-question cap) and Microsoft-Decision-1 (built on Alibaba\u2019s Qwen): per independent launch coverage, cross-checked against OpenAI\u2019s documentation.</li>
          <li>Unconfirmed and deliberately not asserted here: any independent replication of Google\u2019s benchmarks, any launch date for Google Cloud support, context caching, or the Batch API, and any price change after 12 November 2026.</li>
        </ul>
        <p><em>Data checked: 2026-11-12. This page reports Google\u2019s 11 November 2026 announcement; re-verify the source article and the AI Studio pricing page before reusing the numbers after November 2026.</em></p>

        <h2>Related tools</h2>
        <p>
          For the hybrid pattern \u2014 a cheap decision model screens, an expensive
          frontier model reviews only the uncertain cases \u2014 read the{' '}
          <Link href="/jev-hybrid-routing">Jev + Opus hybrid routing guide</Link>.
          For cheap-model cost per task, compare{' '}
          <Link href="/muse-ember-vs-haiku">Muse Ember vs Haiku 5.5</Link>, and for
          teaching a coding agent modern web patterns, read the{' '}
          <Link href="/modern-web-guidance">Modern Web Guidance 1.0 guide</Link>.
        </p>
      </div>
    </div>
  );
}
