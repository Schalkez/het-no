import { z } from 'zod'
import { SPLIT_MODES } from '@/lib/constants/splitModes'

export const expenseSchema = z
  .object({
    name: z.string().min(1, 'Tên khoản chi không được để trống'),
    cost: z.number().gt(0, 'Số tiền phải lớn hơn 0'),
    splitMode: z.enum([SPLIT_MODES.EQUAL, SPLIT_MODES.QUANTITY, SPLIT_MODES.PERCENTAGE]),
    payers: z
      .array(
        z.object({
          personId: z.string(),
          amount: z.number().min(0),
        })
      )
      .min(1, 'Cần ít nhất một người chi trả'),
    beneficiaries: z
      .array(
        z.object({
          personId: z.string(),
          quantity: z.number().nullish(),
          percentage: z.number().nullish(),
          used: z.boolean().optional(),
        })
      )
      .min(1, 'Cần ít nhất một người thụ hưởng'),
  })
  .superRefine((data, ctx) => {
    // Validate Total Paid matches Cost
    const totalPaid = data.payers.reduce((sum, p) => sum + p.amount, 0)
    if (Math.abs(totalPaid - data.cost) > 0.01) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Tổng tiền chi trả không khớp với giá trị khoản chi',
        path: ['payers'],
      })
    }

    // Validate Percentage Sum
    if (data.splitMode === SPLIT_MODES.PERCENTAGE) {
      const totalPct = data.beneficiaries.reduce((sum, b) => sum + (b.percentage || 0), 0)
      if (Math.abs(totalPct - 100) > 0.01) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Tổng phần trăm phải bằng 100%',
          path: ['beneficiaries'],
        })
      }
    }

    // Validate Quantity available (though derived)
    if (data.splitMode === SPLIT_MODES.QUANTITY) {
      const totalQty = data.beneficiaries.reduce((sum, b) => sum + (b.quantity || 0), 0)
      if (totalQty === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Tổng số lượng phải lớn hơn 0',
          path: ['beneficiaries'],
        })
      }
    }
  })

export type ExpenseSchema = z.infer<typeof expenseSchema>

export const createExpenseServerSchema = z.object({
  groupId: z.string(),
  topicId: z.string(),
  name: z.string().min(1),
  cost: z.number().positive(),
  splitMode: z.enum([SPLIT_MODES.EQUAL, SPLIT_MODES.QUANTITY, SPLIT_MODES.PERCENTAGE]),
  totalQuantity: z.number().nullish(),
  payers: z.array(
    z.object({
      personId: z.string(),
      amount: z.number(),
    })
  ),
  beneficiaries: z.array(
    z.object({
      personId: z.string(),
      quantity: z.number().nullish(),
      percentage: z.number().nullish(),
      shouldPay: z.number(),
    })
  ),
})
export const updateExpenseServerSchema = z.object({
  expenseId: z.string(),
  groupId: z.string(),
  topicId: z.string(),
  name: z.string().min(1).optional(),
  cost: z.number().positive().optional(),
  splitMode: z.enum([SPLIT_MODES.EQUAL, SPLIT_MODES.QUANTITY, SPLIT_MODES.PERCENTAGE]).optional(),
  totalQuantity: z.number().nullish(),
  payers: z
    .array(
      z.object({
        personId: z.string(),
        amount: z.number(),
      })
    )
    .optional(),
  beneficiaries: z
    .array(
      z.object({
        personId: z.string(),
        quantity: z.number().nullish(),
        percentage: z.number().nullish(),
        shouldPay: z.number(),
      })
    )
    .optional(),
})
