import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { withApiBase } from "@/lib/api-base";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function throwIfResNotOk(res: Response) {
  if (res.ok) {
    return;
  }

  let payload: unknown;
  try {
    payload = await res.clone().json();
  } catch {
    // Ignore JSON parse errors; fallback to text below.
  }

  let message = res.statusText || "An unexpected error occurred.";
  let code = "UNKNOWN_ERROR";

  if (payload && typeof payload === "object") {
    const data = payload as Record<string, unknown>;
    if (typeof data.message === "string" && data.message.trim().length > 0) {
      message = data.message;
    }
    if (typeof data.code === "string" && data.code.trim().length > 0) {
      code = data.code;
    }
  }

  if (message === res.statusText || message === "An unexpected error occurred.") {
    try {
      const text = await res.clone().text();
      if (text) {
        message = text;
      }
    } catch {
      // ignore - no better message available
    }
  }

  throw new ApiError(message, res.status, code, payload);
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(withApiBase(url), {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn = <T>({
  on401: unauthorizedBehavior,
}: {
  on401: UnauthorizedBehavior;
}): QueryFunction<T> =>
  async ({ queryKey }) => {
    const res = await fetch(withApiBase(queryKey[0] as string), {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null as unknown as T;
    }

    await throwIfResNotOk(res);
    return (await res.json()) as T;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
