/**
 * dynamic load style
 * @param url
 */
export default function loadStyle(url) {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}
