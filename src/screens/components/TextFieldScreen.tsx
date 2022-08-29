/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView } from "react-native";
import { IconButton, useTheme } from "../../../tmd";
import TextField from "../../../tmd/components/TextInput/TextField";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import PriceField from "../../../tmd/components/TextInput/PriceField";

const TextFieldScreen = () => {
  const { colors } = useTheme();
  return (
    <Page>
      <Toolbar
        backgroundColor={colors.primary.main}
        title="TextFieldScreen"
        description={"TextField Description"}
        size={"lg"}
        actionButton={
          <Stack spacing={8} direction={"row"} items={"center"}>
            <IconButton
              icon={"close"}
              onPress={() => {
                console.log("Button Pressed");
              }}
              variant={"secondary"} />
            <IconButton
              icon={"close"}
              onPress={() => {
                console.log("Button Pressed");
              }}
              variant={"secondary"} />
            <IconButton
              icon={"close"}
              onPress={() => {
                console.log("Button Pressed");
              }}
              variant={"secondary"} />
          </Stack>
        }

      />
      <ScrollView>
        <Stack
          spacing={16}
          style={{
            padding: 16,
            flexDirection: "column",
          }}>


          <TextField
            helperText={"Helper Text"}
            requiredLabel
            mode={"flat"}
            label="Search"
            placeholder={"Search"}
            search
          />

          <TextField
            requiredLabel
            mode={"flat"}
            password
            label="Password"
            placeholder={"password"}
          />

          <TextField
            mode={"flat"}
            label="Counter"
            counter
            multiline
            numberOfLines={3}
            maxLength={300}
            placeholder={"Counter"}
          />


          <TextField
            maxLength={8}
            counter
            label="Counter"
            keyboardType={"numeric"}
            placeholder={"counter"}
          />

          <TextField
            requiredLabel
            helperText={"Helper Text"}
            mode={"contained"}
            label="Email"
            // error
            // errorText={"Email is required"}
            placeholder={"Email"}
          />

          <TextField
            style={{
              marginTop: 4,
            }}
            password
            mode={"contained"}
            label="Password"
            placeholder={"Password"}
          />

          <TextField
            mode={"contained"}
            label="Search"
            shape={"rect"}
            placeholder={"Search"}
            search
          />

          <TextField
            search
            mode={"filled"}
            shape={"rounded"}
            placeholder={"Filled"}
          />

          <TextField
            mode={"filled"}
            label="Filled"
            shape={"rect"}
            placeholder={"Filled"}
          />

          <PriceField prefixText={"Rp"} label={"Currency"} placeholder={"Currency"} />
        </Stack>
      </ScrollView>
    </Page >
  )
};

export default TextFieldScreen;
