import React from "react";
import { View } from "react-native";


export const Center = ({children, style = {}}) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: "center", height: "100%", ...style}}>
            {children}
        </View>
    );
}
