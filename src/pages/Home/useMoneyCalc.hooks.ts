import debounce from "lodash/debounce";
import { useCallback, useMemo, useRef, useState } from "react";

interface Service {
  name: string;
  cost: number;
}

interface Contribution {
  used: boolean;
  paid: number;
}

interface Transaction {
  from: string;
  to: string;
  amount: number;
}

export const useMoneyCalc = () => {
  const [newPerson, setNewPerson] = useState<string>("");
  const [people, setPeople] = useState<string[]>([]);
  const [newService, setNewService] = useState<Service>({ name: "", cost: 0 });
  const [services, setServices] = useState<Service[]>([]);
  const [contributions, setContributions] = useState<
    Record<string, Record<string, Contribution>>
  >({});
  const [editingServiceName, setEditingServiceName] = useState<string | null>(
    null
  );
  const [editServiceNameValue, setEditServiceNameValue] = useState<string>("");
  const [editingServiceCost, setEditingServiceCost] = useState<string | null>(
    null
  );
  const [editServiceCostValue, setEditServiceCostValue] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isResultCollapsed, setIsResultCollapsed] = useState<boolean>(false);
  const costInputRef = useRef<HTMLInputElement>(null);
  const personInputRef = useRef<HTMLInputElement>(null);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 3000); // Ẩn sau 3 giây
  };

  const handleAddPerson = useCallback(
    (nameToAdd: string) => {
      const trimmedName = nameToAdd.trim();
      console.log(nameToAdd);
      if (trimmedName === "") {
        showError("Tên người không được để trống");
        return;
      }
      if (people.includes(trimmedName)) {
        showError("Tên người đã tồn tại");

        return;
      }
      setPeople((prev) => [...prev, trimmedName]);
      setContributions((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((service) => {
          updated[service][trimmedName] = { used: false, paid: 0 };
        });
        return updated;
      });

      setNewPerson("");
    },
    [people]
  );

  const debouncedAddPerson = useMemo(
    () => debounce((name: string) => handleAddPerson(name), 0),
    [handleAddPerson] // Dependencies để cập nhật debounce khi people hoặc contributions thay đổi
  );

  const handleRemovePerson = (person: string) => {
    setPeople(people.filter((p) => p !== person));
    setContributions((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((service) => {
        delete updated[service][person];
      });
      return updated;
    });
  };

  const handleAddService = () => {
    if (newService.name.trim() === "") {
      showError("Tên dịch vụ không được để trống");
      return;
    }
    if (services.some((s) => s.name === newService.name)) {
      showError("Tên dịch vụ đã tồn tại");
      return;
    }
    if (newService.cost <= 0) {
      showError("Số tiền phải lớn hơn 0");
      return;
    }
    setServices([
      ...services,
      { ...newService, cost: Math.round(newService.cost) },
    ]);
    setContributions((prev) => ({
      ...prev,
      [newService.name]: people.reduce(
        (acc, person) => ({ ...acc, [person]: { used: false, paid: 0 } }),
        {}
      ),
    }));
    setNewService({ name: "", cost: 0 });
  };

  const handleRemoveService = (serviceName: string) => {
    setServices(services.filter((s) => s.name !== serviceName));
    setContributions((prev) => {
      const updated = { ...prev };
      delete updated[serviceName];
      return updated;
    });
  };

  const handleUpdateServiceName = (oldName: string) => {
    if (editServiceNameValue.trim() === "") {
      showError("Tên dịch vụ không được để trống");
      return;
    }
    if (
      services.some(
        (s) => s.name === editServiceNameValue && s.name !== oldName
      )
    ) {
      showError("Tên dịch vụ đã tồn tại");
      return;
    }
    const updatedServices = services.map((service) =>
      service.name === oldName
        ? { ...service, name: editServiceNameValue }
        : service
    );
    setServices(updatedServices);
    setContributions((prev) => {
      const updated = { ...prev };
      updated[editServiceNameValue] = updated[oldName];
      delete updated[oldName];
      return updated;
    });
    setEditingServiceName(null);
    setEditServiceNameValue("");
  };

  const handleUpdateServiceCost = (serviceName: string) => {
    if (editServiceCostValue <= 0) {
      showError("Số tiền phải lớn hơn 0");
      return;
    }
    const updatedServices = services.map((service) =>
      service.name === serviceName
        ? { ...service, cost: Math.round(editServiceCostValue) }
        : service
    );
    setServices(updatedServices);
    setEditingServiceCost(null);
    setEditServiceCostValue(0);
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
    setContributions((prev) => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        [person]: {
          ...prev[serviceName][person],
          [field]: typeof value === "number" ? Math.round(value) : value,
        },
      },
    }));
  };

  const calculateTotals = () => {
    const totals: Record<string, number> = {};
    services.forEach((service) => {
      const usedByCount = Object.values(
        contributions[service.name] || {}
      ).filter((c) => c.used).length;
      if (usedByCount === 0) return;
      const costPerPerson = Math.round(service.cost / usedByCount);
      Object.entries(contributions[service.name] || {}).forEach(
        ([person, contribution]) => {
          if (contribution.used) {
            totals[person] = (totals[person] || 0) - costPerPerson;
          }
          totals[person] =
            (totals[person] || 0) + Math.round(contribution.paid);
        }
      );
    });
    return totals;
  };

  const calculateTransactions = (totals: Record<string, number>) => {
    const transactions: Transaction[] = [];
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

  const handleCostKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddService();
    } else if (e.key === "Tab" && newService.cost > 0) {
      const rounded = Math.round(newService.cost / 1000) * 1000;
      setNewService({ ...newService, cost: rounded });
      e.preventDefault();
    }
  };

  const resetAll = () => {
    setNewPerson("");
    setPeople([]);
    setNewService({ name: "", cost: 0 });
    setServices([]);
    setContributions({});
    setEditingServiceName(null);
    setEditServiceNameValue("");
    setEditingServiceCost(null);
    setEditServiceCostValue(0);
    setError(null);
    setIsResultCollapsed(false);
    if (personInputRef.current) personInputRef.current.value = "";
    if (costInputRef.current) costInputRef.current.value = "";
  };

  const totals = calculateTotals();
  const transactions = calculateTransactions(totals);

  return {
    newPerson,
    setNewPerson,
    people,
    setPeople,
    newService,
    setNewService,
    services,
    setServices,
    resetAll,
    contributions,
    setContributions,
    editingServiceName,
    setEditingServiceName,
    editServiceNameValue,
    setEditServiceNameValue,
    editingServiceCost,
    setEditingServiceCost,
    editServiceCostValue,
    setEditServiceCostValue,
    error,
    setError,
    isResultCollapsed,
    setIsResultCollapsed,
    costInputRef,
    personInputRef,
    transactions,
    handleCostKeyDown,
    handleUpdateServiceCost,
    handleContributionChange,
    handleRemoveService,
    handleUpdateServiceName,
    debouncedAddPerson,
    handleRemovePerson,
    totals,
    handleAddService,
  };
};
