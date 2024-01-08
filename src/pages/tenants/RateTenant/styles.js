import { Dimensions } from "react-native";
import { colors } from "styles/theme";

const {width} = Dimensions.get('window')
export const styles = {
    headingText: {
        color: colors['secondary/2'],
        textTransform: "uppercase",
        width: "70%" 
    },
    actionButton: {
        width: 162,
        maxWidth: (width / 2.8) - 36,
    },
    reviewRow: { 
        flexDirection: 'column', 
        alignItems: "flex-start", 
        width: '100%', 
        minWidth: "100%", 
        marginTop: 20 
    },
    reviewLabel: { 
        marginLeft: 0, 
        // textTransform: "uppercase", 
        width: 300, 
    },
    reviewContent: { 
        color: colors['grey-200'] 
    }
}