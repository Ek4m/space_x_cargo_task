import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { FC, useCallback } from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { ICargo } from '../interfaces'
import { ParamList } from '../../../navigation'

export const CargoListItem: FC<ICargo> = (cargo) => {
    const navigation = useNavigation<NavigationProp<ParamList>>();

    const onNavigate = useCallback(() => {
        //@ts-ignore
        navigation.navigate("details", { id: cargo.id })
    }, [navigation, cargo])

    return (
        <TouchableOpacity onPress={onNavigate} style={styles.listItem}>
            <Text>{cargo.id} - {cargo.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
    }
})