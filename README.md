# Chia Tiền - TanStack Start Migration

Ứng dụng chia tiền nhóm với real-time collaboration, được migrate từ SvelteKit sang TanStack Start.

## 🎯 Features

- ✅ **Multi-user Groups**: Tạo và quản lý nhóm chia tiền
- ✅ **Real-time Collaboration**: Nhiều người cùng edit đồng thời (Yjs CRDT)
- ✅ **Presence Awareness**: Xem ai đang online, ai đang focus vào đâu (như Figma)
- ✅ **Edit History**: Lịch sử ai edit cái gì, khi nào
- ✅ **Supabase Auth**: Đăng nhập với Email/Password hoặc Google OAuth
- ✅ **Supabase Database**: PostgreSQL với Row Level Security

## 🏗️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React)
- **Router**: [TanStack Router](https://tanstack.com/router)
- **State Management**: [TanStack Store](https://tanstack.com/store) + [Yjs](https://yjs.dev)
- **Backend**: [Supabase](https://supabase.com) (Auth + Database + Realtime)
- **Real-time Sync**: [Yjs](https://yjs.dev) + [Partykit](https://partykit.io)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **UI Components**: Custom components với `class-variance-authority`

## 📚 Documentation

Xem thư mục [`docs/`](./docs) để biết chi tiết:

- 📋 [`task.md`](./docs/task.md) - Task breakdown và checklist
- 📝 [`implementation_plan.md`](./docs/implementation_plan.md) - Kế hoạch implementation chi tiết
- 🏛️ [`architecture.md`](./docs/architecture.md) - Tổng quan kiến trúc
- 🗂️ [`state-management.md`](./docs/state-management.md) - State management với TanStack Store + Yjs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) hoặc npm
- Supabase account

### Setup

1. **Clone repository**

   ```bash
   cd chia-tien-tanstack-start
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Setup Supabase**
   - Tạo project tại [supabase.com](https://supabase.com)
   - Copy `.env.example` thành `.env.local`
   - Điền `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY`

4. **Run migrations**

   ```bash
   # TODO: Add migration commands
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

## 📁 Project Structure

```
chia-tien-tanstack-start/
├── docs/                    # Documentation
├── src/
│   ├── routes/             # TanStack Router routes
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── _auth/          # Protected routes
│   │   │   ├── dashboard.tsx
│   │   │   └── groups/
│   │   │       └── $groupId.tsx
│   │
│   ├── stores/             # State management
│   │   ├── collaborative/  # Yjs-backed stores
│   │   ├── local/          # TanStack Store
│   │   └── presence/       # Awareness
│   │
│   ├── components/         # React components
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   │
│   ├── lib/                # Utilities
│   │   ├── supabase/
│   │   └── yjs/
│   │
│   └── hooks/              # Custom hooks
│
├── supabase/
│   └── migrations/         # Database migrations
│
└── public/                 # Static assets
```

## 🎨 State Management Architecture

### 3-Layer Store System

1. **Collaborative State** (Yjs)
   - Services, People, Contributions
   - Real-time sync across users
   - CRDT conflict resolution

2. **Local State** (TanStack Store)
   - UI state (modals, focus)
   - Form state (validation, errors)
   - Computed values (transactions, totals)

3. **Presence State** (Awareness)
   - Online users
   - Cursor positions
   - Focused elements

### Zero Prop Drilling

Tất cả components (từ atoms → templates) đều dùng hooks để lấy data từ stores:

```typescript
// Atom component
export const AddServiceButton = () => {
  return <Button onClick={openAddServiceSheet}>Thêm dịch vụ</Button>
}

// Organism component
export const ServiceList = () => {
  const services = useServices() // No props needed!
  return <div>{services.map(s => <ServiceCard serviceId={s.id} />)}</div>
}
```

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e
```

## 📦 Build

```bash
pnpm build
```

## 🚢 Deployment

TODO: Add deployment instructions

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please read the [implementation plan](./docs/implementation_plan.md) first.
