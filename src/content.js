var browser = require("webextension-polyfill");

(async () => {
  const plugins = await browser.runtime.sendMessage({ type: "get_plugins" });
  // Inject Preloader (persistent)
  (() => {
    const url = browser.runtime.getURL("plugins/preloader.js");
    const script = document.createElement("script");
    fetch(url)
      .then(response => response.text())
      .then(scriptRaw => {
        script.innerHTML = scriptRaw;
        script.id = "snap-addons-preloader";
        document.documentElement.appendChild(script);
      });
  })();
  for (p in plugins) {
    if (plugins[p].enabled) injectPlugin(p);
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
      script.id = `snap-addons-plugin-${name}`;
      document.documentElement.appendChild(script);
      script.onload = () => {
        script.remove();
        document.getElementById("snap-addons-preloader").remove();
      };
    });
}
