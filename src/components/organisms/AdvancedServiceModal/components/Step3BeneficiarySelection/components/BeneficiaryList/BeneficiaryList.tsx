import { memo } from 'react'
import type { GuestPerson, SplitMode } from '@/stores/local/guest'
import { BeneficiaryItem } from './components/BeneficiaryItem'
import { SelectAllButton } from './components/SelectAllButton'

interface BeneficiaryData {
  personId: string
  quantity?: number
  percentage?: number
}

interface BeneficiaryListProps {
  people: GuestPerson[]
  selectedBeneficiaries: Set<string>
  beneficiaryData: Map<string, BeneficiaryData>
  splitMode: SplitMode
  onToggleBeneficiary: (personId: string, checked: boolean) => void
  onUpdateQuantity: (personId: string, value: number) => void
  onUpdatePercentage: (personId: string, value: number) => void
  onSelectAll: () => void
}

export const BeneficiaryList = memo(
  ({
    people,
    selectedBeneficiaries,
    beneficiaryData,
    splitMode,
    onToggleBeneficiary,
    onUpdateQuantity,
    onUpdatePercentage,
    onSelectAll,
  }: BeneficiaryListProps) => {
    const allSelected = people.length > 0 && selectedBeneficiaries.size === people.length

    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedBeneficiaries.size} / {people.length} selected
          </p>
          <SelectAllButton allSelected={allSelected} onToggle={onSelectAll} />
        </div>

        <div className="space-y-2">
          {people.map((person) => {
            const isSelected = selectedBeneficiaries.has(person.id)
            const data = beneficiaryData.get(person.id)

            return (
              <BeneficiaryItem
                key={person.id}
                person={person}
                isSelected={isSelected}
                splitMode={splitMode}
                quantity={data?.quantity}
                percentage={data?.percentage}
                onToggle={(checked) => onToggleBeneficiary(person.id, checked)}
                onQuantityChange={(val) => onUpdateQuantity(person.id, val)}
                onPercentageChange={(val) => onUpdatePercentage(person.id, val)}
              />
            )
          })}
        </div>
      </div>
    )
  }
)
