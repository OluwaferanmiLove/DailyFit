import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: StatusBar.currentHeight,
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
    marginTop: height * 0.04,
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
  },
  modalFormTime: {
    flexDirection: 'row',
    marginTop: 20,
  },
  timeText: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 14,
    marginTop: 20,
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
  modalImage: {
    height: width / 1.5,
    resizeMode: 'contain',
  },
  modalImageInfo: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a3a3a3',
    textAlign: 'center',
  },
  topContainer: {
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  optionContainer: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    width: width,
    marginTop: 10,
  },
  options: {
    width: width * 0.85,
    flex: 5,
  },
  optionsTitle: {
    fontFamily: 'SFUIDisply-Bold',
    fontSize: 18,
    color: '#00b894',
    marginVertical: 10,
  },
  optionsChild: {
    marginVertical: 8,
  },
  optionsChildText: {
    fontFamily: 'SFUIDisply-Medium',
    fontSize: 15,
    marginLeft: 25,
    color: '#484848',
  },
  optionsChildStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  optionsTitleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  optionsToggleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  optionsChildBorder: {
    width: width * 0.85,
    borderBottomWidth: 2,
    borderBottomColor: '#49494930',
  },
  statCardTopBar: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9,
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
  },
  topBarBorder: {
    width: width,
    borderBottomWidth: 3,
    borderBottomColor: '#49494930',
    marginTop: 15,
  },
});

export default styles;
