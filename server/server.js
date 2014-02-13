var model = new Model();

Meteor.methods({
  "start" : function() {
    Fishbowls.insert({model: model});
  }
});


