/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Checkbox, RadioButton, Switch } from "../../../tmd";
import RadioButtonGroup from "../../../tmd/components/RadioButton/RadioButtonGroup";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

export default function SelectorScreen() {
  const [isChecked, setIsChecked] = useState(true);
  const [rbVal, setRbVal] = useState("1");
  return (
    <Page>
      <Toolbar title={"Selector Screen"} />

      <ScrollView style={{
        flex: 1,
      }}>
        <Stack p={16} style={{ flex: 1 }} spacing={16}>
          <Checkbox
            text={"Checkable"}
            checked={isChecked}
            onPress={() => {
              setIsChecked(!isChecked);
            }} />
          <Checkbox
            containerStyle={{
              marginTop: 8,
            }}
            text={"Unchecked"}
            checked={false} />
          <Checkbox
            containerStyle={{
              marginTop: 8,
            }}
            indeterminate={true} text={"Indeterminate CB"} />
          <RadioButtonGroup
            onValueChange={(value => setRbVal(value))}
            value={rbVal}>
            <RadioButton value={"1"} text={"1"} />
            <RadioButton value={"2"} text={"2"} />
          </RadioButtonGroup>

          <RadioButton value={"2"} text={"2"}  />


          <Switch
            onChange={() => {
              setIsChecked(!isChecked);
            }} value={isChecked} text={"Damn"} />
          <Switch value={true} disabled text={"Damn"} />
        </Stack>
      </ScrollView>
    </Page>
  );
}
