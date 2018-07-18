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