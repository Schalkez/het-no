import { useTranslation } from 'react-i18next'
import { CenteredSectionHeader } from '../components/CenteredSectionHeader/CenteredSectionHeader'
import { FeatureCard } from '../components/FeatureCard/FeatureCard'

export function FeaturesSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-32 px-4 md:px-10 lg:px-40 bg-white border-y-2 border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div
          className="absolute bottom-20 left-10 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>
      <div className="mx-auto max-w-7xl flex flex-col gap-16 relative z-10">
        <CenteredSectionHeader
          badge={t('landing.features.badge')}
          title={
            <>
              {t('landing.features.title')} <br />
              <span className="relative z-10">
                {t('landing.features.title_highlight')}
                <span className="absolute bottom-1 left-0 w-full h-4 bg-yellow-200/80 -z-10 -rotate-1 transform"></span>
              </span>
            </>
          }
          description={t('landing.features.description')}
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="sync"
            title={t('landing.features.sync.title')}
            description={t('landing.features.sync.desc')}
            color="blue"
          />
          <FeatureCard
            icon="lock_person"
            title={t('landing.features.security.title')}
            description={t('landing.features.security.desc')}
            color="purple"
            badgeText={t('landing.features.security.badge')}
          />
          <FeatureCard
            icon="sentiment_satisfied"
            title={t('landing.features.ease.title')}
            description={t('landing.features.ease.desc')}
            color="orange"
          />
        </div>
      </div>
    </section>
  )
}
