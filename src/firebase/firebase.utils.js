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

//Create User profile
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; // Receive user auth from OAuth

    // Get reference details from firestore
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()

    //Create user if not exist
    if(!snapshot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
            
        } catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()), // convert title into browser readable route format
            id: doc.id,
            title,
            items
        }
    });

    // In the local application, replace the snapshot ref (key) with the the title as key
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    }, {})
}

// Initialize Firebase
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