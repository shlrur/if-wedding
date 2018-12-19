import firebase from 'firebase';
import '@firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCQKzWPHD1nXvhNIZVDXOAIQz6hIzRyYEM",
    authDomain: "ifwedding-f16ba.firebaseapp.com",
    databaseURL: "https://ifwedding-f16ba.firebaseio.com",
    projectId: "ifwedding-f16ba",
    storageBucket: "ifwedding-f16ba.appspot.com",
    messagingSenderId: "78018529588"
});

const rsf = new ReduxSagaFirebase(firebaseApp);

firebase.firestore().settings({ timestampsInSnapshots: true });

export default rsf;
