import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  statCardTopBar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 30,
    marginTop: 15,
  },
  statCardNavIcon: {
    backgroundColor: '#00b89460',
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  topBarText: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 20,
    color: '#494949',
    marginTop: 15,
  },
  topBarBorder: {
    width: width,
    borderBottomWidth: 3,
    borderBottomColor: '#49494930',
    marginTop: 10,
  },
  optionContainer: {
    width: width,
    marginTop: 20,
  },
  optionContainerStyle: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    width: width,
    marginTop: 20,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: width,
  },
  optionsTitle: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 20,
    color: '#00b894',
    marginVertical: 10,
  },
  optionsChild: {
    marginVertical: 10,
  },
  optionsChildText: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 18,
    marginLeft: 20,
  },
  optionsChildStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionsChildBorder: {
    height: 2,
    width: width * 0.85,
    borderBottomWidth: 1,
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
    fontWeight: 'bold',
    color: '#00b894',
  },
});

export default styles;
