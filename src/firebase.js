import * as firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth'

// Firebase configuration
export const firebaseConfig = {
	apiKey: "AIzaSyCxL6rbVtu7gt3bcSI1xQeRnkaEOho2ZWY",
	authDomain: "ecommerce-web-fc5d7.firebaseapp.com",
	projectId: "ecommerce-web-fc5d7",
	storageBucket: "ecommerce-web-fc5d7.appspot.com",
	messagingSenderId: "77532771874",
	appId: "1:77532771874:web:dd7f5799c9959106a13c7b",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const DB = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();

GoogleProvider.setCustomParameters({ prompt: "Select Account" });

export const signInWithGoogle = () =>  auth.signInWithPopUp(GoogleProvider);





