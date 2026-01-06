import { ReactNode, useEffect, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { expenseSchema, type ExpenseSchema } from '@/lib/schemas/expense'
import * as Y from 'yjs'
import { GuestService, GuestPerson } from '@/stores/local/guest'
import { SPLIT_MODES } from '@/lib/constants/splitModes'
import { PeopleContext } from './contexts'
import { autoSplitPayers } from '@/lib/utils/splitLogic'
import { useCollaboration } from '@/components/collaboration/CollaborationProvider'
import { FOCUS_IDS } from '@/lib/constants'

interface AdvancedServiceProviderProps {
  children: ReactNode
  service: GuestService | null
  people: GuestPerson[]
}

export function AdvancedServiceProvider({
  children,
  service,
  people,
}: AdvancedServiceProviderProps) {
  // 1. Initialize Default Values
  const defaultValues: Partial<ExpenseSchema> = {
    name: service?.name ?? '',
    cost: service?.totalCost ?? 0,
    splitMode: service?.splitMode ?? SPLIT_MODES.EQUAL,
    payers: service?.payers.map((p) => ({
      personId: p.personId,
      amount: p.paidAmount,
    })) ?? [{ personId: people[0]?.id ?? '', amount: service?.totalCost ?? 0 }],
    beneficiaries: people.map((p) => {
      const existing = service?.beneficiaries.find((b) => b.personId === p.id)
      return {
        personId: p.id,
        quantity:
          typeof existing?.quantity === 'number'
            ? existing.quantity
            : service?.splitMode === SPLIT_MODES.QUANTITY
              ? 1
              : undefined,
        percentage: typeof existing?.percentage === 'number' ? existing.percentage : undefined,
        used: existing ? existing.used : true,
      }
    }),
  }

  // 2. Setup Form
  const methods = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { watch, setValue } = methods
  const cost = watch('cost')
  const payers = watch('payers')

  // Real-time Collaboration Sync
  const collaboration = (() => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useCollaboration()
    } catch {
      return null
    }
  })()

  useEffect(() => {
    if (!collaboration || !service?.id) return

    let timeoutId: NodeJS.Timeout

    const subscription = watch((value) => {
      // Clear existing timeout to debounce
      if (timeoutId) clearTimeout(timeoutId)

      // Debounce sync by 200ms to avoid overwhelming the network
      timeoutId = setTimeout(() => {
        if (!service?.id) return
        
        // Ngừng trạng thái nhập liệu sau khi gõ xong
        collaboration.updateFocus(`${FOCUS_IDS.MODAL_PREFIX}${service.id}`, false)

        // Tối ưu: Sử dụng Nested Maps thay vì ghi đè toàn bộ Object
        let expenseMap = collaboration.sharedMap.get(service.id) as Y.Map<unknown>
        
        // Nếu chưa có Map con cho Expense này thì tạo mới
        if (!(expenseMap instanceof Y.Map)) {
          expenseMap = new Y.Map()
          collaboration.sharedMap.set(service.id, expenseMap)
        }

        // Cập nhật từng field một cách độc lập trong 1 transaction
        collaboration.sharedMap.doc?.transact(() => {
          Object.entries(value).forEach(([key, val]) => {
            // Chỉ set nếu giá trị thực sự khác biệt để tránh loop re-render
            const currentVal = expenseMap.get(key)
            if (JSON.stringify(currentVal) !== JSON.stringify(val)) {
              expenseMap.set(key, val)
            }
          })
          
          expenseMap.set('updatedAt', new Date().toISOString())
          expenseMap.set('updaterId', collaboration.awarenessUsers.find((u) => u.focusedId === `${FOCUS_IDS.MODAL_PREFIX}${service.id}`)?.id)
        })
      }, 200)
    })

    return () => {
      subscription.unsubscribe()
      if (timeoutId) clearTimeout(timeoutId)
      
      // Smart Cleanup: Chỉ xóa dữ liệu live khi KHÔNG còn ai xem/sửa nó nữa
      if (service?.id) {
        // Kiểm tra xem còn ai khác đang focus vào modal này không
        const othersFocusing = collaboration.awarenessUsers.some(
          (u) =>
            u.focusedId === `${FOCUS_IDS.MODAL_PREFIX}${service.id}` &&
            u.id !==
              collaboration.awarenessUsers.find(
                (curr) => curr.focusedId === `${FOCUS_IDS.MODAL_PREFIX}${service.id}`
              )?.id
        )

        if (!othersFocusing) {
          collaboration.sharedMap.delete(service.id)
        }
      }
    }
  }, [collaboration, service?.id, watch])

  // 3. Auto-sync payers when cost changes (if they are evenly split)
  const payersLengthRef = useRef(payers?.length || 0)
  useEffect(() => {
    const currentPayers = payers || []
    if (currentPayers.length === 0) return

    // Only run when payers length changes or cost changes
    const prevLength = payersLengthRef.current
    payersLengthRef.current = currentPayers.length

    const currentSum = currentPayers.reduce((sum, p) => sum + (p.amount || 0), 0)
    const isEvenlySplit =
      currentSum === 0 ||
      currentPayers.every((p) => {
        const expected = currentSum / currentPayers.length
        return Math.abs((p.amount || 0) - expected) < 2
      })

    if (
      isEvenlySplit &&
      (prevLength !== currentPayers.length || Math.abs(currentSum - cost) > 0.1)
    ) {
      const newPayers = autoSplitPayers(cost, currentPayers)

      setValue('payers', newPayers, { shouldValidate: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cost, payers?.length, setValue])

  return (
    <FormProvider {...methods}>
      <PeopleContext.Provider value={people}>{children}</PeopleContext.Provider>
    </FormProvider>
  )
}
