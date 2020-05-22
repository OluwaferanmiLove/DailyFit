import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  mainBackground: {
    position: 'absolute',
    resizeMode: 'cover',
    height: height,
    width: width,
  },
  overlay: {
    position: 'absolute',
    resizeMode: 'cover',
    height: height,
    width: width,
    backgroundColor: '#00000080',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  splashLogo: {
    height: 70,
    resizeMode: 'contain',
    marginBottom: 50,
  },
});

export default styles;
