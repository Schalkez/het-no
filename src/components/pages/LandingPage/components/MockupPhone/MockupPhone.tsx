import { memo } from 'react'
import { useTranslation } from 'react-i18next'

export const MockupPhone = memo(() => {
  const { t } = useTranslation()

  return (
    <div className="flex-1 w-full max-w-[500px] relative">
      <div
        className="absolute -top-12 -right-8 text-6xl animate-bounce z-20 transform rotate-12"
        style={{ animationDuration: '3s' }}
      >
        <span className="block transform hover:scale-125 transition-transform cursor-default">
          💸
        </span>
      </div>
      <div
        className="absolute bottom-20 -left-16 text-5xl animate-bounce z-20 transform -rotate-12"
        style={{ animationDuration: '4s' }}
      >
        <span className="block transform hover:scale-125 transition-transform cursor-default">
          🍕
        </span>
      </div>
      <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[2rem] bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(253,203,110,1)] overflow-hidden flex flex-col transform md:rotate-2 hover:rotate-0 transition-all duration-500 ease-out z-10">
        <div className="bg-slate-50 p-6 pb-4 border-b-2 border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-black p-0.5 bg-accent">
                <div className="w-full h-full rounded-full bg-white overflow-hidden">
                  <div
                    className="bg-center bg-no-repeat bg-cover w-full h-full"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCl2A6MYb0krofPiIOa-asUTXI4n3ILu_rj1khaUEXVzbJuIKzDpDSs4_9YvY-yAns_plOF0wj23LPFlE_hGZuP6m1YkZjOqS7fxaH6BFJPbLIi7suXcITfQBQ5ZdBLnbW2g3hI42iR24YhlJ41yAmwR_RKp6E4-jsodW-v87QWnaV0gvsKs-ZI5fAEt3c_Rt40tCR88XHo7WYrzb1Ck2at62WT-ILFIE4E9T2-eiknhs7SJtqqAJUxMNUHnDGlBCyBimBK6h7G0WU')",
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="text-base font-bold text-slate-800">
                  {t('landing.mockup.trip_name')}
                </div>
                <div className="text-xs text-slate-500 font-semibold flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                  Online
                </div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-black hover:border-black cursor-pointer transition-all">
              <span className="material-symbols-outlined text-xl">settings</span>
            </div>
          </div>
          <div className="bg-primary rounded-2xl p-5 flex justify-between items-center text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="text-xs text-primary-soft font-bold uppercase tracking-wider mb-1">
                {t('landing.mockup.total_spending')}
              </div>
              <div className="text-3xl font-black">
                2.450k <span className="text-base font-medium opacity-80">vnđ</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-white text-primary flex items-center justify-center shadow-md cursor-pointer hover:scale-110 hover:rotate-90 transition-all z-10">
              <span className="material-symbols-outlined !text-3xl font-bold">add</span>
            </div>
          </div>
        </div>
        {/* List - Full Spacing */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2YzZjMiLz4KPC9zdmc+')]">
          {/* Item 1 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-transparent hover:border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl transform group-hover:rotate-12 transition-transform">
              🍕
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-800 text-base">Pizza</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                Paid by{' '}
                <span className="text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">An</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-black text-red-500 text-base">-120k</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Today
              </div>
            </div>
          </div>
          {/* Item 2 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-transparent hover:border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl transform group-hover:-rotate-12 transition-transform">
              🚕
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-800 text-base">Taxi</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                Paid by{' '}
                <span className="text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">Bình</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-black text-green-500 text-base">+50k</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Yesterday
              </div>
            </div>
          </div>
          {/* Item 3 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-transparent hover:border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl transform group-hover:rotate-12 transition-transform">
              ☕
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-800 text-base">Coffee</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                Paid by{' '}
                <span className="text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">Chi</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-black text-slate-400 text-base">0đ</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Yesterday
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
