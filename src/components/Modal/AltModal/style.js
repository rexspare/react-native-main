import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window')

export const styles = {
    backdrop: {
        backgroundColor: "#000",
        opacity: 0.25
    },
    blur: {
        justifyContent: "center",
        alignItems: "center",
        height,
        width
    },
}
