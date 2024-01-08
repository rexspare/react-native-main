import React from 'react';
import StorageProvider from './storage';
import useAuth from 'hooks/useAuth';
import {Platform} from 'react-native';
// import {Notifications} from 'react-native-notifications';
import {useMutation, useQuery} from 'urql';
import countUnreadNotificationsQuery from 'queries/notifications/countUnreadNotifications.gql';
import setDeviceTokenMutation from 'queries/notifications/setDeviceToken.gql';
import readNotificationsMutation from 'queries/notifications/readNotifications.gql';
/*
  Deactivated to enable google play store release.
*/ 
const NotificationsContext = React.createContext({});

const NotificationsContextProvider = NotificationsContext.Provider;

const NotificationsProvider = props => {  
  // const storage = React.useContext(StorageProvider);
  // const {user} = useAuth();
  // const tokenRef = React.useRef(null);
  // const lastNotificationRef = React.useRef(null);
  // const [unreadCount, setUnreadCount] = React.useState(
  //   Platform.OS === 'ios' ? Notifications.ios.getBadgeCount() : 0,
  // );
  // const [enabled, setEnabled] = React.useState(null);
  // const [loaded, setLoaded] = React.useState(false);

  // const [countUnreadRes, countUnread] = useQuery({
  //   query: countUnreadNotificationsQuery,
  //   requestPolicy: 'cache-and-network',
  //   pause: !user?.id,
  // });
  // const [setTokenRemoteRes, setTokenRemote] = useMutation(
  //   setDeviceTokenMutation,
  // );
  // const [readNotificationsRes, readNotifications] = useMutation(
  //   readNotificationsMutation,
  // );

  // const setNotificationCount = React.useCallback(notificationCount => {
  //   if (Platform.OS === 'ios') {
  //     Notifications.ios.setBadgeCount(notificationCount);
  //   }
  //   setUnreadCount(notificationCount);
  // }, []);

  // const readNotificationsProxy = React.useCallback(() => {
  //   const read = async () => {
  //     const res = readNotifications();
  //     if (res.data?.readNotifications?.success) {
  //       setNotificationCount(0);
  //     }
  //   };
  //   read();
  // }, [readNotifications, setNotificationCount]);

  // React.useEffect(() => {
  //   readNotificationsProxy();
  // }, [readNotificationsProxy]);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (user?.id) {
  //       countUnread({
  //         requestPolicy: 'cache-and-network',
  //       });
  //     }
  //   }, 30000);
  //   return () => clearInterval(interval);
  // }, [countUnread, user]);

  // React.useEffect(() => {
  //   const notificationCount = countUnreadRes.data?.unreadNotificationCount;
  //   if (
  //     !isNaN(notificationCount) &&
  //     notificationCount !== null &&
  //     notificationCount !== unreadCount
  //   ) {
  //     setNotificationCount(notificationCount);
  //   }
  // }, [countUnreadRes.data, setNotificationCount, unreadCount]);

  // React.useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     Notifications.removeAllDeliveredNotifications();
  //   }
  //   const getInitial = async () => {
  //     try {
  //       const initialNotification = await Notifications.getInitialNotification();
  //       if (initialNotification) {
  //         console.log('handle initial notification', initialNotification);
  //       }
  //     } catch {}
  //   };
  //   getInitial();
  // }, []);

  // React.useEffect(() => {
  //   let mounted = true;
  //   const onEventSafe = listener => (...args) => {
  //     if (mounted) {
  //       listener?.(...args);
  //     }
  //   };
  //   const loadData = async () => {
  //     if (user?.id) {
  //       Notifications.events().registerRemoteNotificationsRegistered(
  //         onEventSafe(async event => {
  //           const oldToken = tokenRef.current;
  //           tokenRef.current = event.deviceToken;
  //           const storedToken = await storage.getItem('deviceToken');
  //           if (
  //             storedToken !== event.deviceToken &&
  //             oldToken !== event.deviceToken
  //           ) {
  //             const res = await setTokenRemote({
  //               token: event.deviceToken,
  //               platform: Platform.OS,
  //             });
  //             if (res.data?.setDeviceToken?.success) {
  //               await storage.setItem('deviceToken', event.deviceToken);
  //             }
  //           }
  //         }),
  //       );
  //       Notifications.events().registerNotificationReceivedForeground(
  //         (notification, completion) => {
  //           console.log('Notification Received - Foreground', notification);

  //           if (
  //             Platform.OS === 'android' &&
  //             notification.identifier !== lastNotificationRef.current
  //           ) {
  //             lastNotificationRef.current = notification.identifier;
  //             Notifications.postLocalNotification({
  //               title: notification.payload['gcm.notification.title'],
  //               body: notification.payload['gcm.notification.body'],
  //             });
  //           }

  //           // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
  //           completion({alert: true, sound: true, badge: false});
  //         },
  //       );

  //       Notifications.events().registerNotificationOpened(
  //         (notification, completion, action) => {
  //           console.log('Notification opened by device user', notification);
  //           console.log('Notification opened with an action:', action);
  //           completion();
  //         },
  //       );

  //       Notifications.events().registerNotificationReceivedBackground(
  //         (notification, completion) => {
  //           console.log('Notification Received - Background', notification);

  //           // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
  //           completion({alert: true, sound: true, badge: false});
  //         },
  //       );

  //       await Notifications.registerRemoteNotifications();
  //       let hasPermissions = await Notifications.isRegisteredForRemoteNotifications();
  //       if (!hasPermissions && Platform.OS === 'ios') {
  //         await Notifications.ios.registerRemoteNotifications();
  //         hasPermissions = await Notifications.ios.isRegisteredForRemoteNotifications();
  //       }
  //       setEnabled(hasPermissions);
  //     }
  //     setLoaded(true);
  //     return () => {
  //       mounted = false;
  //     };
  //   };
  //   loadData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user?.id]);

  // const value = React.useMemo(
  //   () => ({
  //     loading: !loaded,
  //     unreadCount,
  //     // readNotifications: readNotificationsProxy,
  //   }),
  //   [loaded, readNotificationsProxy, unreadCount],
  // );

  return <NotificationsContextProvider {...props} value={{}} />;
};

NotificationsContext.Provider = NotificationsProvider;

export default NotificationsContext;
