import React, { useMemo, useState } from 'react';

const RefreshStateContext = React.createContext({});

const RefreshStateContextProvider = RefreshStateContext.Provider;



const RefreshStateProvider = props => {
    const [refreshState, setRefreshState] = useState({});

    const value = useMemo(() => ({
        refreshState, setRefreshState
    }), [refreshState, setRefreshState])

    return <RefreshStateContextProvider {...props} value={value} />;
};

RefreshStateContext.Provider = RefreshStateProvider;

export default RefreshStateContext;
