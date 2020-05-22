import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: StatusBar.currentHeight,
  },
  topContainer: {
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  topBarText: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#494949',
    marginTop: 15,
  },
  createContainer: {
    flex: 1,
    position: 'absolute',
    left: width * 0.82,
    marginTop: height * 0.82,
    zIndex: 2000,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    width: width * 0.9,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginTop: height * 0.05,
  },
  modalControl: {
    height: 4,
    width: '50%',
    backgroundColor: '#dddddd',
    borderRadius: 3,
    marginTop: '4%',
  },
  modalContentScrollView: {
    width: '100%',
    marginTop: 5,
  },
  modalContent: {
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  modalTitle: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 22,
    color: '#585858',
  },
  modalForm: {
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
  },
  modalFormScrollView: {
    width: '100%',
    marginTop: 12,
  },
  modalFormTime: {
    flexDirection: 'row',
  },
  selectExerciseContainer: {
    marginTop: 12,
  },
  selectExercise: {
    marginTop: 12,
    alignSelf: 'flex-start',
    marginLeft: '5%',
    width: '90%',
  },
  selectExerciseOptions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 35,
    borderBottomWidth: 1.5,
    borderBottomColor: '#b2b2b2',
    flexDirection: 'row',
    marginBottom: 15,
  },
  exerTitle: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 18,
  },
  timeText: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 14,
    marginTop: 20,
  },
  inputBar: {
    width: '90%',
    borderColor: '#00b894',
    borderWidth: 1.5,
    borderRadius: 7,
    textAlign: 'center',
    marginVertical: 20,
    color: '#494949',
  },
  dailyfitbuttongradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: width * 0.7,
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 14,
    color: '#ffffff',
  },
  optionContainer: {
    width: width,
  },
  optionContainerStyle: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    width: width,
    marginTop: 20,
  },
  options: {
    width: width * 0.9,
  },
  optionsTitle: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00b894',
    marginVertical: 10,
  },
  optionsChild: {
    width: width,
  },
  optionsChildText: {
    fontFamily: 'SFUIDisplay-Medium',
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
  butttonContainer: {
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '6%',
    justifyContent: 'flex-end',
  },
});

export default styles;
