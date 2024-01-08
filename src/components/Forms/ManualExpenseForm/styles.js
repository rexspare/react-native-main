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
    borderBottomColor: colors['gray scale/5'],
    width: '100%',
  },
  notesInput: {
    width: '100%',
    backgroundColor: colors['gray scale/5'],
    height: 60,
    marginTop: '5%',
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: colors['gray scale/90'],
  },
  enterAmountButton: {
    width: '100%',
    marginTop: '10%',
    backgroundColor: colors['primary/50'],
    borderRadius: 15,
    borderColor: colors['primary/50'],
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonText: {
    textTransform: 'uppercase',
    ...typography['body/medium – medium'],
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
