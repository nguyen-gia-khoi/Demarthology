export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'test_result' | 'appointment' | 'uv_warning' | 'medicine' | 'reminder' | 'biopsy' | 'treatment' | 'insurance' | 'medication' | 'followup' | 'emergency' | 'vaccination' | 'consultation' | 'prescription' | 'lab_result';
}

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Kết quả xét nghiệm đã có",
    message: "Kết quả xét nghiệm máu của bạn đã sẵn sàng",
    time: "2 phút trước",
    read: false,
    type: "test_result"
  },
  {
    id: 2,
    title: "Lịch hẹn tới hạn",
    message: "Bạn có lịch hẹn với bác sĩ vào ngày mai",
    time: "1 giờ trước",
    read: false,
    type: "appointment"
  },
  {
    id: 3,
    title: "Cảnh báo UV",
    message: "Chỉ số UV hôm nay cao, hãy bảo vệ da",
    time: "3 giờ trước",
    read: true,
    type: "uv_warning"
  },
  {
    id: 4,
    title: "Cập nhật thuốc",
    message: "Đã cập nhật thông tin thuốc mới",
    time: "1 ngày trước",
    read: true,
    type: "medicine"
  },
  {
    id: 5,
    title: "Nhắc nhở khám bệnh",
    message: "Bạn có lịch khám định kỳ vào tuần tới",
    time: "2 ngày trước",
    read: false,
    type: "reminder"
  },
  {
    id: 6,
    title: "Kết quả sinh thiết",
    message: "Kết quả sinh thiết da đã có sẵn",
    time: "3 ngày trước",
    read: true,
    type: "biopsy"
  },
  {
    id: 7,
    title: "Cập nhật điều trị",
    message: "Phác đồ điều trị đã được điều chỉnh",
    time: "4 ngày trước",
    read: false,
    type: "treatment"
  },
  {
    id: 8,
    title: "Thông báo bảo hiểm",
    message: "Yêu cầu bảo hiểm đã được phê duyệt",
    time: "5 ngày trước",
    read: true,
    type: "insurance"
  },
  {
    id: 9,
    title: "Nhắc nhở uống thuốc",
    message: "Đã đến giờ uống thuốc theo toa",
    time: "6 ngày trước",
    read: false,
    type: "medication"
  },
  {
    id: 10,
    title: "Lịch tái khám",
    message: "Lịch tái khám đã được sắp xếp",
    time: "1 tuần trước",
    read: true,
    type: "followup"
  },
  {
    id: 11,
    title: "Khám cấp cứu",
    message: "Bạn đã được đặt lịch khám cấp cứu",
    time: "1 tuần trước",
    read: false,
    type: "emergency"
  },
  {
    id: 12,
    title: "Tiêm chủng",
    message: "Đã đến lịch tiêm chủng định kỳ",
    time: "1 tuần trước",
    read: true,
    type: "vaccination"
  },
  {
    id: 13,
    title: "Tư vấn trực tuyến",
    message: "Bác sĩ đã sẵn sàng cho cuộc tư vấn trực tuyến",
    time: "1 tuần trước",
    read: false,
    type: "consultation"
  },
  {
    id: 14,
    title: "Đơn thuốc mới",
    message: "Đơn thuốc mới đã được kê",
    time: "2 tuần trước",
    read: true,
    type: "prescription"
  },
  {
    id: 15,
    title: "Kết quả xét nghiệm nước tiểu",
    message: "Kết quả xét nghiệm nước tiểu đã có",
    time: "2 tuần trước",
    read: false,
    type: "lab_result"
  },
  {
    id: 16,
    title: "Kiểm tra huyết áp",
    message: "Nhắc nhở kiểm tra huyết áp định kỳ",
    time: "2 tuần trước",
    read: true,
    type: "reminder"
  },
  {
    id: 17,
    title: "Cập nhật thông tin cá nhân",
    message: "Vui lòng cập nhật thông tin cá nhân",
    time: "3 tuần trước",
    read: false,
    type: "reminder"
  },
  {
    id: 18,
    title: "Kết quả chụp X-quang",
    message: "Kết quả chụp X-quang phổi đã có",
    time: "3 tuần trước",
    read: true,
    type: "lab_result"
  },
  {
    id: 19,
    title: "Đổi lịch hẹn",
    message: "Lịch hẹn của bạn đã được thay đổi",
    time: "3 tuần trước",
    read: false,
    type: "appointment"
  },
  {
    id: 20,
    title: "Nhắc nhở tái khám",
    message: "Đã đến lịch tái khám sau điều trị",
    time: "1 tháng trước",
    read: true,
    type: "followup"
  }
];

// Helper function to get notifications with pagination
export const getNotificationsWithPagination = (page: number, pageSize: number = 5): Notification[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return mockNotifications.slice(startIndex, endIndex);
};

// Helper function to check if there are more notifications
export const hasMoreNotifications = (currentPage: number, pageSize: number = 5): boolean => {
  const startIndex = (currentPage - 1) * pageSize;
  return startIndex + pageSize < mockNotifications.length;
};

// Helper function to get total count
export const getTotalNotificationsCount = (): number => {
  return mockNotifications.length;
};
