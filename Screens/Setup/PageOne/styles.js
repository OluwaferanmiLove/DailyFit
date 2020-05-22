import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  qusContainer: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qusCard: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
});

export default styles;
