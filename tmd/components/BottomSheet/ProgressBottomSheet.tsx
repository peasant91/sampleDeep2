import React, { ComponentProps, useEffect, useRef } from "react";
import { LinearProgressBar, Stack } from "../../index";
import { Modalize } from "react-native-modalize";
import Typography from "../Typography/Typography";
import { SafeAreaView, View } from "react-native";

interface ProgressBSProps {
  open: boolean;
  onClose: () => void;
  dismissible?: boolean;
  description?: string;
  title?: string;
  linearProgressProps?: ComponentProps<typeof LinearProgressBar>;
}

export default function ProgressBottomSheet({
                                              open,
                                              onClose,
                                              title,
                                              description,
                                              dismissible = true,
                                              linearProgressProps,
                                            }: ProgressBSProps) {
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    if (open) {
      modalizeRef?.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [open]);

  return (
    <Modalize
      closeOnOverlayTap={dismissible}
      handlePosition={"inside"}
      withHandle={dismissible}
      modalStyle={{
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
      }}
      onClose={dismissible ? onClose : undefined}
      ref={modalizeRef}
      adjustToContentHeight={true}>
      <SafeAreaView>
        <Stack p={16} mt={8} spacing={20}
        >
          {/*<CircularProgressBar size={"md"} {...circularProgressProps} />*/}
          {
            (title || description) &&
            <Stack>
              {
                title &&
                <Typography type={"title1"}>{title}</Typography>
              }
              {
                description &&
                <View>
                  <Typography>{description}</Typography>
                </View>
              }
            </Stack>
          }
          <View>
            <LinearProgressBar
              indeterminate
              {...linearProgressProps}
            />
          </View>
        </Stack>
      </SafeAreaView>
    </Modalize>
  );
}
