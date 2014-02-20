Template.new_opinion.events({
  "keypress" : function(e) {
    var this_ = e.target;
    if(e.keyCode == 13) {
      opinionCreated(e.target);
    }
  },

  "click #submitOpinion" : function(e) {
    opinionCreated(e.target.parentNode.querySelector(".opinion_text"));
  }
});
Template.checkbox.events({
  "click" : function(e) {
    var thisID = getAuthor(e.target);
    if(meChecked(thisID)) {
      console.log("remove vote..." + thisID);
      Meteor.call("remove_vote", thisID, myId);
    } else {
      console.log("upvote..." + thisID);
      Meteor.call("upvote", thisID, myId);
    }
  }
});

function opinionCreated(this_) {
  if(this_.value.trim() == "") {
    return;
  }
  console.log("add opinion...");
  Meteor.call("add_opinion", myId, this_.value.trim(), function(error, code) {
    if(code)
      toastr.success("Opinion added successfully");
    else
      toastr.error("You can only have one opinion in the queue at a time"); 
  });
  this_.value = "";
}

function getAuthor(element) {
  return element.parentNode.parentNode.id;
}

function meChecked(id) {
  console.log("meChecked..." + id);
  var model = Fishbowls.findOne().model;
  var index = queueIndex(model.queue, id);
  if(index == -1)
    return false;
  return model.queue[index].voters.indexOf(myId) != -1;
}

Handlebars.registerHelper("is_checked", meChecked);

Template.event_queue.blurbs = function() {
  return Fishbowls.findOne().model.queue;
}

Template.event_queue.deck = function() {
  return Fishbowls.findOne().model.ondeck;
}

Template.event_queue.center = function() {
  return Fishbowls.findOne().model.incenter;
}

Template.event_queue.model = function() {
  return Fishbowls.findOne().model;
}

Template.blurb.avatar_image = function() {
  return "../avatars.jpg";
}
