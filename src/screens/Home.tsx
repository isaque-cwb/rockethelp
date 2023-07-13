import React, { useState } from 'react';
import { HStack, Heading, IconButton, Text, VStack, useTheme, FlatList, Center } from 'native-base';
import Logo from '../assets/logo_secondary.svg'
import { SignOut, ChatTeardropText } from 'phosphor-react-native'
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/auth'
import { Alert } from 'react-native'

export function Home() {
    const { colors } = useTheme()
    const navigation = useNavigation()

    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')

    const [orders, setOrders] = useState<OrderProps[]>([{
        id: '123',
        patrimony: '123456',
        when: '11/07/2023 22:10 ',
        status: 'open'
    }])

    function handleNewOrder() {
        navigation.navigate('new')
    }

    function handleOpenDetails(orderId: string) {
        navigation.navigate('details', { orderId })

    }

    function handleLogout() {
        auth.signOut().catch(error => {
            console.log(error)
            return Alert.alert('Sair', 'Não foi possível sair.')
        })
    }

    return (
        <VStack flex={1} pb={6} bg={'gray.700'} >
            <HStack
                w={'full'}
                justifyContent={'space-between'}
                alignItems={'center'}
                bg={'gray.600'}
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />
                <IconButton onPress={handleLogout}
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                />

            </HStack>
            <VStack flex={1} px={6}  >
                <HStack w={'full'} mt={8} mb={4} justifyContent={'space-between'} alignItems={'center'} >
                    <Heading color={'gray.100'}  >
                        Meus Chamados
                    </Heading>
                    <Text color={colors.gray[200]}  >
                        3
                    </Text>
                </HStack>
                <HStack space={3} mb={8}>

                    <Filter
                        title='Em Andamento'
                        type='open'
                        onPress={() => setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />
                    <Filter
                        title='Finalizados'
                        type='closed'
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>

                <FlatList
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    ListEmptyComponent={() => (
                        <Center pt={100} >
                            <ChatTeardropText color={colors.gray[300]} size={40} />
                            <Text
                                color='gray.300'
                                fontSize={'xl'}
                                mt={6}
                                textAlign={'center'}
                            >
                                Você ainda não possui {'\n'}
                                Solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                            </Text>
                        </Center>
                    )}
                />

                <Button title='Nova Solicitação' onPress={handleNewOrder} />
            </VStack>

        </VStack>
    );
}