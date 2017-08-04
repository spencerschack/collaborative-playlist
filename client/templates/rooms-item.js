Template.roomsItem.events({
  click: function(event, view) {
    Router.go('room', {_id: this._id});
  }
});
