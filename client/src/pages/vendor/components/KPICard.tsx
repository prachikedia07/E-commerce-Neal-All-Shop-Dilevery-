export const KPICard = ({ title, value, icon: Icon, trend, note }: any) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-orange-50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          <p className="text-sm text-green-600 mt-1">{trend}</p>
          {note && <p className="text-xs text-red-500 mt-1">{note}</p>}
        </div>
        <div className="p-3 bg-orange-50 rounded-xl text-[#FF9F3F]">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};
