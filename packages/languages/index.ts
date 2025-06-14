import { languages } from './src/languages';

export type SupportedLocales = keyof typeof languages;
export const supportedLanguages = Object.keys(languages);
export const defaultLanguage = 'en';
export { languages };
export default languages;
