import { Button, FlatList, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { CargoContext } from '../modules/cargo/contexts'
import { CargoListItem } from '../modules/cargo/components';

export const HomeScreen = () => {
    const { cargoes, onLoad, onSave } = useContext(CargoContext);
    const [search, setSearch] = useState('');

    const pureCargoes = useMemo(() => {
        if (search.length) {
            return cargoes.filter(elem => elem.name.includes(search));
        } else {
            return cargoes;
        }
    }, [cargoes, search])
    return (
        <View
            style={styles.page}>
            <View style={styles.header}>
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    keyboardType='default'
                    style={styles.searchInput}
                    placeholder='Search...' />
                <View style={styles.headerButtons}>
                    <Button title='Load' onPress={onLoad} />
                    <Button title='Save' onPress={onSave} />
                </View>
            </View>
            <TouchableWithoutFeedback style={{ flex: 1 }}>
                <FlatList
                    style={styles.list}
                    data={pureCargoes}
                    keyExtractor={(item) => item.id}
                    renderItem={(info) => <CargoListItem {...info.item} />}
                />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: '100%',
    },
    header: {
        padding: 20,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    headerButtons: {
        flexDirection: "row"
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 5,
        maxWidth: '50%',
        padding: 5
    },
    list: {
        paddingHorizontal: 20,
        flex: 1
    }
})