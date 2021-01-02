import React from "react";
import PropTypes from "prop-types";

import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";


export const Nav = ({navigation, children, tab}) => {
    const Tab = tab;
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({size, color}) => {
                        const defaultIcon = (size, color) => <AntDesign name="ellipsis1" size={size} color={color} />
                        const item = navigation.find(element => element.name === route.name);
                        return item ? item.iconFactory(size, color) : defaultIcon(size, color);
                    }
                })}
            >
                {children}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

Nav.propTypes = {
    navigation: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        iconFactory: PropTypes.func.isRequired,
    })).isRequired,
    tab: PropTypes.object.isRequired,
};
