import React from 'react';
import useAuth from 'hooks/useAuth';
import usePrevious from 'hooks/usePrevious';

const FilterContext = React.createContext();

const FilterContextProvider = FilterContext.Provider;

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'RESET':
      return {};
    default:
      return state;
  }
}

const FilterProvider = props => {
  const [state, dispatch] = React.useReducer(filterReducer, {});
  const {user} = useAuth();
  const prevUser = usePrevious(user);

  React.useEffect(() => {
    if (user?.id && !prevUser?.id && Object.keys(state).length) {
      dispatch({type: 'RESET'});
    }
  }, [prevUser, state, user]);

  const val = React.useMemo(
    () => ({
      setFilter: (key, value) => dispatch({type: 'SET_FILTER', key, value}),
      filter: state,
    }),
    [state],
  );
  return <FilterContextProvider {...props} value={val} />;
};

FilterContext.Provider = FilterProvider;

export default FilterContext;
