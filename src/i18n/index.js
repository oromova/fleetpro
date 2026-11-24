import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import uz from './locales/uz'
import ru from './locales/ru'
import en from './locales/en'

const STORAGE_KEY = 'fleetpro-lang'

const getSavedLanguage = () => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: getSavedLanguage() || 'uz',
  fallbackLng: 'uz',
  interpolation: { escapeValue: false },
})

document.documentElement.lang = i18n.language

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
  }
})

export default i18n