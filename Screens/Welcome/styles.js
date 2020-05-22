import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
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
    backgroundColor: '#f9f9f9f3',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  welcomeLogo: {
    height: 23,
    resizeMode: 'contain',
    marginTop: 80,
  },
  WelcomeContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  WelcomeImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '45%',
    width: width / 1.5,
    resizeMode: 'contain',
    marginBottom: 80,
  },
  WelcomeText: {
    fontFamily: 'SFUIDisplay-Light',
    alignItems: 'center',
    fontSize: 14,
    textAlign: 'center',
    margin: 20,
  },
  WelcomeTextAuthor: {
    fontFamily: 'SFUIDisplay-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    textAlign: 'center',
  },
  butttonContainer: {
    alignItems: 'center',
    marginBottom: '10%',
  },
});

export default styles;
