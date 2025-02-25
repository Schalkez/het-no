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
      <h1>Chia Tiền Nhóm Dễ Dàng</h1>
      <p>Công cụ giúp bạn chia tiền nhanh chóng và công bằng cho hội nhóm.</p>

      <section>
        <h2>Cách Chia Tiền Nhóm Chính Xác</h2>
        <p>
          Chỉ cần nhập tổng số tiền và số người trong nhóm, ứng dụng sẽ tự động
          tính toán số tiền mỗi người cần góp. Phù hợp cho các buổi ăn uống, du
          lịch, hoặc bất kỳ hoạt động chung nào!
        </p>
      </section>
      <MoneyCalc />
    </>
  );
};
