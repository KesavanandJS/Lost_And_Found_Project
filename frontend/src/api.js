const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

async function reportLostItem(item) {
  const response = await fetch(`${BASE_URL}/api/items/lost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return response.json();
}

async function reportFoundItem(item) {
  const response = await fetch(`${BASE_URL}/api/items/found`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return response.json();
}

async function searchItems(type, category) {
  let url = new URL(`${BASE_URL}/api/items/search`);
  url.searchParams.append("type", type);
  if (category) {
    url.searchParams.append("category", category);
  }
  const response = await fetch(url.toString());
  return response.json();
}

async function updateItemStatus(id, status) {
  const url = new URL(`${BASE_URL}/api/items/${id}/status`);
  url.searchParams.append("status", status);
  const response = await fetch(url.toString(), {
    method: "PUT",
  });
  return response.json();
}

async function getAllItems() {
  const response = await fetch(`${BASE_URL}/api/admin/items`);
  return response.json();
}

async function adminUpdateItemStatus(id, status) {
  const url = new URL(`${BASE_URL}/api/admin/items/${id}/status`);
  url.searchParams.append("status", status);
  const response = await fetch(url.toString(), {
    method: "PUT",
  });
  return response.json();
}

export {
  reportLostItem,
  reportFoundItem,
  searchItems,
  updateItemStatus,
  getAllItems,
  adminUpdateItemStatus,
};
