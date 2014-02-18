Meteor.methods({
  "init" : function() {
    return Fishbowls.insert({model: new Model()});
  },

  "start" : function() {
    var timer = Meteor.setInterval(remove_max, 10 * 1000);
  },

  "add_opinion" : function(author, text) {
    var model = Fishbowls.findOne().model;
    var ret_value = addOpinion(model, author, text);
    Fishbowls.update({}, {model: model});
    return ret_value;
  },

  "upvote" : function(author, userId) {
    var model = Fishbowls.findOne().model;
    var ret_value = addVote(model, author, userId);
    Fishbowls.update({}, {model: model});
    return ret_value;
  },

  "remove_vote" : function(author, userId) {
    var model = Fishbowls.findOne().model;
    var ret_value = removeVote(model, author, userId);
    Fishbowls.update({}, {model: model});
    return ret_value; 
  }
});

function remove_max() {
  var model = Fishbowls.findOne().model;
  var ret_val = removeMax(model);
  Fishbowls.update({}, {model: model});
  return ret_val; 
}

function assert(condition, message) { 
  if (!condition)
    throw Error("Assert failed" + (typeof message !== "undefined" ? ": " + message : ""));
}
