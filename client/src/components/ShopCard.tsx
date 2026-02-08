import React from 'react';

export const ShopCard = ({ shop, onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border border-orange-200 bg-white p-4 shadow-sm hover:shadow-md transition"
    >
      <h3 className="text-lg font-medium text-gray-800">
        {shop?.name || 'Local Shop'}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {shop?.distance || 'Nearby'} • {shop?.deliveryTime || '20–30 min'}
      </p>

      <p className="text-xs text-green-700 mt-2">
        Open now
      </p>
    </div>
  );
};
