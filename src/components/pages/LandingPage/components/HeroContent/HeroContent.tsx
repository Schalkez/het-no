import { memo } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LandingButton } from '../LandingButton/LandingButton'

export const HeroContent = memo(() => {
  const { t } = useTranslation()

  return (
    <div className="flex-1 flex flex-col gap-8 text-center md:text-left">
      <div className="inline-flex mx-auto md:mx-0 items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-slate-100 shadow-[4px_4px_0px_0px_rgba(226,232,240,1)] w-fit transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
        <span className="flex h-3 w-3 rounded-full bg-accent border border-slate-300"></span>
        <span className="text-sm font-bold text-slate-700 font-hand tracking-wide">
          {t('landing.hero.version')}
        </span>
      </div>
      <h1 className="text-text-main text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight relative">
        {t('landing.hero.title')} <br />
        <span className="scribble-underline text-primary relative inline-block">
          {t('landing.hero.title_highlight')}
        </span>
        <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-500 mt-4 font-hand transform rotate-1 origin-left">
          {t('landing.hero.tagline')}
        </span>
      </h1>
      <p className="text-slate-600 text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
        {t('landing.hero.description')}
      </p>
      <div className="flex flex-wrap justify-center md:justify-start gap-5 mt-4">
        <Link to="/app">
          <LandingButton>{t('landing.hero.cta')}</LandingButton>
        </Link>
        <Link to="/app">
          <LandingButton variant="secondary" icon="play_circle">
            {t('bottom_panel.details')}
          </LandingButton>
        </Link>
      </div>
      <div className="flex items-center justify-center md:justify-start gap-6 mt-4 text-slate-600 text-sm font-bold">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-green-500"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span>{t('landing.hero.feature_no_card')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-green-500"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span>{t('landing.hero.feature_free')}</span>
        </div>
      </div>
    </div>
  )
})
