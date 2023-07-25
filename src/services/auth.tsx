import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig } from '../../firebase-config'
import { initializeApp } from 'firebase/app'
import { Alert } from 'react-native'
import { getFirestore, Timestamp } from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const FIRESTORE_DB = getFirestore(app)



export { auth, signInWithEmailAndPassword, FIRESTORE_DB, Timestamp }