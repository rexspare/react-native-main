import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  mainContainer: {
    backgroundColor: colors['gray scale/5'],
  },
  profileInfo: {
    width: '100%',
    height: '20%',
    backgroundColor: colors['white'],
    alignItems: 'center',
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginTop: '5%',
    backgroundColor: '#bbb',
  },
  optionsContainer: {
    width: '100%',
    backgroundColor: colors['white'],
    marginTop: '5%',
  },
  bottomContainer: {
    width: '100%',
    height: '30%',
    backgroundColor: colors['white'],
    position: 'absolute',
    bottom: 0,
  },
  optionButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    borderBottomColor: colors['primary/5'],
    borderBottomWidth: 1,
  },
  actionButtonsContainer: {
    width: '90%',
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
  },
  textContainer: {
    width: '100%',
    marginLeft: 15,
    marginTop: '5%',
    alignSelf: 'center',
  },
  aboutTextContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  titleText: {
    marginTop: '5%',
    ...typography['body/large – Bold'],
  },
  paragraphText: {
    marginTop: '5%',
    ...typography['body/medium – regular'],
  },
};
