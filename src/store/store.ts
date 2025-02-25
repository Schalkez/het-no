import { create } from "zustand";
import { Contribution } from "@/models/Contributor";
import { Service } from "@/models/Service";
import { Transaction } from "@/models/Transaction";
import { debounce } from "lodash";

interface State {
  newPerson: string;
  people: string[];
  newService: Service;
  services: Service[];
  error: string | null;
  isResultSheetOpen: boolean;
  transactions: Transaction[];
  isAddServiceSheetOpen: boolean;
  totals: Record<string, number>;
  costInputRef: { current: HTMLInputElement | null };
  personInputRef: { current: HTMLInputElement | null };
  serviceNameInputRef: { current: HTMLInputElement | null };
  contributions: Record<string, Record<string, Contribution>>;
}

interface Actions {
  handleCostKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleUpdateServiceName: (id: string, newName: string) => void;
  handleUpdateServiceCost: (id: string, newCost: number) => void;
  setNewService: (value: React.SetStateAction<Service>) => void;
  setIsAddServiceSheetOpen: (open: boolean) => void;
  handleRemovePerson: (person: string) => void;
  handleAddPerson: (nameToAdd: string) => void;
  handleRemoveService: (id: string) => void;
  addPerson: (nameToAdd: string) => void;
  setNewPerson: (name: string) => void;
  toggleAddServiceSheet: () => void;
  handleAddServiceClick: () => void;
  toggleResultSheet: () => void;
  resetServiceCost: () => void;
  handleAddService: () => void;
  handleResetAll: () => void;
  handleContributionChange: (
    serviceName: string,
    person: string,
    field: keyof Contribution,
    value: boolean | number
  ) => void;
}

