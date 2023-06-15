import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { HomeScreen, DetailsScreen } from './screens';

export type ParamList = {
    home: undefined;
    details: { id: string };
}

const Stack = createStackNavigator<ParamList>();

export const BaseNavigation = () => {
    return (
        <NavigationContainer>
            <View style={styles.main}>
                <Stack.Navigator>
                    <Stack.Screen options={{ title: "List of cargo ships" }} name='home' component={HomeScreen} />
                    <Stack.Screen name='details' component={DetailsScreen} />
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    main: {
        paddingTop: 40,
        flex: 1,
    }
})