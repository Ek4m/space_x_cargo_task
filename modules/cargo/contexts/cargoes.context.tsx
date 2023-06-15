import { FC, PropsWithChildren, createContext, useCallback, useEffect, useState } from "react";
import { ICargo } from "../interfaces";
import { CargoService } from "../services";
import { SuccessResponse } from "../../../common/http/responses";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { _localData } from "../../../common/constants";
import { Alert } from "react-native";

type CargoContextType = {
    cargoes: ICargo[];
    onLoad(): void;
    setCargoes(val: ICargo[]): void;
    onSave(): void;
}

export const CargoContext = createContext<CargoContextType>({
    cargoes: [],
    onLoad() { },
    setCargoes(val: ICargo[]) { },
    onSave() { }
})

export const CargoProvider: FC<PropsWithChildren> = ({ children }) => {
    const [cargoes, setCargoes] = useState<ICargo[]>([]);

    useEffect(() => {
        (async () => {
            const response = await CargoService.getLocalInitialData();
            if (response instanceof SuccessResponse) {
                setCargoes(response.data);
            }
        })();
    },[]);

    const onLoad = useCallback(async () => {
        Alert.alert("This will override local data", "", [
            {
                text: "Do it",
                onPress: async () => {
                    const response = await CargoService.loadFromJson();
                    if (response instanceof SuccessResponse) {
                        setCargoes(response.data);
                    }
                }
            },
            {
                style: "cancel",
                text: "Cancel"
            }
        ])
    }, [])

    const onSave = useCallback(async () => {
        const stringData = JSON.stringify(cargoes);
        await AsyncStorage.setItem(_localData, stringData);
        alert("Local data were saved")
    }, [cargoes])

    return <CargoContext.Provider value={{ cargoes, onLoad, setCargoes, onSave }}>
        {children}
    </CargoContext.Provider>
}