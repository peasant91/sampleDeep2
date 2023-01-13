/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

/**
 * USE YARN.
 * NPM IS SUCKS
 */

import React, { useCallback, useEffect, useState } from "react";
import { Alert, DefaultTheme, Provider as ThemeProvider } from "./tmd";
import AppNavigation from "./src/navigations/AppNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetProvider from "./tmd/providers/BottomSheetProvider";
import { Host } from "react-native-portalize";
import PermissionProvider from "./tmd/providers/PermissionProvider";
import LocaleProvider from "./src/providers/LocaleProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./src/providers/AuthProvider";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/stores/store";
import { PersistGate } from "redux-persist/integration/react";
import ModalProvider from "./tmd/providers/ModalProvider";
import SplashScreen from "./src/screens/SplashScreen";
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

// Create a client
const queryClient = new QueryClient();
const App = () => {
  const [gateLifted, setGateLifted] = useState(false)

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  // async function registerAppWithFCM() {
  //   await messaging().registerDeviceForRemoteMessages();
  //   const token = await messaging().getToken();
  //   console.log("ANJENG", token)
  // }

  const onBeforeLift = () => {
    setTimeout(() => {
      setGateLifted(true)
    }, 3000)
  }

  // useEffect(() => {
  //   requestUserPermission()

  //   useCallback(
  //     async () => {
  //       const token = await messaging().getToken();
  //       console.log("ANJENG", token)
  //     },
  //     [],
  //   )

    // registerAppWithFCM()
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    // });
    // messaging().onMessage(onMessageReceived);
    // messaging().setBackgroundMessageHandler(onMessageReceived);

    // return unsubscribe;
  // }, [])

  // const onMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  //   console.log("ANJENG", JSON.stringify(message, null, 2));
  // }

  const requestNotifPermission = async () => {
    try {
      await notifee.requestPermission()
      const status = await messaging().requestPermission();
      if (status === messaging.AuthorizationStatus.AUTHORIZED || status === messaging.AuthorizationStatus.PROVISIONAL) {
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log("MESSAGE - ON NOTIFICATION OPEN APP", remoteMessage);
        });
        messaging().getInitialNotification().then(remoteMessage => {
          console.log("MESSAGE - INITIAL FUNCTION");
          console.log(remoteMessage);
        });
        return
      } else {
        requestNotifPermission()
      }
    } catch (err) {
      console.log("request notif permission error", err);
    }
  }

  useEffect(() => {
    requestNotifPermission()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("remote messaging", remoteMessage);
      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      const data = remoteMessage.notification
      if (data) {
        await notifee.displayNotification({
          title: data.title,
          body: data.body,
          data: remoteMessage.data,
          android: {
            channelId
          }
        })
      }
    })
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
        console.log(token);
      // saveFirebaseToken(token);
    });
  }, []);

  useEffect(() => {
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log("initial noti");
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute('Home');
          // setpushNotifParam({ id: remoteMessage.data.news_id }); // e.g. "Settings"
        }
      });
  }, []);

  useEffect(() => {
    //handle foreground events
    notifee.onForegroundEvent(({ type, detail }) => {
    })
  }, [])
  useEffect(() => {
    // App launched, remove the badge count
    notifee.setBadgeCount(0).then(() => console.log('Badge count removed'));
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={onBeforeLift}>
        {!gateLifted ?
          <SplashScreen />
          :
          <GestureHandlerRootView style={{ flex: 1 }}>{/* content */}
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={DefaultTheme}>
                <LocaleProvider>
                  <Host>
                    <AuthProvider>
                      <BottomSheetProvider>
                        <ModalProvider>
                          <PermissionProvider>
                            <AppNavigation />
                          </PermissionProvider>
                        </ModalProvider>
                      </BottomSheetProvider>
                    </AuthProvider>
                  </Host>
                </LocaleProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </GestureHandlerRootView>
        }
      </PersistGate>
    </Provider>
  );
};

const ZustandPersistGate = ({ children }: any) => {

}

export default App;
function setInitialRoute(arg0: string) {
  throw new Error("Function not implemented.");
}

