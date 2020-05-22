import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {theme} from '../../../StaticData/theme';

const styles = StyleSheet.create({
  topBarMain: {
    flexDirection: 'row',
    width: '90%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  setupNav: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: theme.titleFontSize,
    fontWeight: theme.titleFontWeight,
    color: theme.titleFontColor,
  },
  sub: {
    alignItems: 'center',
  },
  subText: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: theme.subTextFontSize,
    textTransform: 'uppercase',
  },
});

export default styles;
