window.onload = () => {
  let previousButton = null;
  let nextButton = null;
  let playPauseButton = null;

  const interval = setInterval(() => {
    previousButton = document.getElementsByClassName('previous-button')[0];
    nextButton = document.getElementsByClassName('next-button')[0];
    playPauseButton = document.getElementById('play-pause-button');
    if (previousButton && nextButton && playPauseButton) {
      clearInterval(interval);
    }
  }, 1000);

  const infoPolling = setInterval(() => {
    const container = document.querySelector('.middle-controls');
    if (container) {
      const image = container.querySelector('img');
      const titleContainer = container.querySelector('.title');
      const musicTitle = titleContainer && titleContainer.innerText;
      const musicThumbnail = image && image.src;
      chrome.storage.sync.set({ musicTitle, musicThumbnail }, () => {
        chrome.runtime.sendMessage('musicInfoUpdated');
      });
    }
  }, 1000);

  const events = {
    play_pause: () => playPauseButton && playPauseButton.click(),
    previous: () => previousButton && previousButton.click(),
    next: () => nextButton && nextButton.click()
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message in events) {
      const event = events[message];
      event();
      sendResponse('ok');
    };
  });

  chrome.tabs.onRemoved.addListener((tabId, info) => {
    chrome.storage.sync.get(['tabId'], (result) => {
      if (result.tabId == tabId) {
        clearInterval(infoPolling);
      }
    })
  });
}