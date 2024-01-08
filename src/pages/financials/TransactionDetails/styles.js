import { getStatusBarHeight } from "react-native-status-bar-height";
import { colors } from "styles/theme";

export const styles = {
  mainBox: {
    backgroundColor: colors['gray scale/5'],
  },
  header: {
    backgroundColor: colors['gray scale/5'],
  },
  transactionDetailedCard: {
    container: {
      borderTopWidth: 1,
      borderColor: 'white',
      marginBottom: 16,
    },
    row: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: 'white',
      marginTop: 16,
    },
    headerRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      color: colors['gray scale/90'],
      fontSize: 18,
      fontWeight: '500',
    },
    contentButton: {
      backgroundColor: colors['primary/5'],
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 6,
    },
    contentButtonText: {
      fontSize: 10,
      color: colors['primary/80'],
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
    },
    contentImage: {
      width: 50,
      height: 50,
      borderRadius: 8,
      marginRight: 16,
    },
    contentText: {
      color: colors['gray scale/90'],
      fontSize: 14,
    },
    contentSubText: {
      color: colors['gray scale/40'],
      fontSize: 12,
      marginTop: 8,
    },
  },
  transactionBtn: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  description: {
    row: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      height: 200,
      justifyContent: 'flex-start',
    },
    content: {marginLeft: 18, marginTop: 7},
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    width: "100%",
    marginBottom: -10,
    backgroundColor: "transparent"
  },
  profileImageBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    marginTop: -30,
  },
  profileImage: {
    width: 60,
    height: 60,
  },
  profileName: {
    color: colors['gray scale/90'],
    fontSize: 18,
    marginTop: 45,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium'
  },
  tenantStyle: {
    contentText: {
      fontSize: 16,
    },
    contentImage: {
      borderRadius: 25,
    },
  },
  providerStyle: {
    contentText: {
      fontSize: 16,
    },
    contentImage: {
      borderRadius: 25,
    },
  },
  descriptionStyle: {
    contentText: {
      fontSize: 16,
    },
  },
};
