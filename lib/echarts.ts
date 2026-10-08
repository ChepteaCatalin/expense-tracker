export const textStyle = { fontFamily: 'Geist, "Geist Fallback"' } as const;

export const tooltipZIndexCss = "z-index: 40;";

const htmlEscapes: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

// ECharts renders HTML tooltip formatter output via innerHTML, so any
// user-controlled text interpolated into it must be escaped.
export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (char) => htmlEscapes[char] ?? char,
  );
}
