import { Api } from "~/config";

function getQueryString(params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map((k) => esc(k) + "=" + esc(params[k]))
    .join("&");
}

async function request(url, params = {}) {
  const method = params.method || "GET";
  let qs = "";
  let body;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(params.headers || {}),
  };

  const { data, ...otherParams } = params;

  if (data) {
    if (["GET", "DELETE"].indexOf(method) > -1) {
      qs = "?" + getQueryString(data);
    }
    // POST or PUT
    else {
      body = JSON.stringify(data);
    }
  }
  const res = await fetch(Api.BASE_URL + url + qs, {
    ...otherParams,
    method,
    headers,
    body,
  });
  if (!res.ok) throw res;
  return res.json();
}

function createRequestFnByMethod(method) {
  return (url, params) => request(url, Object.assign({ method }, params));
}

export const api = {
  get: createRequestFnByMethod("GET"),
  post: createRequestFnByMethod("POST"),
  put: createRequestFnByMethod("PUT"),
  delete: createRequestFnByMethod("DELETE"),
};
