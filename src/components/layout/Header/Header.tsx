import { FC, memo } from "react";
import { Button } from "@/components/ui/Button";
import { useMoneyCalcStore } from "@/store/store";

export const Header: FC = memo(() => {
  const { handleResetAll } = useMoneyCalcStore();

  return (
    <header className="fixed md:h-[70px] h-[60px] shadow-md shadow-gray-400 top-0 left-0 bg-[#EAECEF] right-0 z-10">
      <div className="flex lg:px-0 h-full px-5 max-w-4xl mx-auto justify-between items-center">
        <h1>
          <img
            src="/chia-tien.svg"
            className="h-14 md:h-18 filter-[brightness(2)]"
            alt="chia-tien-logo"
          />
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
