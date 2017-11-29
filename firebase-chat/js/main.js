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
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...

      $("#login-screen").fadeOut(() => {
        $("#chat-screen").html(
          `<div id='#container' class='container'>
          <div id='header' class='header'>Hi ${user.displayName.split(' ')[0]}!</div>
          <div id='messages' class='messages cool-scroll-bar-17'></div>
          <div id='input-container' class='input-container'>
            <input id='chat-input' class='chat-input' type='text'/>
            <div id='send-btn' class='send-btn'>
              <i class='ion-ios-paperplane-outline'></i>
            </div>
          </div>
        </div>`
        ).fadeIn(() => {
          showMessages(user);

          $('#chat-input').keypress(function (e) {
            if (e.keyCode === 13) sendMessage(user.displayName, new Date(), user.email, user.photoURL);
          });

          $('#send-btn').click(() => sendMessage(user.displayName, new Date(), user.email, user.photoURL));
        })
      });

      console.log(user);

    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  var showMessages = (user) => {
    messages.on('value', function (snapshot) {
      //console.log(snapshot.val());
      $("#messages").html("");
      var values = snapshot.val();

      for (var msgId in values) {
        var msg = values[msgId];
        var side = user.email === msg.email ? 'right' : 'left';
        var margin = user.email === msg.email ? 'margin-left: 15px;' : 'margin-right: 15px;';
        var corner = user.email === msg.email ? 'right-top' : 'left-top'

        $("#messages").append(
          `<div class="msg-div ${side}">
            <div style="${margin}">
              <img class="profile-img" src="${msg.img}" height="40" width="auto" />
            </div>
            <div style="flex-grow: 1; padding: 10px;" class="talk-bubble tri-right ${corner}">
              <div class="name"><strong>${msg.name}</strong>:</div>
              <div class="msg">${msg.message}</div>
              <div class="date ${side}">
                <div>${format.date(new Date(msg.date)).date}</div>
                <div>${format.date(new Date(msg.date)).time}</div>
              </div>
            </div>
         </div>`
        );
      }
      scroll();
    });
  }

  var sendMessage = (name, date, email, img) => {
    if ($("#chat-input").val()) {
      messages.push({
        name: name,
        message: $("#chat-input").val(),
        date: date.toString(),
        email: email,
        img: img
      });
      $("#chat-input").val('');
    }
  }

  var format = {
    date: (date) => {
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();

      var h = date.getHours();

      var hf = (h > 11) ? 'PM' : 'AM';
      var hh = (h > 12) ? h % 12 : h;
      var mm = date.getMinutes();
      var ss = date.getSeconds();

      if (d < 10) d = '0' + d;
      if (m < 10) m = '0' + m;
      if (hh < 10) hh = '0' + hh;
      if (mm < 10) mm = '0' + mm;
      if (ss < 10) ss = '0' + ss;

      return {
        date: m + '/' + d + '/' + y,
        time: hh + ':' + mm + ':' + ss + ' ' + hf
      };
    }
  }

  var scroll = () => $('#messages').scrollTop($('#messages')[0].scrollHeight);

  $(document).ready(function () {
    $('#login-btn').click(login);
  });