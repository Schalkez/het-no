import { FC, memo } from "react";
import { Mobile } from "./Mobile";
import { Desktop } from "./Desktop";
import { useMoneyCalcStore } from "@/store/store";

export const ResultArea: FC = memo(() => {
  const { totals, transactions, isResultSheetOpen, toggleResultSheet } =
    useMoneyCalcStore();

  return (
    <div className="md:static fixed bottom-0 left-0 right-0 mx-4 mb-4 md:mb-0 md:mx-0 z-10">
      <Mobile
        toggleResultSheet={toggleResultSheet}
        isResultSheetOpen={isResultSheetOpen}
        transactions={transactions}
        totals={totals}
      />

      <Desktop totals={totals} transactions={transactions} />
    </div>
  );
});

ResultArea.displayName = "ResultArea";
