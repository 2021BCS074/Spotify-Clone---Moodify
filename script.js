let songIndex = 0;
let audioElement = new Audio('songs/7deva.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById("gif");
let masterSongName = document.getElementById('masterSongName');
let heroArt = document.getElementById('hero-art');
let bgBlur = document.getElementById('bg-blur');
let volumeSlider = document.getElementById('volumeSlider');
let volumeIcon = document.getElementById('volumeIcon');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Transition Elements
let diveInBtn = document.getElementById('dive-in-btn');
let homeHero = document.getElementById('home-hero');
let playlistSection = document.getElementById('playlist-section');
let heroPlayerArt = document.getElementById('hero-player-art');

let lastVolume = 0.7;

const songs = [
    {songName: "Deva Shree Ganesha", filePath: "songs/7deva.mp3", coverPath: "covers/deva.jpg", mood: "energetic"},
    {songName: "Achutam Keshavam", filePath: "songs/3achutam.mp3", coverPath: "covers/achutam.jpg", mood: "focus"},
    {songName: "Illegal Weapon", filePath: "songs/1illegal.mp3", coverPath: "covers/illegal.jpg", mood: "energetic"},
    {songName: "Chogada", filePath: "songs/9chogada.mp3", coverPath: "covers/chogada.jpg", mood: "energetic"},
    {songName: "Shambhu Sutaya", filePath: "songs/2Shambu.mp3", coverPath: "covers/Shambhu.jpg", mood: "energetic"},
    {songName: "Sadda Dil Vi Tu", filePath: "songs/4sadda.mp3", coverPath: "covers/sadda.jpg", mood: "energetic"},
    {songName: "Chidiya", filePath: "songs/10chidiya.mp3", coverPath: "covers/chidiya.jpg", mood: "chill"},
    {songName: "Tu Hi Hai Aashiqui", filePath: "songs/12aashiqui.mp3", coverPath: "covers/tuhihai.jpg", mood: "romantic"},
    {songName: "Tum Prem Ho", filePath: "songs/11premho.mp3", coverPath: "covers/premho.jpg", mood: "romantic"},
    {songName: "Agar Tum Saath Ho", filePath: "songs/5agar.mp3", coverPath: "covers/tumsaath.jpg", mood: "romantic"},
    {songName: "Dum Dum", filePath: "songs/8dum.mp3", coverPath: "covers/dum.jpg", mood: "chill"},
    {songName: "Shiv Stotram", filePath: "songs/6stotram.mp3", coverPath: "covers/stotram.jpg", mood: "focus"}
];

const moodColors = {
    energetic: "rgba(255, 69, 0, 0.4)",
    focus: "rgba(0, 242, 255, 0.3)",
    chill: "rgba(144, 238, 144, 0.3)",
    romantic: "rgba(255, 105, 180, 0.3)"
};

const musicQuotes = {
    'Home': { text: "Where words fail, music speaks.", context: "Welcome to your personal soundscape." },
    'Explore': { text: "Music is the shorthand of emotion.", context: "Discover the rhythms that move your soul." },
    'Moods': { text: "The tune is the light, the lyrics are the shadows.", context: "Find the perfect melody for your feeling." }
};

// --- FEATURE: DIVE IN TRANSITION ---
diveInBtn.addEventListener('click', () => {
    homeHero.style.display = "none";
    playlistSection.style.display = "flex";
    heroPlayerArt.style.display = "flex";
    showLibrary();
});

// --- FEATURE: VOLUME & MUTE ---
volumeSlider.addEventListener('input', (e) => {
    audioElement.volume = e.target.value;
    if(audioElement.volume == 0) volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    else volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
});

volumeIcon.addEventListener('click', () => {
    if (audioElement.volume > 0) {
        lastVolume = audioElement.volume;
        audioElement.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
        audioElement.volume = lastVolume;
        volumeSlider.value = lastVolume;
        volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
});

// --- FEATURE: KEYBOARD SHORTCUTS ---
document.addEventListener('keydown', (e) => {
    if (e.code === "Space") { e.preventDefault(); masterPlay.click(); }
    if (e.code === "ArrowRight") audioElement.currentTime += 5;
    if (e.code === "ArrowLeft") audioElement.currentTime -= 5;
    if (e.code === "KeyM") volumeIcon.click();
});

// --- CORE PLAYER LOGIC ---
const updatePlayer = () => {
    const currentSong = songs[songIndex];
    audioElement.src = currentSong.filePath;
    masterSongName.innerText = currentSong.songName;
    heroArt.src = currentSong.coverPath;
    bgBlur.style.backgroundImage = `url(${currentSong.coverPath})`;
    
    // Dynamic Mood Background
    const overlay = document.querySelector('.overlay');
    overlay.style.background = `radial-gradient(circle at center, ${moodColors[currentSong.mood] || 'transparent'}, #000 95%)`;
    
    audioElement.play();
    masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
    gif.style.opacity = 1;
}

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    myProgressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

function showLibrary() {
    document.getElementById('quotes-view').style.display = "none";
    document.getElementById('songItemsContainer').style.display = "block";
    document.getElementById('moodFilterContainer').style.display = "flex";
    document.getElementById('listHeading').innerText = "Taal: Your Playlist";
    filterMood('all');
}

function showQuotes(tabName) {
    if(tabName === 'Home'){
        homeHero.style.display = "flex";
        playlistSection.style.display = "none";
        heroPlayerArt.style.display = "none";
    } else {
        homeHero.style.display = "none";
        playlistSection.style.display = "flex";
        heroPlayerArt.style.display = "flex";
        document.getElementById('songItemsContainer').style.display = "none";
        document.getElementById('moodFilterContainer').style.display = "none";
        document.getElementById('quotes-view').style.display = "block";
        document.getElementById('listHeading').innerText = tabName;
        document.getElementById('quote-text').innerText = musicQuotes[tabName].text;
        document.getElementById('quote-context').innerText = musicQuotes[tabName].context;
    }
}

function filterMood(mood, btn) {
    if(btn) {
        document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    songItems.forEach(item => {
        let itemMood = item.getAttribute('data-mood');
        item.style.display = (mood === 'all' || itemMood === mood) ? "flex" : "none";
    });
}

songItems.forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.currentTarget.id);
        updatePlayer();
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    updatePlayer();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
    updatePlayer();
});

// Init
bgBlur.style.backgroundImage = `url(${songs[0].coverPath})`;
audioElement.volume = 0.7;