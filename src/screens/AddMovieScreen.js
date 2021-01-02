import React from "react";
import {ScrollView} from "react-native";
import {Input, Button, Card} from 'react-native-elements';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


import {Formik} from 'formik';
import * as Yup from 'yup';

import {moviesRepository} from "../domain/repo";
import {Movie} from "../domain";

const AddMovieSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    type: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    year: Yup.number()
        .integer()
        .min(1700, 'Invalid Year!')
        .max(2030, 'Invalid Year!')
        .required('Required'),
});


export const AddMovieScreen = ({navigation}) => {
    const submitHandler = movieObj => {
        const movie = new Movie(null, movieObj.title, movieObj.year, movieObj.type, null);
        moviesRepository.push(movie);
        navigation.push('Movie List', movie);
    };

    return (
        <Formik
            initialValues={{title: '', type: '', year: ''}}
            validationSchema={AddMovieSchema}
            onSubmit={submitHandler}>
            {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <Card>
                        <Card.Title>
                            Add new movie!
                        </Card.Title>
                        <Input
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                            errorMessage={errors.title}
                            renderErrorMessage={errors.title && touched.title}
                            placeholder={'Title'}
                            leftIcon={<MaterialIcons name="title" size={24} color="black" />}
                        />
                        <Input
                            onChangeText={handleChange('type')}
                            onBlur={handleBlur('type')}
                            value={values.type}
                            renderErrorMessage={errors.type && touched.type}
                            errorMessage={errors.type}
                            placeholder={'Type'}
                            leftIcon={<MaterialCommunityIcons name="language-typescript" size={24} color="black" />}
                        />
                        <Input
                            keyboardType='numeric'
                            onChangeText={handleChange('year')}
                            onBlur={handleBlur('year')}
                            value={values.year}
                            renderErrorMessage={errors.year && touched.year}
                            errorMessage={errors.year}
                            placeholder={'Year'}
                            leftIcon={<MaterialIcons name="date-range" size={24} color="black" />}
                        />
                        <Button onPress={handleSubmit} title="Add Movie" />
                    </Card>
                </ScrollView>
            )}
        </Formik>
    )
};
