import React from 'react'
import { Divider, Skeleton, Stack } from '../../../../tmd'
import IcPipe from '../../../assets/icons/pipe.svg'
import IcPO from '../../../assets/icons/ic_po.svg'
import { colors } from '../../../../tmd/styles/colors'
import { View } from 'react-native'

export function SPBListShimmer() {
  return (
    <View style={{ height: 150}}>
      <Stack spacing={8} style={{ borderRadius: 16, borderColor: colors.neutral.neutral_40, borderWidth: 1, marginHorizontal: 16, paddingVertical: 16, flex: 1 }}>
        <Stack spacing={16} direction='row' style={{ paddingHorizontal: 12 }}>
          <IcPipe />
          <Stack spacing={4} style={{ marginLeft: 8, flex: 1, justifyContent: 'center' }}>
            <Skeleton />
            <Skeleton style={{ width: '20%' }} />
          </Stack>
          <Skeleton style={{ width: '20%', alignSelf: 'center' }} />
        </Stack>

        <Divider />

        <Stack spacing={16} direction='row' style={{ flex: 1, paddingHorizontal: 12 }}>
          <Skeleton style={{ flex: 1 }} />
          <Skeleton style={{ flex: 1 }} />
        </Stack>

        <Divider />

        <Stack spacing={16} direction='row' style={{ flex: 1, paddingHorizontal: 12, justifyContent: 'space-between' }}>
          <Skeleton height={30} style={{ width: '20%' }} />
          <Skeleton height={30} style={{ width: '20%' }} />
        </Stack>
      </Stack>

    </View>
  )
}

export function POListShimmer() {
  return (
    <Stack spacing={8} style={{ borderRadius: 16, borderColor: colors.neutral.neutral_40, borderWidth: 1, marginHorizontal: 16, paddingVertical: 16 }}>
      <Stack spacing={16} direction='row' style={{ paddingHorizontal: 12 }}>
        <IcPO />
        <Stack spacing={4} style={{ marginLeft: 8, flex: 1, justifyContent: 'center' }}>
          <Skeleton />
          <Skeleton style={{ width: '20%' }} />
        </Stack>
        <Skeleton style={{ width: '20%', alignSelf: 'center' }} />
      </Stack>

      <Divider />

      <Stack spacing={16} direction='row' style={{ flex: 1, paddingHorizontal: 12 }}>
        <Skeleton style={{ flex: 1 }} />
        <Skeleton style={{ flex: 1 }} />
      </Stack>

      <Divider />

      <Stack spacing={16} direction='row' style={{ flex: 1, paddingHorizontal: 12, justifyContent: 'space-between' }}>
        <Skeleton height={30} style={{ width: '20%' }} />
        <Skeleton height={30} style={{ width: '20%' }} />
      </Stack>
    </Stack>
  )
}


export default {
  POListShimmer, SPBListShimmer
}