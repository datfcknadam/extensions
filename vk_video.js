window.onload = function() {

	const createSaveTimecode = (play) => {
		localStorage.setItem("timecode_player", {
			[play.baseURI]: play.currentTime,
		});
	}

	const play = document.getElementsByClassName("videoplayer_media_provider")[0];
	let timecode_player = localStorage.getItem("timecode_player");

	if (play.baseURI !== Object.values(timecode_player)[0]) {
		createSaveTimecode(play);
	}

	
	
	if(play.baseURI === timecode_player.uri)

};
