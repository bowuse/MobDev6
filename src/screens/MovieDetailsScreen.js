import React, {useState, useEffect} from 'react';
import {Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import { Card, Rating } from 'react-native-elements';

import { moviesRepository } from "../domain/repo";

export const MovieDetailsScreen = ({route}) => {
    const [movieDetails, setMovieDetails] = useState({});

    useEffect(() => {
        const {movieId} = route.params;
        moviesRepository.get(movieId)
            .then(data => setMovieDetails(data));
    }, []);

    const image = movieDetails['Poster'];
    const title = movieDetails['Title'];
    const strRating = movieDetails['imdbRating'];
    const rating = strRating ? Number.parseFloat(movieDetails['imdbRating']) : 0;

    const mainProperties = {Released: 'Released', Genre: 'Genre', Runtime: 'Runtime'};
    const peopleProperties = {
        Director: 'Director',
        Writer: 'Writer',
        Actors: 'Actors'
    };
    const manufactureProperties = {Country: 'Country', Language: 'Language'};
    const awardsProperties = {Awards: 'Awards', imdbVotes: 'Votes'};

    const renderProperties = properties => {
        return Object.keys(properties).map(key => {
            const text = movieDetails[key];
            return text ? (
                <Text key={key}>
                    {properties[key]}: {movieDetails[key]}
                </Text>
            )
                : null;
        });
    };

    return (
        <ScrollView>
            <Card>
                <Card.Title>{title}</Card.Title>
                <Card.Divider/>
                <Card.Image
                    source={{uri: image}}
                    resizeMode={'contain'}
                    style={{height: 250}}
                    PlaceholderContent={<ActivityIndicator />}
                />
                {renderProperties(mainProperties)}
                {renderProperties(peopleProperties)}
                {renderProperties(manufactureProperties)}
                {renderProperties(awardsProperties)}
                <Rating
                    showRating
                    count={10}
                    fractions={2}
                    ratingCount={10}
                    imageSize={30}
                    startingValue={rating}
                />
            </Card>
        </ScrollView>
    );
};
