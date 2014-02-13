Model = function() {
  //Properties
  this.ondeck = null;
  this.queue = [];
  this.incenter = [];

  //Functions
  this.queueIndex = queueIndex;
  this.addOpinion = addOpinion;
  this.addVote = addVote;
  this.removeVote = removeVote;
  this.removeMax = removeMax;
}

function queueIndex(author) {
  for(var i = 0; i < this.queue.length; i++) {
    if(this.queue[i].author == author) {
      return i;
    }
  }

  //Not found
  return -1;
}

function addOpinion(author, text) {
  if(this.queueIndex(author) == -1) {   //Not already in queue
    this.queue.push(new Opinion(author, text));
    return true;
  }

  //Already in queue, so no opinion added
  return false;
}

function addVote(author, userId) {
  var index = this.queueIndex(author);
  if(index == -1) {   //No such author
    return false;
  }
  var record = this.queue[index];

  var voters = record.voters;
  index = voters.indexOf(userId);
  if(index != -1) {   //Already voted for this
    return false;
  }

  voters.push(userId);
  record.upvotes++;
  assert(model.queue[index].voters.length == 
      model.queue[index].upvotes, "Error in number of voters");
  return true; 
}

function removeVote(author, userId) {
  var index = this.queueIndex(author);
  if(index == -1) {   //No such author
    return false;
  }
  var record = this.queue[index];

  var voters = record.voters;
  index = voters.indexOf(userId);
  if(index == -1) {
    return false;
  }
  voters.splice(index, 1);
  record.upvotes--;
  assert(model.queue[index].voters.length == 
      model.queue[index].upvotes, "Error in number of voters");
  
  return true;
}
  
function removeMax() {
  if(this.queue.length < 1) {
    return false;
  }

  //Move the top value to ondeck
  var max = this.queue[0];
  this.queue.splice(0, 1);
  this.ondeck = max;
}

Opinion = function(author, text) {
  this.author = author;
  this.text = text;
  this.upvotes = 0;
  this.voters = [];
}
