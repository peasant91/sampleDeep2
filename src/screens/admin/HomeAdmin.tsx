import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, Platform, ScrollView, StatusBar, useWindowDimensions, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { Button, Page, Stack, TextField, useTheme } from '../../../tmd';
import { _spbMock } from '../../../tmd/data/_mock';
import { colors, transparent, white } from '../../../tmd/styles/colors';
import { CollapsibleRef, MaterialTabBar, Tabs, useCurrentTabScrollY, useFocusedTab } from 'react-native-collapsible-tab-view'
import SpbList, { StatusSPB } from '../components/item/SpbList';
import { normalizeSize } from '../../../tmd/utils/normalizeSize';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { navigate } from '../../navigations/RootNavigation';
import useProjectInfiniteQuery from '../../services/project/useProjectQuery';
import { SPBListShimmer } from '../components/shimmer/shimmer';
import { EmptyPOState, EmptySPBStateAdmin } from '../components/EmptyState';
import { useBottomSheet } from '../../../tmd/providers/BottomSheetProvider';
import { useAuth } from '../../providers/AuthProvider';
import { useIsFocused } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { FlatList } from 'react-native-gesture-handler';
import { SpbListItem } from '../../models/spb/spb';
import { useScrollToTop } from '@react-navigation/native';
import useProjectInfiniteQueryPO from '../../services/project/useProjectQueryPO';
import POListItem from '../components/item/PoList';

export const useRefresh = () => {
    const [isRefreshing, setIsRefreshing] = useState(false)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (isRefreshing) {
                setIsRefreshing(false)
            }
        }, 3000)

        return () => clearTimeout(timer)
    }, [isRefreshing])

    return [
        isRefreshing,
        () => {
            setIsRefreshing(true)
        },
    ] as const
}

export function _HomeAdmin() {
    return (
        <Page>
        </Page>
    );
}

