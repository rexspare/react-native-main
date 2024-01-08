import {useContext} from 'react';
import NotificationsProvider from 'providers/notifications';

function useNotifications() {
  return useContext(NotificationsProvider);
}

export default useNotifications;
