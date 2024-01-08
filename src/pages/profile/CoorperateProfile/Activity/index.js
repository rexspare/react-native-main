import React from 'react';
import { Dimensions } from "react-native";
import ActivityTab from "components/ProfilePage/ActivityTab";

const Activity = ({ data }) => {
    return (
        <ActivityTab
            listProps={{ variables: { user: data?.pk } }}
            feedId={null}
            styles={style}
            comments={false}
        />
    )
};

const { height } = Dimensions.get("window");
const style = {
    container: { 
        paddingBottom: 36, 
        maxHeight: height / 1.4, 
        minHeight: height / 2 
    }
}

export default Activity;