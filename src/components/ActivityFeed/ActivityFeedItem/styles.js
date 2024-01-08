import { colors } from 'styles/theme';

export const styles = {
  btn: {
    width: 54,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    borderRadius: 8,
    borderColor: colors['primary/50'],
    justifyContent: 'center',
    paddingVertical: 0,
  },
  btnTxt: {
    color: colors['primary/50'],
    fontSize: 12,
    marginVertical: 0,
    padding: 0,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: colors['white'],
    borderWidth: 1,
    backgroundColor: colors['gray scale/5'],
  },
};
