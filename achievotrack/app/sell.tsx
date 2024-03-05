import { View, Text } from '@/components/Themed'
import Listing from '@/layout/market/Listing'
import ListCongratulations from '@/layout/sell/ListCongratulations'
import SellHero from '@/layout/sell/SellHero'
import SellRules from '@/layout/sell/SellRules'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'


export default function Sell() {
    const [ stage, setStage ] = useState(1)

    const stages = {
        1: <SellRules setStage={setStage} />,
        2: <Listing />,
        3: <ListCongratulations />
    } as Record<number, React.JSX.Element>

    return stages[stage]
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
})
