const logoutButton = document.getElementById("logout-button");
const mainHtml = document.getElementById("main-html");

logoutButton.addEventListener("click", event => {
    auth.signOut();
});

auth.onAuthStateChanged(user => {
    if (!user) { // usuario no logueado
        mainHtml.parentNode.location = "../login/login.html"
    } 
});
