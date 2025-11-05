import type { Transaction } from '$lib/models/transaction';

import type { MoneyCalcState } from './state';

export const calculateTotals = (state: MoneyCalcState): Record<string, number> => {
  const totals: Record<string, number> = {};

  state.services.forEach((service) => {
    const serviceContributions = state.contributions[service.id] ?? {};
    const usedByCount = Object.values(serviceContributions).filter(
      (contribution) => contribution.used
    ).length;

    if (usedByCount === 0) {
      return;
    }

    const costPerPerson = Math.round(service.cost / usedByCount);

    Object.entries(serviceContributions).forEach(([person, contribution]) => {
      if (contribution.used) {
        totals[person] = (totals[person] ?? 0) - costPerPerson;
      }

      totals[person] = (totals[person] ?? 0) + Math.round(contribution.paid);
    });
  });

  return totals;
};

export const calculateTransactions = (totals: Record<string, number>): Transaction[] => {
  const transactions: Transaction[] = [];

  const debtors = Object.entries(totals)
    .filter(([, amount]) => amount < 0)
    .map(([person, amount]) => ({ person, amount: Math.abs(amount) }));

  const creditors = Object.entries(totals)
    .filter(([, amount]) => amount > 0)
    .map(([person, amount]) => ({ person, amount }));

  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const debtor = debtors[debtorIndex];
    const creditor = creditors[creditorIndex];
    const amount = Math.min(debtor.amount, creditor.amount);

    if (amount > 0) {
      transactions.push({
        from: debtor.person,
        to: creditor.person,
        amount: Math.round(amount)
      });
    }

    debtor.amount -= amount;
    creditor.amount -= amount;

    if (debtor.amount <= 0) {
      debtorIndex += 1;
    }

    if (creditor.amount <= 0) {
      creditorIndex += 1;
    }
  }

  return transactions;
};

export const withRecomputed = (state: MoneyCalcState): MoneyCalcState => {
  const totals = calculateTotals(state);
  const transactions = calculateTransactions(totals);

  return {
    ...state,
    totals,
    transactions
  };
};
