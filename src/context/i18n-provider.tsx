import { createContext, useContext, useEffect, useState } from 'react'
import {
  type Language,
  type TranslationKey,
  LANGUAGES,
  translations,
} from '@/lib/i18n'

const I18N_STORAGE_KEY = 'kbizhub_lang'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(I18N_STORAGE_KEY) as Language
    if (saved && LANGUAGES.some((l) => l.code === saved)) {
      return saved
    }
    // 기본 브라우저 언어 감지
    const browserLang = navigator.language.slice(0, 2)
    if (browserLang === 'ko') return 'ko'
    if (browserLang === 'vi') return 'vi'
    return 'ko' // kbizhub 기본 한국어
  })

  useEffect(() => {
    localStorage.setItem(I18N_STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
