const songsDir = "songs";

const website = "http://127.0.0.1:3000/";
const songsDirLink = website + songsDir + "/";
const LOGS = 0;

let allSongs = []; // contains all songs present in /songs/*
let allAlbums = []; // contains albumObject entry for all albums present in /songs/*

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

    if (LOGS)
        console.log(allAlbums);
}

function generateAllSongsCards() {
    let x = document.querySelector(".libcardcontainer");
    allSongs.forEach(song => {
        let newElem = document.createElement("div");
        newElem.innerHTML = `<div class="libcard bg-grey curve flex aligncenter jcspacebw">
                                <img src="/assets/music.svg" alt="" class="invert">
                                <div class="songAndArtistName">
                                    <div class="songName">${song}</div>
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
                                <h3>${album.title}</h3>
                                <p>${album.description}</p>
                            </div>`;
        x.appendChild(newElem);
    });
}

async function main() {
    await parseSongsDir();// populates allSongs array and allAlbums array

    console.log(allAlbums);
    console.log(allSongs);

    await generateAllSongsCards();

    await generateAllAlbumCards();

}

main();