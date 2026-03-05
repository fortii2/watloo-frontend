const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

function normalizeApiBaseUrl(value: string): string {
  try {
    return new URL(value).toString();
  } catch {
    throw new Error(
      "Invalid VITE_API_BASE_URL. Use a full URL such as https://api.example.com",
    );
  }
}

export function buildApiUrl(path: string, params?: Record<string, string>): string {
  const url = rawApiBaseUrl
    ? new URL(path, normalizeApiBaseUrl(rawApiBaseUrl))
    : new URL(path, window.location.origin);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  if (!rawApiBaseUrl && import.meta.env.DEV) {
    return `${url.pathname}${url.search}`;
  }

  return url.toString();
}

export async function extractApiError(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const data = (await response.json()) as { message?: string; code?: string };
      if (data.message) {
        return data.code ? `${data.code}: ${data.message}` : data.message;
      }
    } catch {
      // Ignore malformed error payloads and fall through to HTTP status.
    }
  }

  return `HTTP ${response.status}`;
}
