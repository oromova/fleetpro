import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'uz', label: "O'zbekcha" },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
]

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()

  return (
    <select aria-label={t('language.label')} value={i18n.resolvedLanguage} onChange={(event) => i18n.changeLanguage(event.target.value)} className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      {languages.map((language) => (
        <option key={language.code} value={language.code}>{language.label}</option>
      ))}
    </select>
  )
}