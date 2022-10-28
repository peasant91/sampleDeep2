import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, KeyboardAvoidingView, Platform, RefreshControl, StatusBar, useWindowDimensions, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { Button, Page, Stack, TextField, useTheme } from '../../../tmd';
import { _spbMock } from '../../../tmd/data/_mock';
import { colors, transparent, white } from '../../../tmd/styles/colors';
import { CollapsibleRef, MaterialTabBar, Tabs, useCurrentTabScrollY } from 'react-native-collapsible-tab-view'
import SpbList, { StatusSPB } from '../components/item/SpbList';
import { normalizeSize } from '../../../tmd/utils/normalizeSize';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { navigate } from '../../navigations/RootNavigation';
import useProjectInfiniteQuery from '../../services/project/useProjectQuery';
import { ScrollView } from 'react-native-gesture-handler';
import { SPBListShimmer } from '../components/shimmer/shimmer';
import { EmptySPBStateAdmin } from '../components/EmptyState';
import { useBottomSheet } from '../../../tmd/providers/BottomSheetProvider';
import { useAuth } from '../../providers/AuthProvider';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useIsFocused } from '@react-navigation/native';

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

export default function HomeAdmin() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [index, setIndex] = useState(0)
    const [refreshing, setRefreshing] = useRefresh()
    const [manualRefresh, setManualRefresh] = useState(false)
    const windowHeight = useWindowDimensions().height

    const searchKey = useRef<string>("")
    const scrollRef = useRef<ScrollView>(null)
    const tabRef = useRef<CollapsibleRef>(null)

    const { logout, isLoadingLogout } = useAuth();

    const onGoingHandler = useProjectInfiniteQuery({ status: "in_progress" })
    const completedHandler = useProjectInfiniteQuery({ status: "done" })

    const theme = useTheme()

    const HEADER_HEIGHT = Dimensions.get('window').width + 16
    const MIN_HEADER_HEIGHT = 128 + 16

    const _isFocus = useIsFocused()

    const [routes] = useState([
        { key: "first", title: t("project_ongoing") },
        { key: "second", title: t("project_done") },
    ]);

    const handleIndexChanged = async (index: number) => {
        setIndex(index)
        setManualRefresh(true)
        if (index == 0) {
            await onGoingHandler.refetch()
            // onGoingHandler.refresh()
        } else {
            await completedHandler.refetch()
            // completedHandler.refresh()
        }
        setManualRefresh(false)
    }

    const {
        showConfirmationBS,
        hideConfirmationBS,
    } = useBottomSheet();

    useEffect(() => {
    }, [index])

    useEffect(() => {
        if (_isFocus) {
            handleIndexChanged(index)
        }
    }, [_isFocus])

    const Header = () => {
        const scrollY = useCurrentTabScrollY()

        const opacityStyle = useAnimatedStyle(() => {
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
            <ScrollView
                ref={scrollRef}
                nestedScrollEnabled
                contentContainerStyle={{
                    height: windowHeight, // 56 is the naviagtion header height
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => {
                        handleIndexChanged(index)
                    }}
                    />
                }>

                <Tabs.Container
                    ref={tabRef}
                    snapThreshold={0.3}
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
                                width: "auto",
                            }}
                            onTabPress={function (name: string): void {
                                props.onTabPress(name)
                            }}
                            indicatorStyle={{ backgroundColor: colors.primary.main, height: 2, alignSelf: 'flex-start', width: '20%' }}
                            tabStyle={{ alignSelf: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', width: 'auto', padding: 0, marginRight: 18, }}
                            scrollEnabled={true}
                        />
                    }}
                >
                    <Tabs.Tab name={routes[0].title}>
                        <Tabs.FlatList
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            style={{ padding: 16 }}
                            data={onGoingHandler.spbLists}
                            refreshing={(Platform.OS === "ios") ? manualRefresh : undefined}
                            onRefresh={() => (Platform.OS === "ios") ? handleIndexChanged(0) : undefined}
                            onEndReached={onGoingHandler.fetchNext}
                            ListEmptyComponent={EmptySPBStateAdmin}
                            ListFooterComponent={<View style={{ height: 32 }} />}
                            renderItem={(item) => {
                                if (refreshing || manualRefresh) {
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
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            style={{ padding: 16 }}
                            data={completedHandler.spbLists}
                            refreshing={(Platform.OS === "ios") ? manualRefresh : undefined}
                            onRefresh={() => (Platform.OS === "ios") ? handleIndexChanged(1) : undefined}
                            onEndReached={completedHandler.fetchNext}
                            ListFooterComponent={<View style={{ height: 32 }} />}
                            ListEmptyComponent={EmptySPBStateAdmin}
                            renderItem={(item) => {
                                if (refreshing || manualRefresh) {
                                    return <View style={{ marginBottom: 16 }}>
                                        <SPBListShimmer />
                                    </View>
                                }
                                return <SpbList
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
                            }}
                        />
                    </Tabs.Tab>

                </Tabs.Container>

            </ScrollView>

            <Stack spacing={12} style={{ position: 'absolute', left: 16, right: 16, top: getStatusBarHeight() + 16 }}>
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
                        onGoingHandler.setQuery(searchKey.current)
                        completedHandler.setQuery(searchKey.current)
                        if (index == 0) {
                            setTimeout(onGoingHandler.refresh, 1000)
                        } else {
                            setTimeout(completedHandler.refresh, 1000)
                        }
                    }}
                    onFocus={() => {
                        tabRef.current?.setIndex(index)
                    }}
                    onSubmitEditing={() => {
                        onGoingHandler.setQuery(searchKey.current)
                        completedHandler.setQuery(searchKey.current)
                        if (index == 0) {
                            setTimeout(onGoingHandler.refresh, 1000)
                        } else {
                            setTimeout(completedHandler.refresh, 1000)
                        }
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