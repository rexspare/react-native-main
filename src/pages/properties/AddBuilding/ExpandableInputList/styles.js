import { colors } from "styles/theme";
import { typography } from "styles/typography";

const button = {
    width: '100%',
    height: 50,
    marginTop: '5%',
    borderRadius: 10,
    borderWidth: 1,
}

export const styles = {
    mainContainer: {
        marginTop: '5%',
    },
    expandBtn: {
        ...button,
        backgroundColor: colors['gray scale/5'],
        borderColor: colors['gray scale/20']
    },
    collapseBtn: {
        ...button,
        backgroundColor: '#fff',
        borderColor: colors['primary/50'],
    },
    btnText: {
        color: colors['gray scale/40'],
        fontWight: "400",
        fontFamily: 'Roboto',
    },
    collapseBtnText: {
        color: colors['primary/50'],
        fontSize: 16,
        fontWeight: "500"
    },
    expandBtnElements: {
        zIndex: 10,
        overflow: "hidden"
    },
    expandBtnUnderMid: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: -50,
        backgroundColor: colors['gray scale/5'],
        borderColor: colors['gray scale/20']
    },
    expandBtnUnderBottom: {
        zIndex: 1,
        width: '85%',
        alignSelf: 'center',
        marginTop: -20,
        borderRadius: 10,
        backgroundColor: colors['gray scale/5'],
        borderColor: colors['gray scale/20']
    },
    labelStyle: {
        marginTop: 3,
        textTransform: 'capitalize', marginBottom: 0, ...typography["body/small – regular"], position: "relative"
    },
    input: {
        width: '100%',
        backgroundColor: colors['gray scale/5'],
        height: 50,
        borderRadius: 10,
        marginLeft: 0,
        marginBottom: 0,
        position: "relative",
        flex: 1,
    }
}