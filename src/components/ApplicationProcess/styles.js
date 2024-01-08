import { typography } from 'styles/typography';

export const styles = {
  title: {
    ...typography['body/large – Bold'],
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  content: {
    ...typography['body/small – normal'],
    maxWidth: 240,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
  },
};
