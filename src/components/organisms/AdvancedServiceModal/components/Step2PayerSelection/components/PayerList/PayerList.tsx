import { memo } from 'react'
import { PayerItem } from './components/PayerItem'
import type { GuestPerson } from '@/stores/local/guest'

interface Payer {
  personId: string
  amount: string
}

interface PayerListProps {
  payers: Payer[]
  people: GuestPerson[]
  currencySymbol: string
  onUpdateAmount: (personId: string, amount: string | number) => void
  onRemovePayer: (personId: string) => void
  onAddPayer: (personId: string) => void
}

export const PayerList = memo(
  ({
    payers,
    people,
    currencySymbol,
    onUpdateAmount,
    onRemovePayer,
    onAddPayer,
  }: PayerListProps) => {
    return (
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {people.map((person) => {
          const payer = payers.find((p) => p.personId === person.id)

          if (payer) {
            return (
              <PayerItem
                key={person.id}
                person={person}
                amount={payer.amount}
                currencySymbol={currencySymbol}
                onAmountChange={(val) => onUpdateAmount(person.id, val)}
                onRemove={() => onRemovePayer(person.id)}
              />
            )
          }

          return (
            <div
              key={person.id}
              onClick={() => onAddPayer(person.id)}
              className="flex items-center gap-3 p-2 rounded-lg border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors group opacity-60 hover:opacity-100"
            >
              {/* Avatar Component */}
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden border border-gray-300 dark:border-gray-600">
                {person.avatar ? (
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  person.name.charAt(0).toUpperCase()
                )}
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                {person.name}
              </span>
              <div className="flex-1" />
              <span className="text-xs font-bold text-gray-400 group-hover:text-indigo-500">
                + Thêm
              </span>
            </div>
          )
        })}
      </div>
    )
  }
)
