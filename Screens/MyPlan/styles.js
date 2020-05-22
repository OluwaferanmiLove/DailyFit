import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  topOverlay: {
    height: height * 0.2,
    width: width,
    backgroundColor: '#00b894',
    position: 'absolute',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  statCardTopBar: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    marginHorizontal: 40,
  },
  contentContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  statCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
});

export default styles;
