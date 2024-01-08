import React from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';
import {withStyles} from '@ui-kitten/components';

import mapping from 'pm-mapping';

const ThemeProvider = ({theme, children}) => {
  const parsedTheme = React.useMemo(() => {
    const parsed = {...mapping.strict};
    Object.keys(theme).map(themeKey => {
      let themeValue = theme[themeKey];
      let ref = /^\$(.+)$/.exec(themeValue);
      while (ref) {
        themeValue = theme[ref[1]];
        ref = /^\$(.+)$/.exec(themeValue);
      }
      parsed[themeKey] = themeValue;
    });
    return parsed;
  }, [theme]);
  return <StyledThemeProvider theme={parsedTheme} children={children} />;
};

export default withStyles(ThemeProvider);
