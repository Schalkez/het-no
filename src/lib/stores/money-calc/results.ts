import { withRecomputed } from './calculations';
import { createInitialState } from './state';
import type { MoneyCalcState } from './state';

interface ResultActionsDeps {
  getState: () => MoneyCalcState;
  replaceState: (nextState: MoneyCalcState) => void;
  directUpdate: (updater: (state: MoneyCalcState) => MoneyCalcState) => void;
  updateStatus: (status: Partial<MoneyCalcState['status']>) => void;
  confirmReset: (handler: () => void) => void;
  showSuccess: (message: string) => void;
}

export const createResultActions = (deps: ResultActionsDeps) => {
  const toggleResultSheet = () => {
    deps.directUpdate((state) => ({ ...state, isResultSheetOpen: !state.isResultSheetOpen }));
  };

  const setIsResultSheetOpen = (open: boolean) => {
    deps.directUpdate((state) => ({ ...state, isResultSheetOpen: open }));
  };

  const executeReset = () => {
    const { costInput, serviceNameInput, personInput } = deps.getState();

    deps.updateStatus({ isResetting: true });

    try {
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

      deps.showSuccess('Đã reset toàn bộ dữ liệu');
    } finally {
      deps.updateStatus({ isResetting: false });
    }
  };

  const handleResetAll = () => {
    deps.confirmReset(executeReset);
  };

  return {
    toggleResultSheet,
    setIsResultSheetOpen,
    handleResetAll
  };
};
