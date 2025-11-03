const rawBase = (import.meta.env.VITE_API_BASE_URL ?? "").trim();
const normalizedBase =
  rawBase.length === 0
    ? ""
    : /^https?:\/\//i.test(rawBase)
        ? rawBase
        : `https://${rawBase}`;

const sanitizedBase =
  normalizedBase.length === 0
    ? ""
    : normalizedBase.replace(/\/+$/, "");

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
