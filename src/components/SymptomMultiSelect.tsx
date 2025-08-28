import React, { useState, useEffect } from 'react';

// Extract unique tags from question data
export const symptomOptions: string[] = [
  "viêm da", "ngứa", "đốm đỏ", "da khô", "mụn trứng cá", 
  "tuổi trưởng thành", "điều trị mụn", "nấm da", "vùng kín",
  "tretinoin", "tác dụng phụ", "bong tróc", "sẹo mụn", 
  "điều trị sẹo", "laser", "chemical peel", "dị ứng", 
  "kem chống nắng", "da nhạy cảm", "bảo vệ da", "chân nứt nẻ",
  "gót chân", "chăm sóc chân", "rụng tóc", "gàu", "stress",
  "da đầu", "nấm móng", "móng vàng", "điều trị nấm", 
  "thuốc chống nấm", "nốt ruồi", "ung thư da", "khám da liễu",
  "sức khỏe da", "nám da", "sau sinh", "điều trị nám", 
  "phụ nữ mang thai", "cháy nắng", "phục hồi da", 
  "điều trị cháy nắng", "mụn ẩn", "mụn dưới da", "da liễu",
  "dị ứng mỹ phẩm", "test mỹ phẩm", "mỹ phẩm an toàn",
  "lão hóa da", "nếp nhăn", "chống lão hóa", "thẩm mỹ",
  "mụn cóc", "virus HPV", "điều trị mụn cóc", "lây lan",
  "bạch biến", "đốm trắng", "bệnh tự miễn", "chàm eczema",
  "dưỡng ẩm", "chế độ ăn", "mụn đầu đen", "tẩy tế bào chết",
  "chăm sóc da", "mặt nạ", "sẹo lồi", "phẫu thuật"
];

// Simple searchable multiselect dropdown for symptoms
const SymptomMultiSelect: React.FC<{
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  onSearchingChange?: (isSearching: boolean) => void;
}> = ({ options, value, onChange, placeholder, onSearchingChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const filtered = options.filter(opt => opt.toLowerCase().includes(query.toLowerCase()) && !value.includes(opt));

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    if (onSearchingChange) {
      onSearchingChange(open && query.trim().length > 0);
    }
  }, [open, query, onSearchingChange]);

  const removeItem = (symptom: string) => onChange(value.filter(v => v !== symptom));
  const addItem = (symptom: string) => onChange([...value, symptom]);

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex flex-wrap items-center gap-2 w-full px-3 py-2 border border-gray-300 rounded-lg bg-white ${open ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}
        onClick={() => setOpen(true)}
      >
        {value.length === 0 && (
          <span className="text-gray-400">{placeholder || 'Chọn triệu chứng...'}</span>
        )}
        {value.map(symptom => (
          <span key={symptom} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
            {symptom}
            <button type="button" onClick={(e) => { e.stopPropagation(); removeItem(symptom); }} className="text-indigo-500 hover:text-indigo-700">×</button>
          </span>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          className="flex-1 min-w-[120px] outline-none text-sm"
          placeholder="Tìm triệu chứng..."
        />
      </div>

      {open && (
        <div className="absolute z-10 mt-1 w-full max-h-56 overflow-auto bg-white border border-gray-200 rounded-lg shadow">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">Không tìm thấy</div>
          ) : (
            filtered.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => { addItem(opt); setQuery(""); }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
              >
                {opt}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SymptomMultiSelect;
