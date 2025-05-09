const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("jwtToken");

async function apiFetch(endpoint, method, data) {
  return await fetch(`${API_URL}${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
}

async function apiPost(endpoint, data) {
  return apiFetch(endpoint, "POST", data);
}

async function apiPut(endpoint, data) {
  return apiFetch(endpoint, "PUT", data);
}

async function apiDelete(endpoint, data) {
  return apiFetch(endpoint, "DELETE", data);
}

export { apiPost, apiPut, apiDelete };
