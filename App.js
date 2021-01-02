import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';


import { Nav } from './src/UI';
import { MovieStackScreen, ImagesStackScreen, ChartsStackScreen } from "./src/stacks";


const Tab = createBottomTabNavigator();

export default function App() {
    const navigation = [
        {
            name: "Movies List",
            component: MovieStackScreen,
            iconFactory: (size, color) =>
                <MaterialCommunityIcons name="library-movie" size={size} color={color} />
        },
        {
            name: "Images",
            component: ImagesStackScreen,
            iconFactory: (size, color) =>
                <Ionicons name="md-images" size={size} color={color} />
        },
        {
            name: "Charts",
            component: ChartsStackScreen,
            iconFactory: (size, color) =>
                <AntDesign name="areachart" size={size} color={color} />
        }
    ];

    return (
        <Nav tab={Tab} navigation={navigation}>
            {navigation.map(item => (
                <Tab.Screen
                    key={item.name}
                    name={item.name}
                    component={item.component}
                />
            ))}
        </Nav>
  );
}
