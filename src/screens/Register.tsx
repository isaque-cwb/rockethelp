import React, { useEffect, useState } from 'react';
import { VStack, KeyboardAvoidingView } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/input';
import { Button } from '../components/Button';
import { Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore'
import { FIRESTORE_DB, Timestamp } from '../services/auth';


export function Register() {

    const [isLoading, setIsLoading] = useState(false)
    const [patrimony, setPatrimony] = useState('')
    const [description, setDescription] = useState('')

    const navigation = useNavigation()


    const handleNewOrderRegister = async () => {
        if (!patrimony || !description) {
            return Alert.alert('Não existem dados', 'Preencha todos os campos')
        }
        setIsLoading(true)
        const doc = await addDoc(collection(FIRESTORE_DB, 'order'), {
            patrimony,
            description,
            status: 'open',
            created_at: Timestamp.now(),

        }).then(() => {
            Alert.alert('Solicitação Cadastrada', 'Solicitação registrada com sucesso!')
            navigation.goBack()

        }).catch((error) => {
            setIsLoading(false)
            Alert.alert('Erro ao Registrar', 'Não foi possível registrar o pedido!')

        })
    }



    return (

        <VStack flex={1} p={6} bg={'gray.600'} minHeight={300}>
            <Header title='Nova Solicitação' />

            <Input
                placeholder='Número do patrimônio'
                mt={4}
                onChangeText={setPatrimony}
                value={patrimony}
            />
            <Input
                placeholder='Descrição do problema'

                flex={1}
                mt={5}
                multiline
                textAlignVertical='top'
                onChangeText={setDescription}
                value={description}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}

            >

                <Button
                    title='Cadastrar'
                    mt={5}
                    mb={5}
                    isLoading={isLoading}
                    onPress={() => { handleNewOrderRegister() }}
                />
            </KeyboardAvoidingView>

        </VStack >

    );
}