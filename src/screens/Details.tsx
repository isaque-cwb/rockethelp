import { useEffect, useState } from 'react';
import { VStack, Text, HStack, useTheme, ScrollView, KeyboardAvoidingView, Box } from 'native-base';
import { Header } from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native'
import { OrderProps } from '../components/Order';
import { Timestamp, collection, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../services/auth';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native'
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/input';
import { Alert, Platform } from 'react-native'
import { Button } from '../components/Button';


type RouteParamns = {
    orderId: string
}

type OrderDatils = OrderProps & {
    description: string;
    solution: string;
    closed: string;
}

export function Details() {
    const [isLoading, setIsLoading] = useState(true)
    const [isloadingButton, setIsLoadingButton] = useState(false)
    const [solution, setSolution] = useState('')
    const { colors } = useTheme()
    const [order, setOrder] = useState<OrderDatils>({} as OrderDatils)
    const navigation = useNavigation()
    const route = useRoute()
    const { orderId } = route.params as RouteParamns

    function handleOrderClose() {
        if (!solution) {
            return Alert.alert('Solicitação', 'Informar a solução para encerrar a solicitação')
        }

        const ref = doc(FIRESTORE_DB, 'order', orderId)
        updateDoc(ref, {
            status: 'closed',
            solution,
            closed_at: Timestamp.now()
        }).then(() => {
            setIsLoadingButton(true)
            setTimeout(() => {
                Alert.alert('Solicitação', 'Solicitação encerrada.')
                navigation.goBack()
            }, 2000);
        }).catch(erro => {
            console.log(erro)
            Alert.alert('Erro', 'Não foi possível encerrar a solicitação.')
        })
    }

    useEffect(() => {

        const getOrderDatatils = async () => {

            const ref = doc(FIRESTORE_DB, 'order', orderId)
            const docSnap = await getDoc(ref)
            if (docSnap.exists()) {
                const { patrimony, description, status, created_at, closed_at, solution } = docSnap.data()

                const closed = closed_at ? dateFormat(closed_at) : null
                const when = created_at ? dateFormat(created_at) : null

                setOrder({
                    id: docSnap.id,
                    patrimony,
                    description,
                    status,
                    when,
                    closed,
                    solution
                })

                setIsLoading(false)
            }
        }
        getOrderDatatils()
    }, [])

    if (isLoading) {
        return <Loading />
    }
    return (
        <VStack flex={1} bg={'gray.700'} >
            <Box p={4} bg={'gray.700'} >

                <Header title='Solicitação' />
            </Box>
            <HStack bg={'gray.500'} justifyContent={'center'} p={4}  >
                {
                    order.status === 'closed'
                        ? <CircleWavyCheck size={22} color={colors.green[300]} />
                        : <Hourglass size={22} color={colors.secondary[700]} />
                }
                <Text
                    fontSize={'sm'}
                    color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
                    ml={2}
                    textTransform={'uppercase'}
                >
                    {
                        order.status === 'closed' ? 'Finalizado' : 'em Andamento'
                    }
                </Text>

            </HStack>
            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <CardDetails
                    title='equipamento'
                    description={`Patrimônio: ${order.patrimony}`}
                    icon={DesktopTower}
                    footer={`Aberto em ${order.when}`}
                />

                <CardDetails
                    title='descrição do problema'
                    description={order.description}
                    icon={Clipboard}

                />
                <CardDetails
                    title='solução'
                    icon={CircleWavyCheck}
                    description={order.solution}
                    footer={order.closed && `Encerrado em ${order.closed}`}
                >{
                        order.status === 'open' &&
                        <Input
                            placeholder='Descrição da Solução'
                            onChangeText={setSolution}
                            h={24}

                            textAlignVertical='top'
                            multiline
                        />
                    }
                </CardDetails>

            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {
                    order.status === 'open' &&
                    <Button
                        title='Encerrar solicitação'
                        m={5}
                        mb={10}
                        isLoading={isloadingButton}
                        onPress={handleOrderClose}
                    />
                }
            </KeyboardAvoidingView>


        </VStack>
    );
}