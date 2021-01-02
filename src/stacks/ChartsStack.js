import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {ChartsScreen} from "../screens";
import {useOrientation} from "../hooks";

const ChartsStack = createStackNavigator();

export const ChartsStackScreen = () => {
    const orientation = useOrientation();
    return (
        <ChartsStack.Navigator>
            <ChartsStack.Screen
                name="Charts"
                component={ChartsScreen}
                options={{
                    headerStyle: {height: orientation === 'PORTRAIT' ? 100 : 50},
                }}
            />
        </ChartsStack.Navigator>
    );
};
