import React from 'react';
import TextSwitch from "components/TextSwitch";
import {StyleSheet} from "react-native";

const styles = {backgroundColor: "#FAFAFF", textColor: "#B0BEC4", switchTextColor:"white"}
const StatusFilter = ({shouldShowOpen, setShouldShowOpen}) => {
    const addedStyles = Object.assign({switchBackgroundColor: shouldShowOpen ? '#00DEB7' : '#FC5457'}, styles)

    return (
        <TextSwitch
            style={addedStyles}
            flex={0.5}
            value={shouldShowOpen}
            onToggle={setShouldShowOpen}
            shape="circle"
            appearance="outline"
            offText="Closed"
            onText="Open"
        />
    );
};

export default StatusFilter;
