
window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {             //Si estamos logueados

         showDashboardPage(); //Cambiar a la pagina de dasboard
         setupMessages();     //Dejar todo listo para mostrar mensajes. 

      } else {                //No estamos logueados
         showLoginPage();     //Cambiar a la pagina de login
      }
  });
};

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
function showPerfilPage() {
  $('#login-page').hide(); 
  $('#perfil-page').show(); 
  $('#dashboard-page').hide();
  $('#register-page').hide();
}

function showRegisterPage() {
  $('#login-page').hide(); 
  $('#perfil-page').hide(); 
  $('#dashboard-page').hide();
  $('#register-page').show();
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

/* --------Register------- */
function register() {
  const emailValue = document.getElementById("register-email").value;
  const passwordValue = document.getElementById("register-password").value;
  
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
          console.log("Usuario registrado");
      })
      .catch((error) => {
          console.log("Error de firebase > " + error.code);
          console.log("Error de firebase, mensaje > " + error.message);
      });
}
/* -----Fin register----- */




// inicializacion de firebase
firebase.initializeApp({
  apiKey: "AIzaSyA9KOG2Mc1NSFQ7h9OPNJbNJEDxJ62ivYI",
  authDomain: "red-social-cfa45.firebaseapp.com",
  projectId: "red-social-cfa45"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();


// Subir un post

// Agregar documento
function guardar() {
  let texto = document.getElementById('text').value;
  let name = "mi@mail.com";
  let d = new Date();
  let time = d.getHours() + ":" + d.getMinutes();
  let date = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
  let title = document.getElementById('titulo').value;

  db.collection("post").add({
    name: name,
    title: title,
    texto: texto,
    date: date,
    time: time
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      console.log("text");
      document.getElementById('text').value = '';
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

// Leer comentarios
var posteos = document.getElementById('muro');

db.collection("post").onSnapshot((querySnapshot) => {
  posteos.innerHTML = '';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      posteos.innerHTML += `
      <div id="post">
      <div class="card" style="width: 20rem;">
        <div class="card-body">
          <h5>${doc.data().title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${doc.data().name}</h6>
          <p>${doc.data().texto}</p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>`
      /* <tr>
            <th scope="row">${doc.data().time}</th>
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().born}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().first}', '${doc.data().last}', '${doc.data().born}')">Editar</button></td>
          </tr> */

    });
});
