import type { MoneyCalcState } from './state';

interface PeopleActionsDeps {
  directUpdate: (updater: (state: MoneyCalcState) => MoneyCalcState) => void;
  updateState: (updater: (state: MoneyCalcState) => MoneyCalcState) => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  getState: () => MoneyCalcState;
  updateStatus: (status: Partial<MoneyCalcState['status']>) => void;
}

export const createPeopleActions = (deps: PeopleActionsDeps) => {
  const setNewPerson = (name: string) => {
    deps.directUpdate((current) => ({ ...current, newPerson: name }));
  };

  const registerPersonInput = (element: HTMLInputElement | null) => {
    deps.directUpdate((current) => ({ ...current, personInput: element }));
  };

  const focusPersonInput = () => {
    const element = deps.getState().personInput;

    if (element) {
      element.focus({ preventScroll: false });
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleAddPerson = (nameToAdd: string) => {
    const trimmedName = nameToAdd.trim();

    if (trimmedName === '') {
      deps.showError('Tên người không được để trống');
      return;
    }

    const current = deps.getState();
    if (current.people.includes(trimmedName)) {
      deps.showError('Tên người đã tồn tại');
      return;
    }

    deps.updateStatus({ isAddingPerson: true });

    try {
      deps.updateState((state) => {
        const updatedPeople = [...state.people, trimmedName];
        const updatedContributions = Object.fromEntries(
          Object.entries(state.contributions).map(([serviceName, contributions]) => [
            serviceName,
            {
              ...contributions,
              [trimmedName]: { used: false, paid: 0 }
            }
          ])
        );

        return {
          ...state,
          people: updatedPeople,
          contributions: updatedContributions,
          newPerson: ''
        };
      });

      deps.showSuccess(`Đã thêm ${trimmedName}`);
    } finally {
      deps.updateStatus({ isAddingPerson: false });
    }
  };

  const addPerson = (nameToAdd: string) => {
    handleAddPerson(nameToAdd);
  };

  const handleRemovePerson = (person: string) => {
    deps.updateState((state) => {
      const updatedPeople = state.people.filter((entry) => entry !== person);
      const updatedContributions = Object.fromEntries(
        Object.entries(state.contributions).map(([serviceName, contributions]) => {
          const rest = { ...contributions };
          delete rest[person];
          return [serviceName, rest];
        })
      );

      return {
        ...state,
        people: updatedPeople,
        contributions: updatedContributions
      };
    });
  };

  return {
    setNewPerson,
    registerPersonInput,
    focusPersonInput,
    addPerson,
    handleAddPerson,
    handleRemovePerson
  };
};
