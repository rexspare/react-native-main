import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  titleAppenderContainerBackdrop: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 2000,
    right: 0,
    backgroundColor: '#131F1E99',
    top: 72,
  },
  titleAppenderContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  titleAppenderBtn: {
    backgroundColor: colors['gray scale/5'],
    width: 48,
    width: 48,
    borderWidth: 0,
    borderRadius: 8,
  },
  checkBox: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    view: {
      paddingBottom: 0,
      paddingTop: 0,
      paddingRight: 20,
      paddingLeft: 20,
    },
  },
  title: {
    ...typography['body/large – medium'],
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlign: 'center',
    maxWidth: 240,
  },
  content: {
    ...typography['body/medium – regular'],
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  buttonContainer: {
    width: '50%',
    paddingHorizontal: 2.5,
  },
};
