import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { number } from 'yup/lib/locale'
import useProjectInfiniteQuery from '../../services/project/useProjectQuery'
import { HScrollView, HFlatList, HSectionList } from 'react-native-head-tab-view'
import SpbList from '../components/item/SpbList'
import { navigate } from '../../navigations/RootNavigation'
import { useIsFocused } from '@react-navigation/native'
import { Tabs } from 'react-native-collapsible-tab-view'


interface Props {
    index: number,
    query: string
}

const AdminRoute = ({ index, query }: Props) => {
    console.log(index, query);
    const _isFocus = useIsFocused()

    const { isRefreshing, refetch, spbLists } = useProjectInfiniteQuery({ status: query })

    return (
        <Tabs.FlatList
            data={spbLists}
            renderItem={(item) => {
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
    )
}

export default AdminRoute