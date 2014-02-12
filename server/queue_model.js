Meteor.methods({
  "add_opinion" : function(text, author) {
    if(!Queue.findOne({user: author})) {
      Queue.insert({user: author, text: text, upvotes: 0, voters: []});
    }
  },

  "upvote" : function(id, userId) {
    var query = {_id: id, voters: {$ne: userId}};
    var update = {$push: {voters: userId}, $inc: {upvotes: 1}};
    Queue.update(query, update);
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
