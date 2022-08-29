/**
 * Created by Widiana Putra on 06/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList,  Modal, Pressable, SafeAreaView, View, ViewToken } from "react-native";
import { useTheme } from "../../core/theming";
import { IconButton, Stack } from "../../index";
import Portal from "../Portal/Portal";
import { GalleryItem, ImageRatioType } from "../../types";
import Typography from "../Typography/Typography";
import { gestureHandlerRootHOC, PinchGestureHandler } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import ImageZoom from "../Image/ImageZoom";
import { Image } from "../../index";

interface Props {
  images?: GalleryItem[];
  index?: number;
  onClose: () => void;
  open: boolean;
  ratio?: ImageRatioType;
}

export default function ImageViewerModal({ images, index = 0, onClose, open, ratio = "16:9" }: Props) {
  const { colors } = useTheme();
  const imageWidth = Dimensions.get("screen").width;
  const previewWidth = imageWidth / 3.5;

  const usedRatio = ratio.split(":");

  const previewHeight = ((previewWidth / parseInt(usedRatio[0])) * parseInt(usedRatio[1]));

  const [scroll, setScroll] = useState(true);
  const getRenderIndicator = () => {
    if (images && images.length > 1) {
      return {};
    } else {
      return "";

    }
  };

  const ref = useRef<FlatList>(null);
  const [currIndex, setCurrIndex] = useState(index);


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

  const handleChangePosition = (index: number) => {
    setCurrIndex(index);
    ref?.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  const renderPreview = ({ item, index }) => {
    const isCurr = currIndex === index;
    return (
      <Pressable
        onPress={() => {
          handleChangePosition(index);
        }}
        style={{
          position: "relative",
        }}
      >
        <Image source={{ uri: item?.image }} style={{
          width: previewWidth,
          height: previewHeight,
        }} />
        <View style={{
          position: "absolute",
          backgroundColor: "transparent",
          top: 0, left: 0, right: 0, bottom: 0,
          borderWidth: isCurr ? 2 : 0,
          borderColor: colors.primary.main,
        }} />
      </Pressable>
    );
  };


  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const scale = new Animated.Value(1);
  const onPinchEvent = Animated.event([{ nativeEvent: { scale: scale } }], {
    useNativeDriver: true,
  });

  const onPinchStateChange = (event) => {
    // if (event.nativeEvent.oldState === PinchGestureHandler.State.ACTIVE) {
    console.log(JSON.stringify(event.nativeEvent, null, 2));
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 1,
    }).start();
  };

  const ZoomAbleImage = gestureHandlerRootHOC((props: any) => {
    return <PinchGestureHandler
      onGestureEvent={isScrollable ? undefined : onPinchEvent}
      onHandlerStateChange={onPinchStateChange}
    >
      <Animated.Image
        source={{
          uri: props.image,
        }}
        style={[
          {
            width: imageWidth,
            height: "100%",
            alignSelf: "center",
          },
          {
            transform: [{ scale: scale }],
          },
        ]}
        resizeMode="contain"
      />
    </PinchGestureHandler>;
  });

  const renderImageZoom = ({ item, index }) => {
    return (
      <>
        {
          !isScrollable
            ? <ImageZoom
              isPinchEnabled={!isScrollable}
              isPanEnabled={!isScrollable}
              renderLoader={() => {
                return <View style={{
                  backgroundColor: "transparent",
                }}>
                </View>;
              }}
              style={{
                width: imageWidth,
                height: "100%",
                alignSelf: "center",
              }}
              uri={item?.image} />
            : <Image
              resizeMode={"contain"}
              source={{ uri: item?.image }}
              style={{
                width: imageWidth,
                height: "100%",
                alignSelf: "center",
              }}
            />
        }
      </>
    );
  };

  const isScrollable = ((images?.length) && (images.length > 1));
  return (
    <Portal>
      <Modal
        onRequestClose={onClose}
        visible={open} animationType={"fade"}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{
            backgroundColor: colors.neutral.neutral_80,
            flex: 1,
          }}>

            {/*  Header*/}
            <View
              style={{
                marginHorizontal: 16,
                marginTop: 16,
              }}>
              <IconButton
                onPress={onClose}
                shape={"rounded"}
                icon={"arrow-back"} color={colors.neutral.neutral_100} style={{
                backgroundColor: colors.neutral.neutral_10,
              }} />
            </View>
            <View style={{
              flex: 1,
              flexGrow: 1,
              marginVertical: 16,
            }}>

              {/*<ImageZoomable />*/}
              {/*<ZoomAbleImage image={images[currIndex]} />*/}

              <FlatList
                legacyImplementation={false}
                scrollEnabled={scroll ?? isScrollable ?? true}
                // scrollEnabled={isScrollable}
                initialScrollIndex={index}
                ref={ref}
                viewabilityConfig={viewConfigRef.current}
                onViewableItemsChanged={onViewRef.current}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                horizontal={true}
                data={images}
                renderItem={renderImageZoom}
              />
            </View>

            {
              (images?.length && images.length > 1) &&
              <>
                <Stack>

                  <FlatList
                    initialScrollIndex={index}
                    showsHorizontalScrollIndicator={false}
                    ref={indRef}
                    horizontal={true}
                    data={images}
                    renderItem={renderPreview}
                  />

                  <Stack direction={"row"} pl={16} pr={16} items={"center"}>
                    <View style={{
                      flex: 1, flexGrow: 1,
                    }}>
                      <Typography style={{
                        color: colors.neutral.neutral_10,
                        paddingVertical: 8,
                      }}>{images[currIndex]?.title}</Typography>
                    </View>
                    <Typography
                      style={{ color: colors.neutral.neutral_10, marginVertical: 16, alignSelf: "center" }}
                      type={"label1"}>{`${currIndex + 1}/${images?.length}`}</Typography>
                  </Stack>

                </Stack>
              </>
            }


          </View>
        </SafeAreaView>
      </Modal>
    </Portal>
  );
}
