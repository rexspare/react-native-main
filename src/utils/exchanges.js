import AsyncStorage from '@react-native-community/async-storage';
import {
  pipe,
  fromPromise,
  map,
  mergeMap,
  share,
  filter,
  takeUntil,
  merge,
  make,
} from 'wonka';
import { makeResult, makeErrorResult } from 'urql';
import { Kind, print } from 'graphql';
import { extractFiles } from 'extract-files';

export const authHeaderExchange = ({ forward }) => {
  return operations$ => {
    return pipe(
      operations$,
      mergeMap(op =>
        pipe(
          // fromValue(tokenRef.current),
          fromPromise(AsyncStorage.getItem('auth.userToken')),
          map(token => ({
            ...op,
            context: {
              ...op.context,
              fetchOptions: {
                ...(op.context.fetchOptions || {}),
                headers: {
                  ...((op.context.fetchOptions || {}).headers || {}),
                  authorization: token ? `JWT ${token}` : '',
                },
              },
            },
          })),
        ),
      ),
      forward,
    );
  };
};

export const uploadFetchExchange = ({ forward }) => {
  const isOperationFetchable = operation => {
    const { operationName } = operation;
    return operationName === 'query' || operationName === 'mutation';
  };

  return ops$ => {
    const sharedOps$ = share(ops$);
    const fetchResults$ = pipe(
      sharedOps$,
      filter(isOperationFetchable),
      mergeMap(operation => {
        const { key } = operation;
        const teardown$ = pipe(
          sharedOps$,
          filter(op => op.operationName === 'teardown' && op.key === key),
        );

        return pipe(
          createFetchSource(
            operation,
            operation.operationName === 'query' &&
              !!operation.context.preferGetMethod,
          ),
          takeUntil(teardown$),
        );
      }),
    );

    const forward$ = pipe(
      sharedOps$,
      filter(op => !isOperationFetchable(op)),
      forward,
    );

    return merge([fetchResults$, forward$]);
  };
};

const getOperationName = query => {
  const node = query.definitions.find(node => {
    return node.kind === Kind.OPERATION_DEFINITION && node.name;
  });

  return node !== undefined && node.name ? node.name.value : null;
};

const createFetchSource = (operation, shouldUseGet) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    operation.operationName === 'subscription'
  ) {
    throw new Error(
      'Received a subscription operation in the httpExchange. You are probably trying to create a subscription. Have you added a subscriptionExchange?',
    );
  }

  return make(({ next, complete }) => {
    const abortController =
      typeof global.AbortController !== 'undefined'
        ? new global.AbortController()
        : undefined;

    const { context } = operation;

    const extraOptions =
      typeof context.fetchOptions === 'function'
        ? context.fetchOptions()
        : context.fetchOptions || {};

    const operationName = getOperationName(operation.query);

    const body = {
      query: print(operation.query),
      variables: operation.variables,
    };

    if (operationName !== null) {
      body.operationName = operationName;
    }

    const fetchOptions = {
      ...extraOptions,
      body: shouldUseGet ? undefined : JSON.stringify(body),
      method: shouldUseGet ? 'GET' : 'POST',
      headers: {
        'content-type': 'application/json',
        ...extraOptions.headers,
      },
      signal:
        abortController !== undefined ? abortController.signal : undefined,
    };
    const { files, clone: variablesWithoutFiles } = extractFiles(
      operation.variables,
    );
    const isFileUpload = !!files.size;

    if (isFileUpload) {
      fetchOptions.body = new FormData();

      body.variables = variablesWithoutFiles;
      fetchOptions.body.append('operations', JSON.stringify(body));

      const fileMap = {};
      let i = 0;
      files.forEach(paths => {
        fileMap[++i] = paths.map(path => `variables.${path}`);
      });
      fetchOptions.body.append('map', JSON.stringify(fileMap));

      i = 0;
      files.forEach((paths, file) => {
        fetchOptions.body.append(`${++i}`, file, file.name);
      });

      delete fetchOptions.headers['content-type'];
    }

    if (shouldUseGet) {
      operation.context.url = convertToGet(operation.context.url, body);
    }

    let ended = false;

    Promise.resolve()
      .then(() => (ended ? undefined : executeFetch(operation, fetchOptions)))
      .then(result => {
        if (!ended) {
          ended = true;
          if (result) {
            next(result);
          }
          complete();
        }
      });

    return () => {
      ended = true;
      if (abortController !== undefined) {
        abortController.abort();
      }
    };
  });
};

const executeFetch = (operation, opts) => {
  const { url, fetch: fetcher } = operation.context;
  let response;

  return (fetcher || fetch)(url, opts)
    .then(res => {
      const { status } = res;
      const statusRangeEnd = opts.redirect === 'manual' ? 400 : 300;
      response = res;

      if (status < 200 || status >= statusRangeEnd) {
        throw new Error(res.statusText);
      } else {
        return res.json();
      }
    })
    .then(result => makeResult(operation, result, response))
    .catch(err => {
      if (err.name !== 'AbortError') {
        return makeErrorResult(operation, err, response);
      }
    });
};

export const convertToGet = (uri, body) => {
  const queryParams = [`query=${encodeURIComponent(body.query)}`];

  if (body.variables) {
    queryParams.push(
      `variables=${encodeURIComponent(JSON.stringify(body.variables))}`,
    );
  }

  return uri + '?' + queryParams.join('&');
};

export const splitString = (value, num) => {
  return value?.length > num + 2 ? value.substring(0, num) + ' . . .' : value;
};

export const parseDate = input => {
  const parts = input?.split('-');
  if (parts) {
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
};

export const toCapitalize = (str, isUppercase) => {
  return (
    str.charAt(0).toUpperCase() +
    (isUppercase ? str.slice(1).toLowerCase() : str.slice(1))
  );
};

export const formatAmount = (amount, num = 2, isAmount = true) => {
  if (amount) {
    const number = amount?.toLocaleString('en-US', {
      minimumFractionDigits: num,
      maximumFractionDigits: num,
    });
    if (isAmount) {
      return '$' + number;
    } else {
      return number;
    }
  }
};
