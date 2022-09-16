import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Button, Divider, Icon, Page, Stack, Toolbar } from "../../tmd";
import TextButton from "../../tmd/components/Button/TextButton";
import Typography from "../../tmd/components/Typography/Typography";
import { _poListMock, _projectMock, _spbDetailMock, _spbMock } from "../../tmd/data/_mock";
import { colors, red100, white } from "../../tmd/styles/colors";
import { ProjectModel } from "../models/project/project";
import { POList } from "../models/spb/po";
import { SPBDetailModel, SpbItem, SpbListItem } from "../models/spb/spb";
import AppNavigationType from "../navigations/AppNavigationType";
import { navigate } from "../navigations/RootNavigation";
import { EmptyPOState } from "./components/EmptyState";
import ItemList from "./components/item/itemList";
import POListItem from "./components/item/PoList";
import SpbList, { StatusButton, StatusSPB } from "./components/item/SpbList";

export default function DetailSPB({ route }: NativeStackScreenProps<AppNavigationType, "DetailSPB">) {
    const { t } = useTranslation()
    const minItemShown: number = 3

    const noSPB = route.params.spbID
    const isAdminPage = route.params.isAdminPage
    const isPMPage = route.params.isPMPage

    const projectData: ProjectModel = _projectMock
    const data: SPBDetailModel = _spbDetailMock
    const poData: POList[] = _poListMock
    const [imageLoaded, setImageLoaded] = useState(false)
    const [showAll, setShowAll] = useState(false)
    const [buttonTitle, setButtonTitle] = useState("")

    useEffect(() => {
        if (!showAll) {
            setButtonTitle(t("see_more_items", { count: data.items.length - minItemShown }))
        } else {
            setButtonTitle(t("see_less"))
        }
    }, [showAll])

    type PrimaryType = {
        status: string
    }

    const PrimaryButton = ({ status }: PrimaryType) => {
        return (
            <>
                {status == StatusSPB.ongoing &&
                    <Button
                        style={{ flexBasis: 64 }}
                        fullWidth={true}
                        variant="primary"
                        icon={{ icon: "document-attach" }}
                        shape={"rounded"}
                        size={"lg"}
                        onPress={() => {
                        }}
                    >{t("ajukan_spb")}</Button>
                }

                {status == StatusSPB.waiting &&
                    <Button
                        style={{ flexBasis: 64 }}
                        fullWidth={true}
                        variant="primary"
                        shape={"rounded"}
                        size={"lg"}
                        onPress={() => {
                        }}
                    >{t("update")}</Button>
                }
            </>
        )
    }

    const header = () => {
        return (
            <>
                <View style={[{ flexDirection: "row", justifyContent: 'space-between' }, _s.padding]}>
                    <Stack spacing={8} style={{ justifyContent: 'flex-start', flexShrink: 1 }}>
                        <Typography type={"title3"} style={{ flexWrap: 'wrap' }}>{projectData.name}</Typography>
                        <Typography type={"body4"}>{projectData.created_at}</Typography>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Icon icon={"location"} />
                            <Typography type={"body4"}>{projectData.location.address}</Typography>
                        </View>
                    </Stack>
                    <Image style={{ aspectRatio: 1, width: '25%' }} borderRadius={4} source={require("../assets/icons/ic_header/header.png")} />
                </View>

                <Divider />

                <View style={[{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }, _s.padding]}>
                    <Typography type={"body3"}>{t("status_spb")}</Typography>
                    <StatusButton
                        status={data.spb_status}
                    />
                </View>

                <Divider />

                <View style={_s.padding}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Typography style={{ flex: 1 }} type={"label2"}>{data.no_spb}</Typography>
                        <Typography style={{ flex: 1 }} type={"label2"}>{data.created_at}</Typography>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("id_spb")}</Typography>
                        <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("date_spb")}</Typography>
                    </View>
                </View>

                <Divider />

                <View style={_s.padding}>
                    <Typography type="title3">{t("admin_note")}</Typography>
                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                        <Typography style={{ flex: 1, color: colors.neutral.neutral_70 }} type={"body3"}>{t("note_desc")}</Typography>
                        <Typography style={{ flex: 2, color: colors.neutral.neutral_90 }} type={"body3"}>{data.notes ?? "-"}</Typography>
                    </View>
                </View>

                <Divider />

                <View style={_s.padding}>
                    <Typography type="title3">{t("item_image")}</Typography>
                    <View style={{ aspectRatio: 343 / 180, width: '100%', marginTop: 16 }}>
                        <Image
                            style={{ width: '100%', height: '100%', borderRadius: 8 }}
                            source={{ uri: data.project.image }}
                            onLoadStart={() => {
                                setImageLoaded(true)
                            }}
                        />
                        <View style={{ position: 'absolute', alignSelf: 'center', height: '100%', justifyContent: 'center' }}>
                            <Icon icon="search-circle" color={colors.neutral.neutral_10} size={40} />
                        </View>

                        {!imageLoaded &&
                            <View style={{ position: 'absolute', borderRadius: 8, height: '100%', width: '100%', backgroundColor: colors.neutral.neutral_50 }}>
                            </View>
                        }
                    </View>
                </View>

                <Divider />

                <View style={_s.padding}>
                    <Typography type="title3">{t("item_list")}</Typography>
                </View>
            </>
        )
    }

    const footer = () => {
        return (
            <>
                <View>
                    <TextButton
                        style={{ alignSelf: "center", marginTop: 16, marginBottom: 12 }}
                        underline
                        size="md"
                        onPress={() => {
                            setShowAll(!showAll)
                        }}
                    >{buttonTitle}</TextButton>
                </View>

                <Divider />

                <View style={[_s.padding, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <Typography type="title3" style={{ color: colors.neutral.neutral_90 }}>{t("total_bahan")}</Typography>
                    <Typography type="body1" style={{ color: colors.neutral.neutral_90 }}>{data.total} {t("bahan")}</Typography>
                </View>

                <Divider />

                <View style={[_s.padding, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <Typography type="title3" style={{ color: colors.neutral.neutral_90 }}>{t("daftar_po", { count: poData.length })}</Typography>
                </View>

                <FlatList
                    style={{ backgroundColor: colors.neutral.neutral_20, padding: 16 }}
                    scrollEnabled={false}
                    data={poData}
                    ListEmptyComponent={EmptyPOState}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 16 }} />
                    }}
                    renderItem={(item) => {
                        return (
                            <POListItem
                                item={item.item}
                                index={item.index}
                                type={"PO"}
                                onPress={() => {
                                    navigate("DetailPO", {
                                        isAdminPage: isAdminPage,
                                        isPMPage: isPMPage,
                                        poID: item.item.id
                                    })
                                }}
                            />
                        )
                    }}
                />

            </>
        )
    }

    return (
        <Page>
            <Toolbar title={t("job_detail")} />
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <FlatList
                    style={{ flexGrow: 1 }}
                    ListHeaderComponent={header}
                    ListFooterComponent={footer}
                    extraData={showAll}
                    data={(showAll) ? data.items : data.items.slice(0, minItemShown)}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: 12 }} />
                        )
                    }}
                    renderItem={(item) => {
                        return (
                            <ItemList
                                item={item.item}
                                index={item.index}
                                config={{
                                    withNote: true,
                                }}
                            />
                        )
                    }}
                />

                <View style={_s.padding}>
                    {(isPMPage) && (
                        <PrimaryButton
                            status={"waiting_confirmation"} />
                    )}

                    {(isAdminPage) && (
                        <Stack spacing={16} direction="row">
                            <Button
                                fullWidth
                                variant="secondary"
                                shape="rounded"
                                size="lg"
                                onPress={() => {
                                }}
                            >{t("tolak")}</Button>

                            <Button
                                fullWidth
                                variant="primary"
                                shape="rounded"
                                size="lg"
                                onPress={() => {
                                }}
                            >{t("setujui")}</Button>
                        </Stack>
                    )}
                </View>
            </View>
        </Page>
    )
}

const _s = StyleSheet.create({
    padding: {
        paddingHorizontal: 16,
        paddingVertical: 12
    }
})