import { colors } from 'styles/theme';

export const styles = {
  btn: {
    backgroundColor: '#fff',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: colors['primary/50'],
    height: 48,
  },
  btnText: {
    color: colors['primary/50'],
    textAlign: 'center',
    lineHeight: 24,
  },
  deleteAction: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    marginRight: 12,
    width: 36,
    height: 36,
    borderRadius: 8,
    borderColor: colors['gray scale/40'],
  },
  addMoreAction: {
    textStyle: { color: colors['primary/80'], fontWeight: '500', fontSize: 18 },
    style: {
      backgroundColor: colors['primary/5'],
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 4,
      paddingBottom: 4,
      borderRadius: 8,
    },
    btnText: {
        color: colors["primary/50"],
        textAlign: "center",
        lineHeight: 24
    },
    deleteAction: {
        backgroundColor: "#fff", borderColor: "#fff", marginRight: 12, width: 36, height: 36, borderRadius: 8, borderColor: colors["gray scale/40"]
    },
    addMoreAction: {
        textStyle: { color: colors['primary/80'], fontWeight: "500", fontSize: 18 },
        style: {
            backgroundColor: colors['primary/5'],
            overflow: "hidden",
            width: 36,
            height: 36,
            borderRadius: 8,
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10,
            paddingTop: 14
        }
    }
  }
}