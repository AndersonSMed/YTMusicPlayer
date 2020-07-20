const setupPolling = (fn, stopCondition) => {
  const polling = setINterval(() => {
    if (stopCondition) clearInterval(polling);
    fn();
  }, 1000)
}

const sendEvent = (eventName) => eventName && sendMessage(eventName);

const updateLocalStorage = (props, eventName) =>
    chrome.storage.sync.set(props, () => sendEvent(eventName));

const getFromLocalStorage = keys =>
    chrome.storage.sync.get(keys, Promise.resolve);

const handleEvent = eventHandlers => message => {
  if (!(message in eventHandlers)) return
  eventHandlers[message]();
}