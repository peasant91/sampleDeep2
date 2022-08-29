import React, { ComponentProps } from "react";
import { TabBar, TabBarIndicator, TabView } from "react-native-tab-view";
import { Icon, Stack, useTheme } from "../../index";
import Typography from "../Typography/Typography";

interface Props {
  scrollable?: boolean;

}

export default function Tab({ scrollable, ...rest }: Props & ComponentProps<typeof TabView>) {
  const { colors } = useTheme();
  return (
    <>
      <TabView
        renderTabBar={(props) => <TabBar
          tabStyle={[
            scrollable && {
              width: "auto",
            }]}
          scrollEnabled={scrollable}
          renderLabel={(lbl) => {
            const isSelected = lbl.focused;
            const labelColor = isSelected ? colors.primary.main : colors.neutral.neutral_70;
            // @ts-ignore
            const iconProp = lbl.route?.iconProp;
            return <Stack direction={"row"} items={"center"} spacing={4}>
              {
                iconProp &&
                <Icon
                  color={labelColor}
                  size={18}
                  {...iconProp}
                />
              }
              <Typography type={"label1"} style={{ color: labelColor }}>{lbl.route.title}</Typography>
            </Stack>;
          }}
          labelStyle={{
            color: colors.primary.main,
          }}
          renderIndicator={(ind) => {
            const indicatorMargin = 4;
            const idx = ind.navigationState.index;
            return <TabBarIndicator
              {...ind}
              width={ind.getTabWidth(idx) - indicatorMargin * 2}
              style={
                [{
                  backgroundColor: colors.primary.main,
                  height: 4,
                  marginStart: indicatorMargin,
                },
                  rest.tabBarPosition === "bottom" && {
                    top: 0,
                    borderBottomStartRadius: 20,
                    borderBottomEndRadius: 20,

                  },
                  rest.tabBarPosition === "top" && {
                    bottom: 0,
                    borderTopStartRadius: 20,
                    borderTopEndRadius: 20,
                  },
                ]}
            />;
          }}
          style={{
            backgroundColor: colors.neutral.neutral_10,
          }}
          contentContainerStyle={
            [
              rest.tabBarPosition === "bottom" && {
                elevation: 0.5,
              }]
          }
          {...props}

        />
        }


        {...rest}
      />
    </>
  );
}
