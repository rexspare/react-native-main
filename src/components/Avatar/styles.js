import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const style = {
  image: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    backgroundColor: colors['gray scale/5'],
    borderWidth: 0,
  },
  imageTextStyle: {
    ...typography['body/xlarge – medium'],
    color: colors['primary/20'],
  },
};
