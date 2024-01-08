import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

export const styles = {
  textInputDollarSign: {
    fontSize: 64,
    height: '80%',
    alignSelf: 'center',
  },
  textInput: {
    fontSize: 64,
    minWidth: '20%',
    color: colors['gray scale/90']
  },
  tablistContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  doneBtn: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '10%',
    borderRadius: 12,
  },
  buttonText: {
    ...typography['buttons/large'],
    textTransform: 'uppercase',
  },
};
