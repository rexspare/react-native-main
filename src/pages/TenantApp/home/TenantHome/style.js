import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const style = {
  header: {
    backgroundColor: 'transparent',
    marginTop: getStatusBarHeight(),
    title: {
      color: '#fff',
    },
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 5,
  },
  titleWrapper: {
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ContactManagerButton: {
    background: '#FFFFFF',
    border: '1px solid #36796F',
  },
  textTitle: {
    ...typography['body/medium – medium'],
    color: colors['gray scale/40'],
    textTransform: 'uppercase',
  },
  buttonText: {
    ...typography['body/medium – medium'],
    lineHeight: 18,
    color: colors['primary/50'],
    textTransform: 'uppercase',
  },
  title: {
    color: colors['gray scale/90'],
    ...typography['body/medium – medium'],
    textTransform: 'uppercase',
  },
  content: {
    color: colors['gray scale/60'],
    ...typography['body/medium – regular'],
  },
  titleBold: {
    marginTop: 10,
    ...typography['body/small – bold'],
    fontSize: 16,
  },
  titleSemi: {
    marginTop: 2,
    marginBottom: 0,
    ...typography['body/small – regular'],
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    resizeMode: 'cover',
    zIndex: -3,
    height: 280,
  },
};
