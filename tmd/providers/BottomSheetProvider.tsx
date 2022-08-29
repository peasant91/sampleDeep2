/**
 * Created by Widiana Putra on 03/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, createContext, useContext, useState } from "react";
import ConfirmationBottomSheet from "../components/BottomSheet/ConfirmationBottomSheet";
import AlertBottomSheet from "../components/BottomSheet/AlertBottomSheet";
import IllustNoConnection from "../../src/assets/illusts/no_internet_connection.svg";
import IllustServerError from "../../src/assets/illusts/server_error.svg";
import IllustLocationPermission from "../../src/assets/illusts/permission_location.svg";
import IllustCameraPermission from "../../src/assets/illusts/permission_camera.svg";
import { Linking } from "react-native";
import { useLocale } from "../../src/providers/LocaleProvider";
import { LinearProgressBar } from "../index";
import ProgressBottomSheet from "../components/BottomSheet/ProgressBottomSheet";

export type PermissionType =
  "camera" | "storage" | "location" | "bluetooth" | "another";

type ConfirmationBSContext = {
  imageNode?: React.ReactNode;
  title?: string;
  description?: string;
  buttonPrimaryTitle?: string;
  buttonSecondaryTitle?: string;
  buttonPrimaryAction?: () => void;
  buttonSecondaryAction?: () => void;
  buttonSecondary?: boolean;
  dismissible?: boolean;
}
type BSContextType = {
  showConfirmationBS: (props: ConfirmationBSContext) => void;
  hideConfirmationBS: () => void;
  showAlertBS: (props: ConfirmationBSContext) => void;
  hideAlertBS: () => void;
  showErrorBS: (error: any, props?: ConfirmationBSContext) => void;
  hideErrorBS: () => void;
  showPermissionBS: (type: PermissionType, props?: ConfirmationBSContext) => void;
  hidePermissionBS: () => void;
  showLoadingBS: (props?: ProgressBSProps) => void;
  hideLoadingBS: () => void;
}
type ProgressBSProps = {
  title?: string;
  description?: string;
  dismissible?: boolean;
  linearProgressProps?: ComponentProps<typeof LinearProgressBar>;
}


const initialState: BSContextType = {
  showConfirmationBS: () => {
  },
  hideConfirmationBS: () => {
  },
  showAlertBS: () => {
  },
  hideAlertBS: () => {
  },
  showErrorBS: () => {
  },
  hideErrorBS: () => {
  },
  showPermissionBS: () => {
  },
  hidePermissionBS: () => {
  },
  showLoadingBS: () => {

  },
  hideLoadingBS: () => {

  },
};

export const BSContext = createContext(initialState);
export const useBottomSheet = () => useContext(BSContext);
const BottomSheetProvider = ({ children }: any) => {
  const { t } = useLocale();
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [confirmationProps, setConfirmationProps] = useState<ConfirmationBSContext>({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<ConfirmationBSContext>({});

  const [isOpenError, setIsOpenError] = useState(false);
  const [errorProps, setErrorProps] = useState<ConfirmationBSContext>({});

  const [isOpenPermission, setIsOpenPermission] = useState(false);
  const [permissionProps, setPermissionProps] = useState<ConfirmationBSContext>({});

  const [isOpenLoading, setIsOpenLoading] = useState(false);
  const [loadingProps, setLoadingProps] = useState<ProgressBSProps>({});


  const showErrorBS = (error: any, props?: ConfirmationBSContext) => {
    let data: ConfirmationBSContext;
    if (error?.error?.errors) {
      data = {
        title: props?.title ?? error?.error?.errors[0]?.title,
        description: props?.description ?? error?.error?.errors[0]?.message,
        ...props,
      };
    } else if (error?.message == "Network Error") {
      data = {
        imageNode: <IllustNoConnection />,
        title: t("errors.no_connection_title"),
        description: t("errors.no_connection_description"),
        ...props,
      };
    } else {
      data = {
        imageNode: <IllustServerError />,
        title: t("errors.server_error_title"),
        description: t("errors.server_error_description"),
        ...props,
      };
    }
    setErrorProps(data);
    setIsOpenError(true);
  };

  const hideErrorBS = () => {
    setIsOpenError(false);
  };

  const openSetting = () => {
    Linking.openSettings()
  }

  const showPermissionBS = (type: PermissionType, props?: ConfirmationBSContext) => {
    if (type != "another") {
      let data: ConfirmationBSContext;
      switch (type) {
        case "camera": {
          data = {
            imageNode: <IllustCameraPermission />,
            title: t("permissions.camera_title"),
            description: t("permissions.camera_description"),
            buttonPrimaryAction: openSetting,
            buttonPrimaryTitle: t("allow"),
            buttonSecondary: true,
            buttonSecondaryTitle: t("back"),
            ...props,
          };
          break;
        }
        case "bluetooth": {
          data = {
            title: t("permissions.bluetooth_title"),
            description: t("permissions.bluetooth_description"),
            buttonPrimaryAction: openSetting,
            buttonPrimaryTitle: t("allow"),
            buttonSecondary: true,
            buttonSecondaryTitle: t("back"),
            ...props,
          };
          break;
        }
        case "location": {
          data = {
            imageNode: <IllustLocationPermission />,
            title: t("permissions.location_title"),
            description: t("permissions.location_description"),
            buttonPrimaryAction: openSetting,
            buttonPrimaryTitle: t("allow"),
            buttonSecondary: true,
            buttonSecondaryTitle: t("back"),
            ...props,
          };
          break;
        }
        case "storage": {
          data = {
            imageNode: <IllustLocationPermission />,
            title: t("permissions.storage_title"),
            description: t("permissions.storage_description"),
            buttonPrimaryAction: openSetting,
            buttonPrimaryTitle: t("allow"),
            buttonSecondary: true,
            buttonSecondaryTitle: t("back"),
            ...props,
          };
          break;
        }
      }
      setPermissionProps(data);
      setIsOpenPermission(true);
    }
  };

  const hidePermissionBS = () => {
    setIsOpenPermission(false);
  };

  const showConfirmationBS = (props: ConfirmationBSContext) => {
    setConfirmationProps(props);
    setIsOpenConfirmation(true);
  };

  const showAlertBS = (props: ConfirmationBSContext) => {
    setAlertProps(props);
    setIsOpenAlert(true);
  };

  const hideConfirmationBS = () => {
    setIsOpenConfirmation(false);
  };

  const hideAlertBS = () => {
    setIsOpenAlert(false);
  };

  const showLoadingBS = (props?: ProgressBSProps) => {
    if (props) {
      setLoadingProps(props);
    }
    setIsOpenLoading(true);
  };

  const hideLoadingBS = () => {
    setIsOpenLoading(false);
  };

  const renderComponent = () => {
    return <>
      <ConfirmationBottomSheet
        {...confirmationProps}
        open={isOpenConfirmation}
        onClose={() => {
          hideConfirmationBS();
        }} />

      <AlertBottomSheet
        open={isOpenAlert}
        onClose={hideAlertBS}
        {...alertProps} />

      <AlertBottomSheet
        open={isOpenError}
        onClose={hideErrorBS}
        {...errorProps} />

      <AlertBottomSheet
        open={isOpenPermission}
        onClose={hidePermissionBS}
        {...permissionProps} />

      <ProgressBottomSheet open={isOpenLoading} onClose={hideLoadingBS} {...loadingProps} />
    </>;
  };
  return (
    <BSContext.Provider value={{
      showConfirmationBS,
      hideConfirmationBS,
      showAlertBS,
      hideAlertBS,
      showErrorBS,
      hideErrorBS,
      showPermissionBS,
      hidePermissionBS,
      showLoadingBS,
      hideLoadingBS,
    }}>
      {renderComponent()}
      {children}
    </BSContext.Provider>
  );
};

export default BottomSheetProvider;
