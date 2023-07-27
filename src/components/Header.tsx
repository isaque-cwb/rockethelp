import React from 'react';
import { HStack, VStack, IconButton, useTheme, Heading, StyledProps } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
    title: string
}


export function Header({ title, ...rest }: Props) {
    const { colors } = useTheme()
    const navigation = useNavigation()

    function handleGoBack() {
        navigation.goBack()
    }
    return (
        <HStack
            w={'full'}
            justifyContent={'space-between'}
            alignItems={'center'}
            pt={8}
            {...rest}
        >
            <IconButton

                height={60}
                width={60}
                icon={<CaretLeft color={colors.gray[200]} size={24} />} onPress={handleGoBack} />
            <Heading color={'gray.100'} textAlign={'center'} fontSize={'lg'} flex={1} ml={-16} >
                {title}
            </Heading>
        </HStack>
    );
}