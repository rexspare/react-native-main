import { typography } from 'styles/typography';

export const styles = {
  touchableContainer: {
    width: '98%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '5%',
    paddingTop: '5%',
  },
  text: {
    marginLeft: '3%',
    ...typography['body/medium – regular'],
    textTransform: 'uppercase'
  },
  headerTxt: {
    ...typography['body/large – Bold'],
  },
  iconStyle: { width: 20, height: 20, fill: '#000' },
};
