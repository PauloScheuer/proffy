import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  View,
  Text,
  TextInputChangeEventData,
  AsyncStorage,
} from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';

export default function TeacherList() {
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [favorites, setFavorites] = useState([]);
  const [subject, setSubject] = useState<string>('');
  const [weekDay, setWeekDay] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [allClasses, setAllClasses] = useState([]);

  const doSearch = () => {
    AsyncStorage.getItem('favorites')
      .then((res) => {
        if (res) {
          const fav = JSON.parse(res);
          console.log(fav);
          const idsFav = fav.map((user: any) => {
            return user.idUser;
          });
          setFavorites(idsFav);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSubmit = async () => {
    doSearch();
    try {
      const url = `classes?weekDay=${weekDay}&subject=${subject}&time=${time}`;
      const res = await api.get(url);
      setAllClasses(res.data);
      setIsFilterVisible(false);
    } catch (err) {
      alert('Erro na busca');
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton
            style={{ padding: 10 }}
            onPress={() => setIsFilterVisible(!isFilterVisible)}
          >
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              onChangeText={(text) => {
                setSubject(text);
              }}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  onChangeText={(text) => {
                    setWeekDay(text);
                  }}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                  onChangeText={(text) => {
                    setTime(text);
                  }}
                />
              </View>
            </View>
            <RectButton onPress={handleSubmit} style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {allClasses.map((classe, index) => {
          const {
            avatarUser,
            nameUser,
            bioUser,
            subjectClass,
            costClass,
            zapUser,
            idUser,
          } = classe;
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
              favorited={favorites.includes(idUser)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
