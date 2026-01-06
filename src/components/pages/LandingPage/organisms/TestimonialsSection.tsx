import { useTranslation } from 'react-i18next'
import { TestimonialCard } from '../components/TestimonialCard/TestimonialCard'

export function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-32 px-4 md:px-10 lg:px-40 bg-cream">
      <div className="mx-auto max-w-7xl flex flex-col gap-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl relative">
            <div className="absolute -top-10 left-0 text-6xl text-slate-200 font-serif opacity-50 z-0">
              “
            </div>
            <h3 className="text-text-main text-3xl md:text-5xl font-extrabold tracking-tight relative z-10">
              {t('landing.testimonials.title')} <br />
              {t('landing.testimonials.subtitle')}
            </h3>
            <p className="text-slate-500 text-xl relative z-10">
              {t('landing.testimonials.description')}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm">
            <div className="flex -space-x-3">
              <div
                className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 bg-cover"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCl2A6MYb0krofPiIOa-asUTXI4n3ILu_rj1khaUEXVzbJuIKzDpDSs4_9YvY-yAns_plOF0wj23LPFlE_hGZuP6m1YkZjOqS7fxaH6BFJPbLIi7suXcITfQBQ5ZdBLnbW2g3hI42iR24YhlJ41yAmwR_RKp6E4-jsodW-v87QWnaV0gvsKs-ZI5fAEt3c_Rt40tCR88XHo7WYrzb1Ck2at62WT-ILFIE4E9T2-eiknhs7SJtqqAJUxMNUHnDGlBCyBimBK6h7G0WU')",
                }}
              ></div>
              <div
                className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 bg-cover"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBb1JkEs50yU3bgz3Amf08QrbJaUcotFo-2a-YNzIbOzBkpVZjKBofuwP8zMpqkhZYCCqtN7cHQEwg2zEwli4WARJAC3kH1vldJKQeRn0kkulyqzDsz93WCWbnRJw4Wr6gQ5kqgVcklEfm712g-gEoPSXNRZsluZgmKj81GCOLJOqW8XrL_sTMDHmzpKLsdY9N246wvXm3v3d_guLChQx1Jn5fLCHIGkgR5EIo9XUgapbqhmq_qFmJEiOldz6LGRDPR2MiVqH74cMk')",
                }}
              ></div>
              <div
                className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 bg-cover"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuArnIhQg5F5v8ngECt89svsnUk0UbR6KZZi6mdgWQVfIpRik0sJIY-BjgUXQe5zDe_roZu5gMdiVqFr6n3hXhHRIA0H0UgTlBlx-41RcxU9hW4frmLV7a-ZVxDE3l1pPJDcY7c60G1YcD6GQpY4naWAPabIPs0AOEuTHSrrYHopWwuBEV2tVByrvpMmXEnobl5jdHho-Y1uJzYGH5HoCA-DOW4uaEjYD2tpsimxOonGbxdUiojhJpeKUMj2CPE-gb400pyEtGtpc1w')",
                }}
              ></div>
              <div className="w-12 h-12 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs font-bold">
                +2k
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-800">
                {t('landing.testimonials.user_count')}
              </span>
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                {t('landing.testimonials.user_status')}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            quote={t('landing.testimonials.quotes.a')}
            authorName={t('landing.testimonials.authors.a')}
            authorTime={t('landing.testimonials.times.days_ago', { count: 2 })}
            authorAvatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCl2A6MYb0krofPiIOa-asUTXI4n3ILu_rj1khaUEXVzbJuIKzDpDSs4_9YvY-yAns_plOF0wj23LPFlE_hGZuP6m1YkZjOqS7fxaH6BFJPbLIi7suXcITfQBQ5ZdBLnbW2g3hI42iR24YhlJ41yAmwR_RKp6E4-jsodW-v87QWnaV0gvsKs-ZI5fAEt3c_Rt40tCR88XHo7WYrzb1Ck2at62WT-ILFIE4E9T2-eiknhs7SJtqqAJUxMNUHnDGlBCyBimBK6h7G0WU"
            color="yellow"
          />
          <TestimonialCard
            quote={t('landing.testimonials.quotes.b')}
            authorName={t('landing.testimonials.authors.b')}
            authorTime={t('landing.testimonials.times.weeks_ago', { count: 1 })}
            authorAvatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBb1JkEs50yU3bgz3Amf08QrbJaUcotFo-2a-YNzIbOzBkpVZjKBofuwP8zMpqkhZYCCqtN7cHQEwg2zEwli4WARJAC3kH1vldJKQeRn0kkulyqzDsz93WCWbnRJw4Wr6gQ5kqgVcklEfm712g-gEoPSXNRZsluZgmKj81GCOLJOqW8XrL_sTMDHmzpKLsdY9N246wvXm3v3d_guLChQx1Jn5fLCHIGkgR5EIo9XUgapbqhmq_qFmJEiOldz6LGRDPR2MiVqH74cMk"
            color="blue"
          />
          <TestimonialCard
            quote={t('landing.testimonials.quotes.c')}
            authorName={t('landing.testimonials.authors.c')}
            authorTime={t('landing.testimonials.times.weeks_ago', { count: 3 })}
            authorAvatar="https://lh3.googleusercontent.com/aida-public/AB6AXuArnIhQg5F5v8ngECt89svsnUk0UbR6KZZi6mdgWQVfIpRik0sJIY-BjgUXQe5zDe_roZu5gMdiVqFr6n3hXhHRIA0H0UgTlBlx-41RcxU9hW4frmLV7a-ZVxDE3l1pPJDcY7c60G1YcD6GQpY4naWAPabIPs0AOEuTHSrrYHopWwuBEV2tVByrvpMmXEnobl5jdHho-Y1uJzYGH5HoCA-DOW4uaEjYD2tpsimxOonGbxdUiojhJpeKUMj2CPE-gb400pyEtGtpc1w"
            color="pink"
          />
        </div>
      </div>
    </section>
  )
}
