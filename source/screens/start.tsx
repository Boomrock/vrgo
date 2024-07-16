import { useContext, useEffect } from "react";
import { View } from "react-native";
import * as Font from 'expo-font';

import { ClearStackAndNavigate, NavigationContext} from "@navigations/navigate";
import { Screens } from "@navigations/Screens";

import { IDataProvider, Path } from "@scripts/interfaces/content-provider/IDataProvider";


export default function Start({ navigation }: { navigation: any }) {
    const { data, setData } = useContext(NavigationContext);

    const loadFonts = async () => {
        await Font.loadAsync({
        'Inter-Regular': require('@fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('@fonts/Inter-Bold.ttf'),
        'RobotoMono': require('@fonts/RobotoMono-Regular.ttf'),
        'RobotoMono-Bold': require('@fonts/RobotoMono-Bold.ttf'),
        });
    };
    const loadData = async () => {
        let dataProvider = data.dataProvider as IDataProvider;

        try {
            await loadFonts();
            const result = await dataProvider.GetSerializable(Path.pathology);

            if (result != null) {
                ClearStackAndNavigate(navigation, Screens.MainScreen);
                return;
            }
            ClearStackAndNavigate(navigation, Screens.ChoosePat);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);
    return(<></>);
  }