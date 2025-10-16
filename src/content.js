var browser = require("webextension-polyfill");

(async () => {
  const plugins = await browser.runtime.sendMessage({ type: "get_plugins" });

  for (const [name, enabled] of Object.entries(plugins)) {
    if (enabled) injectPlugin(name);
  }
})();

function injectPlugin(name) {
  const url = browser.runtime.getURL(`plugins/${name}.js`);
  const script = document.createElement("script");
  // Set script to just contain the plugin source to avoid CORS issues
  // Why is there a network error when fetching? Could it be because it needs the extension id in the URL?
  fetch(url)
    .then(response => response.text())
    .then(scriptRaw => {
      script.innerHTML = scriptRaw;
      document.documentElement.appendChild(script);
      script.onload = () => script.remove();
    });
}
