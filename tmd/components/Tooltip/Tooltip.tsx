import React, { useEffect, useRef, useState } from "react";
import { LayoutRectangle, Modal, Pressable, StyleProp, View, ViewStyle } from "react-native";
import Portal from "../Portal/Portal";
import Color from "color";
import { useTheme } from "../../core/theming";
import Typography from "../Typography/Typography";
import { IconButton, Stack } from "../../index";
import { useDeepEffect } from "../../../src/hooks/useDeepEffect";
import { isEqual } from "lodash";
import TextButton from "../Button/TextButton";
import { useLocale } from "../../../src/providers/LocaleProvider";
import useLayout from "../../utils/useLayout";

export interface TooltipOptionalProps {
  position?: "top" | "bottom";
  dismissible?: boolean; //disable back button and background tap
  closable?: boolean; // remove x button
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonAction?: () => void;
  stepper?: boolean;
  stepperId?: string;
  stepperTotal?: number;
  stepperCurrentPosition?: number;
  dark?: boolean;
}
interface RequiredProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

interface TriangleProps {
  style?: StyleProp<ViewStyle>;
}

export default function Tooltip({
                                  position = "bottom",
                                  children,
                                  open,
                                  onClose,
                                  dismissible = true,
                                  closable = true,
                                  title,
                                  description,
                                  stepper,
                                  primaryButtonAction,
                                  primaryButtonText,
                                  secondaryButtonAction,
                                  secondaryButtonText,
                                  stepperCurrentPosition, stepperTotal, dark = true,
                                }: TooltipOptionalProps & RequiredProps) {
  const ref = useRef<View>(null);
  const [layoutRect, setLayoutRect] = useState<LayoutRectangle | undefined>(undefined);
  const [popoverSize, setPopoverSize] = useLayout();
  const arrowSize = 12;
  const modalPadding = 16;
  const { colors } = useTheme();
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  let bgColor, txColor, descColor;
  if (dark) {
    bgColor = colors.neutral.neutral_100;
    txColor = colors.neutral.neutral_10;
    descColor = colors.neutral.neutral_10;
  } else {
    bgColor = colors.neutral.neutral_10;
    txColor = colors.neutral.neutral_100;
    descColor = colors.neutral.neutral_90;
  }

  useEffect(() => {
    if (!open) {
      setIsOpen(false);
    } else {
      setTimeout(() => {
        setIsOpen(true);
      }, 300);
    }
  }, [open]);

  useDeepEffect(() => {
    if (ref.current) {
      ref.current.measureInWindow((x, y, width, height) => {
        setLayoutRect({ x, y, width, height });
      });
    }
  }, [layoutRect]);

  const Triangle = (props: TriangleProps) => {
    return <View style={[
      {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: arrowSize,
        borderRightWidth: arrowSize,
        borderBottomWidth: arrowSize * 2,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: bgColor,
      },
      props.style,
    ]} />;
  };

  const renderArrow = () => {
    return (
      <>
        {
          (layoutRect && popoverSize.measured) &&
          <>
            {
              position == "bottom" &&
              <Triangle
                style={{
                  left: layoutRect?.width / 2 - arrowSize,
                }}
              />
            }

            {
              position == "top" &&
              <Triangle
                style={{
                  left: layoutRect?.width / 2 - arrowSize,
                  transform: [{ rotate: "180deg" }],
                }}
              />
            }


          </>
        }
      </>
    );
  };

  const getPosition = (isArrow?: boolean) => {
    // console.log(isArrow);
    if (layoutRect && popoverSize.measured) {
      if (position === "bottom") {
        return {
          top: layoutRect.y + layoutRect.height + (!isArrow ? arrowSize : 0),
          left: modalPadding,
          right: modalPadding,
        };
      } else {
        return {
          top: layoutRect.y - (!isArrow ? popoverSize.height + arrowSize : arrowSize * 2),
          left: modalPadding,
          right: modalPadding,
        };
      }
    }
    ;
  };

  return (
    <View style={{ position: "relative" }}>
      <View style={{
        flex: 1,
      }}>
        <View
          style={{
            alignSelf: "baseline",
          }}
          ref={ref}
          onLayout={(e) => {
            const { x, y, width, height } = e.nativeEvent.layout;

            if (!isEqual(layoutRect, { x, y, width, height })) {
              setLayoutRect({ x, y, width, height });
            }
          }}>
          {children}
        </View>
      </View>


      <Portal>
        <Modal
          visible={isOpen} animationType={"fade"} transparent={true}
          onRequestClose={dismissible ? onClose : undefined}>
          {/* <SafeAreaView style={{
            flex: 1,
          }}> */}
          <View style={{
            position: "relative",
            flex: 1,
            backgroundColor: Color(colors.neutral.neutral_100).alpha(0.25).rgb().toString(),
          }}>
              <Pressable
                onPress={dismissible ? onClose : undefined}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0, left: 0, right: 0,
                  backgroundColor: Color(colors.neutral.neutral_100).alpha(0.5).rgb().toString(),
                }}>

              </Pressable>
              {
                layoutRect?.x != undefined &&
                <View style={{
                  position: "absolute",
                  top: layoutRect?.y,
                  left: layoutRect?.x,
                  width: layoutRect?.width,
                  height: layoutRect?.height,
                }}>
                  <View
                    pointerEvents={"none"}
                    style={{}}>
                    {
                      children
                    }
                  </View>
                </View>
              }

              <View>
                {
                  (layoutRect?.x != undefined) &&
                  <>
                    <View
                      style={[{
                        position: "absolute",
                      },
                        getPosition(false),
                      ]}
                    >

                      <View
                        onLayout={setPopoverSize}
                        style={{
                          backgroundColor: bgColor,
                          padding: 16,
                          borderRadius: 10,
                          flex: 1,
                        }}>
                        {/*{popover}*/}
                        <Stack spacing={4}>
                          {
                            title &&
                            <Stack
                              direction={"row"}
                              spacing={4}
                              style={{
                                alignItems: "center",
                              }}>
                              <>
                                <Typography
                                  numberOfLines={1}
                                  ellipsizeMode={"tail"}
                                  type={"title2"}
                                  style={{
                                    flexGrow: 1,
                                    flex: 1,
                                    color: txColor,
                                  }}>{title}</Typography>
                                {
                                  closable &&
                                  <IconButton
                                    shape={"rounded"}
                                    icon={"close"}
                                    onPress={onClose}
                                    color={descColor}
                                    style={{
                                      backgroundColor: "transparent",

                                    }}
                                  />
                                }
                              </>
                            </Stack>
                          }
                          {
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "row",
                              }}
                            >
                              <Typography
                                numberOfLines={3}
                                style={{
                                  color: descColor,
                                  flexGrow: 1,
                                  flex: 1,
                                }}
                              >
                                {description}
                              </Typography>
                              {
                                (closable && !title) &&
                                <IconButton
                                  shape={"rounded"}
                                  icon={"close"}
                                  onPress={onClose}
                                  color={descColor}
                                  style={{
                                    backgroundColor: "transparent",
                                  }}
                                />
                              }
                              {
                              }
                            </View>
                          }

                          {
                            <Stack>
                              {(stepper || primaryButtonAction || secondaryButtonAction) &&
                                <View style={{ marginTop: 8 }} />
                              }
                              <Stack direction={"row"} items={"center"} content={"space-between"}>
                                <View>
                                  {
                                    stepper &&
                                    <Typography
                                      style={{ color: descColor }}
                                      type={"body3"}>
                                      {`${stepperCurrentPosition} from ${stepperTotal}`}
                                    </Typography>
                                  }
                                </View>
                                <Stack direction={"row"} spacing={16}>
                                  {
                                    secondaryButtonAction &&
                                    <TextButton
                                      size={"lg"}
                                      onPress={secondaryButtonAction ?? undefined}>{secondaryButtonText ?? t("previous")}</TextButton>
                                  }
                                  {
                                    primaryButtonAction &&
                                    <TextButton
                                      size={"lg"}
                                      onPress={primaryButtonAction ?? undefined}>{primaryButtonText ?? t("next")}</TextButton>
                                  }
                                </Stack>
                              </Stack>
                            </Stack>
                          }
                        </Stack>
                      </View>

                    </View>
                    <View
                      style={[{
                        position: "absolute",
                      }, getPosition(true)]}
                    >
                      {
                        renderArrow()
                      }
                    </View>
                  </>
                }
              </View>
            </View>
          {/* </SafeAreaView> */}
        </Modal>
      </Portal>
    </View>
  );
}
