Meteor.methods({
  "init" : function() {
    return Fishbowls.insert({model: new Model()});
  },

  "add_opinion" : function(author, text) {
    var model = Fishbowls.findOne().model;
    
    if(!inQueue(model.queue, author)) {
      model.queue.push(new Opinion(author, text));
      Fishbowls.update({}, {model: model});
      return true;
    } else {
      return false;
    }
  },

  "upvote" : function(author, userId) {
    var obj = inQueue(Fishbowls.findOne().model.queue, author);
    if(obj.voters.indexOf(userId) == -1) {
      obj.voters.push(userId);
      obj.upvotes++;
      assert(obj.voters.length == obj.upvotes, "Error in number of voters");
    }
  },

  "remove_vote" : function(id, userId) {
    var query = {_id: id, voters: userId};
    var update = {$pull: {voters: userId}, $inc: {upvotes: -1}};
    Queue.update(query, update);
  },

  "remove_max" : function() {
    var max = Queue.find({}, {sort: {upvotes: 1}, limit: 1});
  }
});

function inQueue(queue, author) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].author = author) {
        return queue[i];
      }
    }
    return false;
}

function assert(condition, message) { 
  if (!condition)
    throw Error("Assert failed" + (typeof message !== "undefined" ? ": " + message : ""));
}
