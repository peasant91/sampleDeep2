import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList,  ImageBackground, Pressable, View, ViewToken } from "react-native";
import { GalleryItem, ImageRatioType } from "../../types";
import { useTheme } from "../../core/theming";
import { IconButton, Stack } from "../../index";
import ImageViewerModal from "../Modal/ImageViewerModal";
import Color from "color";
import Typography from "../Typography/Typography";
import { useLocale } from "../../../src/providers/LocaleProvider";
import { goBack, navigate } from "../../../src/navigations/RootNavigation";
import elevation from "../../styles/elevation";
import { Image } from "../../index";

interface Props {
  images: GalleryItem[];
  ratio?: ImageRatioType;
  backAble?: boolean
}

export default function Gallery({ images, ratio = "16:9", backAble }: Props) {
  const ref = useRef<FlatList>(null);
  const { t } = useLocale();
  const width = Dimensions.get("screen").width;

  const usedRatio = ratio.split(":");

  const height = ((width / parseInt(usedRatio[0])) * parseInt(usedRatio[1]));
  const [currIndex, setCurrIndex] = useState(0);

  const childWidth = width / 2.5;
  const childHeight = ((childWidth / parseInt(usedRatio[0])) * parseInt(usedRatio[1]));

  const indicatorSize = 8;
  const IMAGE_MAX_LENGTH = 4;

  const { colors } = useTheme();
  const renderIndicator = ({ item, index }) => {
    const isCurr = currIndex === index;
    return <Pressable
      onPress={() => {
        handleChangePosition(index);
      }}
      style={{
        height: indicatorSize,
        width: indicatorSize,
        borderRadius: indicatorSize / 2,
        marginHorizontal: 2,
        backgroundColor: isCurr ? colors.neutral.neutral_10 : colors.neutral.neutral_60,
      }}>
    </Pressable>;
  };

  const handleIntentGallery = () => {
    navigate("GalleryListScreen", {
      images: images,
      title: "Gallery",
    });
  };

  const handleChangePosition = (index: number) => {
    setCurrIndex(index);
    ref?.current?.scrollToIndex({
      index: index,
      animated: true,
    });

  };

  const onViewRef = React.useRef((info: { viewableItems: ViewToken[] }) => {
    if (info.viewableItems.length) {
      setCurrIndex(info.viewableItems[0]?.index);
    }
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 100 });


  const indRef = useRef<FlatList>(null);
  useEffect(() => {
    if (currIndex != null) {
      indRef?.current?.scrollToIndex({
        index: currIndex,
        animated: true,
      });
    }
  }, [currIndex]);

  const [isOpenViewer, setIsOpenViewer] = useState(false);

  return (
    <>
      <ImageViewerModal
        index={currIndex}
        onClose={() => {
          setIsOpenViewer(false);
        }} open={isOpenViewer} images={images} />
      <Stack
        style={{
          position: "relative",
        }}>
        {/*<FlatList*/}
        {/*  ref={ref}*/}
        {/*  showsHorizontalScrollIndicator={false}*/}
        {/*  pagingEnabled={true}*/}
        {/*  horizontal={true}*/}
        {/*  data={images}*/}
        {/*  viewabilityConfig={viewConfigRef.current}*/}
        {/*  onViewableItemsChanged={onViewRef.current}*/}
        {/*  style={{*/}
        {/*    width: Dimensions.get("screen").width,*/}
        {/*    height: height,*/}
        {/*  }}*/}
        {/*  renderItem={({ item }) => {*/}

        <Pressable
          onPress={handleIntentGallery}
          style={{ flex: 1 }}>
          <Image source={{ uri: images[0]?.image }} style={{
            height: height,
            width: Dimensions.get("screen").width,
          }} />
        </Pressable>
        {/*}} />*/}
        <FlatList
          style={{
            marginTop: 2,
          }}
          horizontal={true}
          data={images.slice(1, images.length > IMAGE_MAX_LENGTH ? IMAGE_MAX_LENGTH : images.length)}
          ListFooterComponent={
            <>
              {
                images.length > IMAGE_MAX_LENGTH &&
                <Pressable onPress={handleIntentGallery}>
                  <ImageBackground
                    source={{ uri: images[IMAGE_MAX_LENGTH]?.image }}
                    style={{
                      width: childWidth, height: childHeight, marginRight: 2,
                    }}
                  >
                    <View style={{
                      width: "100%", height: "100%", flex: 1,
                      alignItems: "center", justifyContent: "center",
                      backgroundColor: Color(colors.neutral.neutral_100).alpha(0.4).rgb().toString(),
                    }}>
                      <Typography style={{ color: colors.neutral.neutral_10 }} type={"label2"}>
                        {t("see_more") + ` (${images.length - IMAGE_MAX_LENGTH})`}
                      </Typography>

                    </View>

                  </ImageBackground>
                </Pressable>
              }
            </>
          }
          renderItem={({ item }) => {
            return <Pressable onPress={handleIntentGallery}>
              <Image source={{ uri: item?.image }} style={{
                width: childWidth, height: childHeight, marginRight: 2,
              }} />
            </Pressable>;
          }} />
        {
          backAble &&
          <View style={{
            position: "absolute",
            top:0, left:0,
            margin: 16,
          }}>
            <IconButton
              onPress={() => {
                goBack()
              }}
              themeSize={"md"}
              color={colors.neutral.neutral_90}
              style={[{
                backgroundColor: colors.neutral.neutral_10,
              },
                elevation({
                  elevation: 4,
                }),
              ]}
              icon={"arrow-back"} />
          </View>
        }

      </Stack>
    </>
  );
}
