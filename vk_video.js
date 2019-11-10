window.onload = function() {
	const play = document.getElementsByClassName("videoplayer_media_provider")[0];
	let timecode_player = localStorage.getItem("timecode_player");

	if (play.baseURI !== ) {

	}
	const createSaveTimecode = () => {

	}
	
	
	if(play.baseURI === timecode_player.baseURI)
	if (play) {
		localStorage.setItem("timecode_player", {
			time: play.currentTime,
			uri: play.baseURI
		});
	}
};
