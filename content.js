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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>
  sendResponse(
    (async () => {
      const src = chrome.runtime.getURL("module.js");
      const script = await import(src);
      script.translate(request.arg);
    })()
  )
);

window.onkeyup = (e) => {
  if (
    short &&
    e.key.toUpperCase() == key.toUpperCase() &&
    e.ctrlKey == ctrl &&
    e.shiftKey == shift &&
    e.altKey == alt
  ) {
    e.preventDefault();
    (async () => {
      const src = chrome.runtime.getURL("module.js");
      const script = await import(src);
      script.translate();
    })();
  }
};
