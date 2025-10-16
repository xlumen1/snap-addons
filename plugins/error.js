// error.js
// A plugin that throws an error during its tick function to test error handling.

console.log("Error plugin loaded");

GlobalRegistry.register("error", () => {
    console.log("Error plugin initialized");
},
() => {
    throw new Error("This is a test error from the Error plugin's tick function.");
},
() => {
    console.log("Error plugin unloaded");
}
);