const rawBase = (import.meta.env.VITE_API_BASE_URL ?? "").trim();
const sanitizedBase =
  rawBase.length === 0
    ? ""
    : rawBase.replace(/\/+$/, "");

export function withApiBase(path: string): string {
  if (!sanitizedBase) {
    return path;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (!path.startsWith("/")) {
    return `${sanitizedBase}/${path}`;
  }

  return `${sanitizedBase}${path}`;
}

export function getApiBase(): string {
  return sanitizedBase;
}
