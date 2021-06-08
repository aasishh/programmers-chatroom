import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBtl940IgaWgKVmopYOoA0Bpiq7SNx-zEA",
    authDomain: "chat-room-47cc3.firebaseapp.com",
    projectId: "chat-room-47cc3",
    storageBucket: "chat-room-47cc3.appspot.com",
    messagingSenderId: "592157666747",
    appId: "1:592157666747:web:f5c7f518fa28d01c4d689e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db;
