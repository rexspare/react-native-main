import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  title: {
    fontWeight: '700',
    fontSize: 18,
    color: '#131F1E',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#CFD8DC',
    width: '100%',
  },
  enterAmountButton: {
    width: '90%',
    backgroundColor: colors['primary/50 – brand'],
    borderRadius: 15,
    borderColor: colors['primary/50 – brand'],
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonText: {
    textTransform: 'uppercase',
    ...typography['body/medium – medium'],
  },
  otherInputField: {
    width: '100%',
    backgroundColor: '#F0F2F2',
    color: colors['gray scale/90'],
    height: 50,
    marginTop: '5%',
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  asteriks: {
    color: colors['additional/danger'],
  },
  dateField: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    backgroundColor: colors['gray scale/5'],
    borderColor: 'transparent',
    borderRadius: 12,
    height: 48,
  },
  dateFieldText: { color: colors['gray scale/20'] },
};
