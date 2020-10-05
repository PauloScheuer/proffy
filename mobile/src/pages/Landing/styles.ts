import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8257e5',
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  banner: {
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    lineHeight: 30,
    marginTop: 80,
    fontSize: 20,
  },
  titleBold: {
    fontFamily: 'Poppins_700Bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },
  button: {
    height: 150,
    width: '45%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between',
  },
  buttonPrimary: {
    backgroundColor: '#9871f5',
  },
  buttonSecundary: {
    backgroundColor: '#04d361',
  },
  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 17,
  },
  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#d4cdff',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: '50%',
    marginTop: 40,
  },
});
export default styles;
