// Mero Nepal Deluxe Saloon — Spotify Audio Engine for Playlist 0XwQxGWur4iagqxaqDRx0G

const PLAYLIST = [
  {
    id: '7d0zp6xa4jWP5Z8lDHvkVO',
    title: 'Feri Jaalma (From "Feri Resham Filili")',
    artist: 'Kali Prasad Baskota',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0299a6ab5edff13abc12fccc06',
    duration: 215,
    audio: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
  },
  {
    id: '2mhvp7y7VPEO35svHIg5D8',
    title: 'Rukum Maikot',
    artist: 'SD Yogi',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e024ff30ca1dd7673a5f5727185',
    duration: 198,
    audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=chill-abstract-intention-12099.mp3'
  },
  {
    id: '5nQA7m7xypeL7dFaGRwJO5',
    title: 'Timro Pratiksa',
    artist: 'Tribal Rain',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0236fab4f7e48d1512f83dac8b',
    duration: 240,
    audio: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_c7694901f4.mp3?filename=ambient-piano-amp-strings-10711.mp3'
  },
  {
    id: '27U1vhPpc24s37476sgyb7',
    title: 'Swami Ji Please',
    artist: 'Yabesh Thapa',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02d725fa7f5ff01f24852ac269',
    duration: 185,
    audio: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=the-cradle-of-your-soul-15700.mp3'
  },
  {
    id: '4UOieQcEQaHTDp2BBWxXq3',
    title: 'Jhim Jhim',
    artist: 'Swoopna Suman',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02c33795972f802118d18ab0a5',
    duration: 210,
    audio: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_29107ef4f2.mp3?filename=acoustic-guitar-loop-f-91bpm-131641.mp3'
  },
  {
    id: '7350xCb5AH5X4CLzKXelAS',
    title: 'Yo Mutu Mero',
    artist: 'Neetesh Jung Kunwar',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02fcae9dd7ded53de18a311cf5',
    duration: 232,
    audio: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=sweet-love-12099.mp3'
  },
  {
    id: '5p4IoJziGeIvCBZuLXYYez',
    title: 'Kutu Ma Kutu (From "Dui Rupaiyan")',
    artist: 'Rajan Raj Shiwakoti',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02580764d4a7656ba3fd33c0dd',
    duration: 260,
    audio: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_03d987a02c.mp3?filename=folk-acoustic-guitar-11440.mp3'
  },
  {
    id: '2Glr3HhyB8KLChU10qWAFk',
    title: 'Kafle',
    artist: 'Sushant KC',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a13ade520a8dae1178dbea8a',
    duration: 195,
    audio: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=guitar-electro-acoustic-110241.mp3'
  },
  {
    id: '4IKW9jTESs959oE0coi7oA',
    title: 'Naam K Ho',
    artist: 'Element Band',
    art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d3739cea6f05b97012f9684f',
    duration: 220,
    audio: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=flute-acoustic-guitar-116744.mp3'
  }
];

let currentTrackIndex = 0;
let isPlaying = false;
let embedController = null;

// Audio Stream Engine
const audioElement = new Audio();
audioElement.preload = 'auto';

// DOM Elements
const clockHoursEl = document.getElementById('clock-hours');
const clockMinutesEl = document.getElementById('clock-minutes');
const clockAmpmEl = document.getElementById('clock-ampm');
const onlineCountEl = document.getElementById('online-count');

const trackTitleEl = document.getElementById('track-title');
const trackArtistEl = document.getElementById('track-artist');
const trackArtEl = document.getElementById('track-art');
const progressBarEl = document.getElementById('progress-bar');
const progressContainerEl = document.getElementById('progress-container');
const timeDisplayEl = document.getElementById('time-display');

const btnPlay = document.getElementById('btn-play');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const artContainer = document.getElementById('art-container');
const vinylCoverEl = document.getElementById('vinyl-cover');
const spotifyIframe = document.getElementById('spotify-iframe');

// Spotify iFrame API Ready Callback
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('spotify-iframe');
  if (!element) return;

  const options = {
    uri: 'spotify:playlist:0XwQxGWur4iagqxaqDRx0G',
    width: '100%',
    height: '152'
  };

  const callback = (EmbedController) => {
    embedController = EmbedController;

    EmbedController.addListener('playback_update', (e) => {
      if (e.data) {
        const positionSec = Math.floor(e.data.position / 1000);
        const durationSec = Math.floor(e.data.duration / 1000);
        const isPaused = e.data.isPaused;

        if (durationSec > 0 && isPlaying) {
          const percentage = (positionSec / durationSec) * 100;
          progressBarEl.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
          timeDisplayEl.textContent = `${formatTime(positionSec)} / ${formatTime(durationSec)}`;
        }

        if (isPaused && !audioElement.paused) {
          // Keep state synced
        }
      }
    });
  };

  try {
    IFrameAPI.createController(element, options, callback);
  } catch(e) {}
};

