const buttons = {};

const hasButtons = () => buttons.previous && buttons.next && buttons.playPause;

const findButtons = () => {
  buttons.previous = document.getElementsByClassName('previous-button')[0];
  buttons.next = document.getElementsByClassName('next-button')[0];
  buttons.playPause = document.getElementById('play-pause-button');
}

window.onload = () => {
  setupPolling(findButtons, hasButtons());
  onMessage.addListener(handleEvent({
    [EVENTS.PLAY_PAUSE_MUSIC]: () => hasButtons() && buttons.playPause.click(),
    [EVENTS.PREVIOUS_MUSIC]: () => hasButtons() && buttons.previous.click(),
    [EVENTS.NEXT_MUSIC]: () => hasButtons() && buttons.next.click()
  }));
}