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
    window.jsonTimecodePlayer.push(obj);
  };

  function ViewContinue(play) {
    // todo Add obs.dis and check new added video
    play.pause();
    // eslint-disable-next-line no-param-reassign
    play.style.filter = 'blur(10px)';
  }

  function checkTimecode() {
    const timecodePlayer = localStorage.getItem('timecode_player');
    window.jsonTimecodePlayer = JSON.parse(timecodePlayer) || [];
    const play = document.getElementsByClassName('videoplayer_media_provider')[0];

    if (window.jsonTimecodePlayer) {
      if (play && 'baseURI' in play) {
        const findID = window.jsonTimecodePlayer.findIndex((x) => x.id === play.baseURI);
        if (findID !== -1) {
          ViewContinue(play);
          window.jsonTimecodePlayer[findID].time = play.currentTime;
        } else {
          createTimecode(play);
        }
      }
    } else {
      newTimecode(play);
    }
    return localStorage.setItem('timecode_player', JSON.stringify(window.jsonTimecodePlayer));
  }

  const that = this;
  that.interval = setInterval(() => {
    const target = document.getElementsByClassName('videoplayer_media_provider')[0];
    if (target) {
      window.observer = new MutationObserver(checkTimecode);
      window.observer.observe(document.documentElement, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true,
      });
      clearInterval(that.interval);
    }
  }, 1000);
};
