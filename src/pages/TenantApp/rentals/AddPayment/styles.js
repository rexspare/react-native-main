import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { Platform } from 'react-native';

export const buttonStyle = {
  minWidth: '45%',
  minHeight: 40,
  flex: 1,
  borderRadius: 12,
};

export const styles = {
  buttonText: {
    fontSize: 14,
    textTransform: 'uppercase',
    lineHeight: Platform.OS === 'ios' ? 0 : 24,
  },
  inputLabelStyle: {
    color: colors['gray scale/90'],
    ...typography['body/small – regular'],
    marginTop: 12,
  },
  unActiveButton: {
    ...buttonStyle,
    backgroundColor: colors['gray scale/0'],
    borderColor: colors['gray scale/20'],
  },
  unActiveText: {
    color: colors['gray scale/60'],
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
};
