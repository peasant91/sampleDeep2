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

import React, { useEffect, useState } from "react";
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
import messaging from '@react-native-firebase/messaging';

// Create a client
const queryClient = new QueryClient();
const App = () => {
  const [gateLifted, setGateLifted] = useState(false)

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log("ANJENG TANAH", token)
  }

  const onBeforeLift = () => {
    setTimeout(() => {
      setGateLifted(true)
    }, 3000)
  }

  useEffect(() => {
    requestUserPermission()
    registerAppWithFCM()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
    });

    return unsubscribe;
  }, [])


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
