/** me = {
  name: null,
  id: null
}
askToLogin  = function(text) {
  scrollTo("#login_banner", text);

  var login_stuff = document.querySelector("#login_banner").parentNode;
  $(login_stuff).addClass("animateBlue");
}

scrollTo = function(targetString, text) {
  toastr.error(text);
  //get the top offset of the target anchor
  var target_offset = $(targetString).offset().top;

  //goto that anchor by setting the body scroll top to anchor top
  $('html, body').animate({scrollTop: target_offset}, 500);
}

Template.login.events({
  "keypress #login_name" : tryLogin,
  "click #login" : tryLogin
});

function tryLogin(e) {
  if(e.keyCode == 13 || e.type == "click") {
    var userName = $("#login_name").val().trim();
    var userPsswd = "salon-password";
    if(!userName || userName.length < 5 || userName.length > 15) {
      askToLogin("Username must be between 5 and 15 characters");
    } else if(Meteor.users.findOne({email: userName + "@.com"})) {
      askToLogin("Username already exists");
    } else {
        var id = new Meteor.Collection.ObjectID();
        
        me.name = userName;
        me.id = id._str;
        
        Accounts.createUser({
          _id: id,
          username: userName,
          email: userName + "@.com",
          password: userPsswd
        });
        toastr.success("Logged in successfully!");
    }
  }
} */
