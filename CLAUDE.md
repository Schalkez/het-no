# CLAUDE.md - Project Rules & Guidelines

> **AI Assistant Instructions**: Follow these rules strictly when working on this codebase.

---

## 🚫 Absolute Prohibitions

### 1. **NO `any` Type**

```typescript
// ❌ NEVER
const data: any = fetchData()

// ✅ ALWAYS
const data: User = fetchData()
// or
const data: unknown = fetchData()
```

### 2. **NO ESLint Disable Comments**

```typescript
// ❌ NEVER
// eslint-disable-next-line
// @ts-ignore
// @ts-expect-error

// ✅ ALWAYS fix the root cause
```

### 3. **NO Type Assertions (Casting)**

```typescript
// ❌ NEVER
const user = data as User
const element = document.getElementById('root') as HTMLElement

// ✅ ALWAYS use type guards
function isUser(data: unknown): data is User {
  return typeof data === 'object' && data !== null && 'id' in data
}

const element = document.getElementById('root')
if (!element) throw new Error('Root element not found')
```

### 4. **NO Non-Null Assertions**

```typescript
// ❌ AVOID (only warn, but avoid)
const user = users.find((u) => u.id === id)!

// ✅ ALWAYS handle null/undefined
const user = users.find((u) => u.id === id)
if (!user) throw new Error('User not found')
```

---

## 📁 File & Folder Structure

### **Component Organization**

Every component MUST be a **folder**, not a single file.

```
src/components/
├── atoms/
│   ├── Button/
│   │   ├── Button.tsx          # Component implementation
│   │   ├── Button.types.ts     # TypeScript interfaces
│   │   ├── Button.styles.ts    # Styles (if needed)
│   │   ├── Button.test.tsx     # Tests
│   │   └── index.ts            # Public API export
│   │
│   └── Input/
│       ├── Input.tsx
│       ├── Input.types.ts
│       └── index.ts
│
├── molecules/
│   └── FormField/
│       ├── FormField.tsx
│       ├── FormField.types.ts
│       ├── index.ts
│       └── components/          # Nested private components
│           └── FieldError/
│               ├── FieldError.tsx
│               └── index.ts
│
└── organisms/
    └── LoginForm/
        ├── LoginForm.tsx
        ├── LoginForm.types.ts
        ├── LoginForm.hooks.ts   # Custom hooks
        ├── LoginForm.utils.ts   # Utility functions
        ├── index.ts
        └── components/
            ├── LoginHeader/
            └── LoginFooter/
```

### **Export Pattern**

```typescript
// ❌ NEVER export directly from component file
export function Button() { ... }

// ✅ ALWAYS export through index.ts
// Button/Button.tsx
export function Button() { ... }

// Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button.types'
```

### **Import Pattern**

```typescript
// ✅ Import from folder (uses index.ts)
import { Button } from '@/components/atoms/Button'

// ❌ NEVER import directly from file
import { Button } from '@/components/atoms/Button/Button'
```

---

## 🏗️ Architecture Principles

### 1. **Atomic Design**

Components MUST follow atomic design hierarchy:

- **Atoms**: Basic building blocks (Button, Input, Label)
- **Molecules**: Simple combinations (FormField = Label + Input + Error)
- **Organisms**: Complex components (LoginForm, ServiceCard)
- **Templates**: Page layouts
- **Pages**: Route components

### 2. **Modular & Nested**

Break down complex components into smaller, nested modules:

```
ServiceCard/
├── ServiceCard.tsx              # Main component
├── ServiceCard.types.ts
├── index.ts
└── components/                  # Private nested components
    ├── ServiceHeader/
    │   ├── ServiceHeader.tsx
    │   └── index.ts
    ├── ServiceBody/
    │   ├── ServiceBody.tsx
    │   └── index.ts
    │   └── components/          # Even deeper nesting if needed
    │       └── ContributionRow/
    └── ServiceFooter/
```

**Rules:**

- If a component is used ONLY within a parent → nest it
- If a component is reusable → promote to atoms/molecules
- Maximum nesting depth: 3 levels

### 3. **Single Responsibility**

Each file should have ONE clear purpose:

```
Button/
├── Button.tsx          # Component logic ONLY
├── Button.types.ts     # Type definitions ONLY
├── Button.styles.ts    # Styles ONLY (if using CSS-in-JS)
├── Button.utils.ts     # Utility functions ONLY
├── Button.hooks.ts     # Custom hooks ONLY
└── Button.test.tsx     # Tests ONLY
```

---

## 📝 TypeScript Rules

### 1. **Explicit Types for Public APIs**

```typescript
// ✅ ALWAYS type function parameters and returns
export function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// ❌ NEVER rely on inference for public functions
export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}
```

### 2. **Strict Null Checks**

