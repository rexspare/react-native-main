import { colors } from "styles/theme";

export const styles = {
    imageContainer:{
        width: '15%',
    },
    itemContainer:{
        width: '100%',
        flexDirection: 'row',
        paddingTop: '2.5%',
        paddingBottom: '2.5%',
        alignItems: 'center',
    },
    userName:{
        width: '60%',
    },
    profilePic:{
        width: 40,
        height: 40,
        borderRadius: 40/2,
    },
    actionButtonsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'flex-end',
        width: '100%',
    },
    actionButton:{
        width: 40,
        height: 40,
        borderRadius: 40/2,
        alignSelf: 'center',
        backgroundColor: colors['primary/5'],
        borderColor: colors['primary/5'],
    }
}