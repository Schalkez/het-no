import { FC, memo } from "react";
import { Button } from "@/components/ui/Button";
import { useMoneyCalcStore } from "@/store/store";

export const Header: FC = memo(() => {
  const { handleResetAll } = useMoneyCalcStore();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="font-montserrat italic text-3xl font-bold">
        <div className="flex items-center space-x-3">CHIA TIỀN</div>
      </h1>
      <Button
        variant="destructive"
        onClick={handleResetAll}
        className="cursor-pointer"
      >
        Reset Toàn Bộ
      </Button>
    </div>
  );
});

Header.displayName = "Header";
