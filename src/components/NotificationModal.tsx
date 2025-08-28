import React from 'react';
import { Clock } from 'lucide-react';
import { useNotification } from '../controllers/useNotiProviderController';

const NotificationModal: React.FC = () => {
  const { selectedNotification, showModal, handleCloseModal, handleModalBackdropClick } = useNotification();

  if (!showModal || !selectedNotification) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center"
      onClick={handleModalBackdropClick}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#26667F] text-white rounded-t-xl">
          <h3 className="text-lg font-semibold">Chi tiết thông báo</h3>
          <button
            onClick={handleCloseModal}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {/* Notification Type Badge */}
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedNotification.read 
                  ? 'bg-gray-100 text-gray-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {selectedNotification.type === 'test_result' && 'Kết quả xét nghiệm'}
                {selectedNotification.type === 'appointment' && 'Lịch hẹn'}
                {selectedNotification.type === 'uv_warning' && 'Cảnh báo UV'}
                {selectedNotification.type === 'medicine' && 'Thuốc'}
                {selectedNotification.type === 'reminder' && 'Nhắc nhở'}
                {selectedNotification.type === 'biopsy' && 'Sinh thiết'}
                {selectedNotification.type === 'treatment' && 'Điều trị'}
                {selectedNotification.type === 'insurance' && 'Bảo hiểm'}
                {selectedNotification.type === 'medication' && 'Thuốc'}
                {selectedNotification.type === 'followup' && 'Tái khám'}
                {selectedNotification.type === 'emergency' && 'Cấp cứu'}
                {selectedNotification.type === 'vaccination' && 'Tiêm chủng'}
                {selectedNotification.type === 'consultation' && 'Tư vấn'}
                {selectedNotification.type === 'prescription' && 'Đơn thuốc'}
                {selectedNotification.type === 'lab_result' && 'Kết quả xét nghiệm'}
              </span>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {selectedNotification.time}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900">
              {selectedNotification.title}
            </h2>

            {/* Message */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                {selectedNotification.message}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  selectedNotification.read ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <span className="text-sm text-gray-600">
                  {selectedNotification.read ? 'Đã đọc' : 'Chưa đọc'}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ID: {selectedNotification.id}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleCloseModal}
            className="w-full bg-[#26667F] text-white py-3 px-4 rounded-lg hover:bg-[#1e4f63] transition-colors font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
