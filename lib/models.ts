export type ModelPricing = {
  id: string;
  name: string;
  inputPerMillion: number;
  outputPerMillion: number;
  contextWindow: number;
};

export const modelPricing: ModelPricing[] = [
  { id: 'gpt-5', name: 'GPT-5 (enter current pricing)', inputPerMillion: 0, outputPerMillion: 0, contextWindow: 400000 },
  { id: 'claude-sonnet', name: 'Claude Sonnet (enter current pricing)', inputPerMillion: 0, outputPerMillion: 0, contextWindow: 200000 },
  { id: 'custom', name: 'Custom model', inputPerMillion: 0, outputPerMillion: 0, contextWindow: 128000 },
];

export function usd(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 6 }).format(value);
}
