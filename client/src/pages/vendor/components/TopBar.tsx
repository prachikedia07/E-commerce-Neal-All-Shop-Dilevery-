import { Bell, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from "../../../context/AuthContext";

export const TopBar = () => {
  const [open, setOpen] = useState(true);
  const { user } = useAuth();


  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white border-b border-orange-100 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3 bg-orange-50 px-3 py-1.5 rounded-full text-sm text-gray-600">
        <Calendar size={16} className="text-[#FF9F3F]" />
        {today}
      </div>

      <div className="flex items-center gap-6">
        {/* Store Status */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Store Status:</span>
          <button
            onClick={() => setOpen(!open)}
            className={`w-12 h-6 rounded-full relative transition ${
              open ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 bg-white rounded-full transition ${
                open ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>

        <Bell className="text-gray-500" />

        {/* Store Identity */}
       <div className="text-right">
  <p className="text-sm font-bold text-gray-800">
    {user?.storeName || "My Store"}
  </p>
  <p className="text-xs text-gray-500">
    {user?.name}
  </p>
</div>
      </div>
    </header>
  );
};
