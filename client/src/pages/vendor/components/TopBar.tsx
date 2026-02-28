import { Bell, Calendar, Store } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from "../../../context/AuthContext";
import { updateVendorProfile } from "../../../services/authService";

export const TopBar = () => {
  const { user, updateUser } = useAuth();
  const storeOpen = user?.storeOpen ?? true;
  const [toggling, setToggling] = useState(false);

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Shorter date for mobile
  const todayShort = new Date().toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  });

  const getInitials = () => {
    const name = user?.storeName || user?.name || "S";
    return name
      .split(" ")
      .map((w: string) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const toggleStore = async () => {
    if (toggling) return;
    const newStatus = !storeOpen;
    setToggling(true);
    try {
      await updateVendorProfile({ storeOpen: newStatus });
      updateUser({ storeOpen: newStatus });
      toast.success(newStatus ? "Store is now OPEN" : "Store is now CLOSED");
    } catch {
      toast.error("Failed to update store status");
    } finally {
      setToggling(false);
    }
  };

  return (
    <header className="bg-white border-b border-orange-100 px-4 md:px-6 py-3 flex justify-between items-center gap-3">

      {/* Left: Date pill — hidden on mobile to give space for hamburger */}
      <div className="hidden sm:flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full text-sm text-gray-600 shrink-0">
        <Calendar size={15} className="text-[#FF9F3F]" />
        <span className="hidden md:inline">{today}</span>
        <span className="md:hidden">{todayShort}</span>
      </div>

      {/* Mobile spacer so controls stay right when hamburger is present */}
      <div className="sm:hidden flex-1" />

      {/* Right: Controls */}
      <div className="flex items-center gap-2 sm:gap-5 ml-auto">

        {/* Store Status Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 border border-gray-100 px-3 sm:px-4 py-2 rounded-full">
          <Store size={15} className={storeOpen ? "text-green-500" : "text-gray-400"} />

          {/* Label — hidden on small screens */}
          <span className="text-sm font-medium text-gray-600 hidden lg:block">Store</span>

          {/* Status badge — hidden on xs */}
          <span className={`hidden sm:inline text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${
            storeOpen ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
          }`}>
            {storeOpen ? "Open" : "Closed"}
          </span>

          <button
            onClick={toggleStore}
            disabled={toggling}
            aria-label="Toggle store status"
            className={`relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F3F] disabled:opacity-60 ${
              storeOpen ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
              storeOpen ? "translate-x-5" : "translate-x-0"
            }`} />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 hidden sm:block" />

        {/* Bell */}
        <button
          aria-label="Notifications"
          className="relative p-2 rounded-full hover:bg-orange-50 text-gray-400 hover:text-[#FF9F3F] transition-colors"
        >
          <Bell size={19} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF9F3F] rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 hidden sm:block" />

        {/* Store Identity */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF9F3F] to-orange-600 flex items-center justify-center shadow-sm shadow-orange-200 shrink-0">
            <span className="text-white text-xs font-bold tracking-wide">
              {getInitials()}
            </span>
          </div>
          {/* Store name + owner — hidden on small screens */}
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-gray-800 leading-tight">
              {user?.storeName || "My Store"}
            </p>
            <p className="text-xs text-gray-400 leading-tight">
              {user?.name || ""}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};