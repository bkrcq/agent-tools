import type { Metadata } from 'next';
import Link from 'next/link';
import AgentSummaryCalculator from './Calculator';

export const metadata: Metadata = {
  title: 'Claude Code Agent Summary Cost Calculator',
  description:
    'Check your Claude Code agent_summary cost: what the 16.4% Flamerix week and Anthropic\'s 2% average each mean, how to self-check with OpenTelemetry query_source, and what to do on 2.1.311+.',
  alternates: { canonical: '/claude-code-agent-summary-cost/' },
};

const faqs = [
  {
    q: 'Is the terminal status line eating my Claude Code tokens?',
    a: 'No. Anthropic says the customisable terminal status line runs locally and uses no API tokens. The spend discussed here is a different feature: the per-agent summary in the agents panel, identified in telemetry as query_source agent_summary.',
  },
  {
    q: 'What is agent_summary in Claude Code?',
    a: 'For each actively working background agent, Claude Code asks that agent\'s own model to describe its most recent action in 3-5 words, so the agents panel can show a short status line. The measured setup sent the agent\'s full transcript on roughly a 30-second timer; the gist reports the server-set interval as 30-240 seconds.',
  },
  {
    q: 'How much did agent_summary cost in the reported measurements?',
    a: 'One team (Flamerix AI, week measured October 2026) reported agent_summary at 16.4% of estimated spend versus 15.7% for the main conversation, 19.7% of API requests, 96% of that spend on Opus, and roughly 9,000 input tokens per output token. Independent measurements cited in the same gist ranged from 18% to 26%. Anthropic, by contrast, reports about 2% of cost at API list prices across telemetry users, about 6% in the terminal, and just under 4% of requests.',
  },
  {
    q: 'How do I check my own agent_summary share?',
    a: 'Use Claude Code\'s OpenTelemetry export, not session transcripts: group claude_code.api_request events by query_source and compare the agent_summary share of cost_usd and request counts against your main conversation. These requests are not written to the session logs on disk, so transcript-based cost tools miss them. cost_usd is Claude Code\'s own per-request estimate, not an invoice.',
  },
  {
    q: 'What should I do first?',
    a: 'Update to Claude Code 2.1.311 or later, which Anthropic says fixes a cache-miss case where about 2% of summary calls carried over a third of the summary cost. Then measure your own share once. Only then decide whether to cut idle background agents, route background agents to a cheaper model where the task allows, or consider an unofficial workaround.',
  },
  {
    q: 'Is there a setting to turn agent summaries off?',
    a: 'No documented user-facing setting that disables only these summaries was found in the materials reviewed here. Anthropic describes a cheaper summary mode as in progress, and the gist reports a short mode in 2.1.310 that is disabled by default and enabled only through server-side flags. Environment variables sometimes quoted in coverage disable broader background-agent or subagent functionality, not summaries alone.',
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
  headline: 'Claude Code Agent Summary Cost Calculator',
  description:
    'Self-check guide and calculator for Claude Code agent_summary token cost, with both the Flamerix measurement and Anthropic\'s average.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-10-30',
  dateModified: '2026-10-30',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Guide + calculator</p>
      <h1>Claude Code Agent Summary Cost Calculator</h1>
      <p className="lead">
        A 3-5 word status line should not cost more than the work itself. For one team
        it did. For most users it does not. Measure your own share before changing anything.
      </p>

      <div className="prose">
        <h2>First, the naming correction</h2>
        <p>
          Headlines blamed the status line. That is misleading. The terminal status line
          runs locally and uses no API tokens, per Anthropic. The cost belongs to the
          per-agent summary in the agents panel: every so often, each actively working
          background agent&apos;s full transcript is sent to that agent&apos;s own model
          (usually Opus) to produce a 3-5 word description. The answer only updates the
          panel; it never reaches your conversation.
        </p>
        <p>
          There is a second documentation gap worth noting. Material reviewed for this page
          says Anthropic&apos;s documentation describes Agent View row summaries as a
          Haiku-class model refreshing every few minutes, while the gist&apos;s measurements
          show the agent&apos;s own model on a roughly 30-second timer. Treat the timer and
          model as measured behaviour, not as a documented guarantee.
        </p>

        <h2>Two numbers, and why both can be true</h2>
        <p>
          Flamerix AI&apos;s measured week: agent_summary was 16.4% of estimated spend,
          versus 15.7% for the main conversation, and 19.7% of API requests. About 96% of
          that summary spend ran on Opus, at roughly 9,000 input tokens per output token.
          Independent measurements cited in the same gist ranged from 18% to 26%.
          Those are heavy background-agent workloads, from users who went looking.
        </p>
        <p>
          Anthropic&apos;s reply, via a Claude Code team member: across users sending
          telemetry, agent_summary was about 2% of cost at API list prices, about 6% in
          the terminal, and just under 4% of requests. The 16.4% week, in that reply,
          reflects a team running mostly background agents, not a typical session.
          The honest reading: the overhead scales with how many background agents you run,
          how long they run, and how large their transcripts grow.
        </p>
        <p>
          One more concentration detail matters. About 98% of summary calls re-read the
          transcript from the prompt cache, which keeps most calls cheap. The roughly 2%
          that missed the cache carried over a third of the summary cost, by the gist&apos;s
          account. Anthropic says that cache-miss case is fixed in version 2.1.311 and later.
          Updating does not eliminate the recurring calls, but it removes the most
          expensive case described.
        </p>
      </div>

      <AgentSummaryCalculator />

      <div className="prose">
        <h2>Self-check in 4 steps (OpenTelemetry, not transcripts)</h2>
        <ol>
          <li>Update to Claude Code 2.1.311 or later first, so the cache-miss case is out of your measurement.</li>
          <li>Export Claude Code&apos;s OpenTelemetry data and group <code>claude_code.api_request</code> events by <code>query_source</code>.</li>
          <li>Compare the <code>agent_summary</code> share of cost and of request counts against your main conversation, over the same week.</li>
          <li>Remember the units: <code>cost_usd</code> is Claude Code&apos;s own estimate, not an invoice. On a subscription, the same share shows up as lost rate-limit headroom.</li>
        </ol>
        <p>
          Do not use session transcripts for this check. These requests are not written to
          the logs on disk, so transcript-based cost tools miss them entirely.
        </p>

        <h2>What to do, in order</h2>
        <ol>
          <li><strong>Update.</strong> Run 2.1.311 or later before drawing any conclusion.</li>
          <li><strong>Measure once.</strong> If your share is small, stop here. A small share is the expected result for a mostly foreground session.</li>
          <li><strong>Stop idle background agents.</strong> Idle agents get no summary call, so the saving comes from agents you no longer need, not from a toggle.</li>
          <li><strong>Route background agents cheaper where the task allows.</strong> The summary uses the agent&apos;s own model, so a cheaper background-agent model also cheapens its summaries.</li>
          <li><strong>Only then weigh unofficial workarounds.</strong> Flamerix published an about-80-line Bun preload (MIT) that intercepts the summary timer on Linux, tested on versions 2.1.257-2.1.312. It leaves the Claude Code binary unmodified, but matching depends on internal implementation details, so an update can silently restore the summaries; macOS and Windows are untested, and the gist itself flags that changing a client&apos;s runtime behaviour may conflict with the service terms. This page does not recommend it as a first step.</li>
        </ol>
        <p>
          There is no documented setting that disables only these summaries while leaving
          background agents running. A cheaper summary mode is described by Anthropic as
          in progress; do not assume it is enabled for you.
        </p>

        <h2>Frequently asked questions</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>Sources and numbers</h2>
        <ul>
          <li>Flamerix AI gist, published 2026-10-29: the 16.4% / 15.7% week, 19.7% of requests, 96% Opus, about 9,000:1 input-to-output ratio, about 98% cache-read with about 2% of calls carrying over a third of summary cost, tested versions 2.1.257-2.1.312 on Linux.</li>
          <li>Anthropic Claude Code team reply (Hacker News discussion, 2026-10-29): about 2% of cost at API list prices across telemetry users, about 6% in the terminal, just under 4% of requests; cache-miss fix in 2.1.311 and later; cheaper mode in progress.</li>
          <li>GitHub issue #86879 on the Claude Code repository, as cited in the gist: independent measurements in the 18-26% range (not read separately for this page).</li>
          <li>Unconfirmed / not assumed: a generally enabled cheaper short mode, any per-model Opus cache price used in a dollar estimate (this calculator therefore divides your own numbers instead of pricing tokens itself), and any supported disable switch.</li>
        </ul>
        <p><em>Data checked: 2026-10-30. Re-verify the version note and both percentages before reusing this page for a later release.</em></p>

        <h2>Related tools</h2>
        <p>
          To plan the full budget, check <Link href="/ai-token-usage-guide">how token usage is estimated</Link>,
          then measure <Link href="/context-window-calculator">context window usage</Link> and the <Link href="/mcp-token-calculator">MCP token budget</Link> for your agent,
          or estimate a single call with the <Link href="/ai-token-cost-calculator">AI token cost calculator</Link>.
        </p>
      </div>
    </div>
  );
}
