import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  title: {
    color: colors['gray scale/90'],
    fontWeight: '700',
    fontSize: 18,
  },
  textTitle: {
    fontSize: 32,
    color: colors['gray scale/90'],
    lineHeight: 40,
  },
  address: {
    fontSize: 14,
    color: colors['gray scale/90'],
    fontWeight: '400',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  info: {
    borderWidth: 1,
    borderColor: '#E7E9E9',
    borderRadius: 12,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address1: {
    marginLeft: 5,
    textTransform: 'uppercase',
    color: '#A1A5A5',
    fontSize: 14,
    fontWeight: '400',
  },
  description: {
    color: '#131F1E',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
  },
  textAddress: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#36796F',
  },
  whiteCardLabel: {
    ...typography['body/small – regular'],
    color: colors['gray scale/40'],
  },
  whiteCardRow: {
    borderBottomWidth: 1,
    borderTopWidth: 0,
    height: 54,
    alignItems: "center",
    borderColor: colors['gray scale/10'],
    paddingHorizontal: 12,
    width: "100%",
  },
};
