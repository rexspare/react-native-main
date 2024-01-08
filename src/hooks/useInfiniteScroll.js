import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import useSetState from './useSetState';
import usePrevious from './usePrevious';

const defaultKeyExtractor = item => item.id;
const initialState = { after: null, pageData: null, data: [] };

export default function useInfiniteScroll({
  query,
  variables,
  limit,
  pageSize,
  onCustomRefresh,
  dataExtractor,
  keyExtractor = defaultKeyExtractor,
  pause,
  ref,
  onResCallback,
  fetchPolicy,
}) {
  const [{ after, data, pageData }, setState] = useSetState(initialState);

  React.useEffect(() => {
    setState(state => ({ ...state, after: null }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables]);

  const queryVariables = React.useMemo(() => {
    return {
      ...(variables ?? {}),
      first: Math.min(limit || pageSize, pageSize),
      after,
    };
  }, [after, limit, pageSize, variables]);

  const [res, executeQuery] = useQuery({
    query,
    pause,
    variables: queryVariables,
    requestPolicy: fetchPolicy,
  });

  const prevData = usePrevious(res.data);

  const loading = res.fetching && !refreshing;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(
    (silent = false, overridePause = true) => {
      const refresh = async () => {
        !silent && setRefreshing(true);
        const forceRefresh = await new Promise(resolve => {
          setState(old => {
            resolve(!old.after);
            return { after: null, pageData: null };
          });
        });

        await onCustomRefresh?.();

        if (forceRefresh || pause) {
          await new Promise(resolve => setTimeout(resolve, 500));
          await Promise.all([
            forceRefresh
              ? executeQuery({
                  requestPolicy: 'network-only',
                })
              : null,
            // new Promise(resolve => setTimeout(resolve, 500)),
          ]);
        }

        !silent && setRefreshing(false);
      };

      if (!loading && !refreshing && (!pause || overridePause)) {
        refresh();
      }
    },
    [executeQuery, loading, onCustomRefresh, pause, refreshing, setState],
  );

  const loadMore = React.useCallback(() => {
    if (pageData?.hasNextPage && (!limit || data.length < limit)) {
      setState(({ pageData: currPageData }) => ({
        after: currPageData?.endCursor ?? null,
      }));
    }
    if (pause && (!pageData || pageData?.hasNextPage)) {
      setState(({ pageData: currPageData }) => ({
        after: currPageData?.endCursor ?? null,
      }));
      executeQuery({
        requestPolicy: 'network-only',
        variables: {
          after: pageData?.endCursor ?? null,
          limit,
          ...variables,
        },
      });
    }
  }, [data.length, limit, pageData, setState, pause]);

  const concatNewData = React.useCallback(
    (oldData, newData = []) => {
      const old = oldData?.length ? [...oldData] : [];
      if (newData.length) {
        const lastOldId = old.length ? keyExtractor(old[old.length - 1]) : null;
        const newLastIndex = newData.findIndex(
          item => keyExtractor(item) === lastOldId,
        );
        return [...old, ...newData.slice(newLastIndex + 1)];
      } else {
        return old;
      }
    },
    [keyExtractor],
  );

  const addData = React.useCallback(
    (newData, pageInfo) => {
      if (after) {
        setState(({ data: oldData }) => ({
          data: concatNewData(oldData, newData),
          pageData: pageInfo,
        }));
      } else {
        setState({ data: newData, pageData: pageInfo });
      }
    },
    [after, concatNewData, setState],
  );

  const isNewData = React.useMemo(() => {
    return !((res.data && dataExtractor(res.data)?.edges) || []).every(
      item => !!data.find(d => keyExtractor(d) === keyExtractor(item)),
    );
  }, [data, dataExtractor, keyExtractor, res.data]);

  React.useEffect(() => {
    if (res.data && !res.fetching && (res.data !== prevData || isNewData)) {
      const { edges, pageInfo } = dataExtractor?.(res.data) ?? res.data;
      addData(
        edges?.map(e => e.node)?.filter(node => !!keyExtractor(node)) ?? [],
        pageInfo,
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataExtractor, res.data, res.fetching, prevData, isNewData]);

  const setData = React.useCallback(
    setter => {
      setState(({ data: currData }) => {
        return { data: setter(currData) };
      });
    },
    [setState],
  );

  useEffect(() => {
    if (ref && res.data) {
      ref.current = res?.data;
    }
    if (onResCallback && res.data) {
      onResCallback(res);
    }
  }, [res]);

  return React.useMemo(
    () => ({
      refreshing,
      loading,
      onLoadMore: loadMore,
      onRefresh,
      data,
      setData,
      executeQuery,
    }),
    [data, executeQuery, loadMore, loading, onRefresh, refreshing, setData],
  );
}
