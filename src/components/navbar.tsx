
import React, { useState } from 'react';
const Navbar:React.FC=()=>{
    return(
        <div>
            <header className="fixed top-0 left-0 right-0 backdrop-blur-md bg-white/80 border-b border-white/20 z-50 transition-all duration-300">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <img
                    src="/logo.png" 
                    alt="Logo"
                    className="w-16 h-16 object-contain"
                />
                <div>
                    <h1 className="text-xl font-bold text-[#145566]">
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
        </div>
    )
}
export default Navbar;