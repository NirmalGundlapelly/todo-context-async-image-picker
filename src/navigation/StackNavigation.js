import { Text, View } from 'react-native'
import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoScreen1 from '../blocks/TodoScreen1';




const Stack = createNativeStackNavigator();

export default class StackNavigation extends Component {
    render() {
        return (
         
            <NavigationContainer>
                <Stack.Navigator initialRouteName='TodoScreen1' screenOptions={{headerShown:false}}>
                    <Stack.Screen name="TodoScreen1" component={TodoScreen1} />
                </Stack.Navigator>
            </NavigationContainer>
          
        )
    }
}