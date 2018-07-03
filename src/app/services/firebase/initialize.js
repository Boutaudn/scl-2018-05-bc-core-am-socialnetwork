var firebaseInicialize = () => {
    var config = {
        apiKey: "AIzaSyAYu58bBgK8kTNtmD4U2N77pwcrSWtJlrE",
        authDomain: "red-social-79698.firebaseapp.com",
        databaseURL: "https://red-social-79698.firebaseio.com",
        projectId: "red-social-79698",
        storageBucket: "red-social-79698.appspot.com",
        messagingSenderId: "1019293340745"
    };
    firebase.initializeApp(config);
};

firebaseInicialize();

const auth = firebase.auth(); 