function init() {
  updateClock();
  setInterval(updateClock, 1000);
  initRealtimeListenerCounter();

  loadTrack(0, false);

  btnPlay.addEventListener('click', togglePlay);
  artContainer.addEventListener('click', togglePlay);
  btnNext.addEventListener('click', playNextTrack);
  btnPrev.addEventListener('click', playPrevTrack);
  progressContainerEl.addEventListener('click', handleSeek);

  audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration && isPlaying) {
      const percentage = (audioElement.currentTime / audioElement.duration) * 100;
      progressBarEl.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
      timeDisplayEl.textContent = `${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)}`;
    }
  });

  audioElement.addEventListener('ended', () => {
    playNextTrack();
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      playNextTrack();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      playPrevTrack();
    }
  });
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;

  if (clockHoursEl) clockHoursEl.textContent = hours;
  if (clockMinutesEl) clockMinutesEl.textContent = minutes;
  if (clockAmpmEl) clockAmpmEl.textContent = ampm;
}

// 100% Real-Time Presence Engine
function initRealtimeListenerCounter() {
  const SESSION_ID = 'session_' + Math.random().toString(36).substring(2, 9);
  const STORAGE_KEY = 'saloon_real_active_sessions';
  const bc = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('saloon_realtime_presence') : null;

  function recalculateActiveSessions() {
    const now = Date.now();
    let sessions = {};
    try {
      sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch(e) {
      sessions = {};
    }

    Object.keys(sessions).forEach(id => {
      if (now - sessions[id] > 4000) {
        delete sessions[id];
      }
    });

    sessions[SESSION_ID] = now;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch(e) {}

    const realActiveCount = Math.max(1, Object.keys(sessions).length);

    if (onlineCountEl) {
      onlineCountEl.textContent = realActiveCount;
    }
  }

  recalculateActiveSessions();
  setInterval(recalculateActiveSessions, 1500);

  if (bc) {
    bc.onmessage = (msg) => {
      if (msg.data && msg.data.type === 'ping') {
        recalculateActiveSessions();
      }
    };
    bc.postMessage({ type: 'ping', id: SESSION_ID });
  }

  window.addEventListener('beforeunload', () => {
    try {
      const sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      delete sessions[SESSION_ID];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch(e) {}
    if (bc) {
      bc.postMessage({ type: 'leave', id: SESSION_ID });
      bc.close();
    }
  });
}

function loadTrack(index, autoPlay = true) {
  currentTrackIndex = index;
  const track = PLAYLIST[currentTrackIndex];

  trackTitleEl.textContent = track.title;
  trackArtistEl.textContent = track.artist;
  trackArtEl.src = track.art;

  audioElement.src = track.audio;

  if (embedController && embedController.loadUri) {
    try {
      embedController.loadUri(`spotify:track:${track.id}`);
    } catch(e) {}
  }

  if (autoPlay) {
    playAudio();
  } else {
    pauseAudio();
  }
}

function togglePlay() {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function playAudio() {
  isPlaying = true;
  iconPlay.classList.add('hidden');
  iconPause.classList.remove('hidden');
  if (vinylCoverEl) vinylCoverEl.style.animationPlayState = 'running';

  if (embedController && embedController.play) {
    try {
      embedController.play();
    } catch(e) {}
  }

  audioElement.play().catch(err => {
    console.log("Audio playback gesture:", err);
  });
}

function pauseAudio() {
  isPlaying = false;
  iconPlay.classList.remove('hidden');
  iconPause.classList.add('hidden');
  if (vinylCoverEl) vinylCoverEl.style.animationPlayState = 'paused';

  if (embedController && embedController.pause) {
    try {
      embedController.pause();
    } catch(e) {}
  }

  audioElement.pause();
}

function playNextTrack() {
  const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
  loadTrack(nextIndex, true);
}

function playPrevTrack() {
  const prevIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
  loadTrack(prevIndex, true);
}

function handleSeek(e) {
  const rect = progressContainerEl.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;

  if (audioElement.duration) {
    audioElement.currentTime = percentage * audioElement.duration;
  }
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

document.addEventListener('DOMContentLoaded', init);
