window.onload = () => {
  const previousButton = document.getElementById('previous-button');
  const playPauseButton = document.getElementById('play-pause-button');
  const nextButton = document.getElementById('next-button');
  const thumbnailImage = document.getElementsByClassName('thumbnail')[0];
  const titleContainer = document.getElementsByClassName('music-title')[0];

  const events = {
    musicInfoUpdated: () => {
      chrome.storage.sync.get(['musicThumbnail', 'musicTitle'], (result) => {
        const { musicThumbnail, musicTitle } = result;
        thumbnailImage.src = musicThumbnail;
        titleContainer.innerText = musicTitle;
      });
    }
  };

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message in events) {
      const event = events[message];
      event();
    }
  });

  const sendMessage = (message) => {
    chrome.storage.sync.get(['tabId'], (response) => {
      if (response.tabId) {
        chrome.tabs.sendMessage(response.tabId, message);
      };
    });
  };

  previousButton.onclick = () => {
    sendMessage('previous');
  };

  playPauseButton.onclick = () => {
    sendMessage('play_pause');
  };

  nextButton.onclick = () => {
    sendMessage('next');
  };
}