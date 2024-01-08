import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

export const styles = {
  headerContainer: {
    borderBottomColor: colors['gray scale/10'],
    borderBottomWidth: 1,
  },
  title: {
    color: colors['gray scale/90'],
    ...typography['body/large – Bold'],
  },
  imageStyle: {
    borderRadius: 100,
    width: 50,
    height: 50,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: colors['gray scale/10'],
  },
  textTitle: {
    color: colors['gray scale/90'],
    ...typography['body/medium – medium'],
  },
  textSubStyle: {
    color: colors['gray scale/40'],
    ...typography['body/small – regular'],
  },
  initialsContainer:{
    backgroundColor: colors['gray scale/5'],
    borderRadius: 100,
    width: 50,
    height: 50,
    marginTop: 0,
    marginRight: 10,
    paddingTop: 12,
  },
  textStyle: {
    textAlign: 'center',
    color: colors['primary/20'],
  },
  noTextStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    textAlign: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors['gray scale/10'],
    justifyContent: 'center',
    borderRadius: 100,
  },
};
