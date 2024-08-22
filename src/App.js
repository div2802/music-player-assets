import { useRef, useState } from 'react';
import './App.css';

function App() {

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Radioactive',
    songArtist: 'Imagine Dragons',
    songSrc: './Assets/Songs/Imagine Dragons - Radioactive.mp3',
    songAvatar: './Assets/Image/1.jpg',
  })

  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [localPlaylist, setLocalPlaylist] = useState(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);

  const currentAudio = useRef();
  // const fileInputRef = useRef();

  const togglePlaylist = () => {
    setIsPlaylistVisible(!isPlaylistVisible);
  };

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true)
    }
    else {
      currentAudio.current.pause();
      setIsAudioPlaying(false)
    }
  }


  //custom music API
  const musicAPI = [
    {
      songName: 'Radioactive',
      songArtist: 'Imagine Dragons',
      songSrc: './Assets/Songs/Imagine Dragons - Radioactive.mp3',
      songAvatar: './Assets/Image/1.jpg',
    },
    {
      songName: 'Infected',
      songArtist: 'Sickick',
      songSrc: './Assets/Songs/Infected.m4a',
      songAvatar: './Assets/Image/2.jpg',
    },
    {
      songName: 'After dark x sweater weather',
      songArtist: 'NEFFEX',
      songSrc: './Assets/Songs/After dark x sweater weather.m4a',
      songAvatar: './Assets/Image/3.jpg',
    },
    {
      songName: 'Beaver Creek',
      songArtist: 'Middle School',
      songSrc: './Assets/Songs/Beaver Creek - Middle School Topic.mp3',
      songAvatar: './Assets/Image/4.jpeg',
    },
    {
      songName: 'Daylight',
      songArtist: 'Aiguille',
      songSrc: './Assets/Songs/Daylight - Aiguille Topic.mp3',
      songAvatar: './Assets/Image/5.jpg',
    },

    {
      songName: 'Keep Going',
      songArtist: 'Sworn Topic',
      songSrc: './Assets/Songs/Keep Going - Sworn Topic.mp3',
      songAvatar: './Assets/Image/6.jpg',
    },
  ]


  // const combinedPlaylist = localPlaylist || musicAPI;

  const handlePrevSong = () => {
    console.log('handlePrevSong - musicIndex:', musicIndex);
    if (musicIndex === 0) {
      let setNumber = (localPlaylist ? localPlaylist.length : musicAPI.length) - 1;
      // let setNumber = (localPlaylist && localPlaylist.length > 0)
      //   ? localPlaylist.length - 1
      //   : musicAPI.length - 1;
      setMusicIndex(setNumber);
      const musicObject = localPlaylist
        // const musicObject = localPlaylist && localPlaylist.length > 0
        ? {
          songName: localPlaylist[setNumber].name,
          songArtist: 'Unknown Artist',
          songSrc: localPlaylist[setNumber].src,
          songAvatar: currentMusicDetails.songAvatar,
        }
        : musicAPI[setNumber];
      // updateCurrentMusicDetails(musicObject, setNumber);
      updateCurrentMusicDetails(musicObject);
    } else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber);
      const musicObject = localPlaylist
        // const musicObject = localPlaylist && localPlaylist.length > 0
        ? {
          songName: localPlaylist[setNumber].name,
          songArtist: 'Unknown Artist',
          songSrc: localPlaylist[setNumber].src,
          songAvatar: currentMusicDetails.songAvatar,
        }
        : musicAPI[setNumber];
      // updateCurrentMusicDetails(musicObject, setNumber);
      updateCurrentMusicDetails(musicObject);
    }
  };

  const handleNextSong = () => {
    console.log('handleNextSong - musicIndex:', musicIndex);
    if (isRepeat) {
      const musicObject = localPlaylist
        // const musicObject = localPlaylist && localPlaylist.length > 0
        ? {
          songName: localPlaylist[musicIndex].name,
          songArtist: 'Unknown Artist',
          songSrc: localPlaylist[musicIndex].src,
          songAvatar: currentMusicDetails.songAvatar,
        }
        : musicAPI[musicIndex];
      // updateCurrentMusicDetails(musicObject, musicIndex);
      updateCurrentMusicDetails(musicObject);
    } else {
      if (isShuffle) {
        let randomIndex = Math.floor(Math.random() * (localPlaylist ? localPlaylist.length : musicAPI.length));
        // let randomIndex = Math.floor(Math.random() * (localPlaylist && localPlaylist.length > 0 ? localPlaylist.length : musicAPI.length));
        setMusicIndex(randomIndex);
        const musicObject = localPlaylist
          // const musicObject = localPlaylist && localPlaylist.length > 0
          ? {
            songName: localPlaylist[randomIndex].name,
            songArtist: 'Unknown Artist',
            songSrc: localPlaylist[randomIndex].src,
            songAvatar: currentMusicDetails.songAvatar,
          }
          : musicAPI[randomIndex];
        // updateCurrentMusicDetails(musicObject, randomIndex);
        updateCurrentMusicDetails(musicObject);
      }
      else {
        if (musicIndex >= (localPlaylist ? localPlaylist.length : musicAPI.length) - 1) {
          // if (musicIndex >= (localPlaylist && localPlaylist.length > 0 ? localPlaylist.length : musicAPI.length) - 1) {
          let setNumber = 0;
          setMusicIndex(setNumber);
          const musicObject = localPlaylist
            // const musicObject = localPlaylist && localPlaylist.length > 0
            ? {
              songName: localPlaylist[setNumber].name,
              songArtist: 'Unknown Artist',
              songSrc: localPlaylist[setNumber].src,
              songAvatar: currentMusicDetails.songAvatar,
            }
            : musicAPI[setNumber];
          // updateCurrentMusicDetails(musicObject, setNumber);
          updateCurrentMusicDetails(musicObject);
        } else {
          let setNumber = musicIndex + 1;
          setMusicIndex(setNumber);
          const musicObject = localPlaylist
            // const musicObject = localPlaylist && localPlaylist.length > 0
            ? {
              songName: localPlaylist[setNumber].name,
              songArtist: 'Unknown Artist',
              songSrc: localPlaylist[setNumber].src,
              songAvatar: currentMusicDetails.songAvatar,
            }
            : musicAPI[setNumber];
          // updateCurrentMusicDetails(musicObject, setNumber);
          updateCurrentMusicDetails(musicObject);

        }
      }
    }
  };

  // const updateCurrentMusicDetails = (musicObject, index) => {
  const updateCurrentMusicDetails = (musicObject) => {
    setCurrentMusicDetails(musicObject);
    // setMusicIndex(index);
    if (currentAudio.current) {
      currentAudio.current.pause();
    }
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.oncanplay = () => {
      currentAudio.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
      setIsAudioPlaying(true);
    };
  };


  const handleAudioUpdate = () => {
    //total audio length
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    //current music time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress) ? 0 : progress)
  }

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 1) {
      const file = files[0];
      const objectURL = URL.createObjectURL(file);
      const musicObject = {
        songName: file.name,
        songArtist: 'Unknown Artist',
        songSrc: objectURL,
        songAvatar: "./Assets/Image/IMG-20230827-WA0027.jpg",
      };
      setLocalPlaylist(null);
      updateCurrentMusicDetails(musicObject);
    }
  };

  const handleFolderSelect = (event) => {
    const files = Array.from(event.target.files);
    const audioFiles = files.filter((file) => file.type.startsWith('audio/'));
    if (audioFiles.length > 0) {
      const playlist = audioFiles.map((file) => ({
        name: file.name,
        src: URL.createObjectURL(file),
      }));
      setLocalPlaylist(playlist);
      setMusicIndex(0);
      updateCurrentMusicDetails({
        songName: playlist[0].name,
        songArtist: 'Unknown Artist',
        songSrc: playlist[0].src,
        songAvatar: "./Assets/Image/IMG-20230827-WA0027.jpg",
      });
    }
  };

  const handleShuffleToggle = () => {
    setIsShuffle(!isShuffle);
  };

  const handleRepeatToggle = () => {
    setIsRepeat(prevState => !prevState);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="container">
        <div className="blackScreen"></div>
        <div className="left-section">
          {/* <img id="bigPicture" src="https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/850993b3fd3b450f.jpg?q=20" alt="Big Rectangular Pic" /> */}
          {/* <CarouselComponent music={musicAPI} /> */}
          <div className='headingContainer'>
            <h1 id='landingPageText'>
              Set the Vibe with Your Favorites
            </h1>
            <p id='subHeading'>Ready to groove? Click below to effortlessly upload your favorite tracks or entire playlists and transform your space into a personalized music haven! <i class="fa-solid fa-headphones fa-beat-fade" style={{
              marginLeft: '0.7rem'
            }}></i></p>
          </div>
          <div id='selectSong'>
            <label htmlFor="file-upload" className="custom-file-upload">
              Choose Track
            </label>
            <input id="file-upload" type="file" accept="audio/*" onChange={handleFileSelect} className="hidden-file-input" />

            <label htmlFor="folder-upload" className="custom-file-upload">
              Upload Playlist
            </label>
            <input id="folder-upload" type="file" webkitdirectory="" onChange={handleFolderSelect} className="hidden-file-input" />
          </div>
        </div>
        <div className="right-section">
          {/* play next song on end automatically using:  onEnded={handleNextSong} */}
          <audio src={currentMusicDetails.songSrc} ref={currentAudio} onEnded={isRepeat ? handleNextSong : undefined} onTimeUpdate={handleAudioUpdate}></audio>

          <div className="music-Container">
            <div className="dropdown">
              <i
                className={`fa-solid fa-chevron-down ${isDropdownOpen ? 'rotate' : ''}`}
                onClick={toggleDropdown}
                style={{ cursor: 'pointer' }}
              ></i>
              {isDropdownOpen && (
                <div className={`uploadMusic ${isDropdownOpen ? 'open' : ''}`}>
                  <label htmlFor="file-upload">
                    <i className="fa-solid fa-file-circle-plus"></i>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    className="hidden-file-input"
                  />
                  <label htmlFor="folder-upload">
                    <i className="fa-solid fa-folder-plus"></i>
                  </label>
                  <input
                    id="folder-upload"
                    type="file"
                    webkitdirectory=""
                    onChange={handleFolderSelect}
                    className="hidden-file-input"
                  />
                </div>
              )}
            </div>
            <span className="material-symbols-rounded togglePlaylistBtn" onClick={togglePlaylist}>
              queue_music
            </span>
            <div className={`playlistContainer ${isPlaylistVisible ? 'visible' : ''}`}>
              <div className="playlist">
                <div id='heading'>
                  <span className="material-symbols-rounded">
                    queue_music
                  </span>
                  Playlist
                  <i className="fa-solid fa-xmark closeBtn" onClick={togglePlaylist}></i>
                </div>
                <ul>
                  {localPlaylist ? (
                    localPlaylist.map((song, index) => (
                      <li
                        className={index === musicIndex ? 'selected' : ''}
                        key={index}
                        // style={{ backgroundColor: index === musicIndex ? 'rgba(0, 0, 0, 0.05)' : 'transparent' }}
                        onClick={() => updateCurrentMusicDetails({
                          songName: song.name,
                          songArtist: song.artist || 'Unknown Artist',
                          songSrc: song.src || song.songSrc,
                          songAvatar: song.avatar || './Assets/Image/IMG-20230827-WA0027.jpg',
                        }, index)}
                      >
                        <span className='listSongName'>{song.name}</span>
                        <span className='listSongArtist'>{song.songArtist || 'Unknown Artist'}</span>
                      </li>
                    ))
                  ) : currentMusicDetails.songSrc && !musicAPI.some(song => song.songSrc === currentMusicDetails.songSrc) ? (
                    <li
                      key={0}
                      className={0 === musicIndex ? 'selected' : ''}
                      // style={{ backgroundColor: 0 === musicIndex ? 'rgba(0, 0, 0, 0.05)' : 'transparent' }}
                      onClick={() => updateCurrentMusicDetails({
                        songName: currentMusicDetails.songName,
                        songArtist: currentMusicDetails.songArtist,
                        songSrc: currentMusicDetails.songSrc,
                        songAvatar: currentMusicDetails.songAvatar,
                      }, 0)}
                    >
                      {currentMusicDetails.songName}
                    </li>
                  ) : (
                    musicAPI.map((song, index) => (
                      <li
                        className={index === musicIndex ? 'selected' : ''}
                        key={index}
                        // style={{ backgroundColor: index === musicIndex ? 'rgba(0, 0, 0, 0.05)' : 'transparent' }}
                        onClick={() => updateCurrentMusicDetails(song, index)}
                      >
                        <span className='listSongName'>{song.songName}</span>
                        <span className='listSongArtist'>{song.songArtist}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            <p className="musicPlayer">MP3 Player</p>
            <img src={currentMusicDetails.songAvatar} alt="song Avatar" id='songAvatar' />
            <p className="music-Head-Name">{currentMusicDetails.songName}</p>
            <p className="music-Artist-Name">by {currentMusicDetails.songArtist}</p>
            <div className="musicTimerDiv">
              <p className="musicCurrentTime">{musicCurrentTime}</p>
              <p className="musicCurrentLength">{musicTotalLength}</p>
            </div>
            {/* <div className="progressBarContainer"> */}
            <input type="range" name="musicProgressBar" className="musicProgressBar" value={audioProgress} onChange={handleMusicProgressBar} />
            {/* </div> */}
            <div className="musicControllers">
              <i className={`fa-solid fa-shuffle ${isShuffle ? 'active' : 'inactive'}`} onClick={handleShuffleToggle}></i>
              <div id='musicControllers'>
                <i className="fa-solid fa-backward-step musicController" onClick={handlePrevSong}></i>
                <i className={`fa-solid fa-2x ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
                <i className="fa-solid fa-forward-step musicController" onClick={handleNextSong}></i>
              </div>
              <span className="material-symbols-rounded repeatBtn" onClick={handleRepeatToggle}>
                {isRepeat ? 'repeat_one' : 'repeat'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
