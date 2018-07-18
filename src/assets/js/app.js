// inicializacion de firebase
firebase.initializeApp({
  apiKey: "AIzaSyA9KOG2Mc1NSFQ7h9OPNJbNJEDxJ62ivYI",
  authDomain: "red-social-cfa45.firebaseapp.com",
  projectId: "red-social-cfa45"
});

// funcion para el contador de "aportes"
let counter = 0;
function clickCounter() {
  counter += 1;
  document.getElementById("icon").innerHTML = counter;
  document.getElementById('registro').classList.add('d-none');
}

// alert de terminos y condiciones
function termsAndConditions() {
  alert('Los terminos y condiciones son blablablablabla');
  confirm('Los terminos y condiciones son blablablablabla');
}

//evento enviar msj
function sendMessage() {//pensar qué debe ocurrir para enviar un mensaje, desde el usuario
  const currentUser = firebase.auth().currentUser;
  const messageText = document.getElementById('inputMessageChat').value;

  document.getElementById('message-box').value = "";

  //para tener una nueva llave en la colección messages
  const newMessageKey = firebase.database().ref().child('messages').push().key; //metodo de firebase

  firebase.database().ref(`messages/${newMessageKey}`).set({
    creator: currentUser.uid,
    creatorName: currentUser.displayName,
    text: messageText,
    //profile_picture: imgurl
  }); //ref, ruta para guardar los mensajes
}

// evento mensaje
function setupMessages() {
  firebase.database().ref('messages')
    .limitToLast(100)
    .on('child_added', (newMessage) => {
      document.getElementById("message-container").innerHTML +=
        `<li class="right clearfix">
                          <div class="chat-body clearfix">
                              <div class="header">
                                  <small class=" text-muted">
                                      <span class="glyphicon glyphicon-time"></span>13 mins ago</small>
                                  <strong class="pull-right primary-font">${newMessage.val().creatorName}</strong>
                              </div>
                              <p>${newMessage.val().text}</p>
                          </div>
                      </li>`;
    });
}

// evento enviar desde el teclado con boton enter
let inputMessage = document.getElementById("inputMessageChat");
inputMessage.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("btn-chat").click();
  }
});
