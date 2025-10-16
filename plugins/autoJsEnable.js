console.log("Auto JS Enable plugin loaded");

GlobalRegistry.register("autoJsEnable", () => {
    Process.prototype.enableJS = true;
},
() => {},
() => {}
);
