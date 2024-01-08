import {useReducer, useCallback} from 'react';

const ACTIONS = {
  SET_STATE: 1,
  SET_KEY: 2,
  CLEAR: 3,
};

export default function useSetState(initialState) {
  const setStateReducer = useCallback(
    (state, action) => {
      switch (action.type) {
        case ACTIONS.SET_STATE:
          return {...state, ...action.payload(state)};
        case ACTIONS.SET_KEY:
          return {
            ...state,
            [action.key]: action.payload(state[action.key]),
          };
        case ACTIONS.CLEAR:
          return {...initialState};
        default:
          return state;
      }
    },
    [initialState],
  );

  const [state, setState] = useReducer(setStateReducer, initialState);

  const setStateProxy = useCallback((newStateOrKey, newState) => {
    const defaultFunc = oldState => newState || newStateOrKey;
    if (newState) {
      setState({
        type: ACTIONS.SET_KEY,
        key: newStateOrKey,
        payload: typeof newState === 'function' ? newState : defaultFunc,
      });
    } else if (newStateOrKey) {
      setState({
        type: ACTIONS.SET_STATE,
        payload:
          typeof newStateOrKey === 'function' ? newStateOrKey : defaultFunc,
      });
    } else {
      setState({
        type: ACTIONS.CLEAR,
      });
    }
  }, []);

  return [state, setStateProxy];
}
