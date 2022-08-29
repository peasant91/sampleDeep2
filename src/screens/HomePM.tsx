import Color from "color";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, LayoutAnimation, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useDispatch } from "react-redux";
import { Divider, IconButton, Page, Stack, Tag } from "../../tmd";
import Button from "../../tmd/components/Button/Button";
import TextButton from "../../tmd/components/Button/TextButton";
import Title from "../../tmd/components/Typography/Title";
import Typography from "../../tmd/components/Typography/Typography";
import { black, colors, red100, transparent, white } from "../../tmd/styles/colors";
import { SpbListItem } from "../models/spb/spb";
import SpbList from "./components/item/SpbList";
import ICDocument from "../assets/icons/ic_document.svg"
import { _spbMock } from "../../tmd/data/_mock";
import { navigate } from "../navigations/RootNavigation";

export default function HomePM() {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [refresh, doRefresh] = useState();


  const useHandleScroll = () => {
    const [showButton, setShowButton] = useState(true);

    const scrollOffset = useRef(0);

    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const CustomLayoutLinear = {
          duration: 100,
          create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
          update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
          delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
        };
        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const currentOffset = event.nativeEvent.contentOffset.y;
        const direction = currentOffset > 0 && currentOffset > scrollOffset.current ? 'down' : 'up';
        // If the user is scrolling down (and the action-button is still visible) hide it
        const isActionButtonVisible = direction === 'up';
        if (isActionButtonVisible !== showButton) {
          LayoutAnimation.configureNext(CustomLayoutLinear);
          setShowButton(isActionButtonVisible);
        }
        // Update your scroll position
        scrollOffset.current = currentOffset;
      },
      [showButton]
    );

    return { handleScroll, showButton };
  };

  const header = () => {
    return (
      <>

        <View style={{
          // marginTop: -(StatusBar.currentHeight || 0),
          // zIndex: 1000,
          top: 0,
          left: 0,
          right: 0
        }}>
          <Image
            style={{ width: "100%" }}
            source={require("../assets/icons/ic_header/header.png")} />

          <Button
            style={{ position: "absolute", right: 16, top: getStatusBarHeight() + 16 }}
            buttonStyle={{ backgroundColor: white }}
            size={"sm"}
            shape={"rounded"}
            variant={"tertiary"}
            icon={{
              icon: "exit"
            }}
            onPress={() => {
              dispatch({
                type: "LOGOUT",
              })
            }}
          >Keluar</Button>
        </View>

        <View style={{ flex: 1, paddingTop: 16, paddingHorizontal: 16, paddingVertical: 16 }}>
          <Typography type={"title3"}>Proyek Aktif</Typography>
          <View style={{ marginTop: 12, borderWidth: 1, borderRadius: 16, borderColor: colors.neutral.neutral_40 }}>
            <Stack>

              <View style={{ paddingVertical: 16, paddingHorizontal: 12, flexDirection: "row", justifyContent: 'space-between' }}>
                <Stack spacing={8} style={{ justifyContent: 'flex-start', flexShrink: 1 }}>
                  <Typography type={"title3"} style={{ flexWrap: 'wrap' }}>Proyek Name</Typography>
                  <Typography type={"body4"}>Dibuat 4 jam yang lalu</Typography>
                </Stack>
                <Image style={{ aspectRatio: 1, width: '25%' }} borderRadius={4} source={require("../assets/icons/ic_header/header.png")} />
              </View>

              <View style={{ paddingVertical: 8, paddingHorizontal: 12, flexDirection: 'row' }}>
                <Stack spacing={4} style={{ flex: 2 }}>
                  <Typography type="label2">Konstruksi Bangunan</Typography>
                  <Typography type="body3">Tipe Konstruksi</Typography>
                </Stack>

                <Stack spacing={4} style={{ flex: 2 }}>
                  <Typography type="label2">1-3 Bulan</Typography>
                  <Typography type="body3">Durasi</Typography>
                </Stack>
              </View>

              <View style={{ paddingVertical: 10, paddingHorizontal: 12, flexDirection: 'row' }}>
                <Typography type="body3">DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION </Typography>
              </View>

              <Divider variant={"dotted"} />

              <View style={{ paddingVertical: 16, paddingHorizontal: 12, flexDirection: 'row', justifyContent: "space-between" }}>
                <Tag text="In Progress"
                  shape="rounded"
                  size="md"
                  variant="primary"
                  style={{ alignSelf: 'center' }}
                />

                <Button
                  shape="rounded"
                  size="sm"
                  variant="secondary"
                  onPress={() => {
                    navigate("ProjectDetail")
                  }}
                >{t("see_detail")}</Button>
              </View>

            </Stack>
          </View>

          <View style={{ paddingTop: 24, paddingHorizontal: 12, flexDirection: 'row', justifyContent: "space-between" }}>
            <Typography type={"title3"}>Proyek Aktif</Typography>
            <TextButton
              underline
              style={{ alignSelf: 'center' }}
              size="md"
              onPress={() => {
                navigate("ListSPB");
              }}
            >{t("see_all")}</TextButton>
          </View>
        </View>
      </>
    )
  }

  return (
    <Page>
      <Stack style={{ flex: 1 }}>
        <StatusBar
          translucent={true}
          backgroundColor={transparent}
          hidden={true}
        />

        <View style={{ flex: 1 }}>
          <FlatList
            ListHeaderComponent={header}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 16 }} />
            }}
            data={_spbMock}
            renderItem={(item) => {
              return (
                <View style={{ paddingHorizontal: 16 }}>
                  <SpbList
                    onPress={() => navigate("DetailSPB")}
                    item={item.item}
                    index={item.index} />
                </View>
              )
            }}
          />
        </View>

        <Button
          style={{ alignSelf: 'center', position: 'absolute', bottom: 32 }}
          variant="primary"
          shape="rounded"
          size="lg"
          icon={{ icon: "document-attach" }}
          onPress={() => {
            navigate("DetailSPB")
          }}
        >{t("ajukan_spb")}</Button>
      </Stack>
    </Page>

  )
}
