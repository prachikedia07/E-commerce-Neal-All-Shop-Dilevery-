import { useEffect, useState, useRef } from "react";
import {
  Plus, Trash2, Pencil, Search, Filter, Tag, X,
  PackageX, AlertTriangle, ChevronLeft, ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import {
  getVendorProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  category: string;
  stock: number;
  image?: string;
  isAvailable: boolean;
  isVeg?: boolean;
}

const FILTER_CATEGORIES = ["All", "Spices", "Sweets", "Grains", "Vegetables", "Groceries", "Dairy", "Beverages", "Snacks", "Fruits", "Bakery", "Meat", "Frozen"];
const SUGGESTED_CATS    = ["Spices", "Sweets", "Grains", "Vegetables", "Groceries", "Dairy", "Beverages", "Snacks", "Fruits", "Bakery", "Meat", "Frozen"];

/* ─────────────────────────────────────────
   CONFIRM DIALOG
───────────────────────────────────────── */
const ConfirmDialog = ({
  open, productName, onConfirm, onCancel,
}: {
  open: boolean; productName: string; onConfirm: () => void; onCancel: () => void;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-red-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Delete Product?</h3>
            <p className="text-sm text-gray-500">This action cannot be undone.</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 mb-5 border border-gray-100">
          <span className="font-semibold text-gray-800">{productName}</span> will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   INPUT FIELD
───────────────────────────────────────── */
const InputField = ({
  label, placeholder, value, onChange, type = "text",
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string;
}) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9F3F] focus:border-transparent text-sm transition"
    />
  </div>
);

/* ─────────────────────────────────────────
   PRODUCT FORM DRAWER
───────────────────────────────────────── */
const ProductDrawer = ({
  open, editingId, form, isVeg, onClose, onChange, onToggleVeg, onSubmit,
}: {
  open: boolean; editingId: string | null; form: Record<string, string>;
  isVeg: boolean; onClose: () => void;
  onChange: (field: string, value: string) => void;
  onToggleVeg: () => void; onSubmit: () => void;
}) => {
  const [showCatSuggestions, setShowCatSuggestions] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = SUGGESTED_CATS.filter(
    (c) => c.toLowerCase().includes(form.category.toLowerCase()) && c.toLowerCase() !== form.category.toLowerCase()
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node))
        setShowCatSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />}

      <div className={`fixed top-0 right-0 h-full z-50 w-full sm:max-w-md bg-white shadow-2xl border-l border-orange-100 flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-100 bg-orange-50/40 shrink-0">
          <div>
            <h3 className="text-base font-bold text-gray-800">{editingId ? "Edit Product" : "Add New Product"}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{editingId ? "Update product details" : "Fill in details to add to catalog"}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-orange-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">

          {/* Image preview */}
          <div className="w-full h-36 rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center">
            {form.image ? (
              <img src={form.image} alt="Preview" className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-gray-400">
                <ShoppingBag size={28} strokeWidth={1.5} />
                <span className="text-xs">Image preview appears here</span>
              </div>
            )}
          </div>

          <InputField label="Product Name *" placeholder="e.g. Organic Turmeric Powder"
            value={form.name} onChange={(v) => onChange("name", v)} />

          <div className="grid grid-cols-2 gap-3">
            <InputField label="MRP (₹) *" placeholder="150" type="number"
              value={form.price} onChange={(v) => onChange("price", v)} />
            <InputField label="Selling Price (₹)" placeholder="120" type="number"
              value={form.discountedPrice} onChange={(v) => onChange("discountedPrice", v)} />
          </div>

          {/* Category — free text + autocomplete */}
          <div ref={catRef}>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Category *</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type or pick a category..."
                value={form.category}
                onChange={(e) => { onChange("category", e.target.value); setShowCatSuggestions(true); }}
                onFocus={() => setShowCatSuggestions(true)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9F3F] focus:border-transparent text-sm transition"
              />
              {form.category && (
                <button onClick={() => { onChange("category", ""); setShowCatSuggestions(true); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
              {showCatSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                  <div className="px-3 py-1.5 border-b border-gray-100">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Suggestions</span>
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {filteredSuggestions.map((cat) => (
                      <button key={cat}
                        onMouseDown={() => { onChange("category", cat); setShowCatSuggestions(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF9F3F] transition-colors flex items-center gap-2">
                        <Tag size={11} className="text-orange-300 shrink-0" />{cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Pick a suggestion or type your own custom category</p>
          </div>

          {/* Veg / Non-Veg */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Food Type</label>
            <div className="flex gap-3">
              <button
                onClick={() => !isVeg && onToggleVeg()}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                  isVeg ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 bg-gray-50 text-gray-400 hover:border-green-300"}`}>
                <div className={`flex items-center justify-center w-4 h-4 border-2 rounded-sm shrink-0 ${isVeg ? "border-green-600" : "border-gray-300"}`}>
                  <div className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-600" : "bg-gray-300"}`} />
                </div>
                Veg
              </button>
              <button
                onClick={() => isVeg && onToggleVeg()}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                  !isVeg ? "border-red-500 bg-red-50 text-red-700" : "border-gray-200 bg-gray-50 text-gray-400 hover:border-red-300"}`}>
                <div className={`flex items-center justify-center w-4 h-4 border-2 rounded-sm shrink-0 ${!isVeg ? "border-red-600" : "border-gray-300"}`}>
                  <div className={`w-2 h-2 rounded-full ${!isVeg ? "bg-red-600" : "bg-gray-300"}`} />
                </div>
                Non-Veg
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField label="Stock Quantity" placeholder="e.g. 50" type="number"
              value={form.stock} onChange={(v) => onChange("stock", v)} />
            <div />
          </div>

          <InputField label="Image URL" placeholder="https://..."
            value={form.image} onChange={(v) => onChange("image", v)} />
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-orange-100 flex gap-3 shrink-0">
          <button onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm">
            Cancel
          </button>
          <button onClick={onSubmit}
            className="flex-1 flex items-center justify-center gap-2 bg-[#FF9F3F] hover:bg-orange-500 text-white font-bold px-4 py-3 rounded-xl transition-colors shadow-md shadow-orange-200 text-sm">
            <Plus size={16} />
            {editingId ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────── */
const ProductCard = ({
  product, onEdit, onDelete, onToggle,
}: {
  product: Product; onEdit: () => void; onDelete: () => void; onToggle: () => void;
}) => {
  const outOfStock = product.stock === 0;
  const discount = product.discountedPrice && product.price > product.discountedPrice
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) : null;

  return (
    <div className="group bg-white rounded-2xl border border-orange-50 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">

      {/* Image — uses aspect ratio so it scales on all screens */}
      <div className="relative w-full bg-gray-100 overflow-hidden shrink-0" style={{ aspectRatio: "4/3" }}>
        {product.image ? (
          <img src={product.image} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ShoppingBag size={36} strokeWidth={1.5} />
          </div>
        )}

        {/* Status badges top-left */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 flex-wrap" style={{ maxWidth: "65%" }}>
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md text-white shadow-sm ${product.isAvailable ? "bg-green-500" : "bg-gray-500"}`}>
            {product.isAvailable ? "Active" : "Inactive"}
          </span>
          {outOfStock && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-red-500 text-white shadow-sm">
              Out of Stock
            </span>
          )}
        </div>

        {/* Discount badge top-right */}
        {discount && (
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[10px] font-bold rounded-md bg-[#FF9F3F] text-white shadow-sm">
            -{discount}%
          </span>
        )}

        {/* Hover edit/delete (desktop) */}
        <div className="absolute bottom-2.5 right-2.5 hidden sm:flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit}
            className="p-1.5 bg-white/95 hover:bg-white text-gray-700 rounded-full shadow-md transition-colors" title="Edit">
            <Pencil size={13} />
          </button>
          <button onClick={onDelete}
            className="p-1.5 bg-white/95 hover:bg-red-50 text-red-500 rounded-full shadow-md transition-colors" title="Delete">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="p-3 flex flex-col flex-1 gap-2">

        {/* Category + veg dot */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 min-w-0">
            <Tag size={10} className="text-[#FF9F3F] shrink-0" />
            <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-1.5 py-0.5 rounded-md truncate max-w-[90px]">
              {product.category}
            </span>
          </div>
          <div
            className={`flex items-center justify-center w-4 h-4 border-2 rounded-sm shrink-0 ${product.isVeg !== false ? "border-green-600" : "border-red-600"}`}
            title={product.isVeg !== false ? "Vegetarian" : "Non-Vegetarian"}>
            <div className={`w-2 h-2 rounded-full ${product.isVeg !== false ? "bg-green-600" : "bg-red-600"}`} />
          </div>
        </div>

        {/* Name */}
        <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price + stock + toggle */}
        <div className="mt-auto flex items-end justify-between pt-1">
          <div>
            {product.discountedPrice ? (
              <>
                <p className="text-xs text-gray-400 line-through leading-none mb-0.5">₹{product.price}</p>
                <p className="text-lg font-bold text-gray-900 leading-none">₹{product.discountedPrice}</p>
              </>
            ) : (
              <p className="text-lg font-bold text-gray-900 leading-none">₹{product.price}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-xs font-medium ${outOfStock ? "text-red-500" : "text-gray-500"}`}>
              Stock: {product.stock}
            </span>
            <button
              onClick={onToggle}
              aria-label="Toggle availability"
              className={`relative w-9 h-5 rounded-full transition-colors duration-300 focus:outline-none ${product.isAvailable ? "bg-green-500" : "bg-gray-300"}`}>
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${product.isAvailable ? "translate-x-4" : "translate-x-0"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-only edit/delete bar */}
      <div className="flex border-t border-gray-100 sm:hidden">
        <button onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
          <Pencil size={12} /> Edit
        </button>
        <div className="w-px bg-gray-100" />
        <button onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-50 transition-colors">
          <Trash2 size={12} /> Delete
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────── */
const EmptyState = ({ query, category }: { query: string; category: string }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center px-4">
    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
      <PackageX size={30} className="text-orange-300" />
    </div>
    <h3 className="text-base font-bold text-gray-700 mb-1">No products found</h3>
    <p className="text-sm text-gray-400 max-w-xs">
      {query
        ? `No results for "${query}"${category !== "All" ? ` in ${category}` : ""}. Try a different search.`
        : `No products${category !== "All" ? ` in ${category}` : ""} yet. Add your first one!`}
    </p>
  </div>
);

/* ─────────────────────────────────────────
   CATEGORY SCROLL BAR
───────────────────────────────────────── */
const CategoryScrollBar = ({
  selected, onSelect, counts,
}: {
  selected: string; onSelect: (c: string) => void; counts: Record<string, number>;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -150 : 150, behavior: "smooth" });
  };

  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex items-center gap-1 min-w-0 flex-1">
      <button onClick={() => scroll("left")}
        className="p-1 rounded-full border border-gray-200 text-gray-400 hover:text-[#FF9F3F] hover:border-orange-300 transition-colors shrink-0">
        <ChevronLeft size={14} />
      </button>

      {/* The key fix: overflow-x-auto + flex-nowrap on a flex container with min-w-0 */}
      <div
        ref={scrollRef}
        className="flex items-center gap-1.5 overflow-x-auto flex-1 min-w-0"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
      >
        {/* All */}
        <button onClick={() => onSelect("All")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
            selected === "All" ? "bg-[#FF9F3F] text-white shadow-sm" : "bg-orange-50 text-gray-600 hover:bg-orange-100"}`}>
          All
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${selected === "All" ? "bg-white/30 text-white" : "bg-orange-100 text-orange-600"}`}>
            {totalCount}
          </span>
        </button>

        {FILTER_CATEGORIES.filter(c => c !== "All").map((cat) => {
          const count = counts[cat] || 0;
          return (
            <button key={cat} onClick={() => onSelect(cat)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                selected === cat ? "bg-[#FF9F3F] text-white shadow-sm" : "bg-orange-50 text-gray-600 hover:bg-orange-100"}`}>
              {cat}
              {count > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${selected === cat ? "bg-white/30 text-white" : "bg-orange-100 text-orange-600"}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button onClick={() => scroll("right")}
        className="p-1 rounded-full border border-gray-200 text-gray-400 hover:text-[#FF9F3F] hover:border-orange-300 transition-colors shrink-0">
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isVeg, setIsVeg] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);

  const [form, setForm] = useState({
    name: "", price: "", discountedPrice: "", category: "", stock: "", image: "",
  });

  /* ── Load ── */
  const loadProducts = async () => {
    try {
      const data = await getVendorProducts();
      setProducts(data.products);
    } catch (err: any) {
      toast.error(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { loadProducts(); }, []);

  /* ── Create ── */
  const handleCreate = async () => {
    if (!form.name || !form.price || !form.category) {
      toast.error("Please fill required fields (name, price, category)");
      return;
    }
    try {
      await createProduct({
        name: form.name,
        price: Number(form.price),
        discountedPrice: form.discountedPrice !== "" ? Number(form.discountedPrice) : undefined,
        category: form.category,
        stock: Number(form.stock || 0),
        image: form.image,
        isVeg,
      });
      toast.success("Product created!");
      resetForm();
      setDrawerOpen(false);
      loadProducts();
    } catch (err: any) {
      toast.error(err.message || "Failed to create product");
    }
  };

  /* ── Edit ── */
  const handleEdit = (product: Product) => {
    setEditingId(product._id);
    setIsVeg(product.isVeg !== false);
    setForm({
      name: product.name,
      price: String(product.price),
      discountedPrice: product.discountedPrice ? String(product.discountedPrice) : "",
      category: product.category,
      stock: String(product.stock),
      image: product.image || "",
    });
    setDrawerOpen(true);
  };

  /* ── Update ── */
  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      const res = await updateProduct(editingId, {
        name: form.name,
        price: Number(form.price),
        discountedPrice: form.discountedPrice !== "" ? Number(form.discountedPrice) : undefined,
        category: form.category,
        stock: Number(form.stock),
        image: form.image,
        isVeg,
      });
      setProducts((prev) => prev.map((p) => p._id === editingId ? res.product : p));
      toast.success("Product updated!");
      resetForm();
      setEditingId(null);
      setDrawerOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    }
  };

  /* ── Delete ── */
  const handleDeleteConfirmed = async () => {
    if (!confirmDelete) return;
    try {
      await deleteProduct(confirmDelete.id);
      setProducts((prev) => prev.filter((p) => p._id !== confirmDelete.id));
      toast.success("Product deleted");
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    } finally {
      setConfirmDelete(null);
    }
  };

  /* ── Toggle ── */
  const toggleAvailability = async (id: string, current: boolean) => {
    try {
      const res = await updateProduct(id, { isAvailable: !current });
      setProducts((prev) => prev.map((p) => p._id === id ? res.product : p));
      toast.success("Status updated");
    } catch (err: any) {
      toast.error(err.message || "Toggle failed");
    }
  };

  const resetForm = () => {
    setForm({ name: "", price: "", discountedPrice: "", category: "", stock: "", image: "" });
    setIsVeg(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingId(null);
    resetForm();
  };

  /* ── Filter ── */
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = filterCategory === "All" || p.category.toLowerCase() === filterCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  /* ── Counts ── */
  const categoryCounts = products.reduce<Record<string, number>>((acc, p) => {
    const normalized = FILTER_CATEGORIES.find(c => c.toLowerCase() === p.category.toLowerCase()) || p.category;
    acc[normalized] = (acc[normalized] || 0) + 1;
    return acc;
  }, {});

  const activeCount   = products.filter((p) => p.isAvailable).length;
  const inactiveCount = products.length - activeCount;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-[#FF9F3F] rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Products</h2>
          <p className="text-xs text-gray-500 mt-0.5 flex flex-wrap items-center gap-x-1 gap-y-0">
            <span>{products.length} total</span>
            <span className="text-gray-300">·</span>
            <span className="text-green-600 font-semibold">{activeCount} active</span>
            {inactiveCount > 0 && (
              <><span className="text-gray-300">·</span><span className="text-gray-400">{inactiveCount} inactive</span></>
            )}
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setEditingId(null); setDrawerOpen(true); }}
          className="flex items-center gap-1.5 bg-[#FF9F3F] hover:bg-orange-500 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-md shadow-orange-200 text-sm shrink-0 whitespace-nowrap">
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* ── Search + Filter ── */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-orange-50 space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search products by name..."
            className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9F3F] focus:border-transparent text-gray-700 text-sm transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category filter — contained with overflow hidden on parent */}
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          <Filter size={14} className="text-gray-400 shrink-0" />
          <CategoryScrollBar
            selected={filterCategory}
            onSelect={setFilterCategory}
            counts={categoryCounts}
          />
        </div>
      </div>

      {/* ── Products Grid ──
            mobile  < 640 : 1 col
            sm  640–1023 : 2 cols
            lg  1024–1279: 3 cols
            xl  1280+    : 4 cols
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {filteredProducts.length === 0 ? (
          <EmptyState query={searchTerm} category={filterCategory} />
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => setConfirmDelete({ id: product._id, name: product.name })}
              onToggle={() => toggleAvailability(product._id, product.isAvailable)}
            />
          ))
        )}

        {/* Add placeholder */}
        {filteredProducts.length > 0 && (
          <button
            onClick={() => { resetForm(); setEditingId(null); setDrawerOpen(true); }}
            className="group border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-10 hover:border-[#FF9F3F] hover:bg-orange-50/30 transition-all min-h-[180px]">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2.5 group-hover:bg-[#FF9F3F] transition-colors text-gray-400 group-hover:text-white">
              <Plus size={24} />
            </div>
            <span className="text-sm font-bold text-gray-400 group-hover:text-[#FF9F3F] transition-colors">Add New Product</span>
          </button>
        )}
      </div>

      {/* Drawer */}
      <ProductDrawer
        open={drawerOpen}
        editingId={editingId}
        form={form}
        isVeg={isVeg}
        onClose={closeDrawer}
        onChange={(field, value) => setForm((f) => ({ ...f, [field]: value }))}
        onToggleVeg={() => setIsVeg((v) => !v)}
        onSubmit={editingId ? handleUpdate : handleCreate}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        open={!!confirmDelete}
        productName={confirmDelete?.name || ""}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
};