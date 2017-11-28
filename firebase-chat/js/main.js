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
    
}
