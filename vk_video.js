window.onload = function () {
  // eslint-disable-next-line prefer-const

  const newTimecode = (play) => {
    const id = play.baseURI;
    const time = play.currentTime;
    const obj = {
      data: [{
        id,
        time,
      }],
    };
    localStorage.setItem('timecode_player', JSON.stringify(obj));
  };
  const createTimecode = (play) => {
    const timecodePlayer = localStorage.getItem('timecode_player').data;

    const id = play.baseURI;
    const time = play.currentTime;
    const obj = {
      data: [{
        id,
        time,
      }],
    };
    timecodePlayer.push(JSON.stringify(obj));
  };

  function checkTimecode() {
    const play = document.getElementsByClassName('videoplayer_media_provider')[0];
    const timecodePlayer = localStorage.getItem('timecode_player').data;
    if (timecodePlayer) {
      if (play && 'baseURI' in play) {
        const findID = timecodePlayer.findIndex((x) => x.id === play.baseURI);
        if (findID) {
          timecodePlayer[findID].time = play.currentTime;
        } else {
          createTimecode(play);
        }
      }
    } else {
      newTimecode(play);
    }
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
