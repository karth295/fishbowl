if(Meteor.isServer) {
  Fishbowls = new Meteor.Collection("fishbowls");

  Meteor.publish('fishbowl_data', function(){
    var self = this;
    var handle = Fishbowls.find().observeChanges({
      changed : function(id, fields) {
        self.changed("fishbowls", id, fields);
      }
    });
    self.onStop(function () {
      handle.stop();
    });

    var record = Fishbowls.findOne();
    self.added("fishbowls", record._id, {model: record.model});
    self.ready();
  });
}

if (Meteor.isClient) {
  Fishbowls = new Meteor.Collection("fishbowls");
  
  Meteor.startup(function() {
    Session.set('data_loaded', false);
  });

  Deps.autorun(function() {
    Meteor.subscribe('fishbowl_data', function(){
      Session.set('data_loaded', true);
    });
  });

  Template.main.isReady = function() { return Session.get('data_loaded'); }
}
