import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const style = {
  container: {
    width: '100%',
    paddingVertical: '1.5%',
    position: 'relative',
  },
  wrapper: {
    width: '100%',
    flexDirection: 'column',
  },
  headerContainer: {
    alignItems: 'center',
    flex: 1,
    minHeight: 54,
    paddingVertical: 10,
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subtitleStyle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors['gray scale/40'],
    lineHeight: 18,
  },
  chooseBtn: {
    borderColor: colors['primary/50 – brand'],
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
  changeBtn: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors['primary/5'],
    alignSelf: 'flex-end',
    backgroundColor: '#E8F2F1',
  },
  chooseBtnText: {
    color: colors['primary/50 – brand'],
    fontWeight: 'bold',
  },
  disabledBtnText: {
    color: colors['gray scale/30'],
    fontWeight: 'bold',
  },
  error: {
    color: colors['additional/danger'],
    ...typography['body/x-small – regular'],
  },
  disabled: {
    borderColor: colors['gray scale/30'],
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
};
