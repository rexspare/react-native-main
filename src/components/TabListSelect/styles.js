import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const paddingMarginBorderRadius = 10;
const fontSize = 14;
const height = 50;

export const styles = {
  mainContainer: {
    height: height,
    marginTop: '5%',
    justifyContent: 'center',
    paddingLeft: paddingMarginBorderRadius,
    paddingRight: paddingMarginBorderRadius,
    borderRadius: paddingMarginBorderRadius,
    borderColor: '#E7E9E9',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainerActive: {
    height: height,
    marginTop: '5%',
    justifyContent: 'center',
    paddingLeft: paddingMarginBorderRadius,
    paddingRight: paddingMarginBorderRadius,
    borderRadius: paddingMarginBorderRadius,
    backgroundColor: '#36796F',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonIcon: {
    borderWidth: 1,
    borderColor: '#A1A5A5',
    height: 21,
    width: 21,
    borderRadius: 25 / 2,
    marginRight: paddingMarginBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIconActive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors['gray scale/0'],
    height: 21,
    width: 21,
    borderRadius: height,
    marginRight: paddingMarginBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#36796F',
  },
  radioButtonIconInnerIcon: {
    height: 8,
    width: 8,
    backgroundColor: colors['gray scale/0'],
    borderRadius: 15 / 2,
  },
  radioButtonTextContainer: {
    flex: 5,
    height: height,
    justifyContent: 'center',
    paddingLeft: paddingMarginBorderRadius,
  },
  radioButtonText: {
    color: '#131F1E',
    fontSize: fontSize,
    ...typography.textFontFamily,
  },
  radioButtonTextActive: {
    color: '#fff',
    fontSize: fontSize,
  },
};
