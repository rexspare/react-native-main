import { colors } from 'styles/theme';

export const styles = {
  file: theme => ({
    height: 48,
    width: 48,
    backgroundColor: colors['gray scale/5'],
    borderRadius: 8,
  }),
  fileText: {
    fontSize: 18,
    lineHeight: 22,
  },
  deleteIcon: {
    height: 18,
    width: 18,
  },
  deleteIconContainer: {
    position: 'absolute',
    right: 2,
    top: 10,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: 32,
    height: 32,
  },
  deleteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  fileWrapper: {
    overflow: 'hidden',
  },
};