export const useMoneyCalcStore = create<State & Actions>((set, get) => {
  const isAddingService = { current: false };

  const showError = (message: string) => {
    set({ error: message });
    setTimeout(() => set({ error: null }), 3000);
  };

  const calculateTotals = () => {
    const { services, contributions } = get();
    const totals: Record<string, number> = {};
    if (!Array.isArray(services)) return totals;
    services.forEach((service) => {
      const serviceContributions = contributions[service.name] || {};
      const usedByCount = Object.values(serviceContributions).filter(
        (c) => c.used
      ).length;
      if (usedByCount === 0) return;
      const costPerPerson = Math.round(service.cost / usedByCount);
      Object.entries(serviceContributions).forEach(([person, contribution]) => {
        if (contribution.used) {
          totals[person] = (totals[person] || 0) - costPerPerson;
        }
        totals[person] = (totals[person] || 0) + Math.round(contribution.paid);
      });
    });
    return totals;
  };

  const calculateTransactions = (totals: Record<string, number>) => {
    const transactions: Transaction[] = [];
    if (!totals) return transactions;
    const debtors = Object.entries(totals)
      .filter(([, amount]) => amount < 0)
      .map(([person, amount]) => ({ person, amount: Math.abs(amount) }));
    const creditors = Object.entries(totals)
      .filter(([, amount]) => amount > 0)
      .map(([person, amount]) => ({ person, amount }));

    let i = 0,
      j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const amount = Math.min(debtor.amount, creditor.amount);
      if (amount > 0) {
        transactions.push({
          from: debtor.person,
          to: creditor.person,
          amount: Math.round(amount),
        });
      }
      debtor.amount -= amount;
      creditor.amount -= amount;
      if (debtor.amount <= 0) i++;
      if (creditor.amount <= 0) j++;
    }
    return transactions;
  };

  const updateTotalsAndTransactions = () => {
    const totals = calculateTotals();
    const transactions = calculateTransactions(totals);
    set({ totals, transactions });
  };

  const setNewPerson = (name: string) => set({ newPerson: name });

  const setNewService = (value: React.SetStateAction<Service>) => {
    set((state) => ({
      newService: typeof value === "function" ? value(state.newService) : value,
    }));
  };

  const setIsAddServiceSheetOpen = (open: boolean) =>
    set({ isAddServiceSheetOpen: open });

  const handleAddPerson = (nameToAdd: string) => {
    const trimmedName = nameToAdd.trim();
    const { people } = get();
    if (trimmedName === "") {
      showError("Tên người không được để trống");
      return;
    }
    if (people.includes(trimmedName)) {
      showError("Tên người đã tồn tại");
      return;
    }
    set((state) => ({
      people: [...state.people, trimmedName],
      contributions: {
        ...state.contributions,
        ...Object.keys(state.contributions).reduce(
          (acc, service) => ({
            ...acc,
            [service]: {
              ...state.contributions[service],
              [trimmedName]: { used: false, paid: 0 },
            },
          }),
          {}
        ),
      },
      newPerson: "",
    }));
    updateTotalsAndTransactions();
  };

  const addPerson = debounce((nameToAdd: string) => {
    console.log(nameToAdd);
    handleAddPerson(nameToAdd);
  }, 0);

  const handleRemovePerson = (person: string) => {
    set((state) => {
      const updatedContributions = { ...state.contributions };
      Object.keys(updatedContributions).forEach((service) => {
        delete updatedContributions[service][person];
      });
      return {
        people: state.people.filter((p) => p !== person),
        contributions: updatedContributions,
      };
    });
    updateTotalsAndTransactions();
  };

  const handleResetAll = () => {
    set({
      newPerson: "",
      people: [],
      newService: { name: "", cost: 0, id: "" },
      services: [],
      contributions: {},
      error: null,
      isResultSheetOpen: false,
      isAddServiceSheetOpen: false,
      totals: {},
      transactions: [],
      costInputRef: { current: null },
      serviceNameInputRef: { current: null },
      personInputRef: { current: null },
    });
    const { costInputRef, serviceNameInputRef, personInputRef } = get();
    if (costInputRef.current) costInputRef.current.value = "";
    if (serviceNameInputRef.current) serviceNameInputRef.current.value = "";
    if (personInputRef.current) personInputRef.current.value = "";
  };

  const handleAddService = () => {
    if (isAddingService.current) return;
    isAddingService.current = true;

    const { newService, services, people } = get();
    if (newService.name.trim() === "") {
      showError("Tên dịch vụ không được để trống");
      isAddingService.current = false;
      return;
    }
    if (services.some((s) => s.name === newService.name)) {
      showError("Tên dịch vụ đã tồn tại");
      isAddingService.current = false;
      return;
    }
    if (newService.cost <= 0) {
      showError("Số tiền phải lớn hơn 0");
      isAddingService.current = false;
      return;
    }
    const newServiceEntry = {
      ...newService,
      cost: Math.round(newService.cost),
      id: Date.now().toString(),
    };

    focusServiceNameInput();

    set((state) => ({
      services: [...state.services, newServiceEntry],
      contributions: {
        ...state.contributions,
        [newServiceEntry.name]: people.reduce(
          (acc, person) => ({ ...acc, [person]: { used: false, paid: 0 } }),
          {}
        ),
      },
      newService: { name: "", cost: 0, id: "" },
    }));

    setTimeout(() => {
      isAddingService.current = false;
      updateTotalsAndTransactions();
    }, 0);
  };

  const handleRemoveService = (id: string) => {
    set((state) => {
      const service = state.services.find((s) => s.id === id);
      if (!service) return state;
      const updatedContributions = { ...state.contributions };
      delete updatedContributions[service.name];
      return {
        services: state.services.filter((s) => s.id !== id),
        contributions: updatedContributions,
      };
    });
    updateTotalsAndTransactions();
  };

  const handleUpdateServiceName = (id: string, newName: string) => {
    const { services } = get();
    if (newName.trim() === "") {
      showError("Tên dịch vụ không được để trống");
      return;
    }
    if (services.some((s) => s.name === newName && s.id !== id)) {
      showError("Tên dịch vụ đã tồn tại");
      return;
    }
    const oldService = services.find((s) => s.id === id);
    if (oldService) {
      set((state) => {
        const updatedContributions = { ...state.contributions };
        updatedContributions[newName] = updatedContributions[oldService.name];
        delete updatedContributions[oldService.name];
        return {
          services: state.services.map((service) =>
            service.id === id ? { ...service, name: newName } : service
          ),
          contributions: updatedContributions,
        };
      });
      updateTotalsAndTransactions();
    }
  };

  const handleUpdateServiceCost = (id: string, newCost: number) => {
    if (newCost <= 0) {
      showError("Số tiền phải lớn hơn 0");
      return;
    }
    set((state) => ({
      services: state.services.map((service) =>
        service.id === id ? { ...service, cost: Math.round(newCost) } : service
      ),
    }));
    updateTotalsAndTransactions();
  };

  const handleContributionChange = (
    serviceName: string,
    person: string,
    field: keyof Contribution,
    value: boolean | number
  ) => {
    if (typeof value === "number" && value < 0) {
      showError("Số tiền đã trả không được âm");
      return;
    }
    set((state) => ({
      contributions: {
        ...state.contributions,
        [serviceName]: {
          ...state.contributions[serviceName],
          [person]: {
            ...state.contributions[serviceName][person],
            [field]: typeof value === "number" ? Math.round(value) : value,
          },
        },
      },
    }));
    updateTotalsAndTransactions();
  };

  const handleCostKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { newService, handleAddService } = get();
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddService();
    } else if (e.key === "Tab" && newService.cost > 0) {
      const rounded = Math.round(newService.cost / 1000) * 1000;
      set({ newService: { ...newService, cost: rounded } });
      e.preventDefault();
    }
  };

  const toggleResultSheet = () =>
    set((state) => ({ isResultSheetOpen: !state.isResultSheetOpen }));

  const toggleAddServiceSheet = () => {
    focusServiceNameInput();

    set((state) => ({ isAddServiceSheetOpen: !state.isAddServiceSheetOpen }));
  };

  const resetServiceCost = () => {
    const { newService } = get();
    set({ newService: { ...newService, cost: 0 } });
  };

  const handleAddServiceClick = () => {
    handleAddService();
  };

  const focusServiceNameInput = () => {
    const { serviceNameInputRef, costInputRef } = get();

    setTimeout(() => {
      costInputRef.current?.blur();
      serviceNameInputRef.current?.focus();
    }, 0);
  };

  return {
    people: [],
    totals: {},
    error: null,
    services: [],
    newPerson: "",
    transactions: [],
    contributions: {},
    isResultSheetOpen: false,
    isAddServiceSheetOpen: false,
    costInputRef: { current: null },
    personInputRef: { current: null },
    serviceNameInputRef: { current: null },
    newService: { name: "", cost: 0, id: "" },

    handleContributionChange,
    setIsAddServiceSheetOpen,
    handleUpdateServiceCost,
    handleUpdateServiceName,
    handleAddServiceClick,
    toggleAddServiceSheet,
    handleRemoveService,
    handleRemovePerson,
    handleCostKeyDown,
    toggleResultSheet,
    handleAddService,
    resetServiceCost,
    handleAddPerson,
    handleResetAll,
    setNewService,
    setNewPerson,
    addPerson,
  };
});
