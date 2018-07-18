/* ----Login---- */
function login() {
  const emailValue = document.getElementById("login-username").value;
  const passwordValue = document.getElementById("login-password").value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
          console.log("Usuario con login exitoso");
      })
      .catch((error) => {
          console.log("Error de firebase > " + error.code);
          console.log("Error de firebase, mensaje > " + error.message);
      });
}

function loginWithFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  //provider.addScope("user_birthday"); tienen que pedirle permiso a facebook
  provider.setCustomParameters({
      'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
      .then(() => {
          console.log("Login con facebook");
      })
      .catch((error) => {
          console.log("Error de firebase > " + error.code);
          console.log("Error de firebase, mensaje > " + error.message);
      });
  scope: 'email'//acceder al email del usuario

}

function logout() {
  firebase.auth().signOut()
      .then(() => {
          console.log("Chao");
      })
      .catch();
}
/* -------FIN LOGIN------- */

/* -------router, login, register------ */
function showRegisterPage() {
  $('#login-page').hide(); 
  $('#perfil-page').hide(); 
  $('#dashboard-page').hide();
  $('#register-page').show();
}

function showPerfilPage() {
  $('#login-page').hide(); 
  $('#perfil-page').show(); 
  $('#dashboard-page').hide();
  $('#register-page').hide();
}

function showDashboardPage() {
  $('#login-page').hide(); 
  $('#perfil-page').hide(); 
  $('#dashboard-page').show();
  $('#register-page').hide();
}

function showLoginPage() {
  $('#login-page').show(); 
  $('#perfil-page').hide(); 
  $('#dashboard-page').hide();
  $('#register-page').hide();
}
/* -------fin router------ */


// inicializacion de firebase
firebase.initializeApp({
  apiKey: "AIzaSyA9KOG2Mc1NSFQ7h9OPNJbNJEDxJ62ivYI",
  authDomain: "red-social-cfa45.firebaseapp.com",
  projectId: "red-social-cfa45"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//----- Subir un post------
// Agregar documento
function guardar() {
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var fecha = document.getElementById('fecha').value;
  let d = new Date();
  let time = d.getHours() + ":" + d.getMinutes();
  let date = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();

  db.collection("users").add({
    first: nombre,
    last: apellido,
    born: fecha,
    date: date,
    time: time
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('fecha').value = '';
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}