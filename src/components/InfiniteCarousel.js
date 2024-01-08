import React, {forwardRef} from 'react';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import Carousel from 'react-native-snap-carousel';

let InfiniteCarousel = (
  {query, variables, pageSize, dataExtractor, onBeforeSnapToItem, ...props},
  ref,
) => {
  const {
    data,
    // setData,
    // loading,
    // refreshing,
    onRefresh,
    onLoadMore,
    // executeQuery,
  } = useInfiniteScroll(
    React.useMemo(
      () => ({
        variables,
        query,
        pageSize,
        dataExtractor,
        keyExtractor: props.keyExtractor,
      }),
      [dataExtractor, pageSize, query, variables, props.keyExtractor],
    ),
  );
  const carouselRef = React.useRef();

  React.useImperativeHandle(
    ref,
    () => ({
      carouselRef,
      refresh: onRefresh,
    }),
    [onRefresh],
  );

  const onBeforeSnapToItemProxy = React.useCallback(
    index => {
      onBeforeSnapToItem?.(index);
      if (index === data.length - 1) {
        onLoadMore();
      }
    },
    [data.length, onBeforeSnapToItem, onLoadMore],
  );

  return (
    <Carousel
      onBeforeSnapToItem={onBeforeSnapToItemProxy}
      data={data}
      ref={carouselRef}
      {...props}
    />
  );
};

InfiniteCarousel = forwardRef(InfiniteCarousel);

export default InfiniteCarousel;
