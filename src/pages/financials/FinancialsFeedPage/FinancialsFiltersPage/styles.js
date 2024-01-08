import { styles as _styles } from 'pages/tasks/TaskFiltersPage/styles';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const styles = {
  ..._styles,
  dateField: {
    container: { width: undefined, height: undefined },
    fieldsContainer: { minHeight: 108, width: '100%', paddingHorizontal: 36 },
  },
  bankAccountButton: {
    backgroundColor: colors['primary/50'],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
    paddingLeft: 4,
    borderRadius: 8,
    paddingVertical: 3
  },
  bankAccountButtonIcon: {
    width: 18,
    height: 10,
    paddingLeft: 20
  },
  bankAccountButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 1,
    maxHeight: 32
  },
  filterContainer: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  actionBarLabel: {
    fontWeight: 'bold',
    color: colors['gray scale/90'],
  },
  removeFliterBox: {
    borderWidth: 1,
    borderColor: colors['gray scale/40'],
    marginRight: 8,
    borderRadius: 8,
    width: 38
  },
  removeFliterIcon: {
    width: 15,
    height: 15,
  },
  dropdownFilterBox: {
    borderWidth: 1,
    borderColor: colors['gray scale/40'],
    marginRight: 8,
    borderRadius: 8,
    width: 38
  },
  dropdownFilterIcon: {
    width: 15,
    height: 15,
  },
  chooseButton: {
    borderColor: colors['primary/50 – brand'],
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
  chooseButtonText: {
    color: colors['primary/50 – brand'],
    fontWeight: 'bold',
  },
  fieldLabelStyle: {
    fontWeight: 'bold',
    color: colors['gray scale/90'],
  },
  labelStyle: {
    textTransform: 'capitalize',
  },
  filterButton: {
    height: 50,
    alignSelf: 'center',
    marginTop: '25%',
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    backgroundColor: colors['primary/50'],
    borderColor: colors['primary/50'],
    textStyle: { color: "red" }
  },
  countContainer: {
    borderRadius: 30,
    height: 15,
    width: 15,
    alignItems: "center",
  },
  countText: {
    ...typography['body/xx-small – medium'],
    color: "white",
  }
};
