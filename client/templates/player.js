Session.setDefault('hosting', false);

var audio;

Meteor.startup(function() {
  audio = document.createElement('audio');
  document.body.appendChild(audio);
  audio.addEventListener('ended', function() {
    if(Session.get('hosting')) {
      var room = Session.get('currentRoom');
      var song = Songs.findOne(room.currentSong);
      var next = Songs.findOne({position: {$gt: song.position}});
      if(next) {
        Rooms.update(room._id, {$set: {currentSong: next._id}});
      }
    }
  });
  Tracker.autorun(function() {
    if(Session.get('hosting')) {
      var room = Session.get('currentRoom');
      if(room) {
        var song = Songs.findOne(room.currentSong);
        if(song) {
          audio.src = 'https://api.soundcloud.com/tracks/' + song.trackId + '/stream?client_id=' + Meteor.settings.public.soundcloud_client_id;
          if(room.playing) {
            audio.play();
          }
        }
      }
    }
  });
});

Template.player.helpers({
  currentSong: function() {
    var id = Session.get('currentRoom').currentSong;
    return id ? Songs.findOne(id) : null;
  },
  playing: function() {
    var room = Session.get('currentRoom');
    return room && room.playing;
  },
  hosting: function() {
    return Session.get('hosting');
  }
});

Template.player.events({
  'click .host': function() {
    Session.setPersistent('hosting', !Session.get('hosting'));
  },
  'click .play-pause': function() {
    var room = Session.get('currentRoom');
    if(Session.get('hosting')) {
      audio[room.playing ? 'pause' : 'play']();
    }
    Rooms.update(room._id, {$set: {playing: !room.playing}});
  }
});
