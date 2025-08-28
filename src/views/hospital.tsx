import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HospitalIcon } from "lucide-react";

interface Hospital {
  id: string;
  name: string;
  city: string;
  address: string;
  rating: number;
  specialties: string[];
  phone?: string;
  hours?: string;
  image?: string;
}

const SAMPLE_HOSPITALS: Hospital[] = [
  {
    id: "h1",
    name: "Da Liễu Sài Gòn - Skin & Care Clinic",
    city: "Ho Chi Minh",
    address: "123 Lê Lợi, Quận 1",
    rating: 4.8,
    specialties: ["Mụn", "Laser", "Nội khoa da"],
    phone: "+84 28 1234 5218",
    hours: "8:00 - 20:00",
    image: "https://tse4.mm.bing.net/th/id/OIP.i81Nkvtfqkr-VBn-CN_FYQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "h2",
    name: "Bệnh viện Da liễu Trung ương",
    city: "Hà Nội",
    address: "15 Nguyễn Thái Học, Ba Đình",
    rating: 4.6,
    specialties: ["Bệnh lý da", "Phẫu thuật thẩm mỹ"],
    phone: "+84 24 9876 3222",
    hours: "7:30 - 17:00",
    image: "https://tse1.mm.bing.net/th/id/OIP.Q4sdQ3Lf_1GgmW5lqkBcfAHaFP?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "h2",
    name: "Bệnh viện Da liễu Trung ương",
    city: "Hà Nội",
    address: "15 Nguyễn Thái Học, Ba Đình",
    rating: 4.6,
    specialties: ["Bệnh lý da", "Phẫu thuật thẩm mỹ"],
    phone: "+84 24 9876 3222",
    hours: "7:30 - 17:00",
    image: "https://tse1.mm.bing.net/th/id/OIP.Q4sdQ3Lf_1GgmW5lqkBcfAHaFP?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "h1",
    name: "Da Liễu Sài Gòn - Skin & Care Clinic",
    city: "Ho Chi Minh",
    address: "123 Lê Lợi, Quận 1",
    rating: 4.8,
    specialties: ["Mụn", "Laser", "Nội khoa da"],
    phone: "+84 28 1234 5218",
    hours: "8:00 - 20:00",
    image: "https://tse4.mm.bing.net/th/id/OIP.i81Nkvtfqkr-VBn-CN_FYQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

const cities = ["All", ...Array.from(new Set(SAMPLE_HOSPITALS.map((h) => h.city)))];
const specialties = ["All", ...Array.from(new Set(SAMPLE_HOSPITALS.flatMap((h) => h.specialties)))];

const HospitalCard: React.FC<{
  hospital: Hospital;
  onOpen: (h: Hospital) => void;
}> = ({ hospital, onOpen }) => {
  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 group"
    >
      {/* Header with image */}
      <div className="h-36 relative">
        {hospital.image ? (
          <img
            src={hospital.image}
            alt={hospital.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-tr from-sky-100 to-cyan-100">
            <HospitalIcon className="w-10 h-10 text-cyan-600" />
          </div>
        )}
        <div className="absolute top-3 right-3 text-sm bg-white/90 px-3 py-1 rounded-full shadow font-medium text-slate-700">
          ⭐ {hospital.rating.toFixed(1)}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{hospital.name}</h3>
        <p className="text-sm text-slate-500">{hospital.address}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {hospital.specialties.map((s, idx) => (
            <span
              key={s}
              className={`text-xs px-2 py-1 rounded-full border shadow-sm ${
                idx % 2 === 0
                  ? "bg-cyan-50 text-cyan-700 border-cyan-200"
                  : "bg-violet-50 text-violet-700 border-violet-200"
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-[#145566]">
          <div>🕑 {hospital.hours}</div>
          <a
            href={`tel:${hospital.phone}`}
            className="text-cyan-600 underline font-medium hover:text-cyan-800"
          >
            {hospital.phone}
          </a>
        </div>

        <button
          onClick={() => onOpen(hospital)}
          className="mt-2 w-full py-2 rounded-xl text-sm font-medium bg-[#145566] text-white shadow hover:opacity-95 transition"
        >
          Xem chi tiết
        </button>
      </div>
    </motion.article>
  );
};

const HospitalView: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedSpec, setSelectedSpec] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"rating" | "distance">("rating");
  const [selected, setSelected] = useState<Hospital | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_HOSPITALS.filter((h) => {
      if (selectedCity !== "All" && h.city !== selectedCity) return false;
      if (selectedSpec !== "All" && !h.specialties.includes(selectedSpec)) return false;
      if (q) {
        const hay = `${h.name} ${h.address} ${h.city} ${h.specialties.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => (sortBy === "rating" ? b.rating - a.rating : a.name.length - b.name.length));
  }, [query, selectedCity, selectedSpec, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 Tìm theo tên, địa chỉ, chuyên khoa..."
              className="w-full sm:w-72 rounded-full border border-slate-200 px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-full border border-slate-200 px-3 py-2 text-sm shadow-sm"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={selectedSpec}
              onChange={(e) => setSelectedSpec(e.target.value)}
              className="rounded-full border border-slate-200 px-3 py-2 text-sm shadow-sm"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-full border border-slate-200 px-3 py-2 text-sm shadow-sm"
            >
              <option value="rating">Sắp xếp: Đánh giá</option>
              <option value="distance">Sắp xếp: Khoảng cách</option>
            </select>
          </div>
        </header>

        {/* Main */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.length === 0 ? (
                <div className="col-span-full text-center p-12 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-slate-600">Không tìm thấy kết quả. Thử thay đổi bộ lọc.</p>
                </div>
                ) : (
                filtered.map((h) => (
                    <HospitalCard key={h.id} hospital={h} onOpen={(x) => setSelected(x)} />
                ))
                )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-2">
                <div>{filtered.length} cơ sở phù hợp</div>
                <div>Hiển thị 1 — {Math.min(12, filtered.length)} / {filtered.length}</div>
            </div>
            </section>
        </main>

        {/* Detail modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center"
            >
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setSelected(null)}
              />

              {/* Modal */}
              <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="relative bg-white rounded-3xl shadow-2xl w-full md:max-w-3xl mx-4 overflow-hidden"
              >
                {selected.image && (
                  <img src={selected.image} className="h-48 w-full object-cover" />
                )}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{selected.name}</h2>
                      <p className="text-sm text-slate-500 mt-1">
                        {selected.address} • {selected.city}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-slate-700">
                        <div className="text-amber-500 font-semibold">
                          ⭐ {selected.rating.toFixed(1)}
                        </div>
                        <div className="text-sm">🕑 {selected.hours}</div>
                        <a className="underline text-sm text-cyan-600" href={`tel:${selected.phone}`}>
                          📞 {selected.phone}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-slate-500 hover:text-slate-800 text-lg font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Content */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Giới thiệu nhanh</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Đây là phần mô tả ngắn về cơ sở — bạn có thể nạp mô tả thật từ API.
                      </p>
                      <div className="mt-4">
                        <h5 className="font-medium">Dịch vụ nổi bật</h5>
                        <ul className="mt-2 text-sm text-slate-600 space-y-1">
                          {selected.specialties.map((s) => (
                            <li key={s}>• {s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Thông tin liên hệ</h5>
                      <div className="text-sm text-slate-600 space-y-2">
                        <div>📍 {selected.address}</div>
                        <div>
                          📞{" "}
                          <a href={`tel:${selected.phone}`} className="underline text-cyan-600">
                            {selected.phone}
                          </a>
                        </div>
                        <div>🕑 {selected.hours}</div>
                      </div>
                      <div className="mt-4">
                        <button className="w-full rounded-xl py-2.5 bg-[#145566] text-white font-semibold shadow-md hover:opacity-90 transition">
                          Đặt lịch khám
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HospitalView;
