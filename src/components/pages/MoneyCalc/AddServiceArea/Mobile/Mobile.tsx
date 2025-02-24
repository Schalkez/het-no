import { FC, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FaTimes } from "react-icons/fa";
import { formatNumber, parseNumber } from "@/utils/number";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useMoneyCalcStore } from "@/store/store";

export const Mobile: FC = () => {
  const {
    newService,
    costInputRef,
    setNewService,
    handleAddService,
    resetServiceCost,
    handleCostKeyDown,
    serviceNameInputRef,
    handleAddServiceClick,
    toggleAddServiceSheet,
    isAddServiceSheetOpen,
    setIsAddServiceSheetOpen,
  } = useMoneyCalcStore();

  const handleCloseSheet = useCallback(() => {
    toggleAddServiceSheet();
    setNewService({ name: "", cost: 0, id: "" });
  }, [setNewService, toggleAddServiceSheet]);

  return (
    <BottomSheet
      isOpen={isAddServiceSheetOpen}
      onClose={handleCloseSheet} // Sử dụng hàm mới để đóng và reset
      title="Thêm Dịch Vụ"
    >
      <Input
        ref={serviceNameInputRef}
        placeholder="Tên dịch vụ"
        value={newService.name}
        onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddService();
            setIsAddServiceSheetOpen(false);
          }
        }}
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
        onClick={() => {
          handleAddServiceClick();
          setIsAddServiceSheetOpen(false);
        }}
        className="w-full cursor-pointer"
      >
        + Thêm Dịch Vụ
      </Button>
    </BottomSheet>
  );
};
