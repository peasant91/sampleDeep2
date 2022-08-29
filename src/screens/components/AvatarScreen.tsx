import React from "react";
import { Page, Stack } from "../../../tmd";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import { ScrollView } from "react-native";
import Avatar from "../../../tmd/components/Avatar/Avatar";
import AvatarImagePicker from "../../../tmd/components/picker/AvatarImagePicker";
import { useLocale } from "../../providers/LocaleProvider";

export default function AvatarScreen() {
  const { t } = useLocale();
  return (
    <Page>
      <Toolbar title={"Avatar Screen"} />
      <ScrollView style={{ flex: 1 }}>
        <Stack p={16} spacing={16}>
          <AvatarImagePicker
            size={"3xl"}
            // onImageChange={(imageUrl) => {
            //   console.log(imageUrl);
            // }}
          />
          <Avatar
            variant={"text"}
            text={"Widiana Putra Winarta"} size={"lg"} showOnlineStatus isOnline={false} />
          <Avatar
            variant={"text"}
            text={"Widiana Putra Winarta"} size={"md"} />
          <Avatar
            variant={"text"}

            text={"Widiana Putra Winarta"} size={"2xl"} />
          {/*<Avatar text={"Widiana Putra Winarta"} size={"md"} />*/}
          {/*<Avatar text={"Widiana Putra"} size={"sm"} />*/}
          <Avatar
            onPress={() => {

            }}
            variant={"icon"}
            // imageUrl={"https://media.suara.com/pictures/653x366/2022/02/22/6-hal-yang-bisa-anda-tiru-dari-thomas-shelby-peaky-blinders.jpg"}
            size={"2xl"} />

          <Avatar
            onPress={() => {

            }}
            variant={"image"}
            imageUrl={"https://media.suara.com/pictures/653x366/2022/02/22/6-hal-yang-bisa-anda-tiru-dari-thomas-shelby-peaky-blinders.jpg"}
            size={"3xl"} />


          {/*<Avatar variant={"image"}*/}
          {/*        imageUrl={"https://media.suara.com/pictures/653x366/2022/02/22/6-hal-yang-bisa-anda-tiru-dari-thomas-shelby-peaky-blinders.jpg"}*/}
          {/*        size={"md"} />*/}
          {/*<Avatar*/}
          {/*  onPress={() => {*/}
          {/*    console.log("Open Me");*/}
          {/*  }}*/}
          {/*  variant={"image"}*/}
          {/*        imageUrl={"https://media.suara.com/pictures/653x366/2022/02/22/6-hal-yang-bisa-anda-tiru-dari-thomas-shelby-peaky-blinders.jpg"}*/}
          {/*        size={"lg"} />*/}
        </Stack>
      </ScrollView>
    </Page>
  );
}
