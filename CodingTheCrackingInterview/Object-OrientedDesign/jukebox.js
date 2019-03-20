const play = require('audio-play');
const load = require('audio-loader');
 
let playBack = load('./Object-OrientedDesign/JamesTW-Ex.mp3').then(function(audioBuffer) {
    console.log('playing: ', audioBuffer);
    return play(audioBuffer, {
        start: 0,
        end: audioBuffer.duration,
        rate: 1,
        volume: 30,
        autoplay: true
    });
}, function(err){
    console.log('Error: ', err);
});

class Artist {
    constructor(name) {
        this.name = name;
    }
}

class Song {
    constructor(title, artist, file) {
        this.title = title;
        this.artist = artist;
        this.file;
    }
}

class CD {
    constructor(title, songs) {
        this.title = tile;
        this.songs = songs;
        this.trackPos = 0;
    }

    getNumTracks() {
        return this.songs.length;
    }

    getTracks() {
        return this.songs;
    }
}

class Playlist {
    constructor(songs) {
        this.queue = songs;
    }

    peekNextSong() {
        return this.queue[0];
    }

    addSong(song) {
        this.queue.push(song);
    }

    nextSong() {
        return this.queue.shift();
    }
}

class CDPlayer {
    constructor(CD) {
        this.CD = CD;
        this.playlist = new Playlist(this.CD.getTracks());
    }

    setCD(CD) {
        this.CD = CD;
        this.playlist = new Playlist(this.CD.getTracks());
    }

    getCD(CD) {
        return this.CD;
    }

    setPlaylist(playlist) {
        this.playlist = playlist;
    }

    getPlaylist() {
        return this.playlist;
    }

    play(song) {
        let currSong
        if (song === undefined) {
            currSong = this.playlist.nextSong();
            this.playlist.addSong(currSong);
        } else {
            let i = 0;
            while(this.playlist.peekNextSong() !== song && i < this.CD.length) {
                currSong = this.playlist.nextSong();
                this.playlist.addSong(currSong);
                i++;
            }
        }

        // Play song
        console.log('Play song: ' , currSong);
    }

    skip() {
        play();
    }

    pause() {
        // pause song
        console.log('Pause song: ');
    }
}

class SongSelector {
    constructor(CDs, song) {
        this.CDs = CDs;
        this.song = song;
    }

    getCurrentSong() {
        return this.song;
    }

    playSong(song) {
        for (let i = 0; i < this.CDs.length; i++) {
            for (let j = 0; j < this.CDs[i].length; j++) {
                let s = this.CDs[i][j];
                
                if (s === song) {
                    this.song = s;
                    return {CD: this.CDs[i], song: s};
                }
            }
        }
    }

}

class Jukebox {
    constructor(CDs) {
        this.CDs = CDs;
        this.CDPlayer = new CDPlayer(CDs[0]);
        this.songSelector = new SongSelector();
    }

    playSong(song) {
        let songInfo = this.songSelector.playSong(song);
        this.CDPlayer.setCD(songInfo.CD);
    }

    selectCD(CD) {
        this.CDPlayer.setCD(CD);
    }

    playCD(CD) {
        this.CDPlayer.play();
    }

    pause() {
        this.CDPlayer.pause();
    }
}