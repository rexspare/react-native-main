import { button_styles } from 'styles/button';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const style = {
  defaultContainerStyles: {
    width: '90%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
    position: 'relative',
  },
  text1: {
    fontSize: 16,
    marginBottom: 2,
    fontWeight: 'bold',
    color: colors['gray scale/90'],
    width: '100%',
  },
  text2: {
    fontSize: 13,
    width: '100%',
    color: colors['gray scale/90'],
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  buttonStyle: {
    ...button_styles['primary_50_brand_clear'],
    borderWidth: 1,
    borderColor: colors['primary/50 – brand'],
  },
  buttonText: {
    ...typography['buttons/small'],
    color: colors['primary/50 – brand'],
  },
};
