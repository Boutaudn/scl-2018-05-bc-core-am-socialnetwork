let counter = 0;
function clickCounter() {
    counter += 1;
    document.getElementById("icon").innerHTML = counter;
}

function registroYes() {
  document.getElementById('registro').classList.remove('d-none');
}
function registroNone() {
  document.getElementById('registro').classList.add('d-none');
}
function registroPage() {
  if (registro.className.indexOf('d-none') >= 0) {
    registroYes();
  }
}
function registrolist() {
  if (registro.className.indexOf('d-none') >= 0){
    registroNone()
  }
}
function termsAndConditions() {
  alert('Los terminos y condiciones son blablablablabla');
}