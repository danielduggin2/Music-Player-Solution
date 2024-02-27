const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
    },

    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",

    },

    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
    },

    {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
  },

  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
  },

  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
  },

  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
  }
  ,
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
  },

  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
  },

  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
  },
];

// all browsers support the Web Audio API
const audio = new Audio()
// userData contains songs, song playing, & time of current song
let userData = {
    // we need to create a copy of allSongs
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
};

const playSong = (id) =>{
    const song = userData?.songs.find(song => song.id === id);
    // this tells the audio element where to find the audio data for the selected song
    audio.src = song.src;
    // tells audio element what to display as the title of the song
    audio.title = song.title;

    if(userData?.currentSong === null || userData?.currentSong.id !== song.id){
       // Check if userData?.currentSong is null or its id is not equal to song.id
        audio.currentTime = 0;
    } else{
        // from user data
        audio.currentTime = userData.songCurrentTime;
    }
    // update the current song being played
    // as well as the appearance of the playButton element
    userData.currentSong = song;

    // look for the class playing in the CSS file and add it to the playButton element
    playButton.classList.add('playing');

    highlightCurrentSong();

    setPlayerDisplay(); //ensure the player's display updates whenever a new song begins playing
    setPlayButtonAccessibleText();

    audio.play();
};

const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove("playing");
    audio.pause();
};

const playNextSong = () => {
    if(userData?.currentSong === null){
        playSong(userData?.songs[0].id);
    } else{
       const currentSongIndex = getCurrentSongIndex(); 
       const nextSong = userData?.songs[currentSongIndex + 1];
       playSong(nextSong.id);
    }

}

const playPreviousSong = () => {
    if(userData?.currentSong === null){
        // this checks if there is currently no song playing. If not, return 
        return;
    } else{
        const currentSongIndex = getCurrentSongIndex();
        const previousSong = userData?.songs[currentSongIndex - 1];
        playSong(previousSong.id);
    }
}

const shuffle = () => {
    userData?.songs.sort(() => Math.random() - 0.5);

    userData.currentSong = null; 
    userData.songCurrentTime = 0;

    // re-render songs
    renderSongs(userData?.songs);
    pauseSong();
    setPlayerDisplay();
    setPlayButtonAccessibleText();
}

const deleteSong = (id) => {
    // b4 deleting a song, we need to check if the song is currently playing.
    // If it is, we need to pause the song and play the next song in the playlist.
    if(userData?.currentSong?.id === id){
        userData.currentSong = null;
        userData.songCurrentTime  = 0;
        pauseSong();
        setPlayerDisplay();
    }
    userData.songs = userData?.songs.filter((song) => song.id !== id);
    renderSongs(userData?.songs);
    highlightCurrentSong();
    setPlayButtonAccessibleText();
}

const setPlayerDisplay = () =>{
    const playingSong = document.getElementById("player-song-title");
    const songArtist = document.getElementById("player-song-artist");
    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.artist;  

    //ternary operator that says if songArtist is truthy, print aritist, if not, return empty string
    songArtist.textContent = currentArtist ? currentArtist : '';
    playingSong.textContent = currentTitle ? currentTitle: '';

    //print out song and artist info
    console.log(playingSong.textContent);
    console.log(songArtist.textContent);
    console.log(currentTitle.textContent);
    console.log(currentArtist.textContent);
}

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

// arrow function is shorter and more concise way to write functions
// function that is assigned to a vataible
// if the func body consists of a single expression,
// you don't need the curly braces and the return. Implicit return
const renderSongs = (array) =>{
    // iterate through an array and return a new array
    // helps when you want to create a new array based on the values of an existing array
    const songsHTML = array.map((song) => {
        // line 135: play anytime the user clicks on it 
    return `
        <li id="song-${song.id}" class="playlist-song">
        <button class="playlist-song-info" onclick="playSong(${song.id})">
            <span class="playlist-song-title">${song.title}</span> 
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick="deleteSong(${song.id})">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
            </button>
        </li>
        `;
        })
        .join("");

    // this will insert the li element we made into the ul element
    playlistSongs.innerHTML = songsHTML;
};

const setPlayButtonAccessibleText = () => {
    const song = userData?.currentSong || userData?.songs[0];
    playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play");
}

// step 36: need to get the index of each song property of userData
const getCurrentSongIndex = () =>{
    return userData?.songs.indexOf(userData.currentSong);
}

// songs will start playing when the play button is clicked
playButton.addEventListener("click", () => {
    // Check if no song is currently playing
    if (userData?.currentSong === null) {
        // If no song is playing, start playing the first song in the playlist
        playSong(userData?.songs[0].id);
    } else{
        playSong(userData?.currentSong.id);
    }
});

pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);
shuffleButton.addEventListener("click", shuffle);

const sortSongs = () => {
  userData?.songs.sort((a,b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};

renderSongs(userData?.songs);