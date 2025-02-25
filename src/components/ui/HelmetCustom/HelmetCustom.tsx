import { FC } from "react";
import { Helmet } from "react-helmet-async";

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
};

export const HelmetCustom: FC<Props> = ({
  title = "Chia Tiền Nhóm - Tính Toán Nhanh Chóng",
  description = "Ứng dụng giúp bạn chia tiền công bằng cho nhóm bạn bè, hội nhóm khi góp tiền chung. Dễ dùng, chính xác và nhanh chóng!",
  keywords = "chia tiền, tính toán nhóm, góp tiền chung, hội nhóm, ứng dụng chia tiền",
  canonicalUrl,
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};

export default HelmetCustom;
