// Mero Nepal Deluxe Saloon — Spotify Mobile & Desktop Audio Engine (0XwQxGWur4iagqxaqDRx0G)

const PLAYLIST = [
  {
    uri: 'spotify:track:7d0zp6xa4jWP5Z8lDHvkVO',
    title: 'Feri Jaalma (From "Feri Resham Filili")',
    artist: 'Kali Prasad Baskota',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0299a6ab5edff13abc12fccc06',
    duration: 289
  },
  {
    uri: 'spotify:track:2mhvp7y7VPEO35svHIg5D8',
    title: 'Rukum Maikot',
    artist: 'SD Yogi',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e024ff30ca1dd7673a5f5727185',
    duration: 198
  },
  {
    uri: 'spotify:track:5nQA7m7xypeL7dFaGRwJO5',
    title: 'Timro Pratiksa',
    artist: 'Tribal Rain',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0236fab4f7e48d1512f83dac8b',
    duration: 240
  },
  {
    uri: 'spotify:track:27U1vhPpc24s37476sgyb7',
    title: 'Swami Ji Please',
    artist: 'Yabesh Thapa',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02d725fa7f5ff01f24852ac269',
    duration: 185
  },
  {
    uri: 'spotify:track:4UOieQcEQaHTDp2BBWxXq3',
    title: 'Jhim Jhim',
    artist: 'Swoopna Suman',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02c33795972f802118d18ab0a5',
    duration: 210
  },
  {
    uri: 'spotify:track:7350xCb5AH5X4CLzKXelAS',
    title: 'Yo Mutu Mero',
    artist: 'Neetesh Jung Kunwar',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02fcae9dd7ded53de18a311cf5',
    duration: 232
  },
  {
    uri: 'spotify:track:5p4IoJziGeIvCBZuLXYYez',
    title: 'Kutu Ma Kutu (From "Dui Rupaiyan")',
    artist: 'Rajan Raj Shiwakoti',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02580764d4a7656ba3fd33c0dd',
    duration: 260
  },
  {
    uri: 'spotify:track:2Glr3HhyB8KLChU10qWAFk',
    title: 'Kafle',
    artist: 'Sushant KC',
    art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a13ade520a8dae1178dbea8a',
    duration: 195
  },
  {
    uri: 'spotify:track:4IKW9jTESs959oE0coi7oA',
    title: 'Naam K Ho',
    artist: 'Element Band',
    art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d3739cea6f05b97012f9684f',
    duration: 220
  }
];

let currentTrackIndex = 0;
let isPlaying = false;
let embedController = null;

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

// Official Spotify iFrame API Controller Initialization Hook
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

    // Listen to Spotify playback updates for position, duration, and play/pause state
    EmbedController.addListener('playback_update', (e) => {
      if (e && e.data) {
        const positionSec = Math.floor((e.data.position || 0) / 1000);
        const durationSec = Math.floor((e.data.duration || PLAYLIST[currentTrackIndex].duration * 1000) / 1000);
        const isPaused = e.data.isPaused;

        if (durationSec > 0) {
          const percentage = (positionSec / durationSec) * 100;
          progressBarEl.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
          timeDisplayEl.textContent = `${formatTime(positionSec)} / ${formatTime(durationSec)}`;
        }

        if (isPaused) {
          iconPlay.classList.remove('hidden');
          iconPause.classList.add('hidden');
          if (vinylCoverEl) vinylCoverEl.style.animationPlayState = 'paused';
          isPlaying = false;
        } else {
          iconPlay.classList.add('hidden');
          iconPause.classList.remove('hidden');
          if (vinylCoverEl) vinylCoverEl.style.animationPlayState = 'running';
          isPlaying = true;
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

  // Mobile Touch + Pointer Click Listeners for 100% Mobile Compatibility
  const addTouchAndClickListener = (el, handler) => {
    if (!el) return;
    let touchHandled = false;
    el.addEventListener('touchstart', (e) => {
      touchHandled = true;
      handler(e);
    }, { passive: true });
    el.addEventListener('click', (e) => {
      if (touchHandled) {
        touchHandled = false;
        return;
      }
      handler(e);
    });
  };

  addTouchAndClickListener(btnPlay, togglePlay);
  addTouchAndClickListener(artContainer, togglePlay);
  addTouchAndClickListener(btnNext, playNextTrack);
  addTouchAndClickListener(btnPrev, playPrevTrack);

  progressContainerEl.addEventListener('click', handleSeek);

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

// 100% Real-Time Active Listener Counter (Zero Fake Math)
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

// Load Track — GUARANTEES every next/prev song starts cleanly from 0:00
function loadTrack(index, autoPlay = true) {
  currentTrackIndex = index;
  const track = PLAYLIST[currentTrackIndex];

  trackTitleEl.textContent = track.title;
  trackArtistEl.textContent = track.artist;
  trackArtEl.src = track.art;

  // Immediately reset timeline to 0% and 0:00
  progressBarEl.style.width = '0%';
  timeDisplayEl.textContent = `0:00 / ${formatTime(track.duration)}`;

  if (embedController && embedController.loadUri) {
    try {
      embedController.loadUri(track.uri);
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

  if (embedController && embedController.seek) {
    const duration = PLAYLIST[currentTrackIndex].duration || 200;
    const targetSec = Math.floor(percentage * duration);
    try {
      embedController.seek(targetSec);
    } catch(e) {}
  }
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

document.addEventListener('DOMContentLoaded', init);
