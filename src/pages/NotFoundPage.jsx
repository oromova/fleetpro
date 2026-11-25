import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-slate-900">{t('notFound.title')}</p>
      <Link
        to="/"
        className="mt-3 inline-block text-sm font-medium text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {t('notFound.back')}
      </Link>
    </div>
  )
}
