# UX Review – Money Calc (Svelte Migration)

_Cập nhật: 2025-11-05_

## 1. Mục tiêu người dùng

- **Hoàn cảnh**: Nhập danh sách người, dịch vụ, số tiền – nhận được kết quả chia tiền công bằng và gợi ý thanh toán.
- **Tần suất**: Ngắn hạn, dùng trong bối cảnh nhóm (đi chơi, đi ăn, du lịch) – cần thao tác nhanh trên mobile.
- **Kỳ vọng**: Luồng rõ ràng, phản hồi tức thì, giao diện nhẹ nhàng, dễ hiểu lần đầu.

## 2. Pain Point hiện tại

| Khu vực               | Pain point                                                                                                         | Mức độ    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | --------- |
| Onboarding            | Người mới mở ứng dụng không biết bắt đầu từ đâu, thiếu mô tả ngắn / hero                                           | ⚠️ Medium |
| Thêm dịch vụ (mobile) | Nút `+ Thêm dịch vụ` ẩn trong card danh sách, dễ trượt khi danh sách dài; bottom sheet chưa có hướng dẫn quick tip | ⚠️ High   |
| Quản lý danh sách dài | Service list/Result list kéo dài khiến người dùng khó quét – thiếu grouping, search/filter                         | ⚠️ Medium |
| Feedback              | Khi reset/ thêm hàng loạt không có xác nhận/loading; toast lỗi đỏ khá gắt, chưa thân thiện                         | ⚠️ Medium |
| Thẩm mỹ               | Spacing, shadow, icon chưa đồng bộ; thiếu visual weight cho CTA chính                                              | ⚠️ Low    |

## 3. Nguyên tắc cải tiến

1. **Visible First Step** – luôn hiển thị rõ “Bắt đầu thêm người/dịch vụ” ngay cả với user mới.
2. **Mobile-first Action** – nút hành động chính luôn nằm trong vùng ngón tay, không lệ thuộc scroll.
3. **Progressive Disclosure** – chỉ hiển thị thông tin cần thiết, cho phép mở rộng khi cần.
4. **Friendly Feedback** – thông báo, loading, confirm nhẹ nhàng, có icon minh họa.

## 4. Đề xuất

### 4.1 Onboarding / Empty State (TODO #17)

- Thêm section hero nhỏ phía trên grid (title, mô tả 1–2 dòng, mini illustration).
- Nếu chưa có người/dịch vụ: hiển thị card hướng dẫn, nút “Bắt đầu thêm người”.
- Tooltip hoặc checklist 3 bước (Thêm người → Thêm dịch vụ → Xem kết quả).

### 4.2 Mobile Action (TODO #18)

- Nút `+ Thêm dịch vụ` dạng Floating Action Button (FAB) ở góc phải dưới, mở bottom sheet.
- Bottom sheet thêm header phụ: input name + cost sắp xếp theo flow, hiển thị gợi ý.
- Bổ sung quick actions: chia đều/ clone dịch vụ.

### 4.3 Quản lý danh sách dài (TODO #19)

- Service list: chia nhóm theo trạng thái (đã tick tất cả / chưa tick), hoặc accordion cho từng service.
- Bổ sung filter/search (multi-chọn theo người).
- Result area: sticky header “Tổng kết” + accordion chi tiết thanh toán.

### 4.4 Feedback & State (TODO #20)

- Khi reset: confirm modal “Bạn chắc chắn muốn làm mới?”.
- Khi xử lý dài (ví dụ import danh sách): show spinner hoặc skeleton.
- Toast: chuyển sang tone xanh/amber thân thiện, thêm icon.

### 4.5 UI Polish (TODO #21)

- Đồng bộ shadow, border radius theo design token (ví dụ radius-lg = 16px).
- Dùng icon hệ thống (phù hợp với Saira) cho các hành động.
- Thêm background gradient nhẹ cho header, highlight CTA chính với color primary.

## 5. Next step

1. Ưu tiên high-impact: thay đổi nút hành động mobile (TODO #18) kết hợp onboarding (TODO #17).
2. Sau đó tinh chỉnh danh sách dài (TODO #19) và feedback (TODO #20).
3. Kết thúc bằng polish thẩm mỹ tổng thể (TODO #21).

Sau mỗi hạng mục, chạy kiểm thử nhanh (manual checklist tại TODO #14).
