import styled from 'styled-components/native';

export const styles = {
    btnStyle: {
        backgroundColor: "rgba(240, 240, 240, 0.9)",
        fontColor: "black",
        marginTop: 0,
        borderWidth: 0,
        borderBottomWidth: 1,
        height: 54,
        borderColor: "rgba(120, 120, 120, 0.72)"
    }
    ,
    textStyle: { color: "#335150" },
    buttonsContainer: {
        'borderRadius': 5,
        backgroundColor: "rgba(240, 240, 240, 0.9)",
        width: "90%",
        minHeight: 54,
        borderRadius: 18,
        overflow: "hidden",
        opacity: 0.9
    },
    cancelContainer: {
        width: "90%",
        justifyContent: "center",
        padding: 0,
        marginTop: 7,
        borderRadius: 18,
        overflow: "hidden"
    }

}

export const DialogWrapper = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 7%;
    borderRadius: 18;
    width: 90%;
    left: 5%;
`;

