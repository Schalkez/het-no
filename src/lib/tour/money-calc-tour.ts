import { browser } from '$app/environment';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const BUTTON_TEXT = {
  nextBtnText: 'Tiếp tục',
  prevBtnText: 'Quay lại',
  closeBtnText: 'Đóng',
  doneBtnText: 'Hoàn tất'
};

export const startMoneyCalcTour = () => {
  if (!browser) {
    return;
  }

  const tour = driver({
    showProgress: true,
    allowClose: true,
    animate: true,
    stagePadding: 6,
    overlayBlur: 2,
    steps: [
      {
        element: '[data-tour="add-people"]',
        popover: {
          title: 'Thêm người tham gia',
          description: 'Nhập tên từng thành viên trong nhóm tại đây. Có thể nhấn Enter để lưu nhanh.',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '[data-tour="add-service"]',
        popover: {
          title: 'Ghi dịch vụ/khoản chi',
          description: 'Đặt tên khoản chi, nhập số tiền và tick người sử dụng. Bạn cũng có thể chia đều.',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '[data-tour="service-list"]',
        popover: {
          title: 'Quản lý danh sách dịch vụ',
          description: 'Theo dõi ai dùng, số tiền đã trả và số tiền còn thiếu. Có thể mở chi tiết từng dịch vụ.',
          side: 'top',
          align: 'center'
        }
      },
      {
        element: '[data-tour="result"]',
        popover: {
          title: 'Xem kết quả chia tiền',
          description: 'Hệ thống tự động tính toán ai cần trả thêm và ai được nhận lại.',
          side: 'top',
          align: 'center'
        }
      }
    ],
    ...BUTTON_TEXT
  });

  tour.drive();
};

