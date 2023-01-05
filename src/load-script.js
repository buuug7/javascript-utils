/**
 * dynamic load script into html
 * @param {string} url
 */
export default function loadScript(url) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script);
}
