/**
 * Created by Widiana Putra on 07/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { forwardRef } from "react";
import { SafeAreaView } from "react-native";
import { Modalize } from "react-native-modalize";
import Portal from "../Portal/Portal";

interface Props {
  dismissible?: boolean;
  onClose: () => void;
  ref?: any;
  children: React.ReactNode;
}

const BottomSheetWrapper = forwardRef(({ ref, ...props }: Props) => {
  return <>
    <Portal>
      <Modalize
        closeOnOverlayTap={props.dismissible ? !props.dismissible : true}
        handlePosition={"inside"}
        withHandle={!!props?.dismissible}
        adjustToContentHeight
        modalStyle={{
          padding: 16,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}

        onClose={props.onClose}
        ref={ref}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {
            props.children
          }
        </SafeAreaView>
      </Modalize>
    </Portal>
  </>;
});

export default BottomSheetWrapper;
