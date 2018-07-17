var firebaseInicialize = () => {
  var config = {
    apiKey: "AIzaSyA9KOG2Mc1NSFQ7h9OPNJbNJEDxJ62ivYI",
    authDomain: "red-social-cfa45.firebaseapp.com",
    databaseURL: "https://red-social-cfa45.firebaseio.com",
    projectId: "red-social-cfa45",
    storageBucket: "red-social-cfa45.appspot.com",
    messagingSenderId: "19839803644"
    };
  firebase.initializeApp(config);
};

firebaseInicialize();

const auth = firebase.auth(); 