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
  script.src = url;
  document.documentElement.appendChild(script);
  script.onload = () => script.remove();
}
