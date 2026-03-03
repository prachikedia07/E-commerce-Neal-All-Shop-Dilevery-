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

/* ---------- ORDERS ---------- */

export function getVendorOrders() {
  return apiFetch("/vendor/orders");
}

export function updateOrderStatus(id: string, status: string) {
  return apiFetch(`/vendor/orders/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}