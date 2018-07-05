const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const registerButton = document.getElementById("register-button");
const registerHtml = document.getElementById("resgister-html");

registerButton.addEventListener("click", event => {
    const email = emailInput.value;
    const password = passwordInput.value;

    auth.createUserWithEmailAndPassword(email, password)
        .catch(error => console.log(error.message));
});

auth.onAuthStateChanged(user => {
    if (user) { // usuario logueado
        registerHtml.parentNode.location = "../main/main.html";
    } 
    else { // usuario no logueado

    }
});