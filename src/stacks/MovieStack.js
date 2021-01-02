import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import {Button} from 'react-native-elements';

import {MovieListScreen, MovieDetailsScreen, AddMovieScreen} from "../screens"
import { useOrientation } from "../hooks";

const MovieStack = createStackNavigator();

export const MovieStackScreen = ({navigation}) => {
    const orientation = useOrientation();
    return (
        <MovieStack.Navigator>
            <MovieStack.Screen
                name="Movie List"
                component={MovieListScreen}
                options={{
                    headerStyle: {height: orientation === 'PORTRAIT' ? 100 : 50},
                    headerRight: () => (
                        <Button
                            type="clear"
                            onPress={() => navigation.navigate('Add Movie')}
                            icon={<Ionicons name="ios-add" size={40}/>}
                        />)
                }}
            />
            <MovieStack.Screen
                name="Movie Details"
                component={MovieDetailsScreen}
            />
            <MovieStack.Screen
                name="Add Movie"
                component={AddMovieScreen}
            />
        </MovieStack.Navigator>
    );
};
