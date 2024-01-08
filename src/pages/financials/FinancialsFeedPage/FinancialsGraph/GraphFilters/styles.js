import { styles as _styles } from "pages/tasks/TaskFiltersPage/styles"
import { colors } from "styles/theme"
export const styles = {
  ..._styles,
  dateField: { container: { width: undefined, height: undefined } },
  filterContainer: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  filterButton: {
    height: 50,
    alignSelf: 'center',
    marginTop: '75%',
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    backgroundColor: colors['primary/50'],
    borderColor: colors['primary/50'],
    textStyle: { color: "red" }
  }
}