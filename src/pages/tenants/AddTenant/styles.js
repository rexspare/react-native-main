import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const button = {
  height: 50,
  alignSelf: 'center',
  marginTop: '5%',
  borderRadius: 10,
  borderWidth: 1,
};

export const styles = {
  dateField: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    backgroundColor: colors['gray scale/5'],
    borderColor: 'transparent',
    borderRadius: 12,
    height: 48,
  },
  saveButton: {
    ...button,
    width: '100%',
    backgroundColor: colors['primary/50'],
    borderColor: colors['primary/50'],
    marginBottom: 10,
  },
  saveButtonText: {
    ...typography['body/medium – medium'],
    textTransform: 'uppercase',
  },
  dateFieldText: { color: colors['gray scale/20'] },
  asteriks: { color: colors['additional/danger'] },
};
