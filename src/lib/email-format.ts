export function escapeEmailHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[char] ?? char);
}

function renderInline(value: string) {
  const escaped = escapeEmailHtml(value);
  return escaped.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
}

/**
 * Deliberately small formatting surface for candidate emails.
 * Only **bold** is interpreted; all raw HTML remains escaped.
 */
export function renderEmailMarkdown(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${renderInline(paragraph).replaceAll("\n", "<br>")}</p>`)
    .join("");
}

/** Plain-text fallback for email clients that do not render HTML. */
export function stripEmailMarkdown(value: string) {
  return value.replace(/\*\*([^*\n]+)\*\*/g, "$1");
}
