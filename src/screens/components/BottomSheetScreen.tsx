/**
 * Created by Widiana Putra on 20/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { Button, Stack } from "../../../tmd";
import IllustNoConnection from "../../assets/illusts/no_internet_connection.svg";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import DateFilterBottomSheet, { DateFilterPayload } from "../../../tmd/components/BottomSheet/DateFilterBottomSheet";
import Typography from "../../../tmd/components/Typography/Typography";
import { usePermission } from "../../../tmd/providers/PermissionProvider";
import { CAMERA_PERMISSIONS, LOCATION_PERMISSIONS, STORAGE_PERMISSIONS } from "../../../tmd/data/_permissionTypes";
import useBankService from "../../services/bank/useBankService";
import Page from "../../../tmd/components/Page";
import DateRangePickerBottomSheet, { DateRange } from "../../../tmd/components/BottomSheet/DateRangePickerBottomSheet";
import MultiPickerBottomSheet from "../../../tmd/components/BottomSheet/MultiPickerBottomSheet";
import _countries from "../../../tmd/data/_countries";
import { PickerItem } from "../../../tmd/model/PickerItem";
import DatePickerBottomSheet from "../../../tmd/components/BottomSheet/DatePickerBottomSheet";
import MonthPickerBottomSheet from "../../../tmd/components/BottomSheet/MonthPickerBottomSheet";
import SearchToolbar from "../../../tmd/components/Toolbar/SearchToolbar";

export default function BottomSheetScreen() {
  const { getBank } = useBankService();
  const {
    showConfirmationBS,
    hideConfirmationBS,
    showAlertBS,
  } = useBottomSheet();
  const { requestPermissions } = usePermission();
  const handleShowConfirmation = () => {
    showConfirmationBS({
      title: "Takin ingin Tanda Tangan Kontrak?",
      imageNode: <IllustNoConnection />,
      description: "Selesaikan kontrak dengan melakukan tanda tangan digital pada aplikasi",
      buttonPrimaryAction: () => {
        hideConfirmationBS();
      },
    });
  };

  const handleShowAlert = () => {
    showAlertBS({
      title: "Hmm, Internet kamu putus",
      imageNode: <IllustNoConnection />,
      description: "Tenang, cek koneksi internet atau Wi-fi kamu dan coba lagi ya...",
      dismissable: false,
    });
  };


  const requestPermission = () => {
    requestPermissions([CAMERA_PERMISSIONS, STORAGE_PERMISSIONS, LOCATION_PERMISSIONS],
      () => {
        Alert.alert("GRANTED ");
      });
  };

  const [isShowDateFilter, setIsShowDateFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateFilterPayload | null>(null);

  const [isOpenRange, setIsOpenRange] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>({});

  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [isOpenMonthPicker, setIsOpenMonthPicker] = useState(false);

  const [isOpenMulti, setIsOpenMulti] = useState(false);
  return (
    <>
      <Page>
        <SearchToolbar
          searchPlaceholder={"Search BS"}
          onPressSearch={(val) => {
          }}
          onTextChange={(val) => {
          }} />
        <MonthPickerBottomSheet open={isOpenMonthPicker} onClose={() => {
          setIsOpenMonthPicker(false);
        }} value={new Date()} />
        <DatePickerBottomSheet open={isOpenDatePicker} onClose={() => {
          setIsOpenDatePicker(false);
        }} />
        <MultiPickerBottomSheet
          search
          open={isOpenMulti}
          onClose={() => setIsOpenMulti(false)}
          data={
            _countries.map((item) => {
              const i: PickerItem = {
                id: item.phone_code,
                name: `+${item.phone_code} (${item.name})`,
                image: item.flag,
              };
              return i;
            })
          }
          onSave={(data) => {
            console.log(JSON.stringify(data, null, 2));
          }}
        />
        <DateFilterBottomSheet
          open={isShowDateFilter}
          initial={selectedDate}
          onClose={() => setIsShowDateFilter(false)}
          onReset={() => {
            setSelectedDate(null);
            setIsShowDateFilter(false);
          }}

          onSave={(data) => {
            setSelectedDate(data);
            setIsShowDateFilter(false);
          }} />

        <DateRangePickerBottomSheet
          minDays={7} maxDays={30}
          maxDate={"2022-08-05"}
          minDate={"2022-06-01"}
          selected={selectedDateRange}
          onSave={(data) => {
            setSelectedDateRange(data);
          }}
          open={isOpenRange}
          onClose={() => {
            setIsOpenRange(false);
          }} />
        <ScrollView>
          <Stack spacing={16} style={{
            padding: 16,
          }}>

            <Button onPress={() => {
              handleShowAlert();
            }}>Alert / Error BottomSheet</Button>

            <Button onPress={() => {
              handleShowConfirmation();
            }}
            >Confirmation BottomSheet</Button>
            <Button
              onPress={() => {
                setIsShowDateFilter(true);
              }}
            >
              Date Filter BottomSheet</Button>
            {
              selectedDate &&
              <Typography>
                Date Start = {selectedDate?.date_range?.start_date}, Date End = {selectedDate?.date_range?.end_date}
              </Typography>
            }

            <Button
              onPress={() => {
                getBank()
              }}
            >
              GET DATA WITH ERROR
            </Button>

            <Button
              onPress={requestPermission}
            >
              PERMISSIONS (REJECT)
            </Button>

            <Button onPress={() => {
              setIsOpenRange(true);
            }}>
              Date Range
            </Button>
            {
              selectedDateRange?.startDate &&
              <Typography>{`Start date = ${selectedDateRange?.startDate}, End date = ${selectedDateRange?.endDate}`}</Typography>
            }

            <Button onPress={() => {
              setIsOpenMulti(true);
            }}>MultiPicker</Button>

            <Button onPress={() => {
              setIsOpenDatePicker(true);
            }}>DatePicker</Button>

            <Button onPress={() => {
              setIsOpenMonthPicker(true);
            }}>
              MonthPicker
            </Button>

          </Stack>
        </ScrollView>
      </Page>
    </>
  );
}
