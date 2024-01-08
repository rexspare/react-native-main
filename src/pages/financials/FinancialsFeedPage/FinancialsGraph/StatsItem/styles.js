import { colors } from 'styles/theme';

export const styles = {
  statItem: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 22,
    paddingRight: 24,
    paddingVertical: 24,
    borderRadius: 12,
    marginTop: 16,
  },
  statTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markerContainer: {
    width: 10,
    height: 10,
    paddingRight: '15%',
  },
  statTitleText: {
    alignSelf: 'center',
    fontSize: 22,
    color: colors['gray scale/0'],
    lineHeight: 33,
  },
  statValueText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors['gray scale/0'],
    lineHeight: 33,
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
};
