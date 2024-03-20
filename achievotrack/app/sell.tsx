import Listing from '@/layout/market/Listing'
import ListCongratulations from '@/layout/sell/ListCongratulations'
import SellRules from '@/layout/sell/SellRules'
import React, { useState } from 'react'

export default function Sell() {
    const [ stage, setStage ] = useState(1)

    const stages = {
        1: <SellRules setStage={setStage} />,
        2: <Listing />,
        3: <ListCongratulations />
    } as Record<number, React.JSX.Element>

    return stages[stage]
}