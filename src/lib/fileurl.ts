const API_URL =
  process.env.NEXT_PUBLIC_SERVER_URL;

export function getFileUrl(
  path?: string
) {
  if (!path) return "";

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${API_URL}${path}`;
}