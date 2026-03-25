import { Link } from 'react-router-dom'
import { useT } from '../lib/i18n'

type containerProps = { col?: number; children: any; className?: string; bg?: string }

const GridContainer = ({ col, children, className, bg }: containerProps) => (
  <div className={`${className} grid grid-cols-${col} gap-2 items-center bg-${bg} mb-16`}>{children}</div>
)

const FlexContainer = ({ className = '', children, bg = 'transparent' }: containerProps) => (
  <div className={`flex flex-col md:flex-row bg-${bg} w-full gap-5 p-0 lg:p-2 ${className}`}>{children}</div>
)

type emptyProps = { icon: string; header: string }
const EmptyContainer = ({ icon, header }: emptyProps) => (
  <div className="w-40 m-auto text-center py-16 text-content-muted">
    <div className="text-4xl mb-2">{icon}</div>
    <p className="font-bold">{header}</p>
  </div>
)

const LogoContainer = () => (
  <Link to="/" className="inline-flex items-center gap-2.5">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="blue">
      <path d="M12 2C12 2 8 6 4 9C6 11 8 13 8 16C8 18.2 9.8 20 12 20C14.2 20 16 18.2 16 16C16 13 18 11 20 9C16 6 12 2 12 2Z" fill="#2563EB" />
      <path d="M12 20C12 20 10 21.5 10 22.5C10 23 11 23.5 12 23.5C13 23.5 14 23 14 22.5C14 21.5 12 20 12 20Z" fill="#06B6D4" />
    </svg>
    <span className="font-black text-2xl text-primary">Opica</span>
  </Link>
)

const Footer = () => {
  const { t } = useT()
  return (
    <p className="flex flex-col items-center gap-2 md:flex-row text-xs text-content-muted mt-6">
      <span>
        <span className="mr-2">• {t('common.footer.privacy')}</span>
        <span>• {t('common.footer.terms')}</span>
      </span>
      <span>{t('common.footer.copyright')}</span>
    </p>
  )
}

export { FlexContainer, GridContainer, EmptyContainer, LogoContainer, Footer }
