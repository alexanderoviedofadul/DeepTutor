import i18n, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";

import enApp from "@/locales/en/app.json";
import esApp from "@/locales/es/app.json";
import zhApp from "@/locales/zh/app.json";
import ptApp from "@/locales/pt/app.json";
import frApp from "@/locales/fr/app.json";
import deApp from "@/locales/de/app.json";
import itApp from "@/locales/it/app.json";
import jaApp from "@/locales/ja/app.json";
import koApp from "@/locales/ko/app.json";
import ruApp from "@/locales/ru/app.json";
import arApp from "@/locales/ar/app.json";
import hiApp from "@/locales/hi/app.json";
import bnApp from "@/locales/bn/app.json";
import trApp from "@/locales/tr/app.json";

export type AppLanguage =
  | "es" | "en" | "zh" | "pt" | "fr" | "de" | "it"
  | "ja" | "ko" | "ru" | "ar" | "hi" | "bn" | "tr";

export const SUPPORTED_LANGUAGES: AppLanguage[] = [
  "es", "en", "pt", "fr", "de", "it",
  "zh", "ja", "ko", "ru", "ar", "hi", "bn", "tr",
];

export function normalizeLanguage(lang: unknown): AppLanguage {
  if (!lang) return "es";
  const s = String(lang).toLowerCase().slice(0, 2);
  if (SUPPORTED_LANGUAGES.includes(s as AppLanguage)) return s as AppLanguage;
  // alias
  if (s === "cn") return "zh";
  return "es";
}

let _initialized = false;

export function initI18n(language?: unknown) {
  if (_initialized) return i18n;

  const resources: Resource = {
    en: { app: enApp },
    es: { app: esApp },
    zh: { app: zhApp },
    pt: { app: ptApp },
    fr: { app: frApp },
    de: { app: deApp },
    it: { app: itApp },
    ja: { app: jaApp },
    ko: { app: koApp },
    ru: { app: ruApp },
    ar: { app: arApp },
    hi: { app: hiApp },
    bn: { app: bnApp },
    tr: { app: trApp },
  };

  i18n.use(initReactI18next).init({
    resources,
    lng: normalizeLanguage(language),
    fallbackLng: ["es", "en"],
    defaultNS: "app",
    ns: ["app"],
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
    returnNull: false,
  });

  _initialized = true;
  return i18n;
}
