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
  var texto = document.getElementById('text').value;
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
      console.log('sí se ha guardado');
      document.getElementById('text').value = '';
      document.getElementById('titulo').value = '';
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
          <h11 class="card-subtitle mb-2 text-muted">${doc.data().name}</h11>
          <p>${doc.data().texto}</p>
          <button class="btn btn-danger" onclick="myFunction(event, '${doc.id}')">Eliminar</button>
          <button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().title}', '${doc.data().texto}')">Editar</button>
          <h6>${doc.data().time}</h6>
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

// Borrar documentos
function eliminar(id){
  db.collection("post").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
}

function myFunction(event, id) {
  if (confirm("estas seguro??")) {
    eliminar(id);
  } else {
    console.log('no eliminar');
  }
}


// Editar documento
function editar(id, titulo, texto){
  document.getElementById('titulo').value = titulo;
  document.getElementById('text').value = texto;
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar';
  boton.onclick = function(){

    let editarPost = db.collection("post").doc(id);
    let title = document.getElementById('titulo').value;
    let texto = document.getElementById('text').value;

    return editarPost.update({
      title: title,
      texto: texto
    })
    .then(function() {
      console.log("Document successfully updated!");
      boton.innerHTML = 'Guardar';
      document.getElementById('titulo').value = '';
      document.getElementById('text').value = '';
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }
}
