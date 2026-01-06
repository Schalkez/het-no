import clsx from 'clsx'
import { memo } from 'react'

export type TestimonialColor = 'yellow' | 'blue' | 'pink'

interface TestimonialCardProps {
  quote: string
  authorName: string
  authorTime: string
  authorAvatar: string
  color: TestimonialColor
}

// Fixed mapping to match original exactly
const getStyles = (color: TestimonialColor) => {
  switch (color) {
    case 'yellow':
      return {
        blob: 'bg-yellow-50 group-hover:bg-yellow-100',
        shadow: 'hover:shadow-[6px_6px_0px_0px_rgba(253,121,168,0.4)]',
      }
    case 'blue':
      return {
        blob: 'bg-blue-50 group-hover:bg-blue-100',
        shadow: 'hover:shadow-[6px_6px_0px_0px_rgba(108,92,231,0.4)]',
      }
    case 'pink':
      return {
        blob: 'bg-pink-50 group-hover:bg-pink-100',
        shadow: 'hover:shadow-[6px_6px_0px_0px_rgba(253,203,110,0.4)]',
      }
  }
}

export const TestimonialCard = memo(
  ({ quote, authorName, authorTime, authorAvatar, color }: TestimonialCardProps) => {
    const styles = getStyles(color)

    return (
      <div
        className={clsx(
          'bg-white p-8 rounded-[2rem] shadow-sm border-2 border-slate-100 flex flex-col gap-6 relative overflow-hidden group transition-all hover:border-black',
          styles.shadow,
          color === 'blue' && 'md:-translate-y-4' // Middle card offset
        )}
      >
        <div
          className={clsx(
            'absolute top-0 right-0 w-32 h-32 rounded-bl-[100%] -mr-8 -mt-8 z-0 transition-colors',
            styles.blob
          )}
        ></div>

        {/* Stars */}
        <div className="flex gap-1 text-yellow-400 relative z-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={clsx(
                'material-symbols-outlined !text-[24px] fill-current',
                color === 'pink' && i === 5 ? 'text-slate-200' : ''
              )}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          ))}
        </div>

        <p className="text-slate-700 text-lg leading-relaxed relative z-10 italic font-medium">
          "{quote}"
        </p>

        <div className="mt-auto flex items-center gap-3 relative z-10 pt-4 border-t border-slate-50">
          <div className="w-12 h-12 rounded-full border border-slate-200 bg-cover p-0.5 bg-white">
            <div
              className="w-full h-full rounded-full bg-cover"
              style={{ backgroundImage: `url('${authorAvatar}')` }}
            ></div>
          </div>
          <div>
            <div className="font-bold text-slate-900 text-base">{authorName}</div>
            <div className="text-slate-400 text-xs font-semibold">{authorTime}</div>
          </div>
        </div>
      </div>
    )
  }
)
