Template.new_opinion.events({
  "keypress" : function(e) {
    var this_ = e.target;
    if(e.keyCode == 13) {
      Meteor.call("add_opinion", myId, this_.value);
      this_.value = "";
    }
  }
});

var my_votes = []
Template.checkbox.events({
  "click" : function(e) {
    var this_ = e.target;
    if(meChecked(this._id)) {
      Meteor.call("remove_vote", this_.id, myId);
      my_votes.splice(my_votes.indexOf(this_.id), 1);
    } else {
      Meteor.call("upvote", this_.id, myId);
      my_votes.push(this._id);
    }
  }
});

function meChecked(id) {
  return Queue.find({_id: id, voters: myId}).count();
}

Handlebars.registerHelper("is_checked", meChecked);

Template.event_queue.blurbs = function() {
  return Queue.find({}, {sort: {upvotes: -1}});
}

Template.blurb.avatar_image = function() {
  return "../avatars.jpg";
}
