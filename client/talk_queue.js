Template.new_opinion.events({
  "keypress" : function(e) {
    var this_ = e.target;
    if(e.keyCode == 13) {
      console.log("add opinion...");
      Meteor.call("add_opinion", myId, this_.value, function(error, code) {
        if(code)
          toastr.success("Opinion added successfully");
        else
          toastr.error("You can only have one opinion in the queue at a time");
      });
      this_.value = "";
    }
  }
});

Template.checkbox.events({
  "click" : function(e) {
    var this_ = e.target;
    if(meChecked(this_.id)) {
      console.log("remove vote..." + this_.id);
      Meteor.call("remove_vote", this_.id, myId);
    } else {
      console.log("upvote..." + this_.id);
      Meteor.call("upvote", this_.id, myId);
    }
  }
});

function meChecked(id) {
  console.log("meChecked..." + id);
  var model = Fishbowls.findOne().model;
  var index = queueIndex(model, id);
  if(index == -1)
    return false;
  return model.queue[index].voters.indexOf(myId) != -1;
}

Handlebars.registerHelper("is_checked", meChecked);

Template.event_queue.blurbs = function() {
  return Fishbowls.findOne().model.queue;
}

Template.blurb.avatar_image = function() {
  return "../avatars.jpg";
}