```typescript
// ✅ ALWAYS handle null/undefined
function getUser(id: string): User | null {
  const user = users.find((u) => u.id === id)
  return user ?? null
}

const user = getUser('123')
if (user) {
  console.log(user.name) // Safe
}
```

### 3. **Discriminated Unions**

```typescript
// ✅ Use discriminated unions for state
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: Error }

function render(state: LoadingState) {
  switch (state.status) {
    case 'idle': return <div>Click to load</div>
    case 'loading': return <div>Loading...</div>
    case 'success': return <div>{state.data.name}</div>
    case 'error': return <div>{state.error.message}</div>
  }
}
```

### 4. **Const Assertions**

```typescript
// ✅ Use const assertions for literal types
const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2',
} as const

type Color = (typeof COLORS)[keyof typeof COLORS]
```

### 5. **Types Organization - NO Mixed Concerns**

**NEVER** mix multiple entity types in one file. Each type should have its own file.

```
// ❌ NEVER - Mixed concerns in one file
// types.ts
export interface User { ... }
export interface Group { ... }
export interface Service { ... }

// ✅ ALWAYS - Separate files
types/
├── user.types.ts       # User, UserInsert, UserUpdate
├── group.types.ts      # Group, GroupInsert, GroupUpdate
├── service.types.ts    # Service, ServiceInsert, ServiceUpdate
└── index.ts            # Re-export all
```

**Example Structure:**

```typescript
// user.types.ts
export interface User {
  id: string
  email: string
  name: string | null
}

export interface UserInsert {
  id?: string
  email: string
  name?: string | null
}

export interface UserUpdate {
  id?: string
  email?: string
  name?: string | null
}

// group.types.ts
export interface Group {
  id: string
  name: string
  owner_id: string
}

export interface GroupInsert {
  id?: string
  name: string
  owner_id: string
}

export interface GroupUpdate {
  id?: string
  name?: string
  owner_id?: string
}

// index.ts - Central export
export type * from './user.types'
export type * from './group.types'
export type * from './service.types'
```

**Benefits:**

- ✅ Easy to find types
- ✅ No giant files
- ✅ Clear ownership
- ✅ Better git diffs
- ✅ Easier to maintain

**Rules:**

- One entity = One file
- Max 3 related types per file (Row, Insert, Update)
- Always re-export through index.ts
- Use `kebab-case` for multi-word files (e.g., `group-member.types.ts`)

### 6. **Strict Separation (Types, Constants, Utils)**

**NEVER** clutter component files with types, huge constants, or complex utility functions. Move them to separate files or folders.

#### **Types**

- **Global**: `src/types/[entity].types.ts` or `src/lib/supabase/types/[entity].types.ts`
- **Local**: `[Component]/[Component].types.ts`
- ❌ **NO** defining interfaces inside `.tsx` files (except minimal helpers)

#### **Constants**

- **Global**: `src/lib/constants/[category].ts` (e.g., `api.ts`, `regex.ts`)
- **Local**: `[Component]/[Component].constants.ts`
- ❌ **NO** magic strings/numbers scattered in code. Create a constant.

#### **Utils**

- **Global**: `src/lib/utils/[category]/[function].ts`
- **Local**: `[Component]/[Component].utils.ts`
- ❌ **NO** writing complex logic helpers inside the component body. Extract them.

---

### 7. **Route/Page Separation**

**ROUTES (src/routes/)**:

- ONLY responsible for routing definitions, loaders, and meta tags.
- ❌ **NO** UI logic, state management, or complex rendering.
- ✅ **ALWAYS** import page component from `src/components/pages/`

**PAGES (src/components/pages/)**:

- Contain the actual page UI and logic.
- Implements the feature using organisms/templates.

---

## 🎨 Component Rules

### 1. **Props Interface**

```typescript
// ✅ ALWAYS define props interface in .types.ts
// Button.types.ts
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  disabled?: boolean
}

// Button.tsx
import type { ButtonProps } from './Button.types'

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  // ...
}
```

### 2. **No Default Exports**

```typescript
// ❌ NEVER use default export
export default function Button() { ... }

// ✅ ALWAYS use named export
export function Button() { ... }
```

### 3. **Hooks Separation**

```typescript
// ✅ Extract complex logic to custom hooks
// LoginForm.hooks.ts
export function useLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    // validation logic
  }

  return { email, setEmail, password, setPassword, errors, validate }
}

// LoginForm.tsx
export function LoginForm() {
  const form = useLoginForm()
  // ...
}
```

---

## 🗂️ Store Organization

### **TanStack Store Pattern**

