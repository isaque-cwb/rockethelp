import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig } from '../../firebase-config'
import { initializeApp } from 'firebase/app'
import { Alert } from 'react-native'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)


function SignInAuth(email: string, password: string) {


    if (!email || !password) {
        return Alert.alert('Entrar', 'Informe e-mail e senha')
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(response => {
            console.log(response)
        })
        .catch((error) => {

            if (error.code === 'auth/invalid-email') {
                return Alert.alert('e-mail inválido!', 'Verifique se e-mail está correto')
            }
            if (error.code === 'auth/user-not-found') {
                return Alert.alert('e-mail ou senha inválido!', 'Verifique e-mail/senha')
            }
            if (error.code === 'auth/wrong-password') {
                return Alert.alert('e-mail ou senha inválido!', 'Verifique e-mail/senha')
            }
            return Alert.alert('Não foi possível entrar')
        })
}



export { auth, SignInAuth }