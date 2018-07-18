// funcion para el contador de "aportes"
let counter = 0;
function clickCounter() {
  counter += 1;
  document.getElementById("icon").innerHTML = counter;
  document.getElementById('registro').classList.add('d-none');
}
// funcion para que la pagina de Registro aparezca en pantalla
function registroYes() {
  document.getElementById('registro').classList.remove('d-none');
}
// funcion para que desaparezca la pagina de registro
function registroNone() {
  document.getElementById('registro').classList.add('d-none');
}
// se valida si esta el display none para colocarlo o no.
function registroPage() {
  if (registro.className.indexOf('d-none') >= 0) {
    registroYes();
  }
}
function registrolist() {
  if (registro.className.indexOf('d-none') >= 0) {
    registroNone()
  }
}
// alert de terminos y condiciones
function termsAndConditions() {
  confirm('Los terminos y condiciones son blablablablabla');
}

// chat 
window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //Si estamos logueados
      document.getElementById('logOut').style.display = "none";
      document.getElementById('loggedIn').style.display = "block";
      console.log("User > " + JSON.stringify(user));
    } else {
      //No estamos logueados
      document.getElementById('logOut').style.display = "block";
      document.getElementById('loggedIn').style.display = "none";
    }
  });

  firebase.database().ref('message')
    .limitToLast(2) // filtro para no obtener todos los msjs
    .once('value')
    .then(() => {
      console.log('mensajes ' + JSON.stringify(message));
    })
    .catch(() => {

    });

  // acá se escuchan los nuevos msjs usando evento on.child_added
  firebase.database().ref('message')
    .limitToLast(1)
    .on('child_added', (newMessage) => {
      messageContainer.innerHTML += `
      <p>Nombre: ${newMessage.val().creatorName}</p>
      <p>${newMessage.val().text}
      `;
    });
    if(creatorName.length == 0){
      messageContainer.innerHTML += `
      <p>Mail: ${newMessage.val().creatorEmail}</p>
      <p>${newMessage.val().text}
      `;
    }
};

function sendMessage() {
  const message = document.getElementById('messageArea').value;
  const currentUser = firebase.auth().currentUser;
  const newMessageKey = firebase.database().ref().child('message').push().key;
  // crear ruta.
  firebase.database().ref(`message/${newMessageKey}`).set({
    creator: currentUser.uid,
    creatorName: currentUser.displayName,
    creatorEmail: currentUser.email,
    text: message
  });
}