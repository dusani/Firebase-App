  // Initialize Firebase
var config = {
    apiKey: "AIzaSyC1ubk5MlwYimhvXoN53ebR0tDsmj7Mg0Q",
    authDomain: "fir-chat-d16bd.firebaseapp.com",
    databaseURL: "https://fir-chat-d16bd.firebaseio.com",
    projectId: "fir-chat-d16bd",
    storageBucket: "fir-chat-d16bd.appspot.com",
    messagingSenderId: "455321039597"
};
firebase.initializeApp(config);

var db = firebase.database();
var messages = db.ref("messages/");

var provider = new firebase.auth.FacebookAuthProvider();

var login = () => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(token, user);
      
      // ...
      $("#login-screen").fadeOut(() => {
        $("#chat-screen").html(`
         
            <div class="header">Header will be here</div>
            <div class="messages">Messages will be here</div>
            <div class="input">
              <input type="text"> <span class="ion-paper-airplane"></span>
            </div>
          
        `).fadeIn();
      });

    }).catch(function(error){
      // Handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
}

$( document ).ready(function() {
  $('#login-btn').click(login);
});
