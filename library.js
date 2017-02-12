function uid() {
  return Math.floor((1 + Math.random()) * 0x100).toString(9).substring(1);
}

function Library(name, creator) {
  this.name = name;
  this.creator = creator;
  this.playlists = [];
}

Library.prototype.addPlaylist = function(playlist) {
  return this.playlists.push(playlist);
};
var globalPlaylistArray = [];
function Playlist(name) {
  this.id = 'p' + uid();
  this.name = name;
  this.tracks = [];
  globalPlaylistArray.push(this);
}

Playlist.prototype.addTracks = function(track) {
  this.tracks.push(track);
};
Playlist.prototype.overallRating = function() {
  this.overallRating = this.tracks.reduce((sum,track,_,array) => sum + track.rating/array.length,0);
};
Playlist.prototype.totalDuration = function() {
  this.totalDuration = this.tracks.reduce(function(sum, track) {
    return (sum + track.duration);
  }, 0);
};
var globalTracksArray = [];
function Track(title, artist, album, rating, duration) {
  this.id = 't' + uid();
  this.title = title;
  this.artist = artist;
  this.album = album;
  this.rating = rating,
  this.duration = duration;
  globalTracksArray.push(this);
}

var library = new Library('My Library', 'Michael');

var t01 = new Track('Code Monkey', 'Jonathan Coulton', 'Thing a Week Three', 5, 180);
var t02 = new Track('Model View Controller', 'James Dempsey', 'WWDC 2003', 5, 180);
var t03 = new Track('Four Thirty-Three', 'John Cage', 'Woodstock 1952', 5, 180);

var p01 = new Playlist('Coding Music');
var p01_tracks = [t01, t02];

p01_tracks.forEach(p01.addTracks.bind(p01));
p01.totalDuration();
console.log('p01.totalDuration: ', p01.totalDuration);
p01.overallRating();
console.log('p01.overallRating: ', p01.overallRating);

var p02 = new Playlist('Other Playlist');
p02.addTracks(t03);
p02.totalDuration();
console.log('p02.totalDuration: ', p02.totalDuration);
p02.overallRating();
console.log('p02.overallRating: ', p01.overallRating);

var library_playlist = [p01, p02];
library_playlist.forEach(library.addPlaylist.bind(library));

var printPlaylists = function(playlistId) {
  globalPlaylistArray.forEach((item) => {
    playlist = `${item.id}: ${item.name} - ${item.tracks.length} tracks`
    console.log(playlist);
  })
};
printPlaylists();

var printTracks = function () {
  globalTracksArray.forEach((item) => {
    track = `${item.id} ${item.title} by ${item.artist} (${item.album})`
    console.log(track);
  })
};
printTracks();

var printPlaylist = function (playlistId) {
    var listId = '';
    console.log(playlistId + ':', p01.name, '-', p01.tracks.length, 'tracks');
    p01.tracks.forEach((item, index) => {
      console.log(item.id + ':', item.title, 'by', item.artist + '(' + item.album + ')');
    })
  }
printPlaylist('p01');

var addTrackToPlaylist = function (trackId, playlistId) {
  p02.tracks.push(t02);
  console.log(library.playlists);
}

addTrackToPlaylist('t02', 'p02');

var addTrack = function (title, artist, album, rating, duration) {
  id = 't' + uid();
  var id = new Track(title, artist, album, rating, duration);
  console.log('GlobalTracksArray: ',globalTracksArray);
}

addTrack('Michael', 'Mike', 'Mikey 2017', 5, 180);

// adds a playlist to the library
var addPlaylist = function (name) {
  id = 'p' + uid();
  var id = new Playlist(name);
  console.log(globalPlaylistArray);
}

addPlaylist('Michael flavored');

