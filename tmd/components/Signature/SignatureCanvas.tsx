import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { Button, HelperText, Stack, useTheme } from "../../index";
import LabelInput from "../TextInput/Label/LabelInput";
import { StyleProp, View, ViewStyle } from "react-native";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { useLocale } from "../../../src/providers/LocaleProvider";
import RFNS from "react-native-fs";
import uniqid from "../../utils/uniqid";

interface Props {
  onChangedBase64?: (signature: string) => void;
  onChangePath?: (path: string) => void;
  onReset?: () => void;
  label?: string;
  requiredLabel?: boolean;
  resetTitle?: string;
  error?: boolean;
  errorText?: string;
  helperText?: string;
  onProgress?: (isOnProgress: boolean) => void;
  canvasStyle?: StyleProp<ViewStyle>;
}

export default function SignatureCanvas({
                                          onChangedBase64, onChangePath,
                                          onReset,
                                          label,
                                          requiredLabel,
                                          resetTitle,
                                          error, errorText, helperText,
                                          onProgress, canvasStyle,
                                          ...rest
                                        }: Props & ComponentProps<typeof SignatureScreen>) {
  const ref = useRef<SignatureViewRef>(null);
  const [signature, setSignature] = useState("");
  const { colors } = useTheme();

  useEffect(() => {
    if (onChangedBase64) {
      onChangedBase64(signature);
    }

    if (onChangePath) {
      if (signature) {
        const path = RFNS.DocumentDirectoryPath + `/signature_${uniqid()}.png`;
        RFNS.writeFile(path, signature.replace("data:image/png;base64,", ""), "base64").then(() => {
          const finalPath = "file://" + path;
          onChangePath(finalPath);
        }).catch(err => {
          // console.log(err);
        });
      } else {
        onChangePath("");
      }
    }

  }, [signature]);


  const { t } = useLocale();
  return (
    <View style={[{ flex: 1 }, rest.style]}>
      <Stack direction={"row"} items={"center"} content={"space-between"}>
        <View>
          {
            label &&
            <LabelInput label={label} required={requiredLabel} />
          }
        </View>
        <Button size={"sm"} variant={"secondary"} onPress={() => {
          ref.current?.clearSignature();
          if (onReset) {
            onReset();
          }
          setSignature("");
        }}>{resetTitle ?? t("reset")}</Button>
      </Stack>
      <View style={{
        flex: 1,
        height: "100%",
        borderWidth: 1, borderRadius: 12, borderColor: colors.neutral.neutral_40,
        marginTop: 8, padding: 2.5,
      }}>
        <SignatureScreen
          onOK={(data) => {
            setSignature(data);
          }}
          onBegin={() => {
            if (onProgress) {
              onProgress(true);
            }
          }}
          onEnd={() => {
            ref?.current?.readSignature();
            if (onProgress) {
              onProgress(false);
            }
          }}
          onEmpty={() => {
            setSignature("");
          }}
          scrollable={false}
          {...rest}
          style={[{
            height: "100%",
          },
            canvasStyle]}
          webviewContainerStyle={{
            height: "100%",
          }}
          webStyle={`
                  .m-signature-pad {box-shadow: none; border: none; border-radius:12px} 
                  .m-signature-pad--body {border:none; border-radius: 8px; }
                  .m-signature-pad--body
                   canvas {
                    background-color: #fff;
                    height:100vh;
                    border-radius: 8px;
                   }
                  .m-signature-pad--footer{ 
                    display:none
                  }`
          }
          ref={ref}
        />
      </View>
      {
        (error || helperText) &&
        <Stack spacing={4} mt={4}>
          {
            (helperText) &&
            <HelperText type={"info"}>{helperText}</HelperText>
          }

          {
            (error && errorText) &&
            <HelperText type={"error"}>{errorText}</HelperText>
          }
        </Stack>
      }
    </View>
  );
}
