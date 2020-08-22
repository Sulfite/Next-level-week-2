import React, { useState, useEffect }  from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorange from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function Favorites() {
    
    const [favorites, setFavorites] = useState([]);

    function loadFavorites() {

        AsyncStorange.getItem('favorites').then(response => {
            if (response) {

                const favoritedTeaches = JSON.parse(response);
                
                setFavorites(favoritedTeaches);
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    return (
        <View style={ styles.container} >
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                    )

                })}
            </ScrollView>
        </View>
    );
}

export default Favorites;