import { useCallback, useState } from "react";

const buildUrl = (baseUrl, path) =>
  `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

export const useApi = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (path, options = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(buildUrl(baseUrl, path), options);
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        if (!response.ok) {
          throw new Error(
            data?.message || response.statusText || "API request failed",
          );
        }

        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown API error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [baseUrl],
  );

  const get = useCallback((path) => request(path), [request]);
  const post = useCallback(
    (path, payload) =>
      request(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    [request],
  );
  const put = useCallback(
    (path, payload) =>
      request(path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    [request],
  );
  const del = useCallback(
    (path) =>
      request(path, {
        method: "DELETE",
      }),
    [request],
  );

  return { get, post, put, del, loading, error };
};
