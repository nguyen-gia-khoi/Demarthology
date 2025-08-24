import React from 'react';

const Footer:React.FC=()=>{
    return(
        <footer className="bg-[#145566] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">AILUSION</div>
              <div className="text-sm mb-4">Dermatology Smart Diagnosis</div>
              <p className="text-gray-300 text-justify">
              Chúng tôi là hệ thống chẩn đoán da liễu tiên tiến, ứng dụng công nghệ đa mô hình AI (Multiple Models) kết hợp với RAG (Retrieval-Augmented Generation) nhằm mang đến khả năng phân tích chính xác, hỗ trợ bác sĩ và người dùng trong việc nhận diện và theo dõi bệnh lý da liễu một cách toàn diện, hiện đại và hiệu quả.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-300 hover:text-white transition-colors">Trang chủ</a>
                <a href="#about" className="block text-gray-300 hover:text-white transition-colors">Giới thiệu</a>
                <a href="#services" className="block text-gray-300 hover:text-white transition-colors">Dịch vụ</a>
                <a href="#diagnosis" className="block text-gray-300 hover:text-white transition-colors">Chẩn đoán</a>
                <a href="#contact" className="block text-gray-300 hover:text-white transition-colors">Liên hệ</a>
                <a href="#privacy" className="block text-gray-300 hover:text-white transition-colors">Bảo mật</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
              <div className="space-y-2 text-gray-300">
                <p>Điện thoại: 0868322170</p>
                <p>Email: phamthianhthu6023789@gmail.com</p>
                <p>Địa chỉ: 123 Đường ABC, Quận 7, TP.HCM</p>
              </div>
              <div className="mt-6">
                <p className="text-gray-300 mb-3">Theo dõi chúng tôi</p>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-sm">📘</span>
                  </div>
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-sm">📱</span>
                  </div>
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-sm">📧</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>© 2025 AI Dermatology. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    )
}
export default Footer;