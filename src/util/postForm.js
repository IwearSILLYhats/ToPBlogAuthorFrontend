const API_URL = import.meta.env.VITE_API_URL;

async function apiFetch(endpoint, method, data) {
  try {
    const token = localStorage.getItem("jwtToken");
    let opts = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JSON.parse(token)}`,
      },
    };
    if (data) opts.body = JSON.stringify(data);

    const response = await fetch(`${API_URL}${endpoint}`, opts);
    if (!response.ok) {
      console.log(response);
      throw new Error(`Request error: ${response.status}`);
    }
    let responseData = await response.json();
    return responseData;
  } catch (error) {
    return error;
  }
}

function apiPost(endpoint, data) {
  return apiFetch(endpoint, "POST", data);
}

function apiPut(endpoint, data) {
  return apiFetch(endpoint, "PUT", data);
}

function apiDelete(endpoint, data) {
  return apiFetch(endpoint, "DELETE", data);
}

export { apiPost, apiPut, apiDelete };
