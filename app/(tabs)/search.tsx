//import liraries
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fecthMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';

// create a component
const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: loadMovies,
        reset
    } = useFetch(() => fecthMovies({
        query: searchQuery
    }), false)

    useEffect(()=>{
        const timeoutId = setTimeout(async ()=> {
            if(searchQuery.trim()){
             await loadMovies()
            } else {
                reset()
            }
        }, 1000)
        
        return () => clearTimeout(timeoutId)
        

    }, [searchQuery])

    return (
        <View className='flex-1 bg-primary'>
            <Image
                source={images.bg}
                className='flex-1 absolute w-full z-0'
                resizeMode='cover'
            />

            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16,
                    marginBottom: 10
                }}
                className='px-5 pb-32'
                contentContainerStyle={{
                    paddingBottom:20
                }}
                ListHeaderComponent={
                    <>
                        <View className='w-full flex-row justify-center mt-20 items-center'>

                            <Image
                                source={icons.logo}
                                className='w-12 h-10'
                            />
                        </View>
                        <View className='my-5'>
                            <SearchBar
                                placeholder='Search movies...' 
                                value={searchQuery}
                                onChangeText={(text: string)=> setSearchQuery(text)}
                                />

                        </View>
                        {
                            moviesLoading && (
                                <ActivityIndicator 
                                size="large"
                                color='#0000ff'
                                className='my-3'
                                />
                            )
                        }
                        {
                            moviesError && (
                                <Text className='text-red-500 px-5 my-3'>Error: {movies?.message}</Text>
                            )
                        }

                        {
                            !moviesLoading && !moviesError && searchQuery.trim()
                            && movies?.length > 0 && (
                                <Text className='text-xl text-white font-bold'>
                                    Search Results for{' '}
                                    <Text className='text-accent'>{searchQuery}</Text>
                                </Text>
                            )
                        }
                    </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <View className='mt-10 px-5'>
                            <Text className='text-center text-gray-500'>{searchQuery.trim() ? 'No movies found' : 'Serach for a movie'}</Text>

                        </View>
                    ): null
                }
            />
        </View>
    );
};

//make this component available to the app
export default SearchScreen;
