import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAWqpQqEWrqbiFEzak4T-az84BhUFBH4Yo",
    authDomain: "name-store.firebaseapp.com",
    databaseURL: "https://name-store.firebaseio.com",
    projectId: "name-store",
    storageBucket: "",
    messagingSenderId: "924567776498",
    appId: "1:924567776498:web:d4a0bfd6d1c26fe6"
};

firebase.initializeApp(config);
export default firebase;

