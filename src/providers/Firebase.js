import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    signInWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    };

    signOut = () => this.auth.signOut();

    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    passwordUpdate = password => this.auth.currentUser.updatePassword(password);

    getAccounts = () => this.db.collection('accounts').get();
    getAccount = accountID => this.db.collection('accounts').doc(accountID).get();
    saveAccount = account => this.db.collection('accounts').add(account);
    setAccount = (accountID, account) => this.db.collection('accounts').doc(accountID).set(account);
    deleteAccount = accountID => this.db.collection('accounts').doc(accountID).delete();

    getServicesFees = () => this.db.collection('servicesFees').get();
    saveServicesFee = serviceFee => this.db.collection('servicesFees').add(serviceFee);
    deleteServicesFee = serviceFeeID => this.db.collection('servicesFees').doc(serviceFeeID).delete();

    savePayment = payment => this.db.collection('payments').add(payment);
}

export default Firebase;
