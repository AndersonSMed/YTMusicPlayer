const EVENTS = {
  USE_TAB: 'useTab',
  UPDATE_TAB: 'updateTabId',
  PREVIOUS_MUSIC: 'previousMusic',
  PLAY_PAUSE_MUSIC: 'playPauseMusic',
  NEXT_MUSIC: 'nextMusic',
  MUSIC_INFO_UPDATED: 'musicInfoUpdated'
}

const updateLocalStorage = chrome.storage.sync.set;

const onMessage = chrome.runtime.onMessage;

const eventHandlers = {
  [EVENTS.UPDATE_TAB]: () => updateLocalStorage({ tabId: sender.tab.id })
}

const handleEvent = message => {
  if (!(message in eventHandlers)) return;
  eventHandlers[message]();
}

onMessage.addListener(handleEvent);