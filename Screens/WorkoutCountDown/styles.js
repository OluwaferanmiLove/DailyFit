import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
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
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 13,
    color: '#494949',
  },
  butttonOption: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#00b894',
  },
});

export default styles;
