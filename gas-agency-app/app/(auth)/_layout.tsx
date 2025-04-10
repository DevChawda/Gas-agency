
import React from 'react'
import { Stack } from 'expo-router'

const Auth = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name='register' options={{headerShown: false}}/>
        <Stack.Screen name='login' options={{headerShown: false}}/>
        <Stack.Screen name='forgot' options={{headerShown: false}}/>
        <Stack.Screen name='otp' options={{headerShown: false}}/>
        <Stack.Screen name='reset' options={{headerShown: false}}/>
    </Stack>
  )
}

export default Auth