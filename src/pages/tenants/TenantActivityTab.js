import React from 'react';
import { Dimensions } from "react-native";
import ActivityTab from "components/ProfilePage/ActivityTab"

const { height } = Dimensions.get("window")
const TenantActivityTab = ({ isSelf, ...data }) => {
  return (
    <ActivityTab
      keyboardPadding={false}
      feedId={data?.activityFeed?.pk || data?.data?.activityFeed?.pk}
      comments={!isSelf}
      listProps={isSelf && {variables: {user: data?.data?.pk}}}
      styles={styles}
    />)
};
const styles = { container: { paddingBottom: 36, maxHeight: height / 2 } }

export default TenantActivityTab;
