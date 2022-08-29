/**
 * Created by Widiana Putra on 30/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Stack, useTheme } from "../../../tmd";
import PhoneField from "../../../tmd/components/picker/PhoneField";
import _countries from "../../../tmd/data/_countries";
import Select from "../../../tmd/components/Select/Select";
import { PickerItem } from "../../../tmd/model/PickerItem";
import DatePicker from "../../../tmd/components/picker/DatePicker";
import TimePicker from "../../../tmd/components/picker/TimePicker";
import MapPicker from "../../../tmd/components/picker/MapPicker";
import Page from "../../../tmd/components/Page";
import DateRangePicker from "../../../tmd/components/picker/DateRangePicker";
import MultiSelect from "../../../tmd/components/Select/MultiSelect";
import SelectModal from "../../../tmd/components/Select/SelectModal";
import BranchListItem from "../../../tmd/components/ListItem/BranchListItem";
import SearchToolbar from "../../../tmd/components/Toolbar/SearchToolbar";

export default function PickerScreen() {
  const theme = useTheme();
  const [selected, setSelected] = useState("62");
  const [date, setDate] = useState(new Date());
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [initialMap, setInitialMap] = useState({});
  return (
    <Page>
      <SearchToolbar
        title={"PickerScreen"}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{
          flex: 1,
        }}>
        <Stack
          spacing={16}
          style={{
            padding: 16,
          }}>

          <MapPicker
            onSelected={(data) => {
              setInitialMap(data);
            }}
            initial={initialMap}
            label={"Map Picker"}
            placeholder={"Map Picker"}
          />

          <DatePicker
            label={"Date Picker"}
            placeholder={"Pick date"}
          />

          <DateRangePicker
            minDate={"2022-06-01"}
            maxDate={"2022-08-05"}
            minDays={7}
            maxDays={30}
            label={"Date Range Picker"}
            placeholder={"Pick date range"}
          />

          <TimePicker
            label={"Time Picker"}
            placeholder={"Time Picker"}
          />

          <PhoneField
            search={true}
            initialPhoneCode={"62"}
            placeholder={"Phone"}
            label={"Phone"}
            onPhoneCodeChange={(value) => {
              //get value from this shit
            }}
            mode={"contained"} />


          {/*<PhoneField*/}
          {/*  search={true}*/}
          {/*  initialPhoneCode={"62"}*/}
          {/*  placeholder={"Phone"}*/}
          {/*  label={"Phone"}*/}
          {/*  mode={"filled"} />*/}

          {/*<PhoneField*/}
          {/*  error*/}
      {/*  errorText={"Must filled"}*/}
      {/*  search={true}*/}
      {/*  initialPhoneCode={"62"}*/}
      {/*  placeholder={"Phone"}*/}
      {/*  label={"Phone"}*/}
      {/*  mode={"flat"} />*/}

      <Select
        label={"Country"}
        // search={true}
        initial={"61"}
        fullHeight={false}
        options={
          _countries.slice(0, 6).map((item) => {
            const i: PickerItem = {
              id: item.phone_code,
              name: `+${item.phone_code} (${item.name})`,
            };
            return i;
          })
        }
        pickerMode={"auto"}
      />

          <SelectModal
            label={"Modal Select"}
            searchPlaceholder={"Search Modal Select"}
            search={true}
            initial={'62'}
            options={
              _countries.map((item) => {
                const i: PickerItem = {
                  id: item.phone_code,
                  name: `+${item.phone_code} (${item.name})`,
                  description: `${item.name} Description`,
                };
                return i;
              })
            }
            renderCustomItem={(item) => {
              return <BranchListItem {...item} key={item.item.id} />;
            }}
          />


          <MultiSelect
            label={"Multi Select"}
            search={true}
            options={
              _countries.map((item) => {
                const i: PickerItem = {
                  id: item.phone_code,
                  name: `+${item.phone_code} (${item.name})`,
                };
                return i;
              })
            }
          />

          <MultiSelect
            label={"Multi Select"}
            search={true}
            fullHeight={false}
            options={
              _countries.slice(0, 5).map((item) => {
                const i: PickerItem = {
                  id: item.phone_code,
                  name: `+${item.phone_code} (${item.name})`,
                };
                return i;
              })
            }
          />

        </Stack>

      </ScrollView>
    </Page>
  )
}
