import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  optionContainer: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    width: width,
    marginTop: 5,
    backgroundColor: '#ffffff',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  options: {
    width: width * 0.85,
    flex: 5,
  },
  optionsTitle: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a2a2a2',
    marginBottom: 5,
  },
  optionsChild: {
    marginVertical: 10,
  },
  optionsChildText: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 14,
    color: '#b2b2b2',
  },
  optionsChildStyle: {
    marginBottom: 10,
  },
  optionsChildBorder: {
    width: width * 0.85,
    borderBottomWidth: 2,
    borderBottomColor: '#49494930',
  },
  inputBar: {
    width: '100%',
    borderColor: '#00b894',
    borderWidth: 1.5,
    borderRadius: 7,
    textAlign: 'center',
    marginVertical: 20,
    color: '#494949',
  },
  statCardTopBar: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    marginTop: 15,
  },
  statCardNavIcon: {
    backgroundColor: '#00b89460',
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  navBack: {
    marginLeft: 15,
  },
  topBarText: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#494949',
    marginLeft: '30%',
  },
  topBarNav: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBarBorder: {
    width: width,
    borderBottomWidth: 3,
    borderBottomColor: '#49494930',
    marginTop: 15,
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
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 13,
    color: '#494949',
  },
  butttonOption: {
    fontFamily: 'SFUIDisplay-bold',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#00b894',
  },
});

export default styles;
