import { FC } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { FaTimes } from "react-icons/fa";
import { formatNumber, parseNumber } from "@/utils/number";
import { useMoneyCalcStore } from "@/store/store";

export const Desktop: FC = () => {
  const {
    newService,
    setNewService,
    costInputRef,
    handleAddServiceClick,
    serviceNameInputRef,
    handleCostKeyDown,
    resetServiceCost,
  } = useMoneyCalcStore();

  return (
    <Card className="hidden md:block">
      <CardHeader>
        <CardTitle>Thêm Dịch Vụ</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Tên dịch vụ"
          value={newService.name}
          ref={serviceNameInputRef}
          onChange={(e) =>
            setNewService({ ...newService, name: e.target.value })
          }
          className="mb-2"
        />
        <div className="relative">
          <Input
            ref={costInputRef}
            placeholder="Số tiền"
            type="text"
            value={formatNumber(newService.cost)}
            onChange={(e) =>
              setNewService({
                ...newService,
                cost: parseNumber(e.target.value),
              })
            }
            onKeyDown={handleCostKeyDown}
            className="mb-2 pr-8"
          />
          {newService.cost > 0 && (
            <FaTimes
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={resetServiceCost}
              title="Xóa số tiền"
            />
          )}
          {newService.cost > 0 && newService.cost % 1000 !== 0 && (
            <span className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {formatNumber(Math.round(newService.cost / 1000) * 1000)}đ
            </span>
          )}
        </div>
        <Button
          onClick={handleAddServiceClick}
          className="w-full cursor-pointer"
        >
          + Thêm Dịch Vụ
        </Button>
      </CardContent>
    </Card>
  );
};
