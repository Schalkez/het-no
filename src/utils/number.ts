export const formatNumber = (value: number | string) =>
  value === "" || value === 0 ? "" : Number(value).toLocaleString("vi-VN");

export const parseNumber = (value: string) =>
  Number(value.replace(/[^\d]/g, "")) || 0;
