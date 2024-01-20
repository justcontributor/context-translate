// landing page
chrome.runtime.onInstalled.addListener((object) => {
  chrome.contextMenus.create({
    title: "우클릭 번역",
    id: "id",
    contexts: ["selection"],
  });

  let target = chrome.runtime.getURL("options.html");
  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: target });
  }
});

// add contextMenu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab) return false;
  chrome.tabs.sendMessage(tab.id, { arg: null });
});
