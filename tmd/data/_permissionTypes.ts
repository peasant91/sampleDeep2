/**
 * Created by Widiana Putra on 22/06/2022
 * Copyright (c) 2022 - Made with love
 */
import { Permission, PERMISSIONS } from "react-native-permissions";
import { PermissionType } from "../providers/BottomSheetProvider";

export const BLUETOOTH_PERMISSIONS = {
  android: [
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
  ],
  ios: [
    PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
  ],
};

export const LOCATION_PERMISSIONS =
  {
    android: [
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ],
    ios: [
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ],
  };

export const STORAGE_PERMISSIONS =
  {
    android: [
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ],
    ios: [
      PERMISSIONS.IOS.PHOTO_LIBRARY,
    ],
  };

export const CAMERA_PERMISSIONS = {
  android: [
    PERMISSIONS.ANDROID.CAMERA,
  ],
  ios: [
    PERMISSIONS.IOS.CAMERA,
  ],
};

export interface PermissionOS {
  android: Permission[],
  ios: Permission[]
}

interface PermissionPackage {
  type: PermissionType,
  permissions: PermissionOS
}

const _permissionTypes: PermissionPackage[] = [
  {
    type: "camera",
    permissions: CAMERA_PERMISSIONS,
  },
  {
    type: "storage",
    permissions: STORAGE_PERMISSIONS,
  },
  {
    type: "location",
    permissions: LOCATION_PERMISSIONS,
  },
  {
    type: "bluetooth",
    permissions: BLUETOOTH_PERMISSIONS,
  },
];

export default _permissionTypes;
