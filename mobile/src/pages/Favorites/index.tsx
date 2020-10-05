import React, { useState, useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const doSearch = () => {
    AsyncStorage.getItem('favorites')
      .then((res) => {
        if (res) {
          const fav = JSON.parse(res);
          setFavorites(fav);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  useFocusEffect(() => {
    doSearch();
  });
  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {favorites.map((user, index) => {
          const {
            avatarUser,
            nameUser,
            bioUser,
            subjectClass,
            costClass,
            zapUser,
            idUser,
          } = user;
          console.log(nameUser);
          return (
            <TeacherItem
              key={index}
              avatar={avatarUser}
              name={nameUser}
              bio={bioUser}
              subject={subjectClass}
              cost={costClass}
              whatsapp={zapUser}
              id={idUser}
              favorited={true}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
