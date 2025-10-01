document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const trackAlbum = document.getElementById('track-album');
    const albumCover = document.getElementById('album-cover');
    const playlistElement = document.getElementById('playlist');

    let tracks = [];
    let currentTrackIndex = 0;

    // Fetch music data from JSON file
    fetch('music.json')
        .then(response => response.json())
        .then(data => {
            tracks = data;
            loadTrack(currentTrackIndex);
            createPlaylist();
        });

    function loadTrack(trackIndex) {
        const track = tracks[trackIndex];
        audioPlayer.src = track.src;
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        trackAlbum.textContent = track.album;
        albumCover.src = track.cover;
        updateActivePlaylistItem();
    }

    function createPlaylist() {
        playlistElement.innerHTML = '';
        tracks.forEach((track, index) => {
            const li = document.createElement('li');
            li.textContent = `${track.title} - ${track.artist}`;
            li.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                playAudio();
            });
            playlistElement.appendChild(li);
        });
    }

    function updateActivePlaylistItem() {
        const listItems = playlistElement.querySelectorAll('li');
        listItems.forEach((item, index) => {
            if (index === currentTrackIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function playAudio() {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }

    function pauseAudio() {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }

    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    });

    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        playAudio();
    });

    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        playAudio();
    });

    audioPlayer.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        playAudio();
    });
});
