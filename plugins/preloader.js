// preloader.js
// A preloader script that manages plugin states and adds simple apis.

console.log("Setting up plugin preloader...");

var plugins = {};

var GlobalRegistry = {
    // Stores api functions
    register: (pluginId, loadFunction, tickFunction, unloadFunction) => {
        if (!plugins[pluginId]) {
            plugins[pluginId] = {};
        }
        loadFunction();
        plugins[pluginId].tick = tickFunction;
        plugins[pluginId].unload = () => {unloadFunction(); delete plugins[pluginId];};
        document.getElementById(`snap-addons-plugin-${pluginId}`).remove();
    },
};

setInterval(() => {
    for (p in plugins) {
        if (plugins[p].tick) {
            try {
                plugins[p].tick();
            } catch (e) {
                console.error(`Error in plugin ${p} tick:`, e);
                if (plugins[p].unload) {
                    plugins[p].unload();
                }
                delete plugins[p];
            }
        }
    }
}, 1000);
