import { withRecomputed } from './calculations';
import { createInitialState } from './state';
import type { MoneyCalcState } from './state';

interface ResultActionsDeps {
  getState: () => MoneyCalcState;
  replaceState: (nextState: MoneyCalcState) => void;
  directUpdate: (updater: (state: MoneyCalcState) => MoneyCalcState) => void;
}

export const createResultActions = (deps: ResultActionsDeps) => {
  const toggleResultSheet = () => {
    deps.directUpdate((state) => ({ ...state, isResultSheetOpen: !state.isResultSheetOpen }));
  };

  const setIsResultSheetOpen = (open: boolean) => {
    deps.directUpdate((state) => ({ ...state, isResultSheetOpen: open }));
  };

  const handleResetAll = () => {
    const { costInput, serviceNameInput, personInput } = deps.getState();

    if (costInput) {
      costInput.value = '';
    }

    if (serviceNameInput) {
      serviceNameInput.value = '';
    }

    if (personInput) {
      personInput.value = '';
    }

    deps.replaceState(
      withRecomputed({
        ...createInitialState(),
        costInput,
        serviceNameInput,
        personInput
      })
    );
  };

  return {
    toggleResultSheet,
    setIsResultSheetOpen,
    handleResetAll
  };
};
