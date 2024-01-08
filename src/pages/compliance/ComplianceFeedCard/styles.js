import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export default {
  container: {
    borderWidth: 1,
    borderColor: colors['gray scale/10'],
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 11,
    paddingRight: 17,
    paddingLeft: 13,
  },

  location: {
    ...typography['body/small – normal'],
    color: colors['gray scale/40'],
    textTransform: 'uppercase',
  },
};
