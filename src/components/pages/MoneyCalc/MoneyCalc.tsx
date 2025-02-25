import { FC } from "react";
import { AddPersonArea } from "./AddPersonArea";
import { AddServiceArea } from "./AddServiceArea";
import { ServiceList } from "./ServiceList";
import { ResultArea } from "./ResultArea";
import { useMoneyCalcStore } from "@/store/store";

export const MoneyCalc: FC = () => {
  const { error } = useMoneyCalcStore();

  return (
    <div className="bg-gray-100 md:pt-20 pt-10 min-h-screen p-4 md:p-6 pb-40 md:pb-6 relative">
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md z-20">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <AddPersonArea />
          <AddServiceArea />
          <ServiceList />
          <ResultArea />
        </div>
      </div>
    </div>
  );
};
