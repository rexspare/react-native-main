import { colors } from './theme';
import { typography } from './typography';

export const input_label_14 = {
  ...typography['body/medium – regular'],
  color: colors['grey scale/100'],
  textTransform: 'capitalize',
};

export const input_label_16 = {
  ...input_label_14,
  fontSize: 16,
  textAlign: 'left',
  display: 'flex',
};

export const underlinedMultiTextSwitch = {
  switchBackground: {
    borderBottomWidth: 2,
    borderBottomColor: colors['primary/50'],
    borderRadius: 0,
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
  },
  backgroundColor: 'white',
  borderWidth: 0,
  activeTextColor: colors['primary/50'],
};
