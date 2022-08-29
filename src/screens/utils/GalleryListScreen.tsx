import React, { useState } from "react";
import { GridList, Page } from "../../../tmd";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppNavigationType from "../../navigations/AppNavigationType";
import {  Pressable, View } from "react-native";
import { Image } from "../../../tmd";
import useLayout from "../../../tmd/utils/useLayout";
import ImageViewerModal from "../../../tmd/components/Modal/ImageViewerModal";

export default function GalleryListScreen({ route }: NativeStackScreenProps<AppNavigationType, "GalleryListScreen">) {
  const { images, title } = route.params;
  const [imageSize, setImageSize] = useLayout();
  const [isOpenViewer, setIsOpenViewer] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  return (
    <Page>
      <Toolbar title={title} />
      <GridList
        spacing={8}
        cols={3}
        data={images}
        style={{
          marginHorizontal: 16,
          marginVertical: 16,
        }}
        renderItem={({ item, index }) => {
          return <Pressable onLayout={setImageSize} onPress={() => {
            setCurrIndex(index);
            setIsOpenViewer(true);
          }}>
            <View>
              <Image source={{ uri: item?.image ?? "" }} style={{ height: imageSize.width, borderRadius: 8 }} />
            </View>
          </Pressable>;
        }} />
      <ImageViewerModal
        images={images}
        index={currIndex}
        onClose={() => {
          setIsOpenViewer(false);
        }} open={isOpenViewer} />
    </Page>
  );
}
