import Color from "color";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, LayoutAnimation, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, StatusBar, StyleSheet, View, ViewStyle } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useDispatch } from "react-redux";
import { Divider, IconButton, Page, Skeleton, Stack, Tag } from "../../tmd";
import Button from "../../tmd/components/Button/Button";
import TextButton from "../../tmd/components/Button/TextButton";
import Title from "../../tmd/components/Typography/Title";
import Typography from "../../tmd/components/Typography/Typography";
import { black, colors, red100, transparent, white } from "../../tmd/styles/colors";
import { SpbListItem } from "../models/spb/spb";
import SpbList, { StatusSPB } from "./components/item/SpbList";
import ICDocument from "../assets/icons/ic_document.svg"
import { _spbMock } from "../../tmd/data/_mock";
import { navigate } from "../navigations/RootNavigation";
import { EmptySPBState } from "./components/EmptyState";
import usePMProjectQuery from "../services/project/usePMProjectQuery";
import useProjectInfiniteQuery from "../services/project/useProjectQuery";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { SPBListShimmer } from "./components/shimmer/shimmer";

enum StatusProject {
  inProgress = "in_progress",
  finish = "finish"
}

type _StatusProject = {
  status: string
}

export function StatusButton({ status }: _StatusProject) {
  const { t } = useTranslation()

  return (
    <View>
      {status == StatusProject.inProgress &&
        <Tag variant="primary" text={t("in_progress")} />
      }
      {status == StatusProject.finish &&
        <Tag variant="success" text={t("success")} />
      }
    </View>
  )

}

