import Icon from 'components/Icon';
import { colors } from './theme';
import { typography } from './typography';

const default_styles = {
  bordered_clear: {
    textStyle: {
      ...typography['buttons/large'],
      color: '#36796F',
      textTransform: 'uppercase',
    },
    style: { backgroundColor: '#fff', borderWidth: 1.2, borderRadius: 12 },
  },
  clear_grey_border: {
    textStyle: {
      ...typography['buttons/large'],
      color: colors['gray scale/30'],
      fontWeight: '500',
    },
    style: {
      borderColor: colors['gray scale/10'],
      backgroundColor: '#fff',
      borderWidth: 1,
      marginTop: 7,
      borderRadius: 12,
    },
    shadow: false,
  },
  primary: {
    style: {
      backgroundColor: colors['primary/50'],
      borderColor: colors['primary/50'],
      borderRadius: 12,
    },
    textStyle: {
      ...typography['buttons/large'],
      textTransform: 'uppercase',
      fontSize: 16,
      fontWeight: '500',
      color: '#fff',
    },
    gradient: false,
    shadow: false,
  },
  primary_brand: {
    style: {
      backgroundColor: colors['primary/brand'],
      borderColor: colors['primary/brand'],
      borderRadius: 12,
    },
    textStyle: { ...typography['body/x-small – regular'] },
    gradient: false,
    shadow: false,
  },
  primary_large: {
    style: {
      backgroundColor: colors['primary/50'],
      borderColor: colors['primary/50'],
      borderWidth: 1,
      borderRadius: 12,
      overflow: 'hidden',
      paddingVertical: 11,
      paddingHorizontal: 16,
      flex: 1,
      marginLeft: 6,
    },
    textAlign: 'center',
    ...typography['body/medium – medium'],
    color: colors['gray scale/0'],
    gradient: false,
    shadow: false,
  },
  primary_50_brand_clear: {
    style: {
      borderColor: colors['primary/50 – brand'],
      borderRadius: 8,
      borderWidth: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    ...typography['body/x-small – regular'],
    color: colors['primary/50 – brand'],
    gradient: false,
    shadow: false,
  },
  primary_50_brand_clear_large: {
    style: {
      borderColor: colors['primary/50 – brand'],
      borderRadius: 12,
      borderWidth: 1,
      paddingVertical: 11,
      paddingHorizontal: 16,
      flex: 1,
      alignItems: 'center',
      marginRight: 6,
    },
    textAlign: 'center',
    ...typography['body/medium – medium'],
    ...typography['textUppercase'],
    color: colors['primary/50 – brand'],
    gradient: false,
    shadow: false,
  },
  clear_red_border: {
    textStyle: {
      ...typography['buttons/large'],
      color: colors['additional/danger'],
    },
    style: {
      borderColor: colors['additional/danger'],
      borderRadius: 12,
      backgroundColor: colors['white'],
    },
  },
  clear_gray_border: {
    textStyle: {
      ...typography['buttons/large'],
      color: colors['gray scale/40'],
    },
    style: {
      borderColor: colors['gray scale/40'],
      borderRadius: 12,
      backgroundColor: colors['white'],
    },
  },
  grey_large: {
    style: {
      borderColor: colors['gray scale/40'],
      backgroundColor: colors['gray scale/40'],
      overflow: 'hidden',
      borderRadius: 12,
      borderWidth: 1,
      paddingVertical: 11,
      paddingHorizontal: 16,
      flex: 1,
      alignItems: 'center',
      marginLeft: 6,
    },
    textAlign: 'center',
    ...typography['body/medium – medium'],
    ...typography['textUppercase'],
    color: colors['gray scale/0'],
    gradient: false,
    shadow: false,
  },
  greyed: {
    textStyle: {
      ...typography['buttons/large'],
      color: colors['gray scale/30'],
      fontWeight: '500',
    },
    style: {
      borderColor: colors['gray scale/10'],
      backgroundColor: colors['gray scale/10'],
      borderWidth: 0,
      marginTop: 7,
      borderRadius: 12,
    },
    shadow: false,
  },
  grey: {
    style: {
      backgroundColor: colors['gray scale/30'],
      borderColor: colors['gray scale/30'],
      borderRadius: 12,
    },
    textStyle: { ...typography['body/x-small – regular'] },
    gradient: false,
    shadow: false,
  },
  danger: {
    textStyle: {
      ...typography['buttons/large'],
      color: colors['gray scale/0'],
    },
    style: {
      backgroundColor: colors['additional/danger'],
      borderRadius: 12,
      borderWidth: 0,
    },
    shadow: false,
  },
  alarm: {
    textStyle: {
      ...typography['body/x-small – regular'],
      color: colors['gray scale/0'],
    },
    style: {
      backgroundColor: colors['additional/alarm'],
      borderRadius: 8,
      borderWidth: 0,
    },
    shadow: false,
  },
  profit: {
    textStyle: {
      ...typography['body/x-small – regular'],
      color: colors['gray scale/0'],
    },
    style: {
      backgroundColor: colors['additional/profit'],
      borderRadius: 8,
      borderWidth: 0,
    },
    shadow: false,
  },
  link: {
    textStyle: {
      ...typography['body/x-small – regular'],
      color: colors['gray scale/0'],
    },
    style: {
      backgroundColor: colors['additional/link'],
      borderRadius: 8,
      borderWidth: 0,
    },
    shadow: false,
  },
  'primary-add': {
    icon: Icon('plus'),
    style: {
      borderRadius: 0,
    },
    shape: 'rectangle',
    children: 'Add New',
  },
};
let b_styles = default_styles;
for (let key in b_styles) {
  b_styles[`${key}_mini`] = {
    ...b_styles[key],
    style: { ...b_styles[key]?.['style'], minHeight: 30, borderRadius: 8 },
    textStyle: { ...b_styles[key]?.['textStyle'], fontSize: 12 },
  };
}
export const button_styles = b_styles;
