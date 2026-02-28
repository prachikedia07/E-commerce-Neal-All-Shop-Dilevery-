const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  let data;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  return data;
}

/* ---------- PRODUCTS ---------- */

export function getVendorProducts() {
  return apiFetch("/vendor/products");
}

export function createProduct(data: {
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}) {
  return apiFetch("/vendor/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProduct(id: string, data: any) {
  return apiFetch(`/vendor/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteProduct(id: string) {
  return apiFetch(`/vendor/products/${id}`, {
    method: "DELETE",
  });
}