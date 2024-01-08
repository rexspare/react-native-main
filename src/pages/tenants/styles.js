import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  label: {
    ...typography['body/small – regular'],
    color: colors['gray scale/40'],
  },
  buildingTitle: {
    text: {
      textTransform: 'uppercase',
      fontSize: 15,
    },
    label: {
      color: colors['gray scale/90'],
    },
  },
  header: {
    marginLeft: 0,
    marginBottom: 0,
    ...typography['body/small – regular'],
  },
  financialButton: {
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    width: '92%',
    backgroundColor: colors['primary/50'],
    borderColor: colors['primary/50'],
    marginBottom: 10,
    marginHorizontal: 30,
  },
  leaseText: {
    textTransform: 'uppercase',
    ...typography['body/medium – medium'],
  },
};
