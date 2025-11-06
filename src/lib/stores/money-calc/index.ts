import { get, writable } from 'svelte/store';
import { toast } from 'svelte-sonner';

import { withRecomputed } from './calculations';
import { createPeopleActions } from './people';
import { createResultActions } from './results';
import { createInitialState, type MoneyCalcState, type MoneyCalcStore } from './state';
import { createServiceActions } from './services';

const focusServiceNameInput = (state: MoneyCalcState) => {
  const { serviceNameInput, costInput } = state;

  setTimeout(() => {
    costInput?.blur();
    serviceNameInput?.focus();
  }, 0);
};

export const createMoneyCalcStore = (): MoneyCalcStore => {
  const store = writable<MoneyCalcState>(withRecomputed(createInitialState()));

  const getState = () => get(store);

  const directUpdate = (updater: (state: MoneyCalcState) => MoneyCalcState) => {
    store.update(updater);
  };

  const updateState = (updater: (state: MoneyCalcState) => MoneyCalcState) => {
    store.update((current) => withRecomputed(updater(current)));
  };

  const replaceState = (nextState: MoneyCalcState) => {
    store.set(nextState);
  };

  const showError = (message: string) => {
    toast.error(message);
  };

  const peopleActions = createPeopleActions({
    directUpdate,
    updateState,
    showError,
    getState
  });

  const serviceActions = createServiceActions({
    directUpdate,
    updateState,
    showError,
    getState,
    focusServiceNameInput
  });

  const resultActions = createResultActions({
    directUpdate,
    getState,
    replaceState
  });

  return {
    subscribe: store.subscribe,
    ...peopleActions,
    ...serviceActions,
    ...resultActions
  } satisfies MoneyCalcStore;
};

export const moneyCalcStore = createMoneyCalcStore();

export type { MoneyCalcStore };
