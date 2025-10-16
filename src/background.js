var browser = require("webextension-polyfill");

browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.set({
    plugins: {
      autoJsEnable: {
        enabled: true,
        description: "Automatically enable JavaScript in Snap!",
        script: "plugins/autoJsEnable.js",
      },
    }
  });
});

browser.runtime.onMessage.addListener(async (msg) => {
  if (msg.type === "get_plugins") {
    const data = await browser.storage.local.get("plugins");
    return data.plugins || {};
  }
});
