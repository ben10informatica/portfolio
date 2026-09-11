export type TipResult = {
  tipAmount: number;
  total: number;
  tipPerPerson: number;
  totalPerPerson: number;
};

export function calculateTip(
  bill: number,
  tipPercent: number,
  people: number
): TipResult | null {
  if (!Number.isFinite(bill) || bill < 0) return null;
  if (!Number.isFinite(tipPercent) || tipPercent < 0) return null;

  const split = Number.isFinite(people) && people >= 1 ? Math.floor(people) : 1;
  const tipAmount = bill * (tipPercent / 100);
  const total = bill + tipAmount;

  return {
    tipAmount,
    total,
    tipPerPerson: tipAmount / split,
    totalPerPerson: total / split,
  };
}

export function parseAmount(value: string): number | null {
  const trimmed = value.trim().replace(',', '.');
  if (trimmed === '') return null;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatMoney(value: number): string {
  return currency.format(value);
}
