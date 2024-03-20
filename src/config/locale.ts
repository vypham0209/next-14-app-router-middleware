export const locales = ['en', 'ar', 'fr'] as const;
export type Locales = (typeof locales)[number];
export const defaultLocale = locales[0];

export const localesWithoutDefault = locales.filter((locale) => locale !== defaultLocale);
