import React, { createContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { DataProvider } from "@scripts/utils/DataProvider";

import ChoosingBodyPart from "@screens/choosingBodyPart";
import SessionScreen from "@screens/session";
import ChoosePat from "@screens/choosePat";
import MainScreen from "@screens/main";
import Start from "@screens/start";
import { Screens } from "./Screens";


export const NavigationContext = createContext<any>(null);

const Stack = createStackNavigator();

export default function Navigate(initialScreen: string){

    const [data, setData] = useState({ dataProvider: DataProvider.GetInstance() });
    
    return (
        <>
        <StatusBar style="light" backgroundColor="black"/>
    <NavigationContainer>
        <NavigationContext.Provider value={{data, setData}}>
        <Stack.Navigator initialRouteName={initialScreen}>
            <Stack.Screen
                    name={Screens.Start}
                    component={Start}
                    options={{title: 'Выбор патологии',  headerShown: false}}
                    />
            <Stack.Screen
                name={Screens.ChoosePat}
                component={ChoosePat}
                options={{title: 'Выбор патологии',  headerShown: false}}
                />
            <Stack.Screen
                name={Screens.ChoosingBodyPart}
                component={ChoosingBodyPart}
                options={{title: 'Выбор части тела',  headerShown: false}}
                />
            <Stack.Screen 
                name= {Screens.SessionScreen}
                component={SessionScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name={Screens.MainScreen}
                component={MainScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
        </NavigationContext.Provider>
    </NavigationContainer>
    </>
    )
}

export function ClearStackAndNavigate(navigation : any , path: string) { 
     navigation.dispatch(CommonActions.reset({
         index: 0,
         routes: [{name: path}]
    }))
    return () => navigation.popToTop()
}