export default function HomeAdmin() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [index, setIndex] = useState(0)
    const [refreshing, setRefreshing] = useRefresh()
    const [manualRefresh, setManualRefresh] = useState(false)
    const windowHeight = useWindowDimensions().height

    const searchKey = useRef<string>("")
    const tabRef = useRef<CollapsibleRef>(null)
    const flatListRef = useRef<FlatList<SpbListItem>>(null);
    const scrollPositionRef = useRef<number>();


    const { logout, isLoadingLogout } = useAuth();

    // const onGoingHandler = useProjectInfiniteQuery({ status: "in_progress" })
    // const completedHandler = useProjectInfiniteQuery({ status: "done" })
    const spbHandler = useProjectInfiniteQuery({ status: "" })
    const poHandler = useProjectInfiniteQueryPO("po-lists",{ status: "" })
    const receivedHandler = useProjectInfiniteQueryPO("received-lists",{ status: StatusSPB.received })

    const theme = useTheme()

    const HEADER_HEIGHT = Dimensions.get('window').width + 16
    const MIN_HEADER_HEIGHT = 128

    const _isFocus = useIsFocused()

    const [routes] = useState([
        { key: "first", title: "SPB" },
        { key: "second", title: "PO" },
        { key: "third", title: t("received") },
    ]);

    const handleIndexChanged = async (index: number) => {
        setIndex(index)
        setManualRefresh(true)
        switch (index) {
            case 0: {
                await spbHandler.refetch()
            }
            case 1: {
                await poHandler.refetch()
            }
            default: {
                await receivedHandler.refetch()
            }
        }
        setManualRefresh(false)
    }

    const {
        showConfirmationBS,
        hideConfirmationBS,
    } = useBottomSheet();

    useEffect(() => {
        if (_isFocus) {
            switch (index) {
                case 0: {
                    spbHandler.refetch()
                }
                case 1: {
                    poHandler.refetch()
                }
                default: {
                    receivedHandler.refetch()
                }
            }
        }
    }, [_isFocus])

    const Header = () => {
        const scrollY = useCurrentTabScrollY()

        const opacityStyle = useAnimatedStyle(() => {
            scrollPositionRef.current = scrollY.value

            const style = interpolate(parseFloat(scrollY.value.toFixed(2)), [0, MIN_HEADER_HEIGHT], [0, 1])
            return { opacity: style }
        })

        return (
            <View style={{
            }}
                pointerEvents='box-none'
            >
                <Animated.View>
                    <Image
                        style={{ width: "100%" }}
                        source={require("../../assets/icons/ic_header_nologo/header.png")} />
                    <Animated.View style={[{
                        backgroundColor: Colors.white,
                        position: 'absolute',
                        left: 0, right: 0, top: 0, bottom: 0,
                    }, opacityStyle]}
                    ></Animated.View>
                </Animated.View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                translucent={false}
                hidden={false}
            />
            <View style={{ flex: 1 }}>

                <Tabs.Container
                    ref={tabRef}
                    cancelLazyFadeIn
                    snapThreshold={(Platform.OS == "android") ? 0.3 : null}
                    minHeaderHeight={MIN_HEADER_HEIGHT}
                    headerHeight={HEADER_HEIGHT}
                    lazy
                    renderHeader={() => <Header />}
                    onIndexChange={handleIndexChanged}
                    renderTabBar={(props) => {
                        return <MaterialTabBar
                            {...props}
                            activeColor={colors.primary.main}
                            inactiveColor={colors.neutral.neutral_70}
                            labelStyle={{
                                color: colors.primary.main,
                                fontSize: normalizeSize(14),
                                letterSpacing: 0.1,
                                ...theme.fonts.medium
                            }}
                            style={{
                                backgroundColor: colors.neutral.neutral_10,
                            }}
                            onTabPress={function (name: string): void {
                                props.onTabPress(name)
                            }}
                            indicatorStyle={{ backgroundColor: colors.primary.main, height: 3, width: '20%' }}
                            tabStyle={{ width: Dimensions.get('window').width / 3 }}
                            scrollEnabled={true}
                        />
                    }}
                >
                    <Tabs.Tab name={routes[0].title}>
                        <Tabs.FlatList
                            // nestedScrollEnabled={true}
                            ref={flatListRef}
                            showsVerticalScrollIndicator={true}
                            style={{ padding: 16 }}
                            data={spbHandler.spbLists}
                            // refreshing={(Platform.OS === "ios") ? manualRefresh : false}
                            // onRefresh={() => (Platform.OS === "ios") ? handleIndexChanged(0) : undefined}
                            keyExtractor={(_, index) => index.toString()}
                            refreshing={manualRefresh}
                            onRefresh={() => handleIndexChanged(0)}
                            onEndReached={spbHandler.fetchNext}
                            ListEmptyComponent={EmptySPBStateAdmin}
                            ListFooterComponent={<View style={{ height: 32 }} />}
                            renderItem={(item) => {
                                if (manualRefresh) {
                                    return <View style={{ marginBottom: 16 }}>
                                        <SPBListShimmer />
                                    </View>
                                }
                                return (
                                    <SpbList
                                        isAdmin={true}
                                        isPM={false}
                                        item={item.item}
                                        index={item.index}
                                        withProjectName={true}
                                        onPress={() => {
                                            navigate("DetailSPB", {
                                                spbID: item.item.no_spb,
                                                isAdminPage: true
                                            })

                                        }}
                                    />
                                )
                            }}
                        />
                    </Tabs.Tab>
                    <Tabs.Tab name={routes[1].title}>
                        <Tabs.FlatList
                            // nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={true}
                            style={{ padding: 16 }}
                            data={poHandler.poLists}
                            keyExtractor={(_, index) => index.toString()}
                            // refreshing={(Platform.OS === "ios") ? manualRefresh : refreshing}
                            // onRefresh={() => (Platform.OS === "ios") ? handleIndexChanged(1) : undefined}
                            refreshing={manualRefresh}
                            onRefresh={() => handleIndexChanged(1)}
                            onEndReached={poHandler.fetchNext}
                            ListFooterComponent={<View style={{ height: 32 }} />}
                            ListEmptyComponent={EmptyPOState}
                            renderItem={(item) => {
                                if (manualRefresh) {
                                    return <View style={{ marginBottom: 16 }}>
                                        <SPBListShimmer />
                                    </View>
                                }
                                return <POListItem
                                    item={item.item}
                                    index={item.index}
                                    type={"PO"}
                                    onPress={() => {
                                        navigate("DetailPO", {
                                            isAdminPage: true,
                                            isPMPage: false,
                                            spbID: item.item.no_spb,
                                            poID: item.item.no_po
                                        })
                                    }}
                                />
                            }}
                        />
                    </Tabs.Tab>
                    <Tabs.Tab name={routes[2].title}>
                        <Tabs.FlatList
                            // nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={true}
                            style={{ padding: 16 }}
                            data={receivedHandler.poLists}
                            keyExtractor={(_, index) => index.toString()}
                            // refreshing={(Platform.OS === "ios") ? manualRefresh : refreshing}
                            // onRefresh={() => (Platform.OS === "ios") ? handleIndexChanged(1) : undefined}
                            refreshing={manualRefresh}
                            onRefresh={() => handleIndexChanged(1)}
                            onEndReached={receivedHandler.fetchNext}
                            ListFooterComponent={<View style={{ height: 32 }} />}
                            ListEmptyComponent={EmptyPOState}
                            renderItem={(item) => {
                                if (manualRefresh) {
                                    return <View style={{ marginBottom: 16 }}>
                                        <SPBListShimmer />
                                    </View>
                                }
                                return <POListItem
                                item={item.item}
                                index={item.index}
                                type={"PO"}
                                onPress={() => {
                                    navigate("DetailPO", {
                                        isAdminPage: true,
                                        isPMPage: false,
                                        spbID: item.item.no_spb,
                                        poID: item.item.no_po
                                    })
                                }}
                            />
                            }}
                        />
                    </Tabs.Tab>

                </Tabs.Container>

            </View>

            <Stack spacing={12} style={{ position: 'absolute', left: 16, right: 16, top: getStatusBarHeight() }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image
                        source={require("../../assets/icons/ic_logo/ic_logo.png")}
                    />
                    <Button
                        buttonStyle={{ backgroundColor: white }}
                        loading={isLoadingLogout}
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

                <TextField
                    mode={"filled"}
                    outlineColor={colors.neutral.neutral_70}
                    style={{ backgroundColor: white }}
                    shape={'rounded'}
                    placeholder={"Cari Pekerjaan"}
                    search
                    onClear={() => {
                        searchKey.current = "";
                        spbHandler.setQuery(searchKey.current)
                        poHandler.setQuery(searchKey.current)
                        receivedHandler.setQuery(searchKey.current)
                        handleIndexChanged(index)
                    }}
                    onFocus={() => {
                        if (Platform.OS == "android") {
                            tabRef.current?.setIndex(index)
                        } else {
                        }
                    }}
                    onSubmitEditing={() => {
                        spbHandler.setQuery(searchKey.current)
                        poHandler.setQuery(searchKey.current)
                        receivedHandler.setQuery(searchKey.current)
                        handleIndexChanged(index)
                        // if (index == 0) {
                        //     setTimeout(onGoingHandler.refresh, 1000)
                        // } else {
                        //     setTimeout(completedHandler.refresh, 1000)
                        // }
                    }}
                    onChangeText={(text) => {
                        searchKey.current = text
                    }}
                />
            </Stack>
            {/* </KeyboardAvoidingView> */}
        </View>
    )
}