'use client';

import { useState } from 'react';

function num(v: string, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function fmt(n: number) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 1 });
}

export default function AgentSummaryCalculator() {
  const [total, setTotal] = useState('100');
  const [summary, setSummary] = useState('16.4');
  const [agents, setAgents] = useState('4');
  const [intervalSec, setIntervalSec] = useState('30');
  const [hours, setHours] = useState('40');

  const totalN = num(total, 0);
  const summaryN = num(summary, 0);
  const share = totalN > 0 ? (summaryN / totalN) * 100 : 0;
  const monthly = summaryN * 4.345;
  const yearly = summaryN * 52;
  const calls =
    Math.floor(
      (num(agents, 0) * num(hours, 0) * 3600) / Math.max(num(intervalSec, 30), 1),
    );

  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginTop: 24 }}>
      <h2 style={{ marginTop: 0 }}>Calculator: your agent_summary share</h2>
      <p style={{ color: '#475569' }}>
        Paste the two totals from your own OpenTelemetry export (Claude Code&apos;s
        cost_usd estimate, not your invoice). The calculator only divides your numbers;
        it does not fetch your usage.
      </p>
      <div style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
        <label>
          Total Claude Code cost in the period (your currency / cost_usd)
          <input value={total} onChange={(e) => setTotal(e.target.value)} inputMode="decimal" style={{ display: 'block', width: '100%', marginTop: 4, padding: 8 }} />
        </label>
        <label>
          agent_summary cost in the same period
          <input value={summary} onChange={(e) => setSummary(e.target.value)} inputMode="decimal" style={{ display: 'block', width: '100%', marginTop: 4, padding: 8 }} />
        </label>
        <div>
          <button type="button" onClick={() => setSummary(String((totalN * 0.164).toFixed(2)))} style={{ marginRight: 8, padding: '6px 12px' }}>
            Example: Flamerix week (16.4%)
          </button>
          <button type="button" onClick={() => setSummary(String((totalN * 0.02).toFixed(2)))} style={{ padding: '6px 12px' }}>
            Example: Anthropic average (2%)
          </button>
        </div>
      </div>
      <p style={{ fontSize: 20, fontWeight: 700 }}>
        agent_summary share: {fmt(share)}% of your total
      </p>
      <p style={{ color: '#475569' }}>
        At this weekly rate: about {fmt(monthly)} per month, {fmt(yearly)} per year
        (same units as your inputs). On a subscription, the same share costs
        rate-limit headroom rather than dollars.
      </p>
      <h3>How many summary calls does that imply?</h3>
      <div style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
        <label>
          Background agents running at once
          <input value={agents} onChange={(e) => setAgents(e.target.value)} inputMode="numeric" style={{ display: 'block', width: '100%', marginTop: 4, padding: 8 }} />
        </label>
        <label>
          Summary interval in seconds (measured setup: about 30)
          <input value={intervalSec} onChange={(e) => setIntervalSec(e.target.value)} inputMode="numeric" style={{ display: 'block', width: '100%', marginTop: 4, padding: 8 }} />
        </label>
        <label>
          Hours of background-agent work per week
          <input value={hours} onChange={(e) => setHours(e.target.value)} inputMode="numeric" style={{ display: 'block', width: '100%', marginTop: 4, padding: 8 }} />
        </label>
      </div>
      <p style={{ fontWeight: 700 }}>Estimated summary calls per week: {fmt(calls)}</p>
      <p style={{ color: '#475569' }}>
        Each call re-reads the agent&apos;s transcript, so a long-running agent with a
        large transcript is where the cost concentrates. Idle agents get no summary
        call, per Anthropic&apos;s reply.
      </p>
    </div>
  );
}
