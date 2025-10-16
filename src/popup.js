document.getElementById('settingsButton').addEventListener('click', () => {
    window.open(browser.runtime.getURL('options.html'));
});

// Get background page info
(async () => {
  const plugins = await browser.runtime.sendMessage({ type: "get_plugins" });
  const container = document.getElementById('pluginList');

  for (const [name, info] of Object.entries(plugins)) {
    const div = document.createElement('div');
    div.className = 'plugin';

    const label = document.createElement('label');
    label.textContent = info.description;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = info.enabled;
    checkbox.addEventListener('change', () => {
      info.enabled = checkbox.checked;
      browser.storage.local.set({ plugins });
    });

    label.prepend(checkbox);
    div.appendChild(label);
    container.appendChild(div);
  }
})();