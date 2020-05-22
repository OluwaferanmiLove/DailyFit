import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: StatusBar.currentHeight,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: height * 0.15,
    position: 'absolute',
  },
  image: {
    height: height * 0.25,
    width: width,
    resizeMode: 'cover',
    overflow: 'hidden',
    position: 'absolute',
  },
  imageOverlay: {
    height: height * 0.25,
    width: width,
    backgroundColor: '#000000a5',
    position: 'absolute',
  },
  workoutInfo: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: width * 0.9,
    height: height * 0.1,
    marginBottom: 10,
  },
  workoutInfoSub: {
    flexDirection: 'row',
  },
  workoutInfoTitle: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  workoutInfoDes: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 15,
    color: '#ffffff',
  },
  workoutList: {
    flex: 1,
    alignContent: 'flex-start',
    width: width * 0.9,
  },
  workoutListChild: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
    height: 70,
    backgroundColor: '#e2e2e2',
    shadowColor: '#b2b2b250',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderRadius: 6,
    paddingLeft: 20,
  },
  workoutListChildBorder: {
    borderBottomWidth: 2,
  },
  optionsChilds: {
    flexDirection: 'column',
    marginLeft: width * 0.08,
  },
  optionsChildIcon: {
    width: 25,
  },
  optionsChildTexts: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  optionsChildText: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#585858',
    textTransform: 'capitalize',
  },
  optionsChildTextTime: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#b2b2b2',
  },
  signupContainer: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    width: width,
    paddingTop: height * 0.02,
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
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#00b894',
  },
  levelIndicator: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
  },
  levelStep: {
    backgroundColor: '#00b894',
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});

export default styles;
