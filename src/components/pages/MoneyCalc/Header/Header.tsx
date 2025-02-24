import { FC, memo } from "react";
import { Button } from "@/components/ui/Button";
import { useMoneyCalcStore } from "@/store/store";

export const Header: FC = memo(() => {
  const { handleResetAll } = useMoneyCalcStore();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1
        style={{ fontFamily: "Anton, serif" }}
        className="flex gap-2 italic text-3xl font-bold"
      >
        <img width={30} height={30} src="/banana.svg" alt="banana" />
        <div className="flex items-center space-x-3">CHIA TIỀN NHÓM</div>
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
