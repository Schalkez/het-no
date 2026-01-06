# Documentation

Tài liệu chi tiết về migration từ SvelteKit sang TanStack Start.

## 📚 Tài liệu có sẵn

### 1. [Task Breakdown](./task.md)

Checklist chi tiết các phase cần làm:

- Phase 1: Setup & Planning
- Phase 2: Khởi tạo TanStack Start Project
- Phase 2.5: Setup TanStack Store Architecture
- Phase 3: Supabase Authentication
- Phase 4: Database Schema & Models
- Phase 5: Core UI Components Migration
- Phase 6: State Management với Yjs
- Phase 7: Group & Member Management
- Phase 8: Real-time Collaboration Features
- Phase 9: Testing & Polish

### 2. [Implementation Plan](./implementation_plan.md)

Kế hoạch implementation đầy đủ bao gồm:

- Architecture overview
- Database schema (Supabase)
- Supabase Authentication setup
- Route structure
- Yjs real-time collaboration
- TanStack Store + Yjs state management
- UI components migration
- Verification plan

### 3. [Architecture](./architecture.md)

Tổng quan kiến trúc hệ thống:

- Data flow diagrams
- State management layers
- Yjs document structure
- React hook patterns
- Component lifecycle
- Awareness/presence system
- Persistence strategy
- Conflict resolution

### 4. [State Management](./state-management.md)

Chi tiết về state management với TanStack Store + Yjs:

- Atomic design pattern
- Zero prop drilling architecture
- Store organization (collaborative/local/presence)
- TanStack Store examples
- Yjs store examples
- Component examples từ atoms → templates
- Store initialization flow

## 🚀 Bắt đầu

1. Đọc [Implementation Plan](./implementation_plan.md) để hiểu tổng quan
2. Xem [State Management](./state-management.md) để hiểu kiến trúc state
3. Follow [Task Breakdown](./task.md) để implement từng phase

## 🎯 Quick Links

- [Supabase Database Schema](./implementation_plan.md#2-supabase-database-schema)
- [TanStack Store Setup](./state-management.md#2-tanstack-store-setup)
- [Yjs Integration](./state-management.md#3-yjs-store-collaborative-state)
- [Component Examples](./state-management.md#5-component-examples-zero-prop-drilling)
