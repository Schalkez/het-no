# i18n Migration Checklist

Goal: Replace all hardcoded texts with `t('key')` to support multi-language (VI, EN, JA, KO, TH).

## Status

- [x] Initial Setup (`i18n.ts`, `react-i18next`)
- [x] `GuestHeader.tsx` (Login, Language Selector)
- [x] `GuestCalculator.tsx` (Hero Text, Toolbar Buttons)

## Components to Migrate

### Atoms/Molecules

- [ ] `src/components/molecules/ConfirmDialog/ConfirmDialog.tsx`
  - Title, Message, Buttons ("Xác nhận", "Hủy")
- [ ] `src/components/molecules/ServiceCard/ServiceCard.tsx`
  - Labels: "Người trả", "Chia cho", "Tất cả", "Chưa chọn", "Không có"

### Organisms

- [ ] `src/components/organisms/PeopleChips/PeopleChips.tsx`
  - Label: "Thành viên nhóm"
- [ ] `src/components/organisms/AddPersonModal/AddPersonModal.tsx`
  - Title: "Thêm thành viên"
  - Description: "Nhập tên thành viên mới..."
  - Input Label: "Tên thành viên"
  - Button: "Thêm người"
- [ ] `src/components/organisms/EditPersonModal/EditPersonModal.tsx`
  - Title: "Sửa tên thành viên"
  - Buttons: "Lưu thay đổi", "Huỷ"
- [ ] `src/components/organisms/AdvancedServiceModal/AdvancedServiceModal.tsx`
  - **Step 1 (Info)**: "Thông tin dịch vụ", "Tên dịch vụ", "Số tiền"
  - **Step 2 (Payer)**: "Ai đã trả tiền?", "Thêm người trả", "phần còn lại"
  - **Step 3 (Split)**: "Chia cho ai?", "Bằng nhau", "Chính xác", "Phần trăm", "Chọn tất cả"
- [ ] `src/components/organisms/SettlementModal/SettlementModal.tsx`
  - Title: "Phương án thanh toán"
  - Actions: "Sao chép", "Đã chốt"
- [ ] `src/components/organisms/LoginModal/LoginModal.tsx`
  - Title: "Đăng nhập"
  - Form fields & Buttons
- [ ] `src/components/organisms/GuestBottomPanel/GuestBottomPanel.tsx`
  - Labels: "Tổng chi tiêu", "Chi tiết"

## Locales to Update

For every new key added, update all 5 locale files:

- [ ] `src/locales/vi.ts`
- [ ] `src/locales/en.ts`
- [ ] `src/locales/ja.ts`
- [ ] `src/locales/ko.ts`
- [ ] `src/locales/th.ts`
