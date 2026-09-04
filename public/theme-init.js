// Runs before first paint. Kept external (not inline) so the CSP can stay strict.
(function () {
  try {
    var forced = new URLSearchParams(location.search).get("theme"); // ?theme=dark|light for previews
    var saved = forced || localStorage.getItem("theme");
    var dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {
    /* storage unavailable — fall back to light */
  }
})();
