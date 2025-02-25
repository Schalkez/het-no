import { FC, memo } from "react";
import { Button } from "@/components/ui/Button";
import { useMoneyCalcStore } from "@/store/store";

export const Header: FC = memo(() => {
  const { handleResetAll } = useMoneyCalcStore();

  return (
    <header className="fixed top-0 left-0 bg-[#2C003E] right-0 z-10">
      <div className="flex lg:px-0 px-5 max-w-4xl mx-auto justify-between items-center">
        <h1>
          <img src="/logo.svg" className="w-28 md:w-40" alt="chia-tien-logo" />
        </h1>
        <Button
          variant="destructive"
          onClick={handleResetAll}
          className="cursor-pointer"
        >
          Reset Toàn Bộ
        </Button>
      </div>
    </header>
  );
});

Header.displayName = "Header";
