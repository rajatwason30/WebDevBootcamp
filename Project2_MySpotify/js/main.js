const songsDir = "songs";

const website = "http://127.0.0.1:3000/";
const songsDirLink = website + songsDir + "/";
const LOGS = 0;

let currentSong = "";
let currentSongIndex=0;
let isSongBeingPlayed = false;
let audio = null;
let songQueue = [];
let allSongs = []; // contains all songs present in /songs/*
let allAlbums = []; // contains albumObject entry for all albums present in /songs/*
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume-control');

// album name  vs list of songs
let albumObject = {
    "path": "",
    "albumIcon": "",
    "title": "",
    "description": "",
    "songs": []
};

async function fetchAndParseJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
    }
}

async function getAlbumObject(albumDirLink) {
    const response = await fetch(albumDirLink);
    const htmlString = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    let allATags = doc.getElementsByTagName("a");
    let baseDir = albumDirLink.split(website)[1];
    let albumIcon, albumTitle, albumDescription;
    let songsInAlbum = [];
    for (let index = 1; index < allATags.length; index++) {
        const fileInAlbum = allATags[index].innerHTML;
        if (fileInAlbum.endsWith(".jpg")) {
            albumIcon = baseDir + fileInAlbum;
        } else if (fileInAlbum.endsWith(".json")) {
            //open json and read title and description
            if (LOGS)
                console.log("IN >JSON >>>>> " + baseDir + fileInAlbum)
            let jsonUrl = website + baseDir + fileInAlbum;

            const jo = await fetchAndParseJSON(jsonUrl);

            if (LOGS)
                console.log(jo);

            albumTitle = jo.title;
            albumDescription = jo.description;

        } else if (fileInAlbum.endsWith(".mp3") || fileInAlbum.endsWith(".m4a")) {
            allSongs.push(baseDir + fileInAlbum);
            songsInAlbum.push(baseDir + fileInAlbum);
        }
    }
    let thisAlbumObject = JSON.parse(JSON.stringify(albumObject));
    thisAlbumObject.path = baseDir;
    thisAlbumObject.albumIcon = albumIcon;
    thisAlbumObject.title = albumTitle;
    thisAlbumObject.description = albumDescription;
    thisAlbumObject.songs = songsInAlbum;

    return thisAlbumObject;
}

async function parseSongsDir() {
    const response = await fetch(songsDirLink);
    const htmlString = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    let allATags = doc.getElementsByTagName("a");

    for (let index = 1; index < allATags.length; index++) {
        const albumDir = allATags[index].innerHTML;
        allAlbums.push(await getAlbumObject(songsDirLink + albumDir))
    }

    if(LOGS){
        console.log(allAlbums);
        console.log(allSongs);
    }
}

function generateAllSongsCards() {
    let x = document.querySelector(".libcardcontainer");
    allSongs.forEach(song => {
        let songName = getSongNameFromSongPath(song);
        // console.log("SONG NAME====> " +  songName);
        let newElem = document.createElement("div");
        newElem.innerHTML = `<div class="libcard bg-grey curve flex aligncenter jcspacebw">
                                <img src="/assets/music.svg" alt="" class="invert">
                                <div class="songAndArtistName">
                                    <div class="songName">${songName}</div>
                                    <div class="artistName">Artist</div>
                                </div>
                                <img src="assets/largePlay.svg" alt="">
                            </div>`;
        x.appendChild(newElem);
    });
}

function generateAllAlbumCards(){
    let x = document.querySelector(".playlistct");
    allAlbums.forEach(album => {
        let newElem = document.createElement("div");
        newElem.innerHTML = `<div class="card bg-darkgrey curve">
                                <img class="curve" src="${album.albumIcon}" alt="">
                                <div class="albumplay">
                                    <img class="invert" src="/assets/largePlay.svg" alt="play">
                                </div>
                                <h3>${album.title}</h3>
                                <p>${album.description}</p>
                            </div>`;
        x.appendChild(newElem);
    });
}

async function checkPath(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            console.log('URL exists!');
            return true;
        } else {
            console.log('URL does not exist.');
            return false;
        }
    } catch (err) {
        console.log('URL does not exist.');
    }
}

function getSongNameFromSongPath(song){
    let songName = song.split("/");
    songName = songName[songName.length - 1];
    songName = songName.split(".");
    songName = songName[0];
    return songName;
}

function updateSeekBarName(songpath){
    let songName = getSongNameFromSongPath(songpath);
    let x = document.querySelector(".currentSong");
    x.innerHTML=songName;
}

