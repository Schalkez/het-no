import type { Contribution } from '$lib/models/contribution';
import type { Service } from '$lib/models/service';
import type { Transaction } from '$lib/models/transaction';
import type { Writable } from 'svelte/store';

export interface MoneyCalcState {
  newPerson: string;
  people: string[];
  newService: Service;
  services: Service[];
  isResultSheetOpen: boolean;
  transactions: Transaction[];
  isAddServiceSheetOpen: boolean;
  totals: Record<string, number>;
  contributions: Record<string, Record<string, Contribution>>; // keyed by service id
  costInput: HTMLInputElement | null;
  personInput: HTMLInputElement | null;
  serviceNameInput: HTMLInputElement | null;
}

export interface MoneyCalcActions {
  setNewPerson: (name: string) => void;
  registerPersonInput: (element: HTMLInputElement | null) => void;
  focusPersonInput: () => void;
  addPerson: (nameToAdd: string) => void;
  handleAddPerson: (nameToAdd: string) => void;
  handleRemovePerson: (person: string) => void;
  setNewService: (value: Service | ((service: Service) => Service)) => void;
  registerCostInput: (element: HTMLInputElement | null) => void;
  registerServiceNameInput: (element: HTMLInputElement | null) => void;
  setIsAddServiceSheetOpen: (open: boolean) => void;
  handleAddService: () => void;
  handleAddServiceClick: () => void;
  handleRemoveService: (id: string) => void;
  handleUpdateServiceName: (id: string, newName: string) => void;
  handleUpdateServiceCost: (id: string, newCost: number) => void;
  handleContributionChange: (
    serviceId: string,
    person: string,
    field: keyof Contribution,
    value: boolean | number
  ) => void;
  handleCostKeyDown: (event: KeyboardEvent) => void;
  toggleAddServiceSheet: () => void;
  resetServiceCost: () => void;
  handleResetAll: () => void;
  toggleResultSheet: () => void;
  setIsResultSheetOpen: (open: boolean) => void;
}

export type MoneyCalcStore = {
  subscribe: Writable<MoneyCalcState>['subscribe'];
} & MoneyCalcActions;

export const INITIAL_SERVICE: Service = { name: '', cost: 0, id: '' };

export const createInitialState = (): MoneyCalcState => ({
  newPerson: '',
  people: [],
  newService: { ...INITIAL_SERVICE },
  services: [],
  isResultSheetOpen: false,
  transactions: [],
  isAddServiceSheetOpen: false,
  totals: {},
  contributions: {},
  costInput: null,
  personInput: null,
  serviceNameInput: null
});
