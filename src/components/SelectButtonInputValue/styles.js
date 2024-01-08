import { input_label_16 } from 'styles/reusable-classes';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const style = {
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  placeholder: {
    backgroundColor: colors['gray scale/5'],
    borderColor: colors['gray scale/40'],
    borderWidth: 1,
  },
  placeholderText: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: colors['white'],
    borderWidth: 1,
    backgroundColor: colors['gray scale/5'],
  },
  titleStyles: {
    color: colors['gray scale/40'],
  },
  textBox: {
    marginLeft: 20,
    fontWeight: '500',
  },
  text: {
    ...input_label_16,
    ...typography.textFontFamily,
    fontWeight: '500',
  },
  textUppercase: {
    ...input_label_16,
    ...typography['body/large – medium'],
    fontWeight: '500',
    ...typography.textUppercase,
  },
  subtext: {
    ...typography['body/x-small – regular'],
    color: colors['gray scale/40'],
    ...typography.textFontFamily,
  },
};
