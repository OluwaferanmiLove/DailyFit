import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'yellow',
    height: height * 0.3,
    position: 'absolute',
  },
  image: {
    height: height * 0.25,
    width: width,
    resizeMode: 'cover',
    overflow: 'hidden',
    position: 'absolute',
  },
  imageOverlay: {
    height: height * 0.25,
    width: width,
    backgroundColor: '#000000c5',
    position: 'absolute',
  },
  imageLogo: {
    height: height * 0.3,
    width: width * 0.35,
    resizeMode: 'contain',
    overflow: 'hidden',
    position: 'absolute',
  },
  signupContainer: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    width: width,
    marginTop: height * 0.18,
    paddingTop: height * 0.03,
    backgroundColor: '#ffffff',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  inputContainer: {
    width: width * 0.9,
    marginTop: height * 0.1,
  },
  inputBar: {
    width: '100%',
    borderColor: '#00b894',
    borderWidth: 1.5,
    borderRadius: 7,
    textAlign: 'center',
    marginVertical: 25,
    color: '#494949',
  },
  butttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '4%',
    justifyContent: 'flex-end',
  },
  buttton: {
    marginTop: 10,
    flexDirection: 'row',
  },
  butttonQuestion: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 13,
    color: '#494949',
  },
  butttonOption: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 13,
    color: '#00b894',
  },
});

export default styles;
