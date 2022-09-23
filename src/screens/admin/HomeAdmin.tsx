import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, Platform, RefreshControl, useWindowDimensions, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { Button, Page, Stack, TextField, Toolbar, useTheme } from '../../../tmd';
import { _spbMock } from '../../../tmd/data/_mock';
import { colors, white } from '../../../tmd/styles/colors';
import { MaterialTabBar, Tabs, useCurrentTabScrollY, useHeaderMeasurements } from 'react-native-collapsible-tab-view'
import SpbList from '../components/item/SpbList';
import { normalizeSize } from '../../../tmd/utils/normalizeSize';
import Animated, { interpolate, useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { navigate } from '../../navigations/RootNavigation';
import useProjectInfiniteQuery from '../../services/project/useProjectQuery';
import { print } from '@gorhom/bottom-sheet/lib/typescript/utilities/logger';
import { ScrollView } from 'react-native-gesture-handler';

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
    const [search, setSearch] = useState<string>()
    const [items, setItems] = useState(_spbMock)
    const [items2, setItems2] = useState(_spbMock)
    const [index, setIndex] = useState(0)
    const [refreshing, setRefreshing] = useRefresh()
    const windowHeight = useWindowDimensions().height

    const onGoingHandler = useProjectInfiniteQuery({ search: search ?? "" })
    const completedHandler = useProjectInfiniteQuery({ search: search ?? "" })

    const theme = useTheme()

    const HEADER_HEIGHT = Dimensions.get('window').width
    const MIN_HEADER_HEIGHT = 128

    const [routes] = useState([
        { key: "first", title: t("project_ongoing") },
        { key: "second", title: t("project_done") },
    ]);

    const handleIndexChanged = (index: number) => {
        setIndex(index)
    }

    useEffect(() => {
        setItems(onGoingHandler.catalogs)
        setItems(completedHandler.catalogs)
    }, [onGoingHandler.catalogs, completedHandler.catalogs])


    const Header = () => {
        const { top, height } = useHeaderMeasurements()
        const scrollY = useCurrentTabScrollY()
        var _opacity = useSharedValue(0)

        const scrollYText = useDerivedValue(
            () => {
                // console.log("ANJENG TANAH BRANTEM SENE", scrollY.value.toFixed(2))
                return `${scrollY.value.toFixed(2)}`
            }
        )

        const opacity = useDerivedValue(() => {
            var value: number = interpolate(parseFloat(scrollY.value.toFixed(2)), [0, MIN_HEADER_HEIGHT], [0, 1])
            // console.log("OPACITY", value)
            return value
        })

        const animatedProps = useAnimatedProps(() => {
            // console.log(scrollYText.value);
            return {
                opacity: interpolate(
                    top.value,
                    [0, MIN_HEADER_HEIGHT],
                    [0, 1]
                ) as any,
                text: scrollYText.value,
                number: parseFloat(scrollYText.value),
            };
        });

        return (
            <View style={{
            }}
                pointerEvents='box-none'
            >
                <Animated.View>
                    <Image
                        style={{ width: "100%" }}
                        source={require("../../assets/icons/ic_header_nologo/header.png")} />
                    <Animated.View style={{
                        backgroundColor: Colors.white,
                        position: 'absolute',
                        left: 0, right: 0, top: 0, bottom: 0,
                        ...opacity
                    }}
                    ></Animated.View>
                </Animated.View>
            </View>
        )
    }

    return (
        <>
            <Page>
                <ScrollView
                    nestedScrollEnabled
                    contentContainerStyle={{
                        height: windowHeight - 56, // 56 is the naviagtion header height
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onGoingHandler.refresh} />
                    }>

                    <Tabs.Container
                        snapThreshold={0.3}
                        minHeaderHeight={MIN_HEADER_HEIGHT}
                        headerHeight={HEADER_HEIGHT}
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
                                nestedScrollEnabled
                                style={{ padding: 16 }}
                                data={items}
                                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                                refreshing={(Platform.OS === "ios") ? refreshing : undefined}
                                onRefresh={(Platform.OS === "ios") ? onGoingHandler.refresh : undefined}
                                onEndReached={onGoingHandler.fetchNext}
                                renderItem={(item) => {
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
                        <Tabs.Tab name={routes[1].title}>
                            <Tabs.FlatList
                                nestedScrollEnabled
                                style={{ padding: 16 }}
                                data={items2}
                                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                                refreshing={(Platform.OS === "ios") ? refreshing : undefined}
                                onRefresh={(Platform.OS === "ios") ? completedHandler.refresh : undefined}
                                onEndReached={completedHandler.fetchNext}
                                renderItem={(item) => {
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

                <Stack spacing={12} style={{ position: 'absolute', left: 16, right: 16, top: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image
                            source={require("../../assets/icons/ic_logo/ic_logo.png")}
                        />
                        <Button
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

                    <TextField
                        mode={"contained"}
                        shape={'rounded'}
                        placeholder={"Search"}
                        value={search}
                        search
                        onSubmitEditing={() => {
                            if (index == 0) {
                                setTimeout(onGoingHandler.refresh, 1000)
                            } else {
                                setTimeout(completedHandler.refresh, 1000)
                            }
                        }}
                        onChangeText={(text) => {
                            setSearch(text)
                        }}
                    />
                </Stack>
            </Page>
        </>
    )
}