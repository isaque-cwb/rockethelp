import { VStack, Heading, Icon, useTheme, KeyboardAvoidingView, keyboardDismissHandlerManager } from 'native-base'
import Logo from '../assets/logo_primary.svg'
import { Input } from '../components/input'
import { Envelope, Key } from 'phosphor-react-native'
import { Button } from '../components/Button'
import { Alert, Keyboard, Platform } from 'react-native'
import { useState } from 'react'
import { auth, signInWithEmailAndPassword } from '../services/auth'


export function SignIn() {
    const { colors } = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)



    function handleSingIn() {

        if (!email || !password) {
            return Alert.alert('Entrar', 'Informe e-mail e senha')
        }
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response)
            })
            .catch((error) => {
                setIsLoading(false)
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


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            flex={1} alignItems='center' justifyContent='center' bg='gray.600' px={8}  >
            <Logo />
            <VStack>
                <Heading color='gray.100' fontSize='xl' mt={16} mb={8} >
                    Acesse sua conta
                </Heading>
            </VStack>
            <Input
                placeholder='E-mail'
                mb={3}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                keyboardType='email-address'
                onChangeText={setEmail}
                value={email}
            />
            <Input
                placeholder='Senha'
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                secureTextEntry
                keyboardType='numeric'
                onChangeText={setPassword}
                value={password}

            />
            <Button
                title='Entrar'
                w='full'
                onPress={handleSingIn}
                isLoading={isLoading}
            />

        </KeyboardAvoidingView >
    )
}