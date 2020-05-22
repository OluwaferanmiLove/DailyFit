import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: width,
    height: height,
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  welcomeLogo: {
    height: 23,
    resizeMode: 'contain',
    marginTop: 20,
  },
  qusContainer: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qusCard: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  qusCardInstruction: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 14,
  },
  inputBar: {
    width: width * 0.8,
    borderColor: '#00b894',
    borderWidth: 1.5,
    borderRadius: 7,
    textAlign: 'center',
    marginVertical: 10,
    color: '#494949',
  },
  planCard: {
    flexDirection: 'row',
    width: width * 0.9,
    marginVertical: width * 0.05,
  },
  timeCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.9,
    marginVertical: width * 0.05,
  },
  butttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '8%',
    justifyContent: 'flex-end',
  },
});

export default styles;
