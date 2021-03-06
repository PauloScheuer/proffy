import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClasses from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';
import api from '../../services/api';
export default function Landing() {
  const navigation = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    const searchConnections = async () => {
      try {
        const res = await api.get('connections');
        setTotalConnections(res.data);
      } catch (err) {
        alert(err);
      }
    };
    searchConnections();
  }, []);

  const handleGoToGiveClasses = () => {
    navigation.navigate('GiveClasses');
  };
  const handleGoToStudy = () => {
    navigation.navigate('Study');
  };

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleGoToStudy}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton
          onPress={handleGoToGiveClasses}
          style={[styles.button, styles.buttonSecundary]}
        >
          <Image source={giveClasses} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>
      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas{' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}
