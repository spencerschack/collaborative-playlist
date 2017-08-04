Meteor.startup(function() {
  SC.initialize({
    client_id: Meteor.settings.public.soundcloud_client_id
  });
});
