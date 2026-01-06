# Real-time Collaboration Optimization Plan (PartyKit + Yjs)

This document outlines the roadmap for enhancing the real-time synchronization performance, scalability, and UX of the **Chia Tiền** application.

## 1. Data Architecture: From Flat to Nested
Currently, we use a single flat `Y.Map` where each key is an `expenseId` and the value is a plain JavaScript object.

### Problem:
- Updating a single character in the expense name requires re-syncing the entire expense object.
- High bandwidth usage for small updates.
- Inefficient diffing for Yjs.

### Proposed Solution:
Use **Nested Y.Maps**. Each `expenseId` will point to its own `Y.Map`.
```typescript
// Current
sharedMap.set(expenseId, { name: 'New Name', cost: 100, ... })

// Optimized
const expenseMap = sharedMap.get(expenseId) as Y.Map<any>;
expenseMap.set('name', 'New Name'); // Only syncs the name field
```

## 2. Event Performance: Intelligent Observability
Currently, we use `sharedMap.observe` which triggers `sharedMap.toJSON()` on every change.

### Problem:
- `toJSON()` is computationally expensive for large datasets.
- Every user's browser re-renders the entire list even if a hidden expense changed.

### Proposed Solution:
- **Granular Updates**: Use `observeDeep` to detect which specific key changed.
- **Component-Level Subscription**: Allow `ExpenseCard` to subscribe directly to its specific `Y.Map` instead of the parent component re-rendering everything.

## 3. UI/UX: Presence & Engagement
Enhance the awareness system to make the app feel "alive".

### Proposed Features:
- **"Is Typing..." Indicator**: Show who is currently editing which expense.
- **Micro-cursors**: Show small colored indicators on specific fields (name, cost) that other users are focusing on.
- **Optimistic Locking UI**: Subtly dim an input field if another user is already editing it to prevent merge conflicts (though Yjs handles conflicts, this improves UX).

## 4. Stability & Efficiency
### Debouncing High-Frequency Updates:
- Implement a 100ms debounce for text inputs in the `AdvancedServiceModal`.
- This prevents "over-syncing" during rapid typing, saving battery on mobile devices and reducing server load.

### Memoization Strategy:
- Move data merge logic (`getMergedExpense`) into a dedicated selector or memoized hook at the card level.
- Ensure `React.memo` is actually skipping renders by using stable object references for collaborative state.

## 5. Implementation Stages
1. **Phase 1 (Small Wins)**: Debounce modal updates and optimize `usePresence` hook dependencies.
2. **Phase 2 (Architecture)**: Migrate from Flat Map to Nested Maps.
3. **Phase 3 (UX)**: Implement "Is Typing..." and Focus indicators.
4. **Phase 4 (Scale)**: Move to a subscription-based state management (e.g., using TanStack Store more deeply).
