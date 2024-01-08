import {useContext} from 'react';
import AuthProvider from 'providers/auth';

function useAuth() {
  return useContext(AuthProvider);
}

export default useAuth;
