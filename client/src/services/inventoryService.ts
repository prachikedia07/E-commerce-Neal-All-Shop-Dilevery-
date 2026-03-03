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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

/* GET INVENTORY */
export function getInventory() {
  return apiFetch("/vendor/inventory");
}

/* ADJUST STOCK */
export function adjustStock(id: string, change: number) {
  return apiFetch(`/vendor/inventory/${id}/adjust`, {
    method: "PUT",
    body: JSON.stringify({ change }),
  });
}