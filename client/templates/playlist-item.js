Template.playlistItem.helpers({
  playing: function() {
    var room = Session.get('currentRoom');
    return room && room.currentSong === this._id;
  },
  selected: function() {
    return Session.get('selected') === this._id ? 'selected' : null;
  }
});

Template.playlistItem.events({
  'click .title': function() {
    if(Session.get('selected') === this._id) {
      Session.set('selected', null);
    } else {
      Session.set('selected', this._id);
    }
  },
  'click .play': function() {
    var room = Session.get('currentRoom');
    Rooms.update(room._id, {$set: {currentSong: this._id}});
  },
  'click .up': function() {
    var above = Songs.findOne({position: {$lt: this.position}},
      {sort: {position: -1}});
    if(above) {
      Songs.update(this._id, {$inc: {position: -1}});
      Songs.update(above._id, {$inc: {position: 1}});
    }
  },
  'click .down': function() {
    var below = Songs.findOne({position: {$gt: this.position}},
      {sort: {position: 1}});
    if(below) {
      Songs.update(this._id, {$inc: {position: 1}});
      Songs.update(below._id, {$inc: {position: -1}});
    }
  },
  'click .remove': function() {
    Songs.remove(this._id);
  }
});
