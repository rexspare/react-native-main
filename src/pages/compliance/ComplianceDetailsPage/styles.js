import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export default {
  contentContainer: {
    justifyContent: 'space-between',
    paddingBottom: 3,
  },
  featuresContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  featuresStyle: {
    label: {
      textTransform: 'capitalize',
      ...typography['body/medium – regular'],
      color: colors['gray scale/40'],
    },
    content: {
      maxWidth: '72%',
      alignSelf: 'flex-end',
      ...typography['body/medium – regular'],
    },
    row: {
      width: '100%',
      borderBottomColor: colors['gray scale/10'],
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
  },
  descriptionFeature: {
    row: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    label: {
      ...typography['heading-medium'],
      textTransform: 'uppercase',
    },
  },
  unitContent: {
    minWidth: 72,
    textAlign: 'right',
  },
  viewButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
};
