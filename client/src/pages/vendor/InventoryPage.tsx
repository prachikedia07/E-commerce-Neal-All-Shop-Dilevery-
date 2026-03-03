import React, { useEffect, useState } from "react";
import {
  Search,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Save,
} from "lucide-react";
import { getInventory, adjustStock } from "../../services/inventoryService";
import { toast } from "sonner";

interface InventoryItem {
  _id: string;
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  lastUpdated: string;
  originalStock: number; // for tracking changes
}

export const InventoryPage = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ===============================
     LOAD INVENTORY
  =============================== */
  const loadInventory = async () => {
    try {
      setLoading(true);
      const data = await getInventory();

      const enriched = data.inventory.map((item: any) => ({
        ...item,
        originalStock: item.stock,
      }));

      setItems(enriched);
    } catch (err: any) {
      toast.error(err.message || "Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  /* ===============================
     LOCAL STOCK CHANGE
  =============================== */
  const handleLocalStockChange = (id: string, value: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, stock: Math.max(0, value) }
          : item
      )
    );
  };

  /* ===============================
     SAVE ALL CHANGES
  =============================== */
  const handleSave = async () => {
    try {
      setSaving(true);

      let hasChanges = false;

      for (const item of items) {
        if (item.stock !== item.originalStock) {
          hasChanges = true;
          const change = item.stock - item.originalStock;
          await adjustStock(item._id, change);
        }
      }

      if (!hasChanges) {
        toast("No changes to save");
        return;
      }

      toast.success("Inventory updated successfully");
      loadInventory();
    } catch (err: any) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* ===============================
     FILTERING
  =============================== */
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLowStock = showLowStockOnly
      ? item.stock <= item.minStock
      : true;

    return matchesSearch && matchesLowStock;
  });

  const lowStockCount = items.filter(
    (i) => i.stock <= i.minStock
  ).length;

  const hasUnsavedChanges = items.some(
    (i) => i.stock !== i.originalStock
  );

  if (loading) {
    return <div className="p-6">Loading inventory...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Inventory Management
          </h2>
          <p className="text-gray-500 text-sm">
            Track stock levels and reorder points.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={!hasUnsavedChanges || saving}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-colors
            ${
              hasUnsavedChanges
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* LOW STOCK CARD */}
      <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex justify-between">
        <div>
          <p className="font-bold text-amber-800">
            Low Stock Alerts
          </p>
          <p className="text-sm text-amber-600">
            {lowStockCount} items below threshold
          </p>
        </div>
        <AlertTriangle className="text-amber-600" />
      </div>

      {/* SEARCH */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          className="flex-1 px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showLowStockOnly}
            onChange={(e) =>
              setShowLowStockOnly(e.target.checked)
            }
          />
          Low Stock Only
        </label>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Adjust</th>
              <th className="p-3 text-right">Last Updated</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item) => {
              const isOut = item.stock === 0;
              const isLow = item.stock <= item.minStock;

              return (
                <tr key={item._id} className="border-b">
                  <td className="p-3 font-semibold">
                    {item.name}
                  </td>

                  <td className="p-3 text-xs font-mono">
                    {item.sku}
                  </td>

                  <td className="p-3">
                    {item.stock} / {item.minStock}
                  </td>

                  <td className="p-3">
                    {isOut ? (
                      <span className="text-red-600 font-bold">
                        Out of Stock
                      </span>
                    ) : isLow ? (
                      <span className="text-amber-600 font-bold">
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-green-600 font-bold">
                        In Stock
                      </span>
                    )}
                  </td>

                  <td className="p-3 flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleLocalStockChange(
                          item._id,
                          item.stock - 1
                        )
                      }
                      className="px-2 border rounded"
                    >
                      <ArrowDown size={14} />
                    </button>

                    <input
                      type="number"
                      value={item.stock}
                      onChange={(e) =>
                        handleLocalStockChange(
                          item._id,
                          Number(e.target.value)
                        )
                      }
                      className="w-16 text-center border rounded px-1 py-1"
                    />

                    <button
                      onClick={() =>
                        handleLocalStockChange(
                          item._id,
                          item.stock + 1
                        )
                      }
                      className="px-2 border rounded"
                    >
                      <ArrowUp size={14} />
                    </button>

                    <button
                      onClick={() =>
                        handleLocalStockChange(
                          item._id,
                          item.stock + 10
                        )
                      }
                      className="px-2 border rounded text-orange-600"
                    >
                      +10
                    </button>
                  </td>

                  <td className="p-3 text-right text-xs text-gray-400">
                    {new Date(item.lastUpdated).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};