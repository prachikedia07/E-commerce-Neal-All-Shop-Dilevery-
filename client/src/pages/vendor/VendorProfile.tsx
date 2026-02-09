import { useState } from 'react';

export const VendorProfile = () => {
  const [storeImage, setStoreImage] = useState<string | null>(null);
  const [storeName, setStoreName] = useState('Spice Paradise');
  const [ownerName, setOwnerName] = useState('Rajesh Kumar');

  return (
    <div className="max-w-xl bg-white p-6 rounded-2xl shadow-sm border border-orange-50">
      <h2 className="text-xl font-bold mb-6">Store Profile</h2>

      {/* Store Image */}
      <label className="block text-sm font-medium mb-2">
        Store Display Image
      </label>

      <div className="flex items-center gap-4">
        <div className="w-28 h-28 rounded-xl bg-orange-50 flex items-center justify-center overflow-hidden">
          {storeImage ? (
            <img src={storeImage} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">No image</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setStoreImage(URL.createObjectURL(file));
          }}
        />
      </div>

      {/* Store Name */}
      <div className="mt-6">
        <label className="block text-sm font-medium">Store Name</label>
        <input
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="w-full mt-1 p-3 border rounded-xl"
        />
      </div>

      {/* Owner Name */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Owner Name</label>
        <input
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="w-full mt-1 p-3 border rounded-xl"
        />
      </div>

      <button className="mt-6 bg-[#FF9F3F] hover:bg-[#ff8c1a] text-white px-6 py-3 rounded-xl font-medium">
        Save Changes
      </button>
    </div>
  );
};
