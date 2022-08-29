/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView, View } from "react-native";
import { Button, IconButton, Toast } from "../../../tmd";
import TextButton from "../../../tmd/components/Button/TextButton";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import SocialButton from "../../../tmd/components/Button/SocialButton";

export default function ButtonScreen() {
  return (
    <Page>
      <Toolbar
        title={"ButtonScreen"}
        description={"Deskripsikan "}
        actionButton={
          <IconButton
            onPress={() => {
              console.log("IconButton Pressed");
            }}
            variant={"tertiary"}
            color={"black"}
            icon={"search"}
          />
        }
      />

      <ScrollView>
        <View style={{ padding: 16, flexDirection: "column" }}>
          <Stack spacing={8}>
            <IconButton
              shape={"rounded"}
              icon={"camera"}
              onPress={() => {
              }}
            />
            <IconButton
              variant={"secondary"}
              icon={"camera"} onPress={() => {
            }}
            />
            <IconButton
              variant={"tertiary"}
              icon={"camera"} onPress={() => {
            }}
            />
            <IconButton
              icon={"arrow-back"}
          themeSize={"lg"}
          onPress={() => {
          }}
        />
        <IconButton

          themeSize={"md"}
          icon={"arrow-back"} onPress={() => {
        }}
        />
        <IconButton
          themeSize={"sm"}
          icon={"arrow-back"} onPress={() => {
        }}
        />
        <TextButton
          size={'md'}
          onPress={() => {
          }}
        >
          TextButton
        </TextButton>
        <TextButton
          icon={{
            icon: "camera",
          }}
          underline
          onPress={() => {
          }}
        >
          TextButton
        </TextButton>

            <Button
              variant={"primary"}
              onPress={() => {
              }}>
              Primary
            </Button>
            <Button
              icon={{
                icon: "camera",
              }}
              variant={"primary"}
              onPress={() => {
              }}>
              Primary
            </Button>
            <Button
              suffixIcon={{
                icon: "camera",
              }}
              variant={"primary"}
              onPress={() => {
              }}>
              Primary
            </Button>

            <Button
              loading
              variant={"primary"}
              fullWidth
              onPress={() => {
              }}>
              Primary
            </Button>
            <Button
              onPress={() => {
              }}
              variant={"secondary"}
            >
              Secondary
            </Button>

            <Button
              loading
              onPress={() => {
              }}
              variant={"secondary"}
              fullWidth
            >
          Secondary
        </Button>

        <Button
          icon={{
            icon: "camera",
          }}
          onPress={() => {
          }}
          variant={"secondary"}
        >
          Secondary
        </Button>
        <Button
          onPress={() => {
          }}
          variant={"tertiary"}
        >
          Tertiary
        </Button>
        <Button
          icon={{
            icon: "camera",
          }}
          onPress={() => {
          }}
          variant={"tertiary"}
        >
          Tertiary
        </Button>
            <Button

              onPress={() => {
              }}
              variant={"tertiary"}
            >
              Tertiary
            </Button>

            <Button onPress={() => {
            }} size={"xs"}>
              Button XS
            </Button>
            <Button
              onPress={() => {
              }}
              size={"sm"}>
              Button Small
            </Button>

            <Button
              onPress={() => {
              }}
              size={"md"}>
              Button Medium
            </Button>

            <Button
              onPress={() => {
              }}
              size={"lg"}>
              Button Large
            </Button>


            <View>
              <SocialButton
                fullWidth
                social={"apple"}
                onPress={() => {
                }}
              >
                Sign in With me
              </SocialButton>
            </View>

            <View>
              <SocialButton
                disabled
                shape={"rect"}
                socialVariant={"icon"}
                fullWidth
                onPress={() => {

                }}
              />
            </View>

            <View>
              <SocialButton
                social={"twitter"}
                fullWidth
                onPress={() => {
                }}
              >
                Sign in With me
              </SocialButton>
            </View>
            <View>
              <SocialButton
                social={"twitter"}
                fullWidth
                disabled
                onPress={() => {
                }}
              >
                Sign in With me
              </SocialButton>
            </View>

            <View>
              <SocialButton

                fullWidth
                onPress={() => {
                }}
                disabled
              >
                Sign in With me
              </SocialButton>
            </View>

          </Stack>
        </View>
      </ScrollView>
    </Page>
  )
}
