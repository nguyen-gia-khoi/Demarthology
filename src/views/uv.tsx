import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface UVData {
  uv_index: number;
  updated_at?: string;
}

interface PositionData {
  latitude: number;
  longitude: number;
}

const UVMapMock: React.FC = () => {
  const [uvData, setUVData] = useState<UVData | null>(null);
  const [position, setPosition] = useState<PositionData | null>(null);
  const [uvTrend, setUVTrend] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const getUVLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return "Thấp";
    if (uvIndex <= 5) return "Trung bình";
    if (uvIndex <= 7) return "Cao";
    if (uvIndex <= 10) return "Rất cao";
    return "Cực cao";
  };

  const getUVColor = (uvIndex: number) => {
    if (uvIndex <= 2) return "from-green-400 to-green-500";
    if (uvIndex <= 5) return "from-yellow-400 to-yellow-500";
    if (uvIndex <= 7) return "from-orange-400 to-orange-500";
    if (uvIndex <= 10) return "from-red-500 to-red-600";
    return "from-purple-500 to-purple-600";
  };

  const getUVMessage = (uvIndex: number) => {
    if (uvIndex <= 2) return "UV thấp, an toàn để ra ngoài.";
    if (uvIndex <= 5) return "UV trung bình, cần bảo vệ da khi ra ngoài.";
    if (uvIndex <= 7) return "UV cao! Giảm thời gian ngoài trời giữa trưa.";
    if (uvIndex <= 10) return "UV rất cao! Tránh ra ngoài, bảo vệ tối đa.";
    return "UV cực cao! Nguy hiểm, tránh ra ngoài hoàn toàn.";
  };

  const getUVNote = (uvIndex: number) => {
    if (uvIndex <= 2)
      return "🌿 Thoải mái ra ngoài, nhưng vẫn nên bôi kem chống nắng.";
    if (uvIndex <= 5)
      return "🧴 Nên bôi kem chống nắng và đội mũ khi ra ngoài.";
    if (uvIndex <= 7)
      return "🕶️ Hạn chế ra ngoài giữa trưa, mặc đồ dài, bôi kem chống nắng.";
    if (uvIndex <= 10)
      return "⚠️ Tránh ra ngoài, bảo vệ tối đa: kính, mũ, áo chống nắng.";
    return "🚫 Nguy hiểm! Tránh ra ngoài hoàn toàn, bảo vệ tối đa!";
  };

  const getMockUVData = () => ({
    uv_index: parseFloat((Math.random() * 12).toFixed(1)),
    updated_at: new Date().toLocaleTimeString(),
  });

  const getMockPosition = () => ({
    latitude: 10 + Math.random() * 10,
    longitude: 105 + Math.random() * 10,
  });

  const getMockTrend = () => Array.from({ length: 12 }, () =>
    parseFloat((Math.random() * 12).toFixed(1))
  );

  const fetchMockUV = () => {
    setLoading(true);
    setTimeout(() => {
      setPosition(getMockPosition());
      const uv = getMockUVData();
      setUVData(uv);
      setUVTrend(getMockTrend());
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchMockUV();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-slate-600 font-medium">
        Đang lấy dữ liệu UV...
      </div>
    );

  if (!uvData || !position) return null;

  const { uv_index } = uvData;
  const uvLevel = getUVLevel(uv_index);
  const uvMessage = getUVMessage(uv_index);
  const uvNote = getUVNote(uv_index);
  const { latitude, longitude } = position;

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-6">
      {/* Left Panel: UV Info */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex flex-col gap-6 p-6 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow"
      >
        <div className="flex items-center gap-4">
          <Sun className="w-14 h-14 text-yellow-400 animate-pulse" />
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Chỉ số UV hiện tại
            </h2>
            <p className="mt-1 text-xl text-slate-700">{uvMessage}</p>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`p-8 rounded-3xl text-white text-center text-5xl font-bold bg-gradient-to-r ${getUVColor(
            uv_index
          )} shadow-xl`}
        >
          {uv_index.toFixed(1)} - {uvLevel}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 p-4 bg-slate-100 rounded-2xl shadow-inner"
        >
          {uv_index <= 5 ? (
            <CheckCircle className="w-8 h-8 text-green-500" />
          ) : (
            <AlertCircle className="w-8 h-8 text-red-500 animate-pulse" />
          )}
          <p className="text-slate-700 font-medium">{uvNote}</p>
        </motion.div>

        {/* UV Trend */}
        <div className="p-4 bg-slate-50 rounded-2xl shadow-inner">
          <div className="flex items-center gap-2 mb-2 text-slate-700 font-medium">
            <Clock className="w-5 h-5" />
            <span>Xu hướng UV 12 giờ</span>
          </div>
          <div className="flex justify-between items-end h-24 gap-1">
            {uvTrend.map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(v / 12) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className={`flex-1 flex flex-col items-center w-6 rounded-t-xl ${
                  v <= 2
                    ? "bg-green-400"
                    : v <= 5
                    ? "bg-yellow-400"
                    : v <= 7
                    ? "bg-orange-400"
                    : v <= 10
                    ? "bg-red-500"
                    : "bg-purple-600"
                }`}
              >
                <span className="text-xs mt-1">{i + 1}h</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchMockUV}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-lg transition-transform duration-200"
          >
            Cập nhật vị trí & UV
          </motion.button>
          {uvData.updated_at && (
            <p className="text-sm text-slate-400 text-center">
              Cập nhật: {uvData.updated_at}
            </p>
          )}
        </div>
      </motion.div>

      {/* Right Panel: Map */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 rounded-3xl overflow-hidden shadow-md border border-slate-200 h-96 lg:h-auto"
      >
        <iframe
          title="User Location"
          width="100%"
          height="100%"
          frameBorder="0"
          src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=vi&z=12&output=embed`}
          allowFullScreen
        ></iframe>
      </motion.div>
    </div>
  );
};

export default UVMapMock;
