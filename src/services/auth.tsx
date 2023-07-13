import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig } from '../../firebase-config'
import { initializeApp } from 'firebase/app'
import { Alert } from 'react-native'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)



export { auth, signInWithEmailAndPassword }