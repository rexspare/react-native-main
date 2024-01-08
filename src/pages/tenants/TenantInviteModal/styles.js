import { typography } from 'styles/typography';

export const styles = {
  title: {
    ...typography['body/large – medium'],
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
  container: { view: { paddingBottom: 0, paddingTop: 0 } },
};
