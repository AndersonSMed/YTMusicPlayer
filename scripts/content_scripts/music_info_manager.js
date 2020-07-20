const hasValidValues = data =>
    Object.values(data).reduce((acc, val) => acc && val, true);

window.onload = () => {
  setupPolling(() => {
    const middleControls = document.querySelector('.middle-controls');
    if (middleControls) {
      const image = middleControls.querySelector('img');
      const title = middleControls.querySelector('.title');

      const data = {
        musicTitle: title && title.innerText,
        musicThumbnail: image && image.src
      }

      hasValidValues(data) && updateLocalStorage(data, EVENTS.MUSIC_INFO_UPDATED);
    }
  });
}