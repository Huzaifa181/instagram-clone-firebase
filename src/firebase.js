import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCdLGGAvGknXIGXDwm_f8z3AwuPVHQr1iQ",
  authDomain: "instagram-clone-firebase-c6732.firebaseapp.com",
  projectId: "instagram-clone-firebase-c6732",
  storageBucket: "instagram-clone-firebase-c6732.appspot.com",
  messagingSenderId: "260814211963",
  appId: "1:260814211963:web:342a1a396e2d9732c4cbde"
};
 
  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db=firebaseApp.firestore();
  const auth=firebaseApp.auth();
  const storage=firebaseApp.storage();
  export {db ,auth,storage}
