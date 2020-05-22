import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  topQusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topQus: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 22,
    color: '#4d4d4d',
    marginBottom: '1.5%',
  },
  topQusDescription: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 13,
    color: '#7d7d7d',
  },
});

export default styles;
