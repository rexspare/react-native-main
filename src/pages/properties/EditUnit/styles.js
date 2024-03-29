import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

export const styles = {
  switchContainer: {
    height: 30,
    width: 50,
    color: 'red',
  },
  formActionButton: {
    height: 50,
    borderRadius: 12,
    flex: 1,
  },
  formActionTxt: {
    ...typography['buttons/large'],
    fontFamily: 'Roboto',
    color: colors['gray scale/30'],
    textTransform: 'uppercase',
  },
  dateField: theme => ({
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    backgroundColor: theme['grey-0'],
    borderColor: 'transparent',
    borderRadius: 12,
    height: 50,
  }),
  dateFieldTxt: {
    ...typography['body/medium – regular'],
    color: colors['gray scale/30'],
  },
  labelStyle: {
    marginTop: 3,
    textTransform: 'capitalize',
    marginBottom: 0,
    ...typography['body/small – regular'],
  },
  input: {
    width: '100%',
    backgroundColor: colors['gray scale/5'],
    borderRadius: 10,
    marginLeft: 0,
    marginBottom: 0,
    position: 'relative',
    flex: 1,
  },
  dialogRemove: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors['gray scale/40'],
    width: '45%',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
    color: colors['gray scale/40'],
    textAlign: 'center',
    height: 48,
    paddingVertical: 12,
  },
  dialogCancel: {
    backgroundColor: colors['primary/50 – brand'],
    overflow: 'hidden',
    borderRadius: 12,
    color: colors['white'],
    width: '45%',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
    textAlign: 'center',
    height: 48,
    paddingVertical: 12,
  },
};
