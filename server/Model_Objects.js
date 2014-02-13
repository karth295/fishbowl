Model = function() {
  this.ondeck = null;
  this.queue = [];
  this.incenter = [];
}

Opinion = function(author, text) {
  this.author = author;
  this.text = text;
  this.upvotes = 0;
  this.voters = [];
}
