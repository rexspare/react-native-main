import { noop } from 'lodash';
import RefreshStateContext from 'providers/refresh';
import { useContext, useEffect, useMemo } from 'react';

export default function useShouldRefresh(refreshKey, onRefresh = noop) {
    const { refreshState = {}, setRefreshState = noop } = useContext(RefreshStateContext)

    useEffect(() => {
        setRefreshState({ ...refreshState, [refreshKey]: { shouldRefresh: false } })
    }, [refreshKey]);


    const shouldRefresh = useMemo(() => refreshState?.[refreshKey]?.shouldRefresh, [refreshState?.[refreshKey]?.shouldRefresh])
    useEffect(() => {
        if (shouldRefresh) {
            onRefresh()
            setShouldrefresh(false)
        }
    }, [shouldRefresh])


    const setShouldrefresh = (shouldRefresh = true) => {
        setRefreshState({ ...refreshState, [refreshKey]: { shouldRefresh: shouldRefresh } })
    }

    return { shouldRefresh, setShouldrefresh }
}


export const useSetShouldRefresh = (refreshKey) => {
    const { refreshState = {}, setRefreshState = noop } = useContext(RefreshStateContext)

    const setShouldrefresh = (shouldRefresh = true) => {
        setRefreshState({ ...refreshState, [refreshKey]: { shouldRefresh } })
    }

    return setShouldrefresh

}