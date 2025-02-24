import { FC, memo } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { formatNumber } from "@/utils/number";
import { EditableItem } from "@/components/ui/EditableItem";
import { useMoneyCalcStore } from "@/store/store";
import { Person } from "./Person";

export const ServiceList: FC = memo(() => {
  const {
    people,
    services,
    contributions,
    handleRemoveService,
    toggleAddServiceSheet,
    handleUpdateServiceName,
    handleUpdateServiceCost,
    handleContributionChange,
  } = useMoneyCalcStore();

  const handleTickAll = (serviceName: string, checked: boolean) => {
    people.forEach((person) => {
      handleContributionChange(serviceName, person, "used", checked);
    });
  };

  const resetPaidAmount = (serviceName: string, person: string) => {
    handleContributionChange(serviceName, person, "paid", 0);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Danh Sách Dịch Vụ</CardTitle>
          <Button
            className="md:hidden cursor-pointer whitespace-nowrap"
            onClick={toggleAddServiceSheet}
          >
            + Thêm Dịch Vụ
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {services.length === 0 ? (
          <p className="text-gray-500">Chưa có dịch vụ nào</p>
        ) : (
          services.map((service) => (
            <div key={service.id} className="border p-3 rounded-md mb-3">
              <EditableItem
                item={{
                  name: service.name,
                  value: service.cost,
                  id: service.id,
                }}
                onUpdateName={handleUpdateServiceName}
                onUpdateValue={handleUpdateServiceCost}
                onDelete={handleRemoveService}
                formatValue={(value) => formatNumber(value) + "đ"}
              />

              {!!people.length && (
                <div className="flex items-center mb-2">
                  <Checkbox
                    id={`tick-all-${service.name}`}
                    checked={
                      people.every(
                        (person) => contributions[service.name]?.[person]?.used
                      ) || false
                    }
                    onCheckedChange={(checked) =>
                      handleTickAll(service.name, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`tick-all-${service.name}`}
                    className="ml-2 font-semibold"
                  >
                    Tất cả
                  </label>
                </div>
              )}

              {people.map((person) => (
                <Person
                  key={person}
                  person={person}
                  service={service}
                  contributions={contributions}
                  resetPaidAmount={resetPaidAmount}
                  handleContributionChange={handleContributionChange}
                />
              ))}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
});

ServiceList.displayName = "ServiceList";
