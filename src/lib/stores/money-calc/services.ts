import type { Contribution } from '$lib/models/contribution';

import type { MoneyCalcState } from './state';

import { INITIAL_SERVICE } from './state';

interface ServiceActionsDeps {
  directUpdate: (updater: (state: MoneyCalcState) => MoneyCalcState) => void;
  updateState: (updater: (state: MoneyCalcState) => MoneyCalcState) => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  getState: () => MoneyCalcState;
  focusServiceNameInput: (state: MoneyCalcState) => void;
  updateStatus: (status: Partial<MoneyCalcState['status']>) => void;
}

type ServiceUpdater =
  | MoneyCalcState['newService']
  | ((service: MoneyCalcState['newService']) => MoneyCalcState['newService']);

export const createServiceActions = (deps: ServiceActionsDeps) => {

  const setNewService = (value: ServiceUpdater) => {
    deps.directUpdate((current) => ({
      ...current,
      newService: typeof value === 'function' ? value(current.newService) : value
    }));
  };

  const registerCostInput = (element: HTMLInputElement | null) => {
    deps.directUpdate((current) => ({ ...current, costInput: element }));
  };

  const registerServiceNameInput = (element: HTMLInputElement | null) => {
    deps.directUpdate((current) => ({ ...current, serviceNameInput: element }));
  };

  const handleAddService = () => {
    const stateBeforeUpdate = deps.getState();

    if (stateBeforeUpdate.status.isAddingService) {
      return;
    }

    const trimmedName = stateBeforeUpdate.newService.name.trim();

    if (trimmedName === '') {
      deps.showError('Tên dịch vụ không được để trống');
      return;
    }

    if (stateBeforeUpdate.services.some((service) => service.name === trimmedName)) {
      deps.showError('Tên dịch vụ đã tồn tại');
      return;
    }

    if (stateBeforeUpdate.newService.cost <= 0) {
      deps.showError('Số tiền phải lớn hơn 0');
      return;
    }

    deps.updateStatus({ isAddingService: true });

    try {
      const serviceEntry = {
        name: trimmedName,
        cost: Math.round(stateBeforeUpdate.newService.cost),
        id: Date.now().toString()
      };

      deps.updateState((state) => {
        const contributionsForService: Record<string, Contribution> = {};
        state.people.forEach((person) => {
          contributionsForService[person] = { used: false, paid: 0 };
        });

        return {
          ...state,
          services: [...state.services, serviceEntry],
          contributions: {
            ...state.contributions,
            [serviceEntry.id]: contributionsForService
          },
          newService: { ...INITIAL_SERVICE }
        };
      });

      deps.focusServiceNameInput(deps.getState());
      deps.showSuccess(`Đã thêm dịch vụ "${serviceEntry.name}"`);
    } finally {
      deps.updateStatus({ isAddingService: false });
    }
  };

  const handleAddServiceClick = () => {
    handleAddService();
  };

  const handleRemoveService = (id: string) => {
    deps.updateState((state) => {
      const serviceToRemove = state.services.find((service) => service.id === id);

      if (!serviceToRemove) {
        return state;
      }

      const restContributions = { ...state.contributions };
      delete restContributions[id];

      return {
        ...state,
        services: state.services.filter((service) => service.id !== id),
        contributions: restContributions
      };
    });
  };

  const handleUpdateServiceName = (id: string, newName: string) => {
    const current = deps.getState();
    const trimmedName = newName.trim();

    if (trimmedName === '') {
      deps.showError('Tên dịch vụ không được để trống');
      return;
    }

    if (current.services.some((service) => service.name === trimmedName && service.id !== id)) {
      deps.showError('Tên dịch vụ đã tồn tại');
      return;
    }

    deps.updateState((state) => {
      const updatedServices = state.services.map((entry) =>
        entry.id === id ? { ...entry, name: trimmedName } : entry
      );

      return {
        ...state,
        services: updatedServices
      };
    });
  };

  const handleUpdateServiceCost = (id: string, newCost: number) => {
    if (newCost < 0) {
      deps.showError('Số tiền không hợp lệ');
      return;
    }

    deps.updateState((state) => ({
      ...state,
      services: state.services.map((service) =>
        service.id === id ? { ...service, cost: Math.round(newCost) } : service
      )
    }));
  };

  const handleContributionChange = (
    serviceId: string,
    person: string,
    field: keyof Contribution,
    value: boolean | number
  ) => {
    if (typeof value === 'number' && value < 0) {
      deps.showError('Số tiền đã trả không được âm');
      return;
    }

    deps.updateState((state) => {
      const serviceContributions = state.contributions[serviceId];

      if (!serviceContributions || !serviceContributions[person]) {
        return state;
      }

      return {
        ...state,
        contributions: {
          ...state.contributions,
          [serviceId]: {
            ...serviceContributions,
            [person]: {
              ...serviceContributions[person],
              [field]: typeof value === 'number' ? Math.round(value) : value
            }
          }
        }
      };
    });
  };

  const handleCostKeyDown = (event: KeyboardEvent) => {
    const state = deps.getState();

    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddService();
      return;
    }

    if (event.key === 'Tab' && state.newService.cost > 0) {
      event.preventDefault();
      const rounded = Math.round(state.newService.cost / 1000) * 1000;
      setNewService({ ...state.newService, cost: rounded });
    }
  };

  const setIsAddServiceSheetOpen = (open: boolean) => {
    if (open) {
      deps.focusServiceNameInput(deps.getState());
    }

    deps.directUpdate((state) => ({ ...state, isAddServiceSheetOpen: open }));
  };

  const toggleAddServiceSheet = () => {
    const state = deps.getState();
    const nextOpenState = !state.isAddServiceSheetOpen;

    if (nextOpenState) {
      deps.focusServiceNameInput(state);
    }

    deps.directUpdate((current) => ({ ...current, isAddServiceSheetOpen: nextOpenState }));
  };

  const resetServiceCost = () => {
    deps.directUpdate((state) => ({
      ...state,
      newService: {
        ...state.newService,
        cost: 0
      }
    }));
  };

  return {
    setNewService,
    registerCostInput,
    registerServiceNameInput,
    handleAddService,
    handleAddServiceClick,
    handleRemoveService,
    handleUpdateServiceName,
    handleUpdateServiceCost,
    handleContributionChange,
    handleCostKeyDown,
    setIsAddServiceSheetOpen,
    toggleAddServiceSheet,
    resetServiceCost
  };
};
