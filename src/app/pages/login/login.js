const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const loginHtml = document.getElementById("login-html");

loginButton.addEventListener("click", event => {//auth in ./services/firebase/initialize.js
    const email = emailInput.value;
    const password = passwordInput.value;

    auth.signInWithEmailAndPassword(email, password)
        .catch(error => console.log(error.message));
});

registerButton.addEventListener("click", event => {
    loginHtml.parentNode.location = "../register/register.html"
});

auth.onAuthStateChanged(user => {
    if (user) { // usuario logueado
        loginHtml.parentNode.location = "../main/main.html"
    } 
    else { // usuario no logueado

    }
});