```
stores/
├── collaborative/          # Yjs-backed stores
│   ├── services/
│   │   ├── services.store.ts
│   │   ├── services.types.ts
│   │   ├── services.actions.ts
│   │   └── index.ts
│   └── people/
│
├── local/                  # TanStack Store
│   ├── ui/
│   │   ├── ui.store.ts
│   │   ├── ui.types.ts
│   │   ├── ui.selectors.ts
│   │   ├── ui.actions.ts
│   │   └── index.ts
│   └── forms/
│
└── presence/               # Awareness
    └── awareness/
```

**Store File Structure:**

```typescript
// ui.types.ts
export interface UIState {
  isModalOpen: boolean
  focusedId: string | null
}

// ui.store.ts
import { Store } from '@tanstack/store'
import type { UIState } from './ui.types'

export const uiStore = new Store<UIState>({
  isModalOpen: false,
  focusedId: null,
})

// ui.selectors.ts
export const useIsModalOpen = () => uiStore.useSelector((s) => s.isModalOpen)

// ui.actions.ts
export const openModal = () => {
  uiStore.setState({ isModalOpen: true })
}

// index.ts
export { uiStore } from './ui.store'
export * from './ui.selectors'
export * from './ui.actions'
export type * from './ui.types'
```

---

## 🔧 Utility Functions

### **Organization**

```
lib/
├── utils/
│   ├── string/
│   │   ├── capitalize.ts
│   │   ├── truncate.ts
│   │   └── index.ts
│   ├── number/
│   │   ├── formatCurrency.ts
│   │   ├── round.ts
│   │   └── index.ts
│   └── date/
│
└── validation/
    ├── email.ts
    ├── password.ts
    └── index.ts
```

### **Type-Safe Utilities**

```typescript
// ✅ ALWAYS type utilities strictly
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

// ✅ Use generics when appropriate
export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce(
    (acc, item) => {
      const group = String(item[key])
      acc[group] = acc[group] ?? []
      acc[group].push(item)
      return acc
    },
    {} as Record<string, T[]>
  )
}
```

---

## 🧪 Testing Rules

### **Test File Structure**

```
Button/
├── Button.tsx
├── Button.types.ts
├── Button.test.tsx         # Component tests
└── __tests__/              # Additional test files
    ├── Button.a11y.test.tsx
    └── Button.integration.test.tsx
```

### **Test Naming**

```typescript
// ✅ Descriptive test names
describe('Button', () => {
  it('should render children correctly', () => {})
  it('should call onClick when clicked', () => {})
  it('should be disabled when disabled prop is true', () => {})
})
```

---

## 📋 Naming Conventions

### **Files**

- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Types: `PascalCase.types.ts` (e.g., `Button.types.ts`)
- Hooks: `camelCase.hooks.ts` (e.g., `useAuth.hooks.ts`)
- Utils: `camelCase.ts` (e.g., `formatCurrency.ts`)
- Stores: `camelCase.store.ts` (e.g., `ui.store.ts`)

### **Variables**

- Components: `PascalCase` (e.g., `Button`, `LoginForm`)
- Functions: `camelCase` (e.g., `formatCurrency`, `validateEmail`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_LENGTH`, `API_URL`)
- Types/Interfaces: `PascalCase` (e.g., `User`, `ButtonProps`)

### **Prefixes**

- Hooks: `use` (e.g., `useAuth`, `useForm`)
- Type guards: `is` (e.g., `isUser`, `isError`)
- Boolean props: `is`, `has`, `should` (e.g., `isOpen`, `hasError`, `shouldShow`)

---

## 🚀 Performance Rules

### 1. **Memoization**

```typescript
// ✅ Memo expensive components
export const ExpensiveComponent = React.memo(function ExpensiveComponent(props: Props) {
  // ...
})

// ✅ useMemo for expensive calculations
const sortedItems = useMemo(() => items.sort((a, b) => a.price - b.price), [items])

// ✅ useCallback for event handlers passed to children
const handleClick = useCallback(() => {
  // ...
}, [dependencies])
```

### 2. **Code Splitting**

```typescript
// ✅ Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

---

## ✅ Code Review Checklist

Before submitting code, verify:

- [ ] No `any` types
- [ ] No ESLint disable comments
- [ ] No type assertions (casting)
- [ ] All components are folders with index.ts
- [ ] Proper atomic design hierarchy
- [ ] Nested components for complex UI
- [ ] Explicit types for public APIs
- [ ] Null/undefined handled properly
- [ ] Named exports only
- [ ] Tests included
- [ ] No console.log (use console.warn/error)

---

## 🎯 Summary

**Core Principles:**

1. **Type Safety First** - No escape hatches
2. **Modular Architecture** - Folders, not files
3. **Atomic Design** - Clear component hierarchy
4. **Explicit Over Implicit** - Types, exports, imports
5. **Single Responsibility** - One purpose per file

**Remember:** If you need to disable ESLint or use `any`, you're doing it wrong. Fix the root cause.
