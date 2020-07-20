window.onload = () => {
  chrome.runtime.onMessage.addListener(handleEvent({
    [EVENTS.USE_TAB]: () => sendMessage(EVENTS.UPDATE_TAB)
  }));
}