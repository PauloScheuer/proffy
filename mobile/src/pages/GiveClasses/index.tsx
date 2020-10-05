import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import bgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function GiveClasses() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={bgImage}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web
        </Text>
      </ImageBackground>
      <RectButton style={styles.okButton} onPress={handleGoBack}>
        <Text style={styles.okText}>Ok</Text>
      </RectButton>
    </View>
  );
}
