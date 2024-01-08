import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  title: {
    ...typography['body/large – Bold'],
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  content: {
    ...typography['body/medium – regular'],
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 20,
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  buttonContainer: {
    width: '50%',
    paddingHorizontal: 2.5,
  },
  container: {
    view: {
      paddingBottom: 0,
      paddingTop: 0,
      paddingRight: 20,
      paddingLeft: 20,
    },
  },
  primary_large: {
    style: {
      backgroundColor: colors['primary/50'],
      borderColor: colors['primary/50'],
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 13,
      paddingHorizontal: 16,
      flex: 1,
      width: '100%',
      overflow: 'hidden',
    },
    textAlign: 'center',
    ...typography['body/medium – medium'],
    color: colors['gray scale/0'],
    gradient: false,
    shadow: false,
  },
  primary_50_brand_clear_large: {
    style: {
      borderColor: colors['primary/50 – brand'],
      borderRadius: 12,
      borderWidth: 1,
      paddingVertical: 13,
      paddingHorizontal: 16,
      flex: 1,
      alignItems: 'center',
      marginTop: 12,
      width: '100%',
    },
    textAlign: 'center',
    ...typography['body/medium – medium'],
    ...typography['textUppercase'],
    color: colors['primary/50 – brand'],
    gradient: false,
    shadow: false,
  },
};
