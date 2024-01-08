import React, { forwardRef, useEffect } from 'react';
import {
  FlatList,
  RefreshControl as RNRefreshControl,
  ActivityIndicator,
  SectionList,
} from 'react-native';
import Box from './Box';
import useTheme from 'hooks/useTheme';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { useLoader } from 'hooks/useLoader';
import { useIsFocused } from '@react-navigation/core';
import { createNativeWrapper } from 'react-native-gesture-handler';

const IN_LIST_HEADER = 'IN_LIST_HEADER';
const IN_LIST_FOOTER = 'IN_LIST_FOOTER';

const RefreshControl = createNativeWrapper(RNRefreshControl, {
  disallowInterruption: true,
  shouldCancelWhenOutside: false,
});

let InfiniteFlatList = (
  {
    query,
    pageSize = 10,
    variables,
    draftData,
    ListComponent = FlatList,
    sections,
    sectionExtractor,
    dataExtractor,
    onLoad,
    pause,
    ListHeaderComponent,
    ListFooterComponent,
    InListHeaderComponent,
    InListFooterComponent,
    ListEmptyComponent,
    showListComponentsOnEmpty = true,
    limit,
    refresh = true,
    refreshOnLoad,
    added,
    setAdded,
    onRefresh: onCustomRefresh,
    dataRef,
    onResCallback,
    fetchPolicy,
    refreshOnFocus,
    ...props
  },
  ref,
) => {
  const listRef = React.useRef();
  const theme = useTheme();
  const {
    data,
    setData,
    loading,
    refreshing,
    onRefresh,
    onLoadMore,
    executeQuery,
  } = useInfiniteScroll(
    React.useMemo(
      () => ({
        variables,
        query,
        pause,
        limit,
        pageSize,
        dataExtractor,
        keyExtractor: props.keyExtractor,
        onCustomRefresh,
        ref: dataRef,
        onResCallback,
        fetchPolicy,
      }),
      [
        dataExtractor,
        props.keyExtractor,
        limit,
        onCustomRefresh,
        pageSize,
        pause,
        query,
        variables,
        onResCallback,
        fetchPolicy,
      ],
    ),
  );

  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (data?.length && onLoad) {
      onLoad(data);
    }
  }, [data, onLoad]);

  React.useEffect(() => {
    if (refreshOnLoad) {
      onRefresh();
    }
  }, [refreshOnLoad]);

  useEffect(() => {
    if (isFocused && refreshOnFocus) {
      onRefresh();
      props?.setRefreshOnFocus?.(false);
    }
  }, [isFocused, refreshOnFocus]);

  const {
    loader,
    startLoading: startSorting,
    stopLoading: stopSorting,
  } = useLoader();

  React.useImperativeHandle(
    ref,
    () => ({
      listRef,
      addItem: (item, i) =>
        setData(currData => {
          let index = i ?? currData.length;
          return [...currData.slice(0, index), item, ...currData.slice(index)];
        }),
      removeItem: key =>
        setData(currData =>
          currData.filter((d, i) => props.keyExtractor?.(d, i) !== key),
        ),
      refresh: onRefresh,
      executeQuery,
    }),
    [onRefresh, props.keyExtractor, setData, executeQuery],
  );

  React.useEffect(() => {
    const loadAdded = async () => {
      await executeQuery({ requestPolicy: 'network-only' });
      setAdded?.(false);
    };
    if (added) {
      loadAdded();
    }
  }, [added, executeQuery, setAdded]);

  const renderSpinner = React.useCallback(
    () =>
      loading ? (
        <>
          {ListFooterComponent && (showListComponentsOnEmpty || data.length)
            ? ListFooterComponent
            : null}
          <Box alignItems="center" my="3">
            <ActivityIndicator
              color={theme['color-primary-500']}
              size="large"
            />
          </Box>
        </>
      ) : ListFooterComponent && (showListComponentsOnEmpty || data.length) ? (
        ListFooterComponent
      ) : null,
    [
      ListFooterComponent,
      data.length,
      loading,
      showListComponentsOnEmpty,
      theme,
    ],
  );

  const Component = React.useMemo(() => {
    if (sections && sectionExtractor && ListComponent === FlatList) {
      return SectionList;
    }
    return ListComponent;
  }, [ListComponent, sectionExtractor, sections]);

  const listProps = React.useMemo(() => {
    const headerItems = InListHeaderComponent ? [IN_LIST_HEADER] : [];
    const footerItems = InListFooterComponent ? [IN_LIST_FOOTER] : [];
    if (sections && sectionExtractor) {
      startSorting();
      const sectionsData = [
        { title: '', data: headerItems },
        ...sections.map(section => ({
          title: section,
          data: [],
        })),
        { title: '', data: footerItems },
      ];
      data.forEach(d => {
        const section = sectionExtractor(d);
        if (section) {
          sectionsData.find(s => s.title === section)?.data.push(d);
        }
      });
      stopSorting();
      return {
        sections: sectionsData
          .filter(s => !!s.data.length)
          .map((s, index) => ({ ...s, index })),
        keyExtractor: (item, index) => {
          if (item === IN_LIST_FOOTER) {
            return `${IN_LIST_FOOTER}_${index}`;
          }
          if (item === IN_LIST_HEADER) {
            return `${IN_LIST_HEADER}_${index}`;
          }
          return props.keyExtractor?.(item, index);
        },
        renderItem: ({ item, ...otherProps }, ...args) => {
          if (item === IN_LIST_FOOTER) {
            return InListFooterComponent;
          }
          if (item === IN_LIST_HEADER) {
            return InListHeaderComponent;
          }
          return props.renderItem?.({ item, ...otherProps }, ...args);
        },
      };
    }
    return {
      data: draftData ? [...headerItems, ...draftData, ...data, ...footerItems] : [...headerItems, ...data, ...footerItems],
      keyExtractor: (item, index) => {
        if (item === IN_LIST_FOOTER) {
          return `${IN_LIST_FOOTER}_${index}`;
        }
        if (item === IN_LIST_HEADER) {
          return `${IN_LIST_HEADER}_${index}`;
        }
        return props.keyExtractor?.(item, index);
      },
      renderItem: ({ item, ...otherProps }, ...args) => {
        if (item === IN_LIST_FOOTER) {
          return InListFooterComponent;
        }
        if (item === IN_LIST_HEADER) {
          return InListHeaderComponent;
        }
        return props.renderItem?.({ item, ...otherProps }, ...args);
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    InListFooterComponent,
    InListHeaderComponent,
    data,
    draftData,
    props.keyExtractor,
    props.renderItem,
    sectionExtractor,
    sections,
    refreshing,
  ]);

  return (
    <>
      {loader}
      <Component
        {...listProps}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ref={listRef}
        refreshControl={
          refresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme['color-primary-500']}
              colors={[theme['color-primary-500']]}
            />
          ) : null
        }
        ListHeaderComponent={
          showListComponentsOnEmpty || data.length ? ListHeaderComponent : null
        }
        ListFooterComponent={renderSpinner}
        ListEmptyComponent={
          loading || refreshing || (!showListComponentsOnEmpty && !data.length)
            ? null
            : ListEmptyComponent
        }
        {...props}
      />
    </>
  );
};

InfiniteFlatList.propTypes = FlatList.propTypes;

InfiniteFlatList = forwardRef(InfiniteFlatList);

export default InfiniteFlatList;
