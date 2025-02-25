import { FC } from "react";
import { Helmet } from "react-helmet-async";

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
};

export const HelmetCustom: FC<Props> = ({
  title = "Chia Tiền Nhóm - Tính Toán Nhanh Chóng",
  description = "Ứng dụng giúp bạn chia tiền công bằng cho nhóm bạn bè, hội nhóm khi góp tiền chung. Dễ dùng, chính xác và nhanh chóng!",
  keywords = "chia tiền, tính toán nhóm, góp tiền chung, hội nhóm, ứng dụng chia tiền",
  ogImage = "/logo.svg",
  canonicalUrl,
}) => {
  const isBrowser = typeof window !== "undefined";
  const baseUrl = isBrowser ? window.location.origin : "https://chiatien.org";
  const currentUrl =
    canonicalUrl ||
    (isBrowser ? `${baseUrl}${window.location.pathname}` : baseUrl);

  const dynamicOgImage =
    ogImage && ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Chia Tiền Nhóm Dễ Dàng",
    operatingSystem: "Web",
    applicationCategory: "FinancialApplication",
    description: description,
    url: currentUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
    },
    publisher: {
      "@type": "Organization",
      name: "Chia Tiền Nhóm Dễ Dàng",
      url: baseUrl,
    },
  };

  return (
    <Helmet>
      {/* Metadata cơ bản */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={dynamicOgImage} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={dynamicOgImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
