const EVENTS = {
  USE_TAB: 'useTab',
  UPDATE_TAB: 'updateTabId',
  PREVIOUS_MUSIC: 'previousMusic',
  PLAY_PAUSE_MUSIC: 'playPauseMusic',
  NEXT_MUSIC: 'nextMusic',
  MUSIC_INFO_UPDATED: 'musicInfoUpdated'
}

const sendMessage = chrome.runtime.sendMessage;

const onMessage = chrome.runtime.onMessage;