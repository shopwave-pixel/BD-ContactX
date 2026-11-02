import React, { createContext, useContext, useState, useEffect } from 'react';
import { en, TranslationKey } from '../i18n/en';
import { bn } from '../i18n/bn';

export type SupportedLanguage = 'en' | 'bn';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  isBangla: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default language is English as required
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const dictionary = language === 'bn' ? bn : en;
    let text = dictionary[key] || en[key] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isBangla: language === 'bn',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
