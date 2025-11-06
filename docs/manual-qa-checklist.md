# Manual QA - Money Calc Flows

## Chuẩn bị
- `pnpm install`
- `pnpm dev`
- Mở trình duyệt ở `http://localhost:5173/chia-tien`

## 1. Thêm người tham gia
1. Nhập tên "An" → Enter
2. Nhập tên "Bình" → Enter
3. Kỳ vọng
   - Danh sách người hiển thị đủ hai người, tên không rỗng
   - Nút `×` xoá hoạt động, hover có cursor pointer

## 2. Thêm dịch vụ
1. Bấm `+ Thêm dịch vụ`
2. Nhập tên "Taxi sân bay", tổng chi phí `300000`
3. Chọn người góp: tick cả An và Bình
4. Kỳ vọng
   - Chi phí chia đều hiển thị `150000`
   - Badge "Chia đều" hiển thị khi bật tính năng

## 3. Chỉnh sửa chi phí tổng
1. Đổi tổng chi phí dịch vụ thành `500000`
2. Kỳ vọng
   - Giá trị đóng góp cập nhật về `250000`
   - `Kết quả chia tiền` hiển thị tổng nợ đúng 500000

## 4. Chia đều / Chọn tất cả
1. Bật / tắt nút `Chia đều` hai lần
2. Kỳ vọng
   - Khi bật: mọi participant được tick, chi phí chia đều
   - Khi tắt: chỉ giữ những người được tick trước đó

## 5. Kết quả chia tiền
1. Mở sheet `Kết quả`
2. Kỳ vọng
   - Tổng chi trả của từng người chính xác
   - Danh sách giao dịch không âm và luôn cân bằng

## 6. Kiểm thử mobile (360px)
1. Dùng devtools mobile
2. Kiểm tra `Mobile action bar`
3. Kỳ vọng
   - Không có nút `Thêm dịch vụ` thừa giữa hai section
   - Nút `Thêm dịch vụ` và `Kết quả` hoạt động

## 7. Reset dữ liệu
1. Thêm vài dịch vụ và người ⇒ `Reset` (nếu có)
2. Kỳ vọng: toàn bộ store về trạng thái ban đầu, toast lỗi (nếu có) hiển thị đúng theme

