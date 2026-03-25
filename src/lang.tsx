import React, { createContext, useCallback, useMemo, useState } from 'react';

export type Language = 'uz' | 'ru' | 'en';

const STORAGE_KEY = '210-lang';

export type LangContextValue = {
  lang: Language;
  setLang: (l: Language) => void;
};

export const LangContext = createContext<LangContextValue>({
  lang: 'uz',
  setLang: () => {}
});

function readStoredLang(): Language {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'uz' || v === 'ru' || v === 'en') return v;
  } catch {
    /* ignore */
  }
  return 'uz';
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() =>
    typeof window !== 'undefined' ? readStoredLang() : 'uz'
  );

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
