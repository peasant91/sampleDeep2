import React from 'react'
import { View } from 'react-native'
import Typography from '../../tmd/components/Typography/Typography'
import { colors } from '../../tmd/styles/colors'
import ICLogo from '../assets/illusts/icon_logo.svg'

const SplashScreen = () => {
    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                <ICLogo style={{ width: '80%', alignSelf: 'center' }} />
            </View>

            <View style={{position: 'absolute', bottom: 16, alignSelf: 'center'}}>
                <Typography type='body1' style={{color: colors.neutral.neutral_90}}>Versi 1.1</Typography>
            </View>
        </>
    )
}

export default SplashScreen;