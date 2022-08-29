import React, { useEffect, useRef, useState } from "react";
import { FlatList, View, ViewToken } from "react-native";
import { useStepper } from "../../providers/StepperProvider";
import { Divider, Stack, useTheme } from "../../index";
import Typography from "../Typography/Typography";
import { StepperItem } from "../../model/StepperItem";
import Icon from "../Icon";

export type LabelStepperOrientationType = "horizontal" | "vertical";

interface Props {
  orientation?: LabelStepperOrientationType;
}

export default function LabelStepper({ orientation = "vertical" }: Props) {
  const { steppers, currentItem, currentPosition } = useStepper();
  const flatListRef = useRef<FlatList>(null);
  const { colors } = useTheme();
  const [viewToken, setViewToken] = useState<ViewToken[] | null>(null);
  const isVertical = orientation == "vertical";
  useEffect(() => {
    if (viewToken) {
      if (!viewToken?.map(it => it.index).includes(currentPosition)) {
        if (currentPosition < steppers.length) {
          setTimeout(() => {
            flatListRef?.current?.scrollToIndex({ index: currentPosition });
          }, 300);
        }
      }
    }
  }, [currentItem]);

  const onViewRef = React.useRef((info: { viewableItems: ViewToken[] }) => {
    // console.log(info.viewableItems);
    // viewTokens = info.viewableItems;
    setViewToken(info.viewableItems);
    // if (info.viewableItems.length) {
    //   setCurrIndex(info.viewableItems[0]?.index);
    // }
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 100 });


  const renderDot = ({ item, index }: { item: StepperItem, index: number }) => {
    const isFirst = index === 0;
    const isLast = index === steppers.length - 1;
    const isCurrent = item.id === currentItem?.id;
    const isPassed = steppers.indexOf(item) < currentPosition;
    const bgColor = isCurrent || isPassed ? colors.primary.main : colors.neutral.neutral_60;
    const txtColor = isCurrent || isPassed ? colors.neutral.neutral_90 : colors.neutral.neutral_60;
    return (
      <>
        <Stack direction={"row"} items={"center"} spacing={4}>
          {
            isFirst &&
            <View style={{ width: 16 }} />
          }
          <Stack direction={isVertical ? "column" : "row"} items={"center"} p={8} spacing={8}
                 style={{
                   maxWidth: isVertical ? 120 : 250,
                 }}>
            <View style={{
              width: 24, height: 24, backgroundColor: bgColor, borderRadius: 12,
              alignItems: "center", justifyContent: "center",
            }}>
              {
                isPassed
                  ? <Icon icon={"checkmark"} color={colors.neutral.neutral_10} size={16} />
                  : <Typography type={"body3"} style={{ color: colors.neutral.neutral_10 }}>{item.title}</Typography>
              }
            </View>
            <Typography
              type={"label2"}
              style={{
                textAlign: isVertical ? "center" : "left",
                color: txtColor,
              }}>{item.description}</Typography>
          </Stack>
          {
            !isLast &&
            <Divider
              style={{
                width: 40,
              }}
              size={"xs"}
            />
          }
          {
            isLast &&
            <View style={{ width: 16 }} />
          }
        </Stack>
      </>
    );
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        initialNumToRender={0}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        style={{
          backgroundColor: "white",
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={steppers}
        renderItem={renderDot}
      />
    </View>
  );
}
