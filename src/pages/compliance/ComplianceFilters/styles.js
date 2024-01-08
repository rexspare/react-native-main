import { colors } from 'styles/theme';
import { Dimensions } from "react-native";
import { typography } from 'styles/typography';

const {width} = Dimensions.get('window')

export default {
  labelStyle: typography['body/medium – regular'],
  dateBorderColor: colors['gray scale/10'],
  headerRight: typography['body/small – medium'],
  multiselect: {
    optionsContainer: {
      marginTop: 3,
      marginBottom: 3,
    },
    optionText: {
      textTransform: 'uppercase',
      ...typography['body/medium – regular'],
    },
    option: {
      maxWidth: (width / 3) - 30,
      width: 110,
      height: 50,
      marginHorizontal: 0,
      borderRadius: 12,
    },
    container: {
      marginTop: 2,
    },
    label: {
      ...typography['heading-medium'],
      color: colors['gray scale/40'],
      textTransform: 'uppercase',
    },
  },
  applyButton: {
    ...typography['buttons/large'],
    textTransform: 'uppercase',
  },
};
