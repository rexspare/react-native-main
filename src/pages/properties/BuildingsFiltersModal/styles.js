import { IS_SMALLER } from 'styles/responsive';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  container: {
    borderWidth: 0,
  },

  multiSelectContainer: {
    minHeight: 72,
    maxHeight: 90,
    justifyContent: 'space-between',
    paddingBottom: 18,
    marginTop: 3,
  },

  multiSelectItemStyle: {
    maxHeight: 7,
    minWidth: IS_SMALLER ? 72 : 108,
  },

  dropdown: {
    dropdownContainer: {
      width: '100%',
    },
  },
  selectedText: {
    ...typography['body/medium – regular'],
    color: colors['gray scale/0'],
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors['primary/50'],
    overflow: 'hidden',
  },
  statusLabel: {
    ...typography['body/medium – medium'],
    color: colors['gray scale/40'],
    textTransform: 'uppercase',
  },
  filterButton: {
    alignSelf: 'center',
    marginTop: '10%',
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    backgroundColor: colors['primary/50'],
    borderColor: colors['primary/50'],
  },
  buildingText: {
    ...typography['body/medium – regular'],
    textTransform: 'uppercase',
  },
};

export const BEDROOM_OPTIONS = [
  { key: 1, title: '1 bedrooms' },
  { key: 2, title: '2 bedrooms' },
  { key: 3, title: '3 bedrooms' },
  { key: 4, title: '4 bedrooms' },
  { key: 5, title: '5+ bedrooms' },
];
