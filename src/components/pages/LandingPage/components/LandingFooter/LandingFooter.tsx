import { memo } from 'react'
import { useTranslation } from 'react-i18next'

export const LandingFooter = memo(() => {
  const { t } = useTranslation()

  return (
    <footer className="bg-white border-t-2 border-slate-100 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-40">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white transform -rotate-3">
                <span className="material-symbols-outlined !text-[24px]">
                  account_balance_wallet
                </span>
              </div>
              <span className="text-2xl font-bold text-slate-900 font-hand">SplitMoney</span>
            </div>
            <p className="text-slate-600 text-base leading-relaxed">
              {t('landing.footer.description')}
            </p>
          </div>
          {/* Links */}
          <div className="flex gap-12 md:gap-24 flex-wrap">
            <div className="flex flex-col gap-5">
              <h4 className="text-slate-900 font-extrabold text-sm uppercase tracking-widest border-b-2 border-accent pb-1 w-fit">
                {t('landing.footer.product')}
              </h4>
              <a
                href="#"
                className="text-slate-600 hover:text-primary font-medium transition-colors"
              >
                {t('landing.footer.features')}
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-primary font-medium transition-colors"
              >
                {t('landing.footer.security')}
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-primary font-medium transition-colors"
              >
                {t('landing.footer.pricing')}
              </a>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="text-slate-900 font-extrabold text-sm uppercase tracking-widest border-b-2 border-secondary pb-1 w-fit">
                {t('landing.footer.company')}
              </h4>
              <a
                href="#"
                className="text-slate-600 hover:text-primary font-medium transition-colors"
              >
                {t('landing.footer.about')}
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-primary font-medium transition-colors"
              >
                {t('landing.footer.contact')}
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 font-medium text-sm">{t('landing.footer.rights')}</p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-slate-400 hover:text-white hover:bg-black transition-all bg-slate-100 p-3 rounded-xl"
            >
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  clipRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white hover:bg-black transition-all bg-slate-100 p-3 rounded-xl"
            >
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  clipRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.37c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
})
