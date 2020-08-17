// Declaring Variables 
const inputSongName = document.getElementById("input-bar");
const searchButton = document.getElementById("search-button");
const getLyricsButton = document.getElementsByClassName("get-lyrics-button");
const lyrics = document.getElementById("lyrics");
const result = document.getElementById("result");
const api = "https://api.lyrics.ovh/";
const lyricsSection = document.getElementById("lyrics-section");
const lyricsTitle = document.getElementById("lyrics-title");

// Event For Song Name Input And Search
inputSongName.addEventListener("keyup", (e) => {
    document.getElementById("lyrics").style.display = "none";
    if (event.keyCode == 13) {
        let inputValue = inputSongName.value.trim();
        if (!inputValue) {
            alert("Please Write The Valid Song Name")
        } else {
            searchSong(inputValue);
        }
        e.preventDefault();
    }
})
// Event for Search Button 
searchButton.addEventListener("click", (e) => {
    let inputValue = inputSongName.value.trim();
    document.getElementById("lyrics").style.display = "none";
    if (!inputValue) {
        alert("Please Write The Valid Song Name")
    } else {
        searchSong(inputValue);
    }
})
// Fetching API From Website 
async function searchSong(song) {
    const res = await fetch(`${api}suggest/${song}`);
    const songData = await res.json();
    showSongInfo(songData);
}
// Showing Song Search Result From Api 
function showSongInfo(songInfo) {
    result.style.display = 'block';
    result.innerHTML = ` ${songInfo.data.map(song => `<p class="author lead song-result"><strong class="song-title">${song.title}</strong> Album by <span class="song-artist">${song.artist.name}</span> <button song-data="${song.id}" song-data-title="${song.title}" song-data-artist="${song.artist.name}" class="btn btn-success get-lyrics-button">Get Lyrics</button></p>`).join('')}`;
}
// Get lyrics for song 
result.addEventListener("click", e => {
    document.getElementById("lyrics").style.display = "block";
    clicked = e.target;
    if (clicked.tagName === "BUTTON") {
        const artistName = clicked.getAttribute("song-data-artist");
        const songTitle = clicked.getAttribute("song-data-title");
        getLyrics(artistName, songTitle);
    }
})
// displaying lyrics 
async function getLyrics(artist, songTitle){
    const res = await fetch(`${api}v1/${artist}/${songTitle}`);
    const songData = await res.json();
    const lyrics = songData.lyrics;
    lyricsTitle.innerText = songTitle;
    if (lyrics == undefined) {
        return "lyrics not found";
    } else {
        lyricsSection.innerHTML = `<pre class="lyric text-white">${lyrics}</pre>`;
    }
}
