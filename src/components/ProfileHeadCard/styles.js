import { colors } from "styles/theme";
import { IS_SMALLER } from "styles/responsive";
import { typography } from "styles/typography";
import { alignItems } from "styled-system";

export const styles = {
    header: {
        backgroundColor: "transparent",
    },
    profileImageBox: {
        width: 84,
        height: 84,
        borderRadius: 60,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors['white'],
        marginTop: -45,
        justifyContent:'center',
        alignItems:'center'
    },
    profileContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        alignItems: 'center',
        paddingBottom: 3,
        width: "100%",
        marginTop: IS_SMALLER ? -10 : 0
    },
    profileImage: {
        width: 84,
        height: 84,
    },
    profileName: {
        color: colors['gray scale/90'],
        fontSize: 18,
        marginTop: IS_SMALLER ? 2 : 3,
        ...typography['body/large – medium'],
        fontWeight: 'bold',
    },
    profileType: {
        color: colors['gray scale/40'],
        fontSize: 14,
        marginTop: 0,
        textTransform: 'uppercase',
        fontWeight: "400",
        ...typography.textFontFamily,
        fontSize: 14,
        lineHeight: 21,
        textTransform: 'uppercase',
    },
};