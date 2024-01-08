import React from 'react';
import FilterContext from 'providers/filter';

function useFilter(fields = []) {
  const {filter, setFilter} = React.useContext(FilterContext);

  const subsetFilter = React.useMemo(() => {
    const subset = {};
    const actualFields = Array.isArray(fields) ? fields : [fields];
    actualFields.forEach(key => {
      subset[key] = filter[key];
    });
    return subset;
  }, [fields, filter]);

  return React.useMemo(() => [subsetFilter, setFilter], [
    setFilter,
    subsetFilter,
  ]);
}

export default useFilter;