async function playNextSongInQueue(){
    if(currentSongIndex<songQueue.length){
        let songpath = songQueue[currentSongIndex];
        currentSongIndex++;
        if(await checkPath(website+songpath)){
            if(audio==null){
                audio = new Audio(songpath);
            }
            if(isSongBeingPlayed){
                audio.pause();
                audio = new Audio(songpath);
            }else if(!isSongBeingPlayed && audio!=null){
                audio = new Audio(songpath);
                isSongBeingPlayed = true;
            }else{
                isSongBeingPlayed = true;
            }
            audio.play();
            currentSong = songpath;
            updateSeekBarName(currentSong);
            let imgdiv = document.querySelector(".play>img");
            imgdiv.setAttribute("src","/assets/pause.svg");
            audio.addEventListener('ended', () => {
                playNextSongInQueue();
            });
            audio.addEventListener('timeupdate', () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                // let scrollCircle = document.querySelector(".scrollcircle");
                // scrollCircle.style.left=`${progress}%`;
                progressBar.value = progress;
            });
        }
    }
}

async function playPreviousSongInQueue(){
    currentSongIndex-=2;
    playNextSongInQueue();
}

function playPauseCurrentSong(){
    if(audio!=null){
        if(isSongBeingPlayed){
            audio.pause();
            let imgdiv = document.querySelector(".play>img");
            imgdiv.setAttribute("src","/assets/play.svg");
            isSongBeingPlayed= false;
        }else{
            audio.play();
            let imgdiv = document.querySelector(".play>img");
            imgdiv.setAttribute("src","/assets/pause.svg");
            isSongBeingPlayed = true;
        }
    }
}

async function setAndPlayCurrentSong(songs){
    songQueue = songs;
    currentSongIndex=0;
    playNextSongInQueue();
}

function handleClick(songs) {
    setAndPlayCurrentSong(songs);
}

function clickOnCard(songs){
    let x= document.querySelector(".show-songs-ct");
    x.innerHTML = "";
    let showAlbumSongCard = document.createElement("div");
    showAlbumSongCard.classList.add('showSongs', 'curve', 'overflowauto', 'verticalflex');
    showAlbumSongCard.innerHTML = `<div class="cross"><img src="/assets/cross.svg" alt="" srcset=""></div>`;
    songs.forEach(song => {
        let songName = getSongNameFromSongPath(song);
        showAlbumSongCard.innerHTML+= `
        <div class="libcard bg-grey curve flex aligncenter jcspacebw">
            <img src="/assets/music.svg" alt="" class="invert">
            <div class="songAndArtistName">
                <div class="songName">${songName}</div>
            </div>
        </div>`
    });
    x.appendChild(showAlbumSongCard);
    let crossElem = x.querySelector(".cross");
    crossElem.addEventListener('click',()=>{
        x.innerHTML="";
    })
}

function addEventListnerOnSongCards(){
    let x = document.querySelector(".libcardcontainer").children;
    for (let index = 0; index < x.length; index++) {
        const element = x[index].getElementsByTagName("img")[1];
        let songq = [];
        songq.push(allSongs[index]);
        element.addEventListener('click', () => handleClick(songq));
    }
}

function addEventListnerOnAlbumCards(){
    let x = document.querySelector(".playlistct").children;
    for (let index = 0; index < x.length; index++) {
        const cardelem = x[index];
        cardelem.addEventListener('click',() => clickOnCard(allAlbums[index].songs));
        const playbuttonelem = cardelem.getElementsByTagName("img")[1];
        playbuttonelem.addEventListener('click', () => handleClick(allAlbums[index].songs));
    }
}

function addEventListnerOnSeekBar(){
    let prevButton = document.querySelector(".previous");
    let nextButton = document.querySelector(".next");
    let playButton = document.querySelector(".play");
    prevButton.addEventListener('click',()=> playPreviousSongInQueue());
    nextButton.addEventListener('click',()=> playNextSongInQueue());
    playButton.addEventListener('click',()=> playPauseCurrentSong());

    progressBar.addEventListener('input', () => {
        const time = (progressBar.value / 100) * audio.duration;
        audio.currentTime = time;
    });
    
    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value;
    });
}

async function addEventListeners(){
    await addEventListnerOnSongCards();
    await addEventListnerOnAlbumCards();
    await addEventListnerOnSeekBar();
}

async function main() {
    await parseSongsDir();// populates allSongs array and allAlbums array
    await generateAllSongsCards();
    await generateAllAlbumCards();
    await addEventListeners();
}

main();