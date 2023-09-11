import { Center, Spinner } from 'native-base'
import { THEME } from '../styles/theme'



export function Loading() {
    return (
        <Center flex={1} bg='gray.700' >
            <Spinner color='secondary.700' />
        </Center>
    )
}