import React from "react";
import PropTypes from "prop-types";

import { Avatar, Badge, ListItem } from "react-native-elements";


export const MovieListItem = ({title, year, type, poster, onPress, onRemove}) => {
    return (
        <ListItem
            bottomDivider
            onPress={onPress}
        >
            {poster ?
                <Avatar
                    rounded
                    size="large"
                    source={{uri: poster}}
                />
                : null
            }
            <ListItem.Content>
                <ListItem.Title>{title}</ListItem.Title>
                <ListItem.Subtitle>
                    {year ?
                        <Badge value={year}/>
                        : null
                    }
                    {type ?
                        <Badge value={type} status="warning"/>
                        : null
                    }
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron
                name={'delete'}
                color={'red'}
                type={'material'}
                size={40}
                onPress={onRemove}
            />
        </ListItem>
    );
};

MovieListItem.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    type: PropTypes.string,
    poster: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    year: PropTypes.string,
};
