import { ScrollView } from 'react-native';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { IS_SMALLER } from 'styles/responsive';

export const style = {
  features: {
    label: {
      ...typography['body/medium – regular'],
      color: colors['gray scale/40'],
    },
    content: {
      ...typography['body/small – regular'],
      color: colors['gray scale/90'],
    },
    row: {
      height: 'auto',
      minHeight: 54,
      borderColor: colors['gray scale/10'],
      paddingHorizontal: 7,
    },
  },
  labelStyle: {
    marginTop: 3,
    textTransform: 'uppercase',
    marginBottom: 0,
    ...typography['body/small – regular'],
    position: 'relative',
    color: colors['gray scale/40'],
    fontWeight: "500"
  },
  multiselect: {
    container: { mt: 1 },
    label: {
      maxWidth: '90%',
      marginTop: 3,
      ...typography['body/small – regular'],
      textTransform: 'uppercase',
      color: colors['gray scale/40'],
      fontWeight: "500"
    },
    optionText: {
      ...typography['body/small – regular'],
      color: colors['gray scale/60'],
      textTransform: 'uppercase',
    },
    activeTxt: {
      ...typography['body/small – regular'],
    },
    optionsContainer: IS_SMALLER
      ? {
        as: ScrollView,
        horizontal: true,
        marginTop: 2,
        alignItems: undefined,
        justifyContent: undefined,
        contentContainerStyle: { justifyContent: 'space-between' },
      }
      : { marginTop: 2 },
    option: { flex: 1, minWidth: '20%' },
  },
  input: {
    width: '100%',
    backgroundColor: colors['gray scale/5'],
    height: 50,
    borderRadius: 10,
    marginLeft: 0,
    marginBottom: 0,
    position: 'relative',
    flex: 1,
  },
  yesNoButton: {
    buttonContainer: { justifyContent: 'space-between', width: '100%' },
    buttonStyle: {
      borderRadius: 8,
      maxWidth: '100%',
      width: '100%',
      borderWidth: 1,
      borderRadius: 12,
      borderColor: colors['gray scale/20'],
      flex: 1,
    },
    labelStyle: {
      ...typography['body/small – regular'],
      textTransform: 'uppercase',
      color: colors['gray scale/40'],
      fontWeight: '500'
    },
    textStyle: {
      ...typography['body/small – regular'],
      color: colors['gray scale/60'],
    },
  },
  serviceText: {
    ...typography['body/small – regular'],
    color: colors['gray scale/90'],
    marginLeft: 16,
  },
  submitButtonText: {
    fontWeight: '500',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  areaBox: {
    backgroundColor: colors['primary/50 – brand'],
    paddingBottom: 8,
    paddingTop: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 14,
    color: colors['primary/50'],
    textTransform: 'uppercase',
  },
  areaText: {
    ...typography['body/small – regular'],
    color: colors['gray scale/0'],
  },
  serviceIconContainer:{
    backgroundColor: colors['gray scale/5'],
    height: 48, 
    width: 48, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
};
