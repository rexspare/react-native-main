import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  documentIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 24,
  },
  name: {
    ...typography.textFontSize,
    ...typography.textFontFamily,
    ...typography["body/small – regular"],
    color: colors['gray scale/90'],
    textTransform: "capitalize",
    fontWeight: "500"
  },
  iconButton: {
    width: 30,
    height: 49,
    marginRight: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
};