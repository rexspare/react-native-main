import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 20
    },
    header: {
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: "#a7a9ac",
      paddingBottom: 20,
      marginLeft: -0,
    },
    headerLast: {
      borderBottomWidth: 0
    },
    headerText: {
      textAlign: 'left',
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1
  
    },
    content: {
      padding: 20,
      backgroundColor: '#fff',
    },
    active: {
    },
    inactive: {
    },
    selectors: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selector: {
      padding: 10,
    },
    activeSelector: {
      fontWeight: 'bold',
    },
    selectTitle: {
      fontSize: 14,
      fontWeight: '500',
      padding: 10
    },
    multipleToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 30,
      alignItems: 'center',
    },
    multipleToggle__title: {
      fontSize: 16,
      marginRight: 8
    },
  });
  