import React from "react";

export default (Component, map, getType = ({__typename} = {}) => __typename) => (props) => {
    const typename = getType(props)
    return <Component {...map[typename]} {...props}/>
}