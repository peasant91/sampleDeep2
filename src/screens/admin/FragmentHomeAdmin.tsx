import React from 'react'
import { FlatList, View } from 'react-native'
import { SpbListItem } from '../../models/spb/spb'
import { navigate } from '../../navigations/RootNavigation'
import SpbList from '../components/item/SpbList'

interface Page {
    item: SpbListItem[]
    isDone: boolean,
    isOngoing: boolean
}

export default function FragmentHomeAdmin({ item, isDone, isOngoing }: Page) {
    // return <FlatList
    //     scrollEnabled={false}
    //     style={{ padding: 16 }}
    //     data={item}
    //     ItemSeparatorComponent={() => <View style={{height: 16}} />}
    //     renderItem={(item) => {
    //         return <SpbList
    //             item={item.item}
    //             index={item.index}
    //             withProjectName={true}
    //             onPress={() => {
    //                 console.log("ANJENG")
    //                 // navigate("DetailSPB")
    //             }}
    //         />
    //     }}
    // />
    return (
        <View style={{ padding: 16 }}>
            {item.map(function (item, index) {
                return <SpbList
                    item={item}
                    index={index}
                    withProjectName={true}
                    onPress={() => {
                        console.log("ANJENG")
                        // navigate("DetailSPB")
                    }}
                />
            })
            }

        </View>
    )
}