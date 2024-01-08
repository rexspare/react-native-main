import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  header: {
    backgroundColor: colors['white'],
    borderBottomColor: colors['gray scale/10'],
    borderBottomWidth: 1,
    marginTop: getStatusBarHeight() + 10,
  },
  featuresHeader: {
    ...typography['body/large – medium'],
    fontSize: 16,
    color: colors['gray scale/40'],
    textTransform: 'uppercase',
    paddingHorizontal: 7,
    marginTop: 6,
    marginBottom: 15
  },
  whiteCardRow: {
    borderTopWidth: 0,
    marginHorizontal: 20,
  },
  whiteCardLabel: {
    color: colors['gray scale/40'],
    fontSize: 16,
  },
  whiteCardContent: {
    color: colors['gray scale/90'],
    fontSize: 16,
    maxWidth: '70%',
    fontWeight: '400',
  },
};
