Meteor.methods({
  "init" : function() {
    return Fishbowls.insert({model: new Model()});
  },

  "add_opinion" : function(author, text) {
    var model = Fishbowls.findOne().model;
    console.log(model);
    var ret_value = model.addOpinion(author, text);
    Fishbowls.update({}, {model: model});
    return ret_value;    
  },

  "upvote" : function(author, userId) {
    var model = Fishbowls.findOne().model;
    var ret_value = model.addVote(author, userId);
    Fishbowls.update({}, {model: model});
    return ret_value;
  },

  "remove_vote" : function(id, userId) {
    var model = Fishbowls.findOne().model;
    var ret_value = model.removeVote(author, userId);
    Fishbowls.update({}, {model: model});
    return ret_value; 
  },

  "remove_max" : function() {
    var model = Fishbowls.findOne().model;
    model.removeMax();
    Fishbowls.update({}, {model: model});
  }
});

function assert(condition, message) { 
  if (!condition)
    throw Error("Assert failed" + (typeof message !== "undefined" ? ": " + message : ""));
}
