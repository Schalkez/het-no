import { FC } from "react";
import { MoneyCalc } from "@/components/pages/MoneyCalc";
import { HelmetCustom } from "@/components/ui/HelmetCustom";

export const Home: FC = () => {
  return (
    <>
      <HelmetCustom />
      <MoneyCalc />
    </>
  );
};
