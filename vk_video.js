window.onload = function () {
  // eslint-disable-next-line prefer-const
  const newTimecode = (play) => {
    if ('baseURI' in play && 'currentTime' in play) {
      const id = play.baseURI;
      const time = play.currentTime;
      const obj = {
        id,
        time,
      };
      window.jsonTimecodePlayer.push(obj);
    }
  };
  const createTimecode = (play) => {
    const id = play.baseURI;
    const time = play.currentTime;
    const obj = {
      id,
      time,
    };
    console.log(obj);
    window.jsonTimecodePlayer.push(obj);
  };

  function ViewContinue() {
    const windowVideo = document.getElementsByClassName('videoplayer_media')[0];
    const windowNotification = document.createElement('div');
    windowVideo.append(windowNotification);
  }

  function checkTimecode() {
    const timecodePlayer = localStorage.getItem('timecode_player');
    window.jsonTimecodePlayer = JSON.parse(timecodePlayer) || [];

    const play = document.getElementsByClassName('videoplayer_media_provider')[0];
    if (window.jsonTimecodePlayer) {
      if (play && 'baseURI' in play) {
        const findID = window.jsonTimecodePlayer.findIndex((x) => x.id === play.baseURI);
        if (findID !== -1) {
          ViewContinue();
          window.jsonTimecodePlayer[findID].time = play.currentTime;
        } else {
          createTimecode(play);
        }
      }
    } else {
      newTimecode(play);
    }
    localStorage.setItem('timecode_player', JSON.stringify(window.jsonTimecodePlayer));
  }
  const observer = new MutationObserver(checkTimecode);

  observer.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true,
  });
};
