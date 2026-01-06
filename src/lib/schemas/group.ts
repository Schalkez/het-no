import { z } from 'zod'

export const createGroupSchema = z.object({
  name: z.string().trim().min(1, 'Tên nhóm không được để trống'),
})

export const joinGroupSchema = z.object({
  code: z.string().trim().min(1, 'Mã mời không được để trống'),
})

export const createTopicSchema = z.object({
  groupId: z.string(),
  name: z.string().trim().min(1, 'Tên chủ đề không được để trống'),
})

export const getTopicDetailsSchema = z.object({
  topicId: z.string(),
  groupId: z.string(),
})
