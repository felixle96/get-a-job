const play = require('audio-play');
const load = require('audio-loader');
 
let playBack = load('./JamesTW-Ex(Acoustic)').then(function(audioBuffer) {
    return play(audioBuffer, {
        start: 0,
        end: audioBuffer.duration,
        rate: 1,
        volume: 8,
        autoplay: true
    });
});
class Artist {
    constructor(name) {
        this.name = name;
    }
}

class Song {
    constructor(name, artist, file) {
        this.name = name;
        this.artist = artist;
        this.file;
    }
}

class CD {
    constructor(title, songs) {
        this.title = tile;
        this.songs = songs;
    }

    getNumTracks() {
        return this.songs.length;
    }

    getTracks() {
        return this.songs;
    }


}