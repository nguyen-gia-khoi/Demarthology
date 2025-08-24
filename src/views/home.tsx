import React, { useState } from 'react';

const HomeView: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState(0);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 backdrop-blur-md bg-white/80 border-b border-white/20 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#145566] to-[#145569] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">AI</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#145566] to-[#145569] bg-clip-text text-transparent">
              Dermatology
            </h1>
            <p className="text-xs text-gray-500">Smart Diagnosis</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-8">
          {['Trang chủ', 'Giới thiệu', 'Chẩn đoán', 'Liên hệ'].map((item, index) => (
            <a 
              key={index}
              href={`#${item.toLowerCase().replace(' ', '')}`} 
              className="text-gray-700 hover:text-[#145566] transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#145566] to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        
        <button className="bg-gradient-to-r from-[#145566] to-[#145569] text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
          Bắt đầu chẩn đoán
        </button>
      </div>
      </header>

      {/* Hero Section with Enhanced Video Background */}
      <section id="home" className="relative w-full h-screen overflow-hidden">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="v1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
       <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center">
         <div className="text-center text-white px-4">
           <h1 className="text-4xl md:text-6xl font-bold mb-4">Chẩn Đoán Da Liễu AI</h1>
           <p className="text-lg md:text-2xl mb-8">Chăm sóc sức khỏe thông minh, giải pháp nhanh chóng</p>
           <button className="bg-[#145566] text-white px-6 py-3 rounded-lg hover:bg-[#0f3f44]">
             Bắt đầu chẩn đoán
           </button>
         </div>
       </div>
    </section>

       <section id="about" className="py-20 bg-white">
         <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-16 items-center">
             <div className="relative">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                   <div className="bg-gray-200 h-64 rounded-lg">
                    <img src="image2.jpg" alt="about" className="w-full h-full object-cover" />
                   </div>
                   <div className="bg-gray-300 h-32 rounded-lg">
                   <img src="image3.jpg" alt="about" className="w-full h-full object-cover" />
                   </div>
                 </div>
                 <div className="space-y-4 pt-8">
                   <div className="bg-gray-300 h-32 rounded-lg">
                   <img src="image4.png" alt="about" className="w-full h-full object-cover" />
                   </div>
                   <div className="bg-gray-200 h-64 rounded-lg">
                   <img src="image5.webp" alt="about" className="w-full h-full object-cover" />
                   </div>
                 </div>
               </div>
               <div className="absolute bottom-4 left-4 bg-[#145566] text-white p-4 rounded-lg">
                 <div className="text-2xl font-bold">AI</div>
                 <div className="text-sm">Dermatology</div>
               </div>
             </div>
             
             <div>
               <p className="text-[#145566] font-semibold mb-2">Giải pháp chẩn đoán thông minh</p>
               <h2 className="text-4xl font-bold text-gray-800 mb-6">CHẨN ĐOÁN DA LIỄU BẰNG AI TIÊN TIẾN</h2>
               <p className="text-gray-600 mb-8">
                 Hệ thống AI của chúng tôi sử dụng công nghệ machine learning tiên tiến để phân tích 
                 hình ảnh da và đưa ra chẩn đoán chính xác với độ tin cậy cao.
               </p>
               
               <div className="grid md:grid-cols-2 gap-6 mb-8">
                 <div className="flex items-center space-x-3">
                   <div className="w-6 h-6 bg-[#145566] rounded-full flex items-center justify-center">
                     <span className="text-white text-sm">✓</span>
                   </div>
                   <span className="text-gray-700">Chẩn đoán 24/7</span>
                 </div>
                 <div className="flex items-center space-x-3">
                   <div className="w-6 h-6 bg-[#145566] rounded-full flex items-center justify-center">
                     <span className="text-white text-sm">✓</span>
                   </div>
                   <span className="text-gray-700">Độ chính xác 95%</span>
                 </div>
                 <div className="flex items-center space-x-3">
                   <div className="w-6 h-6 bg-[#145566] rounded-full flex items-center justify-center">
                     <span className="text-white text-sm">✓</span>
                   </div>
                   <span className="text-gray-700">Kết quả tức thì</span>
                 </div>
                 <div className="flex items-center space-x-3">
                   <div className="w-6 h-6 bg-[#145566] rounded-full flex items-center justify-center">
                     <span className="text-white text-sm">✓</span>
                   </div>
                   <span className="text-gray-700">Tư vấn chuyên gia</span>
                 </div>
                 <div className="flex items-center space-x-3">
                   <div className="w-6 h-6 bg-[#145566] rounded-full flex items-center justify-center">
                     <span className="text-white text-sm">✓</span>
                   </div>
                   <span className="text-gray-700">Bảo mật thông tin</span>
                 </div>
                 <div className="flex items-center space-x-3">
                   <div className="w-6 h-6 bg-[#145566] rounded-full flex items-center justify-center">
                     <span className="text-white text-sm">✓</span>
                   </div>
                   <span className="text-gray-700">Theo dõi tiến trình</span>
                 </div>
               </div>
               
               <div className="flex items-center space-x-4 mb-8">
                 <div className="text-3xl font-bold text-[#145566]">10,000+</div>
                 <div className="text-gray-600">Bệnh nhân đã được chẩn đoán</div>
               </div>
               
               <button className="bg-[#145566] text-white px-6 py-3 rounded-lg hover:bg-[#0f3f44]">
                 Tìm hiểu thêm
               </button>
             </div>
           </div>
         </div>
       </section>

             {/* Diagnosis Section */}
       <section id="diagnosis" className="py-20 bg-gray-50">
         <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <p className="text-[#145566] font-semibold mb-2">Chẩn đoán nhanh chóng</p>
             <h2 className="text-4xl font-bold text-gray-800">BẮT ĐẦU CHẨN ĐOÁN NGAY</h2>
           </div>
           
           <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
             <div className="grid md:grid-cols-2 gap-8">
               <div className="text-center">
                 <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                   <span className="text-6xl">📷</span>
                 </div>
                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Tải ảnh lên</h3>
                 <p className="text-gray-600 mb-6">
                   Chụp ảnh hoặc tải ảnh vùng da cần chẩn đoán. Hệ thống sẽ phân tích và đưa ra kết quả chính xác.
                 </p>
                 <button className="bg-[#145566] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                   Chọn ảnh
                 </button>
               </div>
               
               <div className="text-center">
                 <div className="w-32 h-32 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                   <span className="text-6xl">🔍</span>
                 </div>
                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Kết quả chẩn đoán</h3>
                 <p className="text-gray-600 mb-6">
                   Nhận kết quả chẩn đoán chi tiết với độ chính xác cao và khuyến nghị điều trị phù hợp.
                 </p>
                 <div className="bg-gray-100 p-4 rounded-lg">
                   <p className="text-sm text-gray-600">Kết quả sẽ hiển thị ở đây sau khi phân tích</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

             {/* Services Section */}
       <section id="services" className="py-20 bg-white">
         <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <p className="text-[#145566] font-semibold mb-2">Dịch vụ của chúng tôi</p>
             <h2 className="text-4xl font-bold text-gray-800">CÁC DỊCH VỤ CHẨN ĐOÁN</h2>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
             {[
               { title: "Chẩn đoán mụn", icon: "🫘", desc: "Phân tích và chẩn đoán các loại mụn khác nhau" },
               { title: "Chẩn đoán nấm da", icon: "🍄", desc: "Nhận diện các bệnh nấm da phổ biến" },
               { title: "Chẩn đoán ung thư da", icon: "⚠️", desc: "Phát hiện sớm các dấu hiệu ung thư da" },
               { title: "Chẩn đoán dị ứng", icon: "🤧", desc: "Xác định các phản ứng dị ứng trên da" },
               { title: "Theo dõi tiến trình", icon: "📊", desc: "Theo dõi quá trình điều trị và phục hồi" },
               { title: "Tư vấn chuyên gia", icon: "👨‍⚕️", desc: "Kết nối với bác sĩ da liễu chuyên môn" }
             ].map((service, index) => (
               <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border border-gray-100">
                 <div className="text-4xl mb-4">{service.icon}</div>
                 <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                 <p className="text-gray-600">{service.desc}</p>
               </div>
             ))}
           </div>
         </div>
       </section>

             {/* CTA Banner */}
       <section className="py-16 bg-gradient-to-r from-[#145566] to-[#145566]">
         <div className="container mx-auto px-4 text-center">
           <div className="flex flex-col md:flex-row items-center justify-between">
             <h3 className="text-3xl font-bold text-white mb-4 md:mb-0">
              Hãy chẩn đoán ngay
             </h3>
             <button className="bg-white text-[#145566] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
               Chẩn đoán da liễu
             </button>
           </div>
         </div>
       </section>

             {/* Team Section */}
       <section className="py-20 bg-gray-50">
         <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <p className="text-[#145566] font-semibold mb-2">Đội ngũ chuyên gia</p>
             <h2 className="text-4xl font-bold text-gray-800">BÁC SĨ CHUYÊN MÔN</h2>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
             {[
               { name: "BS. Nguyễn Văn An", title: "Trưởng khoa Da liễu", image: "👨‍⚕️", experience: "15 năm kinh nghiệm" },
               { name: "BS. Trần Thị Bình", title: "Chuyên gia AI Y tế", image: "👩‍⚕️", experience: "10 năm kinh nghiệm" },
               { name: "BS. Lê Văn Cường", title: "Bác sĩ Da liễu", image: "👨‍⚕️", experience: "8 năm kinh nghiệm" }
             ].map((member, index) => (
               <div key={index} className="text-center bg-white p-6 rounded-lg shadow-lg">
                 <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                   {member.image}
                 </div>
                 <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                 <p className="text-[#145566] font-semibold mb-2">{member.title}</p>
                 <p className="text-gray-600 mb-4">{member.experience}</p>
                 <div className="flex justify-center space-x-3">
                   <div className="w-8 h-8 bg-[#145566] rounded-full flex items-center justify-center">
                     <span className="text-white text-sm">📧</span>
                   </div>
                   <div className="w-8 h-8 bg-[#145566] rounded-full flex items-center justify-center">
                     <span className="text-white text-sm">📞</span>
                   </div>
                   <div className="w-8 h-8 bg-[#145566] rounded-full flex items-center justify-center">
                     <span className="text-white text-sm">💬</span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>

             {/* FAQ Section */}
       <section className="py-20 bg-white">
         <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-16">
             <div>
               <p className="text-[#145566] font-semibold mb-2">Câu hỏi thường gặp</p>
               <h2 className="text-4xl font-bold text-gray-800 mb-8">GIẢI ĐÁP THẮC MẮC</h2>
               
               <div className="space-y-4">
                 {[
                   {
                     question: "01. HỆ THỐNG AI CÓ CHÍNH XÁC KHÔNG?",
                     answer: "Hệ thống AI của chúng tôi có độ chính xác lên đến 95% và được huấn luyện trên hàng triệu hình ảnh da liễu. Tuy nhiên, kết quả chỉ mang tính chất tham khảo và nên được xác nhận bởi bác sĩ chuyên môn."
                   },
                   {
                     question: "02. LÀM THẾ NÀO ĐỂ SỬ DỤNG HỆ THỐNG CHẨN ĐOÁN?",
                     answer: "Chỉ cần chụp ảnh hoặc tải ảnh vùng da cần chẩn đoán lên hệ thống. AI sẽ phân tích và đưa ra kết quả trong vòng vài giây. Bạn cũng có thể đặt lịch tư vấn với bác sĩ chuyên môn."
                   },
                   {
                     question: "03. THÔNG TIN CÁ NHÂN CÓ ĐƯỢC BẢO MẬT KHÔNG?",
                     answer: "Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân và hình ảnh của bạn. Tất cả dữ liệu được mã hóa và chỉ được sử dụng cho mục đích chẩn đoán y tế."
                   }
                 ].map((faq, index) => (
                   <div key={index} className="border border-gray-200 rounded-lg">
                     <button
                       className="w-full p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                       onClick={() => toggleFAQ(index)}
                     >
                       {faq.question}
                     </button>
                     {activeFAQ === index && (
                       <div className="p-4 pt-0 text-gray-600">
                         {faq.answer}
                       </div>
                     )}
                   </div>
                 ))}
               </div>
             </div>
             
             <div className="relative">
               <div className="bg-blue-50 p-8 rounded-lg">
                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Thống kê</h3>
                 <div className="space-y-6">
                   <div className="flex justify-between items-center">
                     <span className="text-gray-600">Độ chính xác</span>
                     <span className="text-2xl font-bold text-[#145566]">95%</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-gray-600">Bệnh nhân đã chẩn đoán</span>
                     <span className="text-2xl font-bold text-[#145566]">10,000+</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-gray-600">Thời gian chẩn đoán</span>
                     <span className="text-2xl font-bold text-[#145566]">5 giây</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-gray-600">Bác sĩ chuyên môn</span>
                     <span className="text-2xl font-bold text-[#145566]">15+</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

             {/* Footer */}
       <footer className="bg-[#145566] text-white py-16">
         <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-3 gap-8">
             <div>
               <div className="text-3xl font-bold mb-2">AI DERMATOLOGY</div>
               <div className="text-sm mb-4">CHẨN ĐOÁN DA LIỄU THÔNG MINH</div>
               <p className="text-gray-300">
                 Chúng tôi là hệ thống chẩn đoán da liễu AI tiên tiến, cam kết mang đến dịch vụ chăm sóc sức khỏe 
                 chất lượng cao với công nghệ hiện đại.
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
                 <p>Điện thoại: 1900 1234</p>
                 <p>Email: info@aidermatology.vn</p>
                 <p>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
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
             <p>© 2024 AI Dermatology. Tất cả quyền được bảo lưu.</p>
           </div>
         </div>
       </footer>
    </div>
  );
};

export default HomeView;
