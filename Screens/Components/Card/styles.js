import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  qusCard: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 95,
    width: width * 0.8,
    borderRadius: 10,
    marginVertical: 20,
  },
  qusCardTextTitle: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#4d4d4d',
    marginBottom: 4,
  },
  qusCardTextDescription: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 12,
    color: '#7d7d7d',
  },
});

export default styles;
