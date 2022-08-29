/**
 * Created by Widiana Putra on 14/06/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useState } from "react";
import TextField from "../TextInput/TextField";
import { usePermission } from "../../providers/PermissionProvider";
import { LOCATION_PERMISSIONS } from "../../data/_permissionTypes";
import { navigate } from "../../../src/navigations/RootNavigation";

export interface SelectedMap {
  fullAddress?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  nameAddress?: string;
}

interface Props {
  onSelected?: (selected: SelectedMap) => void;
  initial?: SelectedMap;
}

export default function MapPicker({ onSelected, initial, ...rest }: React.ComponentProps<typeof TextField> & Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedMap, setSavedMap] = useState<SelectedMap | null>(null);
  const { requestPermissions } = usePermission();
  const handleOpen = () => {
    requestPermissions(
      [LOCATION_PERMISSIONS], () => {
        navigate("MapPickerScreen", {
          onSelected: (selected: SelectedMap) => {
            setSavedMap(selected);
            onSelected && onSelected(selected);
          },
          initial: initial,
        });
      },
    );
  };

  useEffect(() => {
    if (initial) {
      setSavedMap(initial);
      if (onSelected) {
        onSelected(initial);
      }
    }
  }, []);


  return (
    <>
      <TextField
        selection={{ start: 0 }}
        pickerType={"map"}
        editable={false}
        onOpenPicker={handleOpen}
        value={savedMap?.fullAddress}
        suffixIcon={{
          icon: "map",
        }}
        {...rest}
      />
    </>
  );
}
