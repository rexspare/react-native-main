import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const headerTextStyle = {
  fontSize: 18,
  color: colors['gray scale/0'],
  fontWeight: '700',
  textTransform: 'uppercase',
  marginBottom: 18,
  fontFamily: 'Roboto',
};

export const styles = {
  labelStyle: {
    fontSize: 14,
    fontWeight: '400',
  },
  headContainer: {
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  container: {
    height: '100%',
    backgroundColor: colors['gray scale/5'],
  },
  headerTxt: headerTextStyle,
  categoryButton: {
    marginRight: 16,
  },
  headlineTxt: {
    ...headerTextStyle,
    color: colors['gray scale/40'],
    marginTop: 24,
  },
  multiselect: {
    container: { marginHorizontal: 20, width: '90%' },
  },
  completeButton: {
    marginHorizontal: 20,
    borderRadius: 12,
    ...typography['buttons/large']
  },
};
