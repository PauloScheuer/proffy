import React, { useState } from 'react';
import { View, Image, Text, Linking, AsyncStorage } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

interface TeacherItem {
  avatar: string;
  bio: string;
  name: string;
  id: number;
  subject: string;
  cost: string;
  whatsapp: string;
  favorited: boolean;
}

export default function TeacherItem({
  avatar,
  name,
  bio,
  subject,
  cost,
  whatsapp,
  id,
  favorited,
}: TeacherItem) {
  const [isFavorited, setIsFavorited] = useState<boolean>(favorited);
  const handleOpenZap = async () => {
    console.log(whatsapp);
    await api.post('connections', { idUser: id });
    Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
  };

  const handleFavorite = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    let favArray = [];

    if (favorites) {
      favArray = JSON.parse(String(favorites));
    }
    if (isFavorited) {
      const favIndex = favArray.findIndex((user: any) => {
        return user.idUser === id;
      });
      favArray.splice(favIndex, 1);

      setIsFavorited(false);
    } else {
      favArray.push({
        avatarUser: avatar,
        nameUser: name,
        bioUser: bio,
        subjectClass: subject,
        costClass: cost,
        whatsappUser: whatsapp,
        idUser: id,
      });
      setIsFavorited(true);
    }
    console.log(favArray);
    await AsyncStorage.setItem('favorites', JSON.stringify(favArray));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: avatar,
          }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subject}>{subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleFavorite}
            style={[styles.favoriteButton, isFavorited && styles.favorited]}
          >
            {isFavorited ? (
              <Image source={unFavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>
          <RectButton style={styles.contactButton} onPress={handleOpenZap}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}
