Template.new_opinion.events({
  "keypress" : function(e) {
    var this_ = e.target;
    if(e.keyCode == 13) {
      Meteor.call("add_opinion", myId, this_.value);
      this_.value = "";
    }
  }
});

Template.checkbox.events({
  "click" : function(e) {
    var this_ = e.target;
    if(meChecked(this._id)) {
      Meteor.call("remove_vote", this_.id, myId);
    } else {
      Meteor.call("upvote", this_.id, myId);
    }
  }
});

function meChecked(id) {
  return Queue.find({_id: id, voters: myId}).count();
}

Handlebars.registerHelper("is_checked", meChecked);

Template.event_queue.blurbs = function() {
  return Fishbowls.findOne().model.queue;
}

Template.blurb.avatar_image = function() {
  return "../avatars.jpg";
}
