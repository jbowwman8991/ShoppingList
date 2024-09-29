import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyC0XUn3l0jo3UOGDxZcOu2el99al1XnBmk",
        authDomain: "todoapp-552d6.firebaseapp.com",
        projectId: "todoapp-552d6",
        storageBucket: "todoapp-552d6.appspot.com",
        messagingSenderId: "655688752245",
        appId: "1:655688752245:web:37f7776062cdb394916c3c"
}

class Fire {
        constructor(callback) {
                this.init(callback);
        };

        init(callback) {
                if (!firebase.apps.length) {
                        firebase.initializeApp(firebaseConfig);
                }

                firebase.auth().onAuthStateChanged(user => {
                        if (user) {
                                callback(null, user);
                        } else {
                                firebase.auth().signInAnonymously().catch(error => {
                                        callback(error);
                                })
                        }
                })
        }
}

export default Fire;