export default function HomePM() {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { project, isLoadingProject, refetch, isRefetchingProject } = usePMProjectQuery();
  const {
    spbLists,
    refresh,
    isLoadingCatalog
  } = useProjectInfiniteQuery({ search: "", status: StatusSPB.waiting });

  const useHandleScroll = () => {
    const [showButton, setShowButton] = useState(true);

    const scrollOffset = useRef(0);

    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const CustomLayoutLinear = {
          duration: 100,
          create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
          update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
          delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
        };
        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const currentOffset = event.nativeEvent.contentOffset.y;
        const direction = currentOffset > 0 && currentOffset > scrollOffset.current ? 'down' : 'up';
        // If the user is scrolling down (and the action-button is still visible) hide it
        const isActionButtonVisible = direction === 'up';
        if (isActionButtonVisible !== showButton) {
          LayoutAnimation.configureNext(CustomLayoutLinear);
          setShowButton(isActionButtonVisible);
        }
        // Update your scroll position
        scrollOffset.current = currentOffset;
      },
      [showButton]
    );

    return { handleScroll, showButton };
  };

  useFocusEffect(
    useCallback(() => {
      refetch() // fetch Project Detail
      refresh() // fetch Riwayat SPB
    }, [])
  )

  const HeaderShimmer = ({ props }: { props: ViewStyle }) => {
    return (
      <View style={[{ borderWidth: 1, borderRadius: 16, borderColor: colors.neutral.neutral_40 }, props]}>
        <Stack style={{ paddingVertical: 16 }} spacing={12}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 12 }}>
            <Stack spacing={8} style={{ justifyContent: 'flex-start', flexGrow: 1, marginRight: 32 }}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Stack>
            <Skeleton height={40} width={40} />
          </View>

          <Stack spacing={8} style={{ paddingHorizontal: 12 }}>
            <Stack direction='row' spacing={16}>
              <Skeleton style={{ flex: 1 }} />
              <Skeleton style={{ flex: 1 }} />
            </Stack>
            <Stack direction='row' spacing={16}>
              <Skeleton style={{ flex: 1 }} />
              <Skeleton style={{ flex: 1 }} />
            </Stack>
          </Stack>

          <Divider variant={"dotted"} />

          <View style={{ width: '25%', paddingHorizontal: 12 }}>
            <Skeleton height={30} />
          </View>

        </Stack>
      </View>
    )
  }

  const HeaderTopHeader = () => {
    return (
      <View style={{
        top: 0,
        left: 0,
        right: 0
      }}>
        <Image
          style={{ width: "100%" }}
          source={require("../assets/icons/ic_header/header.png")} />

        <Button
          style={{ position: "absolute", right: 16, top: getStatusBarHeight() + 16 }}
          buttonStyle={{ backgroundColor: white }}
          size={"sm"}
          shape={"rounded"}
          variant={"tertiary"}
          icon={{
            icon: "exit"
          }}
          onPress={() => {
            dispatch({
              type: "LOGOUT",
            })
          }}
        >Keluar</Button>
      </View>
    )
  }

  const Header = () => {
    return (
      <>
        <HeaderTopHeader />
        <View style={{ flex: 1, paddingTop: 16, paddingHorizontal: 16, paddingVertical: 16 }}>
          <Typography type={"title3"}>Proyek Aktif</Typography>
          <View style={{ marginTop: 12, borderWidth: 1, borderRadius: 16, borderColor: colors.neutral.neutral_40 }}>
            <Stack>
              <View style={{ paddingVertical: 16, paddingHorizontal: 12, flexDirection: "row", justifyContent: 'space-between' }}>
                <Stack spacing={8} style={{ justifyContent: 'flex-start', flexShrink: 1 }}>
                  <Typography type={"title3"} style={{ flexWrap: 'wrap' }}>{project?.name}</Typography>
                  <Typography type={"body4"}>Dibuat {moment(project?.created_at).startOf('hour').fromNow()}</Typography>
                </Stack>
                <Image style={{ aspectRatio: 1, width: '25%' }} borderRadius={4} source={require("../assets/icons/ic_header/header.png")} />
              </View>

              <View style={{ paddingVertical: 8, paddingHorizontal: 12, flexDirection: 'row' }}>
                <Stack spacing={4} style={{ flex: 2 }}>
                  <Typography type="label2">{project?.construction_type}</Typography>
                  <Typography type="body3">Tipe Konstruksi</Typography>
                </Stack>

                <Stack spacing={4} style={{ flex: 2 }}>
                  <Typography type="label2">{project?.duration}</Typography>
                  <Typography type="body3">Durasi</Typography>
                </Stack>
              </View>

              <View style={{ paddingVertical: 10, paddingHorizontal: 12, flexDirection: 'row' }}>
                <Typography type="body3">{project?.description}</Typography>
              </View>

              <Divider variant={"dotted"} />

              <View style={{ paddingVertical: 16, paddingHorizontal: 12, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <StatusButton
                  status={project?.status ?? ''}
                />

                <Button
                  shape="rounded"
                  size="sm"
                  variant="secondary"
                  onPress={() => {
                    navigate("ProjectDetail")
                  }}
                >{t("see_detail")}</Button>
              </View>

            </Stack>
          </View>

          <View style={{ paddingTop: 24, paddingHorizontal: 12, flexDirection: 'row', justifyContent: "space-between" }}>
            <Typography type={"title3"}>Riwayat SPB</Typography>
            <TextButton
              underline
              style={{ alignSelf: 'center' }}
              size="md"
              onPress={() => {
                navigate("ListSPB");
              }}
            >{t("see_all")}</TextButton>
          </View>
        </View>
      </>
    )
  }

  return (
    <Page>
      <Stack style={{ flex: 1 }}>
        <StatusBar
          translucent={true}
          backgroundColor={transparent}
          hidden={true}
        />

        <View style={{ flex: 1 }}>
          {(isLoadingCatalog || isRefetchingProject) ?
            (
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
                <HeaderTopHeader />
                <Typography style={{ paddingHorizontal: 12, paddingTop: 24 }} type={"title3"}>Proyek Aktif</Typography>
                <HeaderShimmer
                  props={{ margin: 16 }}
                />
                <View style={{ paddingHorizontal: 12, flexDirection: 'row', justifyContent: "space-between" }}>
                  <Typography type={"title3"}>Riwayat SPB</Typography>
                  <TextButton
                    underline
                    style={{ alignSelf: 'center' }}
                    size="md"
                    onPress={() => {
                      navigate("ListSPB");
                    }}
                  >{t("see_all")}</TextButton>
                </View>
                <Stack spacing={16} direction={'column'} style={{flexGrow: 1}}>
                  <SPBListShimmer />
                </Stack>
              </ScrollView>

            ) : (

              <FlatList
                ListHeaderComponent={Header}
                ListFooterComponent={() => <View style={{ height: 16 }} />}
                ListEmptyComponent={EmptySPBState}
                ItemSeparatorComponent={() => {
                  return <View style={{ height: 16 }} />
                }}
                data={spbLists}
                renderItem={(item) => {
                  return (
                    <View style={{ paddingHorizontal: 16 }}>

                      {(spbLists) ?
                        <SpbList
                          isAdmin={false}
                          isPM={true}
                          onPress={() => navigate("DetailSPB", {
                            spbID: item.item.no_spb,
                            isPMPage: true
                          })}
                          item={item.item}
                          index={item.index} />
                        :
                        <View>
                        </View>}

                    </View>
                  )
                }}
              />
            )}
        </View>

        {!isLoadingProject &&
          <Button
            style={{ alignSelf: 'center', position: 'absolute', bottom: 32 }}
            variant="primary"
            shape="rounded"
            size="lg"
            icon={{ icon: "document-attach" }}
            onPress={() => {
              navigate("FormSPB", {
                defaultSPB: null
              })
            }}
          >{t("ajukan_spb")}</Button>
        }
      </Stack>
    </Page>

  )
}
