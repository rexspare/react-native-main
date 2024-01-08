import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  secHeadContainer: {
    marginTop: 30,
  },
  button: {
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  buttonsTextStyle: {
    fontSize: 16,
    color: colors['gray scale/90'],
    textTransform: 'uppercase',
    ...typography.textFontFamily,
  },
};
