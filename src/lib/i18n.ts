import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { vi } from '@/locales/vi'
import { en } from '@/locales/en'
import { ja } from '@/locales/ja'
import { ko } from '@/locales/ko'
import { th } from '@/locales/th'

// For SSR stability, we disable the browser language detector for now
// to ensure the server and client always start with the same language ('vi').
// This prevents "Hydration failed because the server rendered text didn't match the client" errors.

i18n.use(initReactI18next).init({
  resources: {
    vi,
    en,
    ja,
    ko,
    th,
  },
  lng: 'vi', // Force Vietnamese initially
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
