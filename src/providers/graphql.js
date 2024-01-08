import React from 'react';
import Config from 'react-native-config';
import {
  Provider,
  dedupExchange,
  debugExchange,
  createClient as _createClient,
} from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { authHeaderExchange, uploadFetchExchange } from 'utils/exchanges.js';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { compact } from 'lodash';

export const GraphQLContext = React.createContext();

const createClient = () => {
  return _createClient({
    url: Config.GRAPHQL_URL,
    exchanges: compact([
      typeof global.__REMOTEDEV__ !== 'undefined' &&
      Config.ENV === 'development'
        ? debugExchange
        : null,
      dedupExchange,
      cacheExchange({}),
      authHeaderExchange,
      multipartFetchExchange,
      uploadFetchExchange,
    ]),
  });
};

const initialClient = createClient();

const GraphQLProvider = props => {
  const [client, setClient] = React.useState(initialClient);

  const value = React.useMemo(
    () => ({
      resetClient: () => setClient(createClient()),
    }),
    [],
  );

  return (
    <GraphQLContext.Provider value={value}>
      <Provider value={client} {...props} />
    </GraphQLContext.Provider>
  );
};

export default GraphQLProvider;
