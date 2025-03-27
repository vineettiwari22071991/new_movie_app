//import liraries
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

// create a component
const MovieDetail = () => {
    const {id} = useLocalSearchParams()
    return (
        <View>
            <Text>{id}</Text>
        </View>
    );
};



//make this component available to the app
export default MovieDetail;
