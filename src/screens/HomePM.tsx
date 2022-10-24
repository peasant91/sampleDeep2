import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, KeyboardAvoidingView, Platform, RefreshControl, StatusBar, View, ViewStyle, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useDispatch } from "react-redux";
import { Divider, IconButton, Page, Skeleton, Stack, Tag } from "../../tmd";
import Button from "../../tmd/components/Button/Button";
import TextButton from "../../tmd/components/Button/TextButton";
import Typography from "../../tmd/components/Typography/Typography";
import { colors, transparent, white } from "../../tmd/styles/colors";
import SpbList, { StatusSPB } from "./components/item/SpbList";
import { _spbMock } from "../../tmd/data/_mock";
import { navigate } from "../navigations/RootNavigation";
import { EmptySPBState } from "./components/EmptyState";
import usePMProjectQuery from "../services/project/usePMProjectQuery";
import useProjectInfiniteQuery from "../services/project/useProjectQuery";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { SPBListShimmer } from "./components/shimmer/shimmer";
import { useBottomSheet } from "../../tmd/providers/BottomSheetProvider";
import { useAuth } from "../providers/AuthProvider";

enum StatusProject {
  inProgress = "in_progress",
  finish = "finish",
  done = "done",
  success = "success"
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
      {(status == StatusProject.finish || status == StatusProject.success) &&
        <Tag variant="success" text={t("finish")} />
      }
      {status == StatusProject.done &&
        <Tag variant="success" text={t("finish")} />
      }

    </View>
  )

}

export default function HomePM() {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { project, isLoadingProject, refetch, isRefetchingProject } = usePMProjectQuery();
  const [isRefreshing, setIsRefreshing] = useState(false)
  const {
    spbLists,
    refresh,
    isLoadingCatalog
  } = useProjectInfiniteQuery({ status: StatusSPB.waiting + "," + StatusSPB.revision });

  const { logout, isLoadingLogout } = useAuth();

  const {
    showConfirmationBS,
    hideConfirmationBS,
  } = useBottomSheet();

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
            showConfirmationBS({
              title: t("confirmation_logout_title"),
              description: t("confirmation_logout_desc"),
              buttonPrimaryTitle: t("sure"),
              buttonSecondaryTitle: t("cancel"),
              buttonPrimaryAction: (async (text) => {
                logout()
                hideConfirmationBS()
                dispatch({
                  type: "LOGOUT",
                })
              })
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
                <View style={{ width: '25%' }}>
                  <Image style={{ aspectRatio: 1 }} borderRadius={4} source={{ uri: project?.photo }} />
                </View>
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
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Stack style={{ flex: 1 }}>
          <StatusBar
            translucent={false}
            // backgroundColor={transparent}
            hidden={false}
          />

          <View style={{ flex: 1 }}>
            {(isLoadingCatalog || isRefetchingProject) ?
              (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl refreshing={isRefetchingProject} onRefresh={() => {
                      refetch()
                    }}
                    />
                  }>
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
                  <Stack spacing={16} direction={'column'} style={{ flexGrow: 1, padding: 16 }}>
                    <SPBListShimmer />
                    <View style={{ height: 16 }} />
                    <SPBListShimmer />
                    <View style={{ height: 16 }} />
                    <SPBListShimmer />
                  </Stack>
                </ScrollView>

              ) : (

                <FlatList
                  style={{ flex: 1, zIndex: 1000 }}
                  ListHeaderComponent={Header}
                  ListFooterComponent={() => <View style={{ height: 80 }} />}
                  ListEmptyComponent={EmptySPBState}
                  ItemSeparatorComponent={() => {
                    return <View style={{ height: 16 }} />
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  refreshing={isRefreshing}
                  refreshControl={
                    <RefreshControl
                      refreshing={isRefreshing}
                      onRefresh={() => {
                        refresh()
                        refetch()
                      }}
                    />
                  }
                  onRefresh={() => {
                    setIsRefreshing(true)
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
      </KeyboardAvoidingView>
    </View>
  )
}
