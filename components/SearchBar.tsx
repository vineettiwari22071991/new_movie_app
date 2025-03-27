//import liraries
import { icons } from '@/constants/icons';
import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';

interface Props {
    placeholder: string,
    onPress?:()=> void,
    value?: string,
    onChangeText?:(text: string)=>void
}

// create a component
const SearchBar = ({
    placeholder, onPress, value, onChangeText
}: Props) => {
    return (
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-1 border border-white'>
            <Image
            source={icons.search}
            className='size-5'
            resizeMode='contain'
            tintColor="#ab8ff"
            />
            <TextInput
            onPress={onPress}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#a8b5db"
            className='flex-1 ml-2 text-white'
            />
        </View>
    );
};


//make this component available to the app
export default SearchBar;
