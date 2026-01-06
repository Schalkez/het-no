// Re-export all types
export type * from './user.types'
export type * from './group.types'
export type * from './group-member.types'
export type * from './service.types'
export type * from './beneficiary.types'
export type * from './payer.types'
export type * from './edit-history.types'

// Database schema type for Supabase
import type { User, UserInsert, UserUpdate } from './user.types'
import type { Group, GroupInsert, GroupUpdate } from './group.types'
import type { GroupMember, GroupMemberInsert, GroupMemberUpdate } from './group-member.types'
import type { Service, ServiceInsert, ServiceUpdate } from './service.types'
import type { Beneficiary, BeneficiaryInsert, BeneficiaryUpdate } from './beneficiary.types'
import type { Payer, PayerInsert, PayerUpdate } from './payer.types'
import type { EditHistory, EditHistoryInsert, EditHistoryUpdate } from './edit-history.types'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: UserInsert
        Update: UserUpdate
      }
      groups: {
        Row: Group
        Insert: GroupInsert
        Update: GroupUpdate
      }
      group_members: {
        Row: GroupMember
        Insert: GroupMemberInsert
        Update: GroupMemberUpdate
      }
      services: {
        Row: Service
        Insert: ServiceInsert
        Update: ServiceUpdate
      }
      beneficiaries: {
        Row: Beneficiary
        Insert: BeneficiaryInsert
        Update: BeneficiaryUpdate
      }
      payers: {
        Row: Payer
        Insert: PayerInsert
        Update: PayerUpdate
      }
      edit_history: {
        Row: EditHistory
        Insert: EditHistoryInsert
        Update: EditHistoryUpdate
      }
    }
  }
}
