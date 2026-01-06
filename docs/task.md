# Migration: SvelteKit → TanStack Start (Guest-First Flow)

## Phase 1: Setup & Planning

- [x] Nghiên cứu cấu trúc dự án SvelteKit hiện tại
- [x] Nghiên cứu TanStack Start, Yjs, Supabase
- [x] Tạo implementation plan chi tiết
- [x] Làm rõ kiến trúc và quản lý state
- [x] Thiết kế UI/UX với guest-first flow
- [x] Tạo tài liệu đầy đủ và copy vào project
- [x] User review và phê duyệt

## Phase 2: Khởi tạo TanStack Start Project

- [ ] Khởi tạo project với `create-start`
- [ ] Cấu hình Tailwind CSS v4
- [ ] Setup TypeScript và ESLint
- [ ] Cấu hình Vite
- [ ] Install TanStack Store và dependencies

## Phase 2.5: Setup TanStack Store Architecture

- [ ] Tạo store structure (collaborative/local/presence)
- [ ] Setup UI store (modals, focus states)
- [ ] Setup Form store (validation, errors)
- [ ] Setup Computed store (transactions, totals)
- [ ] Setup Guest store (LocalStorage persistence)

## Phase 3: Guest Mode Implementation

- [ ] Implement guest calculator (landing page)
- [ ] LocalStorage persistence cho guest data
- [ ] Add person/service functionality
- [ ] Calculation logic
- [ ] Result display
- [ ] "Lưu nhóm" CTA

## Phase 4: Contextual Authentication

- [ ] Save modal với inline auth
- [ ] Email/Password auth form
- [ ] Google OAuth integration
- [ ] Signup/Login toggle
- [ ] Migration logic (guest → authenticated)

## Phase 5: Supabase Setup

- [ ] Tạo Supabase project
- [ ] Thiết lập database schema
- [ ] Tạo bảng `users`, `groups`, `members`
- [ ] Tạo bảng `services`, `contributions`
- [ ] Tạo bảng `edit_history`
- [ ] Thiết lập RLS policies

## Phase 6: Authenticated Features

- [ ] Dashboard với danh sách groups
- [ ] Group detail page
- [ ] Settings page
- [ ] Protected routes

## Phase 7: Real-time Collaboration (Authenticated Only)

- [ ] Setup Yjs với Partykit
- [ ] Yjs stores cho services/people
- [ ] Implement awareness cho cursor presence
- [ ] Edit history tracking
- [ ] Online users display

## Phase 8: UI Components Migration

- [ ] Migrate UI components (Button, Input, Card, etc.)
- [ ] Migrate calculator components
- [ ] Create SaveGroupModal
- [ ] Create collaboration components (OnlineUsers, EditHistory)

## Phase 9: Testing & Polish

- [ ] Guest mode testing
- [ ] Auth flow testing
- [ ] Migration testing (guest → authenticated)
- [ ] Real-time collaboration testing
- [ ] E2E testing
- [ ] Mobile responsive testing
