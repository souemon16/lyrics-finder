// Declaring Variables 
const inputSongName = document.getElementById("input-bar");
const searchButton = document.getElementById("search-button");
const getLyricsButton = document.getElementsByClassName("get-lyrics-button");
const lyrics = document.getElementById("lyrics");
const result = document.getElementById("result");
const api = "https://api.lyrics.ovh/";

// Event For Song Name Input And Search
inputSongName.addEventListener("keyup", (e) => {
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
    console.log(songData);
    showSongInfo(songData);
}
// Showing Song Search Result From Api 
function showSongInfo(songInfo) {
    result.innerHTML = ` ${songInfo.data.map(song => `<p class="author lead song-result"><strong class="song-title">${song.title}</strong> Album by <span class="song-artist">${song.artist.name}</span> <button song-data="${song.id}" song-data-title="${song.title}" song-data-artist="${song.artist.name}" class="btn btn-success get-lyrics-button">Get Lyrics</button></p>`).join('')}`;
}
// Get lyrics for song 
result.addEventListener("click", e => {
    clicked = e.target;
    if (clicked.tagName === "BUTTON") {
        console.log('123');
        const artistName = clicked.getAttribute("song-data-artist");
        const songTitle = clicked.getAttribute("song-data-title");
        console.log(artistName, songTitle);
        getLyrics(artistName, songTitle);
    }
})


// function showSongInfo(songInfo) {
//     function setSongInfo(number) {
//         for (let number = 0; number <= 10; number++) {
//             document.getElementsByClassName("song-title")[number].textContent = songInfo.data[number].title;
//             document.getElementsByClassName("song-artist")[number].textContent = songInfo.data[number].artist.name;
//         }
//     }
//  setSongInfo(0);
// }