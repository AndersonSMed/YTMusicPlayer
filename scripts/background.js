chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message == 'updateTabId') {
    chrome.storage.sync.set({ tabId: sender.tab.id });
  }
});