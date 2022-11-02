/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import ButtonScreen from "../screens/components/ButtonScreen";
import TypographyScreen from "../screens/components/TypographyScreen";
import MainScreen from "../screens/MainScreen";
import TextFieldScreen from "../screens/components/TextFieldScreen";
import PickerScreen from "../screens/components/PickerScreen";
import BottomSheetScreen from "../screens/components/BottomSheetScreen";
import LanguageScreen from "../screens/components/LanguageScreen";
import TagScreen from "../screens/components/TagScreen";
import AlertScreen from "../screens/components/AlertScreen";
import SelectorScreen from "../screens/components/SelectorScreen";
import APIScreen from "../screens/components/API/APIScreen";
import FetchDataScreen from "../screens/components/API/FetchDataScreen";
import PaginationScreen from "../screens/components/API/PaginationScreen";
import ChipScreen from "../screens/components/ChipScreen";
import OTPScreen from "../screens/components/OTPScreen";
import FormScreen from "../screens/components/FormScreen";
import { navigationRef } from "./RootNavigation";
import LoginScreen from "../screens/components/LoginScreen";
import { useAuth } from "../providers/AuthProvider";
import ImagePickerScreen from "../screens/components/ImagePickerScreen";
import LayoutScreen from "../screens/components/LayoutScreen";
import ModalScreen from "../screens/components/ModalScreen";
import SkeletonScreen from "../screens/components/SkeletonScreen";
import DividerScreen from "../screens/components/DividerScreen";
import TabScreen from "../screens/components/TabScreen";
import AvatarScreen from "../screens/components/AvatarScreen";
import BadgeScreen from "../screens/components/BadgeScreen";
import TooltipScreen from "../screens/components/TooltipScreen";
import TooltipStepperScreen from "../screens/components/TooltipStepperScreen";
import MapPickerScreen from "../screens/utils/MapPickerScreen";
import AppNavigationType from "./AppNavigationType";
import MapTrackingScreen from "../screens/components/MapTrackingScreen";
import ProgressBarScreen from "../screens/components/ProgressBarScreen";
import SignatureCanvasScreen from "../screens/components/SignatureCanvasScreen";
import ImageScreen from "../screens/components/ImageScreen";
import GalleryListScreen from "../screens/utils/GalleryListScreen";
import StepperScreen from "../screens/components/StepperScreen";
import HomePM from "../screens/HomePM";
import ListSPB from "../screens/ListSPB";
import DetailSPB from "../screens/DetailSPB";
import ProjectDetail from "../screens/ProjectDetail";
import DetailPO from "../screens/DetailPO";
import FormSPB from "../screens/FormSPB";
import AddBahan from "../screens/AddBahan";
import SuccessPage from "../screens/SuccessPage";
import HomeAdmin from "../screens/admin/HomeAdmin";

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<AppNavigationType>();
  const { isAuthenticated, isPM, isHeadAdmin } = useAuth();
  const NavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={NavTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {
          !isAuthenticated &&
          <>
            {/* <Stack.Screen name={"TypographyScreen"} component={TypographyScreen} /> */}
            <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
          </>
        }
        {
          (isAuthenticated && isPM) && (
            <>
              {/* <Stack.Screen name={"MainScreen"} component={MainScreen} /> */}
              <Stack.Screen name={"HomePM"} component={HomePM} />
              <Stack.Screen name={"FormSPB"} component={FormSPB} />
              <Stack.Screen name={"AddBahan"} component={AddBahan} />
              <Stack.Screen name={"ListSPB"} component={ListSPB} />
              <Stack.Screen name={"ProjectDetail"} component={ProjectDetail} />
              <Stack.Screen name={"SuccessPage"} component={SuccessPage} />
            </>
          )
        }

        {
          (isAuthenticated && isHeadAdmin) && (
            <>
              {/* <Stack.Screen name={"MainScreen"} component={MainScreen} /> */}
              <Stack.Screen name={"HomeAdmin"} component={HomeAdmin} />
            </>
          )
        }

        {/* <Stack.Screen name={"MainScreen"} component={MainScreen} /> */}
        <Stack.Screen name={"DetailSPB"} component={DetailSPB} />
        <Stack.Screen name={"DetailPO"} component={DetailPO} />
        <Stack.Screen name={"ImagePickerScreen"} component={ImagePickerScreen} />
        <Stack.Screen name={"ButtonScreen"} component={ButtonScreen} />
        <Stack.Screen name={"TypographyScreen"} component={TypographyScreen} />
        <Stack.Screen name={"TextFieldScreen"} component={TextFieldScreen} />
        <Stack.Screen name={"PickerScreen"} component={PickerScreen} />
        <Stack.Screen name={"BottomSheetScreen"} component={BottomSheetScreen} />
        <Stack.Screen name={"ModalScreen"} component={ModalScreen} />
        <Stack.Screen name={"TagScreen"} component={TagScreen} />
        <Stack.Screen name={"AlertScreen"} component={AlertScreen} />
        <Stack.Screen name={"SelectorScreen"} component={SelectorScreen} />
        <Stack.Screen name={"LanguageScreen"} component={LanguageScreen} />
        <Stack.Screen name={"APIScreen"} component={APIScreen} />
        <Stack.Screen name={"FetchDataScreen"} component={FetchDataScreen} />
        <Stack.Screen name={"PaginationScreen"} component={PaginationScreen} />
        <Stack.Screen name={"ChipScreen"} component={ChipScreen} />
        <Stack.Screen name={"OTPScreen"} component={OTPScreen} />
        <Stack.Screen name={"FormScreen"} component={FormScreen} />
        <Stack.Screen name={"LayoutScreen"} component={LayoutScreen} />
        <Stack.Screen name={"TabScreen"} component={TabScreen} />
        <Stack.Screen name={"AvatarScreen"} component={AvatarScreen} />
        <Stack.Screen name={"BadgeScreen"} component={BadgeScreen} />
        <Stack.Screen name={"TooltipScreen"} component={TooltipScreen} />
        <Stack.Screen name={"TooltipStepperScreen"} component={TooltipStepperScreen} />
        <Stack.Screen name={"SkeletonScreen"} component={SkeletonScreen} />
        <Stack.Screen name={"DividerScreen"} component={DividerScreen} />
        <Stack.Screen name={"MapTrackingScreen"} component={MapTrackingScreen} />
        <Stack.Screen name={"ProgressBarScreen"} component={ProgressBarScreen} />
        <Stack.Screen name={"SignatureCanvasScreen"} component={SignatureCanvasScreen} />
        <Stack.Screen name={"ImageScreen"} component={ImageScreen} />
        <Stack.Screen name={"StepperScreen"} component={StepperScreen} />
        <Stack.Screen name={"MapPickerScreen"} component={MapPickerScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={"GalleryListScreen"} component={GalleryListScreen}
          options={{
            headerShown: false,
          }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
