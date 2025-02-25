import { FC } from "react";
import { MoneyCalc } from "@/components/pages/MoneyCalc";
import { HelmetCustom } from "@/components/ui/HelmetCustom";

export const Home: FC = () => {
  return (
    <>
      <HelmetCustom
        title="Chia Tiền Nhóm - Tính Toán Công Bằng & Nhanh Chóng"
        description="Tính toán và chia tiền công bằng cho nhóm bạn bè, hội nhóm chỉ trong vài giây. Nhập số tiền, số người, và xem kết quả ngay!"
        keywords="chia tiền nhóm, tính toán chia tiền, ứng dụng chia tiền, chia tiền hội nhóm, công cụ chia tiền"
        canonicalUrl="https://chiatien.org"
      />
      <MoneyCalc />
    </>
  );
};
