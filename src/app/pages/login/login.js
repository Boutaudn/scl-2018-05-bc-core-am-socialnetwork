const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const logoutButton = document.getElementById("logout-button");

loginButton.addEventListener("click", event => {//auth in ./services/firebase/initialize.js
    const email = emailInput.value;
    const password = passwordInput.value;

    auth.signInWithEmailAndPassword(email, password)
        .catch(error => console.log(error.message));
});

registerButton.addEventListener("click", event => {
    const email = emailInput.value;
    const password = passwordInput.value;

    auth.createUserWithEmailAndPassword(email, password)
        .catch(error => console.log(error.message));
});

logoutButton.addEventListener("click", event => {
    auth.signOut();
});

auth.onAuthStateChanged(user => {
    if (user) { // usuario logueado
        //aquí debería ir manejo del DOM
    } 
    else { // usuario no logueado

    }
});