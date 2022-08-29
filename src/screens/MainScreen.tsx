/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView } from "react-native";
import { Button, Stack } from "../../tmd";
import Typography from "../../tmd/components/Typography/Typography";
import { useAuth } from "../providers/AuthProvider";
import { useLocale } from "../providers/LocaleProvider";
import Page from "../../tmd/components/Page";
import { navigate } from "../navigations/RootNavigation";
import Toast from "../../tmd/components/Toast";
import Toolbar from "../../tmd/components/Toolbar/Toolbar";

const MainScreen = ({ navigation }: any) => {
  const { user, logout, isLoadingLogout } = useAuth();
  const { momentLocale } = useLocale();
  const showToast = () => {
    Toast.show("Damn! You are logged in!", {
      //add options here
      // variant: "success",
      // shape: "rounded",
    });
  };


  return (
    <Page>
      <Toolbar
        backable={false}
        center
        title={"MainScreen"}
      />
      <ScrollView style={{ flex: 1 }}>
        <Stack
          spacing={16}
          p={16}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Welcome, {user?.name}</Typography>
          <Typography type={"body3"}>{momentLocale().format("DD MMMM YYYY")}</Typography>


          <Button onPress={showToast}>
            Show Toast
          </Button>

          <Button onPress={() => {
            navigate("MapTrackingScreen");
          }}>
            Map Tracking
          </Button>

          <Button
            onPress={() => {
              navigate("ButtonScreen");
            }}
          >
            Button
          </Button>

          <Button
            onPress={() => {
              navigate("TypographyScreen");
            }}
          >
            Typography
          </Button>

          <Button
            onPress={() => {
              navigate("TextFieldScreen");
            }}
          >
            TextField
          </Button>

          <Button
            onPress={() => {
              navigate("PickerScreen");
            }}
          >
            Picker
          </Button>

          <Button
            onPress={() => {
              navigate("BottomSheetScreen");
            }}
          >
            Bottom Sheet
          </Button>

          <Button onPress={() => {
            navigate("ModalScreen");
          }}>
            Modal Screen
          </Button>

          <Button onPress={() => {
            navigate("TagScreen");
          }}>
            Tag
          </Button>

          <Button
            onPress={() => {
              navigate("AlertScreen");
            }}
          >
            Alert
          </Button>

          <Button
            onPress={() => {
              navigate("SelectorScreen");
            }}
          >
            Selector
          </Button>

          <Button
            onPress={() => {
              navigate("APIScreen");
            }}
          >
            API Screen
          </Button>

          <Button
            onPress={() => {
              navigate("SkeletonScreen");
            }}
          >
            Skeleton Screen
          </Button>

          <Button onPress={() => {
            navigate("DividerScreen");
          }}>
            Divider Screen
          </Button>

          <Button onPress={() => {
            navigate("ChipScreen");
          }}>
            Chip Screen
          </Button>

          <Button onPress={() => {
            navigate("OTPScreen");
          }}>
            OTP INPUT
          </Button>

          <Button onPress={() => {
            navigate("ImagePickerScreen");
          }}>
            Image Picker
          </Button>

          <Button onPress={() => {
            navigate("LayoutScreen");
          }}>
            Layout Screen
          </Button>

          <Button onPress={() => {
            navigate("TabScreen");
          }}>
            Tab Screen
          </Button>

          <Button onPress={() => {
            navigate("AvatarScreen");
          }}>
            Avatar Screen
          </Button>

          <Button onPress={() => {
            navigate("BadgeScreen");
          }}>
            Badge Screen
          </Button>

          <Button onPress={() => {
            navigate("TooltipScreen");
          }}>
            Tooltip Screen
          </Button>

          <Button onPress={() => {
            navigate("ProgressBarScreen");
          }}>
            ProgressBar Screen
          </Button>

          <Button onPress={() => {
            navigate("SignatureCanvasScreen");
          }}>
            Signature Canvas Screen
          </Button>

          <Button onPress={() => {
            navigate("ImageScreen");
          }}>
            Image Screen
          </Button>

          <Button onPress={() => {
            navigate("StepperScreen");
          }}>
            Stepper Screen
          </Button>

          <Button onPress={() => {
            navigate("FormScreen");
          }}>
            Form Input
          </Button>


          <Button
            onPress={() => {
              navigate("LanguageScreen");
            }}>
            Language Screen
          </Button>

          <Button
            color={"red"}
            loading={isLoadingLogout}
            // loading={true}
            onPress={logout}
          >
            Logout
          </Button>
        </Stack>

      </ScrollView>
    </Page>
  )
};

export default MainScreen;
