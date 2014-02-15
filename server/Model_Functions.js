queueIndex = function(model, author) {
  for(var i = 0; i < model.queue.length; i++) {
    if(model.queue[i].author == author) {
      return i;
    }
  }

  //Not found
  return -1;
}

addOpinion = function(model, author, text) {
  if(queueIndex(model, author) == -1) {   //Not already in queue
    model.queue.push(new Opinion(author, text));
    return true;
  }

  //Already in queue, so no opinion added
  return false;
}

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
  assert(model.queue[index].voters.length == 
      model.queue[index].upvotes, "Error in number of voters");
  return true; 
}

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
  assert(model.queue[index].voters.length == 
      model.queue[index].upvotes, "Error in number of voters");
  
  return true;
}
  
removeMax = function(model) {
  if(model.queue.length < 1) {
    return false;
  }

  //Move the top value to ondeck
  var max = model.queue[0];
  model.queue.splice(0, 1);
  model.ondeck = max;
}
