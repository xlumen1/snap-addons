var browser = require("webextension-polyfill");

browser.runtime.onInstalled.addListener(() => {
  // Check if plugins are already set
  browser.storage.local.get("plugins").then((data) => {
    if (!data.plugins) {
      const defaultPlugins = {
        autoJsEnable: {
          shortName: "Auto JS Enable",
          description: "Automatically enables JavaScript in processes.",
          enabled: true,
        },
        errorPlugin: {
          shortName: "Error Plugin",
          description: "A plugin that throws an error every tick (for testing).",
          enabled: false,
        }
      };
      browser.storage.local.set({ plugins: defaultPlugins });
    }
  });
});

browser.runtime.onMessage.addListener(async (msg) => {
  console.log("Received message", msg);
  if (msg.type === "get_plugins") {
    const data = await browser.storage.local.get("plugins");
    return data.plugins || {};
  }
  if (msg.type === "set_plugin_state") {
    const data = await browser.storage.local.get("plugins");
    if (data.plugins && data.plugins[msg.pluginId]) {
      data.plugins[msg.pluginId].enabled = msg.enabled;
      await browser.storage.local.set({ plugins: data.plugins });
      if (!msg.enabled) {
        plugins[msg.pluginId]?.unload();
      }
      return { success: true };
    } else {
      return { success: false, error: "Plugin not found" };
    }
  }
  console.warn("Unknown message", msg);
});
