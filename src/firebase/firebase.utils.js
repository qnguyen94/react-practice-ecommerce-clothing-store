import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBqq2FbS5B49s-LWVZ2MjkCigQfRG_sTV0",
    authDomain: "react-practice-ecommerce-db.firebaseapp.com",
    databaseURL: "https://react-practice-ecommerce-db.firebaseio.com",
    projectId: "react-practice-ecommerce-db",
    storageBucket: "react-practice-ecommerce-db.appspot.com",
    messagingSenderId: "390740244306",
    appId: "1:390740244306:web:624923a1022a052e25ec8b"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore()

//Configure google auth provider
const provider =  new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account', //Always trigger google popups when using google auth provider for auth and signin
})
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;