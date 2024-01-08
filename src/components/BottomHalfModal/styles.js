import { colors } from 'styles/theme';

export const styles = {
  styledLineTop: {
    borderColor: colors['gray scale/20'],
    width: 40,
    borderRadius: 3,
    left: '50%',
    marginLeft: -20,
    height: 3,
    top: 7,
  },
  doneContainer: { position: 'absolute', left: 18, top: 18 },
  doneTxt: { fontWeight: '500', color: colors['primary/50'], fontSize: 14 },
  rightAction: { position: 'absolute', right: 18, top: 18 },
  headerContainer: {
    marginTop: 7,
    pb: 3,
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomColor: colors['gray scale/10'],
    paddingBottom: 10,
  },
  headerTxt: {
    fontSize: 18,
    color: colors['gray scale/90'],
    fontWeight: '500',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
};
