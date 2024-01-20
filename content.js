const runModule = async (arg) => {
  const src = chrome.runtime.getURL("module.js");
  const script = await import(src);
  script.translate();
};

// load extension shortcut settings
whale.storage.sync.get(
  {
    Key: "F8",
    Short: 1,
    Alt: 0,
    Shift: 0,
    Ctrl: 0,
  },
  (items) => {
    key = items.Key;
    short = items.Short;
    alt = items.Alt;
    shift = items.Shift;
    ctrl = items.Ctrl;
  }
);

// when contextMenu clicked
chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>
  sendResponse(runModule(request.arg))
);

// when shortcut pressed
window.onkeyup = (e) => {
  if (
    short &&
    e.key.toUpperCase() == key.toUpperCase() &&
    e.ctrlKey == ctrl &&
    e.shiftKey == shift &&
    e.altKey == alt
  ) {
    e.preventDefault();
    runModule();
  }
};
