let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;
let curr_track = document.createElement("audio");
let track_list = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image:
      "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3",
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image:
      "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3",
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image:
      "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
  {
    name: "For the Poor",
    artist: "Dan Brasco",
    image:
      "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Dan_Brasco/Two-Tier_Society/Dan_Brasco_-_01_-_For_the_Poor.mp3",
  },
  {
    name: "For the Rich",
    artist: "Dan Brasco",
    image:
      "https://images.pexels.com/photos/3978961/pexels-photo-3978961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Dan_Brasco/Two-Tier_Society/Dan_Brasco_-_02_-_For_the_Rich.mp3",
  },
  {
    name: "Chaotic Randomness",
    artist: "Herre_Jorna",
    image:
      "https://images.pexels.com/photos/10008761/pexels-photo-10008761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Section_27/Herre_Jorna/Disorganized_Complexity_EP/Herre_Jorna_-_01_-_Chaotic_Randomness.mp3",
  },
  {
    name: "Psychedelic Motions",
    artist: "Herre_Jorna",
    image:
      "https://images.pexels.com/photos/11582120/pexels-photo-11582120.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Section_27/Herre_Jorna/Disorganized_Complexity_EP/Herre_Jorna_-_02_-_Psychedelic_Motions.mp3",
  },
  {
    name: "Twisted Connections",
    artist: "Herre_Jorna",
    image:
      "https://images.pexels.com/photos/5402480/pexels-photo-5402480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Section_27/Herre_Jorna/Disorganized_Complexity_EP/Herre_Jorna_-_06_-_Twisted_Connections.mp3",
  },
  {
    name: "Moody Mood",
    artist: "Wankers_United",
    image:
      "https://images.pexels.com/photos/3095537/pexels-photo-3095537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Wankers_United/Polygon_Soup/Wankers_United_-_02_-_Moody_Mood.mp3",
  },
  {
    name: "Accordeon Funk",
    artist: "Wankers_United",
    image:
      "https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Wankers_United/Polygon_Soup/Wankers_United_-_05_-_Accordeon_Funk.mp3",
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);

  random_bg_color();
}

function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  document.body.style.background = bgColor;
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;

  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;

  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function searchMusic(search) {
  const text = search.value;
  const arr = track_list.filter((music, index) => {
    if (music.name.includes(text)) {
      loadTrack(index);
      playTrack();
    }
  });
}

function getOptions() {
  const select = document.getElementById("select");
  track_list.map((track) => {
    var option = document.createElement("option");
    option.value = track.name;
    option.text = track.name;
    select.add(option);
  });
}

loadTrack(track_index);
getOptions();