// var library = {
//      tracks: { t01: { id    : "t01",
//                       name  : "Code Monkey",
//                       artist: "Jonathan Coulton",
//                       album : "Thing a Week Three" },
//                t02: { id    : "t02",
//                       name  : "Model View Controller",
//                       artist: "James Dempsey",
//                       album : "WWDC 2003"},
//                t03: { id    : "t03",
//                       name  : "Four Thirty-Three",
//                       artist: "John Cage",
//                       album : "Woodstock 1952"}
//              },
//   playlists: { p01: { id    : "p01",
//                       name  : "Coding Music",
//                       tracks: ["t01", "t02"]
//                     },
//                p02: { id    : "p02",
//                       name  : "Other Playlist",
//                       tracks: ["t03"]
//                     }
//              },
//   printPlaylists: function (playlistId) {
//     if (!playlistId) {
//         for ( var i = 0; i < Object.keys(this.playlists).length; i++ ) {
//           listPath     = this.playlists[Object.keys(this.playlists)[i]];
//           id           = listPath.id;
//           name         = listPath.name;
//           tracksAmount = listPath.tracks.length;
//           track        = listPath.track;
//           aPlaylist    = id + ': ' + name + ' - ' + tracksAmount + ' tracks';
//           console.log(aPlaylist);
//         }
//       } else {
//         // prints ONE playlist, by ID
//         listPath     = this.playlists[playlistId];
//         id           = listPath.id;
//         name         = listPath.name;
//         tracksAmount = listPath.tracks.length;
//         track        = listPath.tracks;
//         aPlaylist    = id + ': ' + name + ' - ' + tracksAmount + ' tracks';
//         console.log(aPlaylist);
//       }
//   },
//   printTracks: function () {
//     for ( var i = 0; i < Object.keys(this.tracks).length; i++ ) {
//       listPath = this.tracks[Object.keys(this.tracks)[i]];
//       id          = listPath.id;
//       name        = listPath.name;
//       artist      = listPath.artist;
//       album       = listPath.album;
//       singleTrack = id + ' ' + name + ' by ' + artist + ' (' + album + ')';
//       console.log(singleTrack);
//     }
//   },
//   printPlaylist: function (playlistId) {
//     var listId = '';
//     this.printPlaylists(playlistId);
//     for ( var i = 0; i < track.length; i++ ) {
//       var trackPath = this.tracks[track[i]];
//       id          = trackPath.id;
//       name        = trackPath.name;
//       artist      = trackPath.artist;
//       album       = trackPath.album;
//       singleTrack = id + ' ' + name + ' by ' + artist + ' (' + album + ')';
//       console.log(singleTrack);
//     }
//   },
//   addTrackToPlaylist : function (trackId, playlistId) {
//     this.playlists[playlistId].tracks.push(trackId);
//     console.log(this.playlists);
//   },
//   uid: function() {
//     return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//   },
//   addTrack: function (name, artist, album) {
//     var addId = this.uid();
//     this.tracks[addId] = {
//       'id'    : addId,
//       'name'  : name,
//       'artist': artist,
//       'album' : album
//     };
//   console.log(this.tracks);
//   },
//   addPlaylist: function (name) {
//       var addId = this.uid();
//       this.playlists[addId] = {
//         'id'    : addId,
//         'name'  : name,
//         'tracks': []
//       };
//     // console.log(addId);
//     console.log(this.playlists);
//   }

// };

// // FUNCTIONS TO IMPLEMENT:

// // prints a list of all playlists, in the form:
// // p01: Coding Music - 2 tracks
// // p02: Other Playlist - 1 tracks

// library.printPlaylists();

// // prints a list of all tracks, in the form:
// // t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// // t02: Model View Controller by James Dempsey (WWDC 2003)
// // t03: Four Thirty-Three by John Cage (Woodstock 1952)

// library.printTracks();

// // prints a list of tracks for a given playlist, in the form:
// // p01: Coding Music - 2 tracks
// // t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// // t02: Model View Controller by James Dempsey (WWDC 2003)

// library.printPlaylist('p01');

// // adds an existing track to an existing playlist

// library.addTrackToPlaylist('t02', 'p02');

// // generates a unique id
// // (use this for addTrack and addPlaylist)


// // adds a track to the library

// library.addTrack('Michael', 'Mike', 'Mikey 2017');

// // adds a playlist to the library

// library.addPlaylist('Michael flavored');

// // STRETCH:
// // given a query string string, prints a list of tracks
// // where the name, artist or album contains the query string (case insensitive)
// // tip: use "string".search("tri")
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search

// var printSearchResults = function(query) {

// };
