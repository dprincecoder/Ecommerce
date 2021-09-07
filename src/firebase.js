import * as firebase from 'firebase';


const firebaseConfig = {
	apiKey: "AIzaSyCxL6rbVtu7gt3bcSI1xQeRnkaEOho2ZWY",
	authDomain: "ecommerce-web-fc5d7.firebaseapp.com",
	projectId: "ecommerce-web-fc5d7",
	storageBucket: "ecommerce-web-fc5d7.appspot.com",
	messagingSenderId: "77532771874",
	appId: "1:77532771874:web:dd7f5799c9959106a13c7b",
};


const firebaseApp = firebase.initializeApp(firebaseConfig);   //initialize our api key and database schema from firebase

const DB = firebaseApp.firestore();   //create a database from firebase firestore

const auth = firebase.auth();   //authorize users using firebase auth

const provider = new firebase.auth.GoogleAuthProvider();  //let google be our firebase authorization
const signInWithGoogle = () => auth.signInWithPopup(provider);
const storage = firebase.storage();

//handle users information in DB
const handleUserProfile = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const { uid } = userAuth;
	

	const userRef = DB.doc(`users/${uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email, photoURL, } = userAuth;
		const timestamp = new Date();
		try {
			await userRef.set({
				displayName, email, createdDate: timestamp, photoURL, ...additionalData
			})
		} catch (error) {
			console.log(error);
		}
	}
	return userRef;
}


//exports our modules
export { auth, signInWithGoogle, DB, storage, handleUserProfile };




