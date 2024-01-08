import { Icon } from "@ui-kitten/components";
import Box from "components/Box";
import Dialog from "components/Dialog"
import Text from "components/Text";
import React from "react"

const styles = {
    modal: {
        view: {
            backgroundColor: "#36796F",
            justifyContent: "center"
        },
        content: {
            paddingTop: 0,
            marginTop: 10,
        }
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 21,
        textAlign: "center"
    },
    tick: {
        margin: "auto"
    },
    box: {
        alignItems: "center",

    }
}
const SuccessModal = ({ msg, ...props }) => {
    return (
        <Dialog visible={true} styles={styles.modal} closeIcon={false} {...props}>
            <Box style={styles.box}>
                <Text style={styles.text}>{msg}</Text>
                <Icon pack={"pm"} name={'tick'} style={styles.tick} height={36} width={36} />

            </Box>
        </Dialog>
    )
};

export default SuccessModal