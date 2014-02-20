timer = null;
second_timer = null;
rotate_seconds = 0;
Meteor.methods({
  "init" : function() {
    return Fishbowls.insert({model: new Model()});
  },

  "clear" : function() {
    Fishbowls.update({}, {model: new Model()});
  },

  "start" : function(seconds) {
    rotate_seconds = seconds;
    var model = Fishbowls.findOne().model;
    var ret_value = setRotationTime(model, seconds);
    Fishbowls.update({}, {model: model});
    if(timer) {
      Meteor.clearInterval(timer);
    }
    if(second_timer) {
      Meteor.clearInterval(second_timer);
    }
    second_timer = Meteor.setInterval(second_update, 1000);
    timer = Meteor.setInterval(remove_max, seconds * 1000);
    return ret_value;
  },

  "pause" : function() {
    if(timer != null) {
      Meteor.clearInterval(timer);
    }
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
  setRotationTime(model, rotate_seconds);
  Fishbowls.update({}, {model: model});
  return ret_val; 
}

function assert(condition, message) { 
  if (!condition)
    throw Error("Assert failed" + (typeof message !== "undefined" ? ": " + message : ""));
}

function second_update() {
  var model = Fishbowls.findOne().model;
  if(model.rotate_time && model.rotate_time > 0) {
    model.rotate_time--;
    Fishbowls.update({}, {model: model});
  }
}
