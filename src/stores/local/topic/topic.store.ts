import { Store } from '@tanstack/store'

interface TopicState {
  // UI State
  isAddExpenseModalOpen: boolean
  editingExpenseId: string | null

  // Data Context (Optional, for easy access)
  groupId: string | null
  topicId: string | null
}

export const topicStore = new Store<TopicState>({
  isAddExpenseModalOpen: false,
  editingExpenseId: null,
  groupId: null,
  topicId: null,
})

// UI Actions - Only for managing local component state
export const topicActions = {
  setContext: (groupId: string, topicId: string) => {
    topicStore.setState((state: TopicState) => ({ ...state, groupId, topicId }))
  },

  openAddExpenseModal: () => {
    topicStore.setState((state: TopicState) => ({ ...state, isAddExpenseModalOpen: true }))
  },

  closeAddExpenseModal: () => {
    topicStore.setState((state: TopicState) => ({ ...state, isAddExpenseModalOpen: false }))
  },

  editExpense: (expenseId: string) => {
    topicStore.setState((state: TopicState) => ({ ...state, editingExpenseId: expenseId }))
  },

  closeEditModal: () => {
    topicStore.setState((state: TopicState) => ({ ...state, editingExpenseId: null }))
  },
}
