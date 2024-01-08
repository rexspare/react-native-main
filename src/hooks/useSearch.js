import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDebounce} from 'use-debounce';

export default function useSearch(SearchScreen, searchRoute, defaultRoute) {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState(null);
  const [searchValue] = useDebounce(search, 500, {
    leading: true,
  });

  const renderSearchScreen = React.useCallback(
    props => <SearchScreen {...props} search={searchValue} />,
    [searchValue],
  );

  React.useEffect(() => {
    navigation.navigate(search?.length ? searchRoute : defaultRoute);
  }, [defaultRoute, navigation, search, searchRoute]);

  const headerProps = React.useMemo(
    () => ({
      search: true,
      searchValue: search,
      onSearch: setSearch,
    }),
    [search],
  );

  return React.useMemo(
    () => ({
      headerProps,
      SearchScreen: renderSearchScreen,
    }),
    [headerProps, renderSearchScreen],
  );
}
