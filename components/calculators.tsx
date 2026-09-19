'use client';

import { useMemo, useState } from 'react';

export function TokenCostCalculator() {
  const [inputTokens, setInputTokens] = useState(10000);
  const [outputTokens, setOutputTokens] = useState(2000);
  const [callsPerDay, setCallsPerDay] = useState(10);
  const [inputRate, setInputRate] = useState(1.5);
  const [outputRate, setOutputRate] = useState(7.5);
  const result = useMemo(() => {
    const perCall = (inputTokens / 1_000_000) * inputRate + (outputTokens / 1_000_000) * outputRate;
    return { perCall, day: perCall * callsPerDay, month: perCall * callsPerDay * 30 };
  }, [inputTokens, outputTokens, callsPerDay, inputRate, outputRate]);
  return <CalculatorCard title="AI Token Cost Calculator" description="Estimate input, output, daily, and monthly model spend.">
    <div className="form-grid">
      <NumberInput label="Input tokens per call" value={inputTokens} onChange={setInputTokens} />
      <NumberInput label="Output tokens per call" value={outputTokens} onChange={setOutputTokens} />
      <NumberInput label="Calls per day" value={callsPerDay} onChange={setCallsPerDay} />
      <NumberInput label="Input price / 1M tokens" value={inputRate} onChange={setInputRate} step="0.01" />
      <NumberInput label="Output price / 1M tokens" value={outputRate} onChange={setOutputRate} step="0.01" />
    </div>
    <ResultGrid values={[['Per call', money(result.perCall)], ['Per day', money(result.day)], ['Per 30 days', money(result.month)]]} />
    <p className="note">Prices are editable estimates. Confirm current provider pricing before making purchasing decisions.</p>
  </CalculatorCard>;
}

export function ContextWindowCalculator() {
  const [context, setContext] = useState(128000);
  const [used, setUsed] = useState(32000);
  const percent = Math.min(100, Math.max(0, (used / Math.max(context, 1)) * 100));
  return <CalculatorCard title="Context Window Calculator" description="See how much of a model context window your prompt and history use.">
    <div className="form-grid"><NumberInput label="Context window tokens" value={context} onChange={setContext} /><NumberInput label="Tokens currently used" value={used} onChange={setUsed} /></div>
    <ResultGrid values={[["Used", `${Math.round(percent * 100) / 100}%`], ["Remaining", `${Math.max(0, context - used).toLocaleString()} tokens`], ["Status", percent >= 90 ? 'Near limit' : percent >= 75 ? 'Watch usage' : 'Healthy']]} />
    <div className="progress"><span style={{ width: `${percent}%` }} /></div>
  </CalculatorCard>;
}

export function McpBudgetCalculator() {
  const [tools, setTools] = useState(8);
  const [schemaTokens, setSchemaTokens] = useState(250);
  const [resultTokens, setResultTokens] = useState(1200);
  const [calls, setCalls] = useState(50);
  const total = tools * schemaTokens + calls * resultTokens;
  return <CalculatorCard title="MCP Tool Budget Calculator" description="Estimate the context budget used by tool definitions and responses.">
    <div className="form-grid"><NumberInput label="Number of tools" value={tools} onChange={setTools} /><NumberInput label="Schema tokens per tool" value={schemaTokens} onChange={setSchemaTokens} /><NumberInput label="Result tokens per call" value={resultTokens} onChange={setResultTokens} /><NumberInput label="Calls per day" value={calls} onChange={setCalls} /></div>
    <ResultGrid values={[["Tool schemas", `${(tools * schemaTokens).toLocaleString()} tokens`], ["Daily results", `${(calls * resultTokens).toLocaleString()} tokens`], ["Estimated total", `${total.toLocaleString()} tokens`]]} />
  </CalculatorCard>;
}

function CalculatorCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) { return <section className="card calculator"><h2>{title}</h2><p className="muted">{description}</p>{children}</section>; }
function NumberInput({ label, value, onChange, step = '1' }: { label: string; value: number; onChange: (value: number) => void; step?: string }) { return <label className="field"><span>{label}</span><input type="number" min="0" step={step} value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} /></label>; }
function ResultGrid({ values }: { values: string[][] }) { return <div className="results">{values.map(([label, value]) => <div className="result" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>; }
function money(value: number) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 6 }).format(value); }
