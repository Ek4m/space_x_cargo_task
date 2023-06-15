import { Button, Keyboard, Linking, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { ParamList } from '../navigation'
import { CargoContext } from '../modules/cargo/contexts'

export const DetailsScreen = ({ route, navigation }: StackScreenProps<ParamList, "details">) => {
    const [boxes, setBoxes] = useState('');
    const { cargoes, setCargoes } = useContext(CargoContext)

    const cargo = useMemo(() => {
        const found = cargoes.find(elem => elem.id === route.params.id);
        return found;
    }, [cargoes, route.params])

    useEffect(() => {
        if (cargo) {
            navigation.setOptions({ title: cargo.name });
            setBoxes(cargo.boxes);
        }
    }, [cargo])

    const onOpenMail = useCallback(async () => {
        const url = `mailto:${cargo?.email}`;
        if (await Linking.canOpenURL(url)) {
            Linking.openURL(url)
        } else {
            alert("Email format is not supported")
        }
    }, [cargo])

    const onSave = useCallback(() => {
        const foundIndex = cargoes.findIndex(elem => elem.id === route.params.id);
        if (foundIndex >= 0) {
            const copy = Array.from(cargoes);
            copy[foundIndex].boxes = boxes;
            setCargoes(copy);
            navigation.goBack();
        }
    }, [cargoes, route.params, navigation, setCargoes,boxes])

    const cargoBays = useMemo(() => {
        if (boxes) {
            const cargoNum = boxes.split(",").map(elem => parseFloat(elem.trim()) || 0).reduce((prev, curr) => prev + curr, 0);
            return Math.ceil(cargoNum / 10);
        } else {
            return 0;
        }
    }, [boxes])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text>Name:{cargo?.name}</Text>
                <TouchableOpacity style={styles.mailButton} onPress={onOpenMail}>
                    <Text style={styles.mailButtonText}>{cargo?.email}</Text>
                </TouchableOpacity>
                <Text style={styles.cargoBays}>Number of required cargo bays {cargoBays}</Text>
                <TextInput
                    keyboardType='decimal-pad'
                    style={styles.input}
                    value={boxes}
                    onChangeText={setBoxes}
                    placeholder='Cargo boxes...' />
                <Button onPress={onSave} title='Save' />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    mailButton: {
        paddingVertical: 10
    },
    mailButtonText: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    input: {
        borderWidth: 1,
        padding: 8,
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 20
    },
    cargoBays: {
        marginVertical: 10
    }
})