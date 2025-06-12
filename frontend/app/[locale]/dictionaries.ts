import { Locale } from "@/types/locale";
import "server-only";

const dictionaries = {
  en: () => import("./i18n/en.json").then((module) => module.default),
  mm: () => import("./i18n/mm.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale ?? "en"]();
