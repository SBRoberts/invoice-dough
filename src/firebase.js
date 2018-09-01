import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCuv5XNt2TKcq0YqVs0PkBuOhA8ILwIy3I",
    authDomain: "dubble-35c8a.firebaseapp.com",
    databaseURL: "https://dubble-35c8a.firebaseio.com",
    projectId: "dubble-35c8a",
    storageBucket: "dubble-35c8a.appspot.com",
    messagingSenderId: "18930459210"
};
firebase.initializeApp(config);

export default firebase;