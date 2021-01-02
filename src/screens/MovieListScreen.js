import React, { Component } from 'react';
import { Text, FlatList, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { MovieListItem } from "./MovieListItem";
import { moviesRepository } from "../domain/repo";
import { Center } from "../UI";

export class MovieListScreen extends Component {
    state = {
        search: '',
        movies: [],
        isLoading: false,
    }

    componentDidMount() {
        this.searchUpdate(this.state.search);
    }

    onItemPress = (movieId) => {
        this.props.navigation.navigate('Movie Details', {movieId});
    }

    searchUpdate = searchQuery => {
        this.setState({isLoading: true, search: searchQuery});
        moviesRepository
            .search(searchQuery)
            .then(movies => {
                this.setState(state => ({
                    search: searchQuery,
                    movies: movies.map(item => ({key: item.id, ...item})),
                    isLoading: false,
                }));
            });
    }

    deleteMovie = movieId => {
        moviesRepository.delete(movieId);
        const searchQuery = this.state.search;
        this.setState({movies: moviesRepository.search(searchQuery)});
    }

    render() {
        return (
            <View>
                <SearchBar
                    lightTheme
                    showLoading={this.state.isLoading}
                    placeholder="Type Here..."
                    onChangeText={this.searchUpdate}
                    onClear={() => this.searchUpdate('')}
                    value={this.state.search}
                />
                {this.state.movies.length > 0 ?
                    <View style={{paddingBottom: 120}}>
                        <FlatList
                            data={this.state.movies}
                            renderItem={({item}) => <MovieListItem
                                {...item}
                                onPress={this.onItemPress.bind(null, item.id)}
                                onRemove={this.deleteMovie.bind(null, item.id)}
                            />}
                        />
                    </View>
                    : <Center style={{paddingBottom: 120}}>
                        <Text>No items found or search length less then 3 characters!</Text>
                    </Center>
                }
            </View>
        )
    }
}
