import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { SignIn } from '../screens/SignIn'
import { SignInAuth, auth } from '../services/auth'
import { useEffect, useState } from 'react'
import { Loading } from '../components/Loading'


export function Routes() {

    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<any>()

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(response => {
            setUser(response)
            setIsLoading(false)
        })
        return subscriber
    }, [])

    if (isLoading) {
        return <Loading />
    }
    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : <SignIn />}
        </NavigationContainer>
    )
}