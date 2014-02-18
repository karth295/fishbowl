//The main bookkeeper of the current model
Model = function() {
  this.ondeck = null;
  this.queue = [];
  this.incenter = [];
}

//Return the index of the author's opinion
//in the queue, or -1 if it does not exist
queueIndex = function(model, author) {
  for(var i = 0; i < model.queue.length; i++) {
    if(model.queue[i].author == author) {
      return i;
    }
  }

  //Not found
  return -1;
}

//Add this opinion to the back (bottom) of the queue
//if the author is not already in the queue
//Returns: false for already in the queue, true for added
addOpinion = function(model, author, text) {
  if(queueIndex(model, author) == -1) {   //Not already in queue
    model.queue.push(new Opinion(author, text));
    return true;
  }

  //Already in queue, so no opinion added
  return false;
}

//Upvote this author with the given userId
//Returns: false if they had already upvoted this opinion,
//or the opinion does not even exist. True otherwise
addVote = function(model, author, userId) {
  var index = queueIndex(model, author);
  if(index == -1) {   //No such author
    return false;
  }
  var record = model.queue[index];

  var voters = record.voters;
  index = voters.indexOf(userId);
  if(index != -1) {   //Already voted for model
    return false;
  }

  voters.push(userId);
  record.upvotes++;
  return true; 
}

//Remove the userId's vote from author.
//Returns false if the opinion did not exist,
//or userId had not voted for this opinion. True otherwise
removeVote = function(model, author, userId) {
  var index = queueIndex(model, author);
  if(index == -1) {   //No such author
    return false;
  }
  var record = model.queue[index];

  var voters = record.voters;
  index = voters.indexOf(userId);
  if(index == -1) {
    return false;
  }
  voters.splice(index, 1);
  record.upvotes--;
  
  return true;
}

//Pop the first opinion off the queue, and place it on deck.
//The previous opinion on deck is removed.
//Returns: false if there were no opinions to remove. True otherwise
removeMax = function(model) {
  model.queue.sort(function(a, b) { return b.upvotes - a.upvotes; });
  var old_ondeck = model.ondeck;
  if(old_ondeck) {
    model.incenter.push(old_ondeck);
    if(model.incenter.length > 4) {
      model.incenter.shift();   //Throw person who has been in longest out
    }
  }

  if(model.queue.length) {
    model.ondeck = model.queue.shift();   //Top of the queue comes on deck
  }
}

//A class to represent an "opinion" in the fishbowl world
Opinion = function(author, text) {
  this.author = author;
  this.text = text;
  this.upvotes = 0;
  this.voters = [];
}
