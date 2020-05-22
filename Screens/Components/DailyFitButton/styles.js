import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  dailyfitbutton: {
    height: 45,
    width: width * 0.7,
  },
  dailyfitbuttongradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 7,
  },
  dailyfitbuttonText: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default styles;
