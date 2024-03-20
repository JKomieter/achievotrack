import React, { useState } from 'react'
import ProfileInfo from './ProfileInfo';
import LoadingScreen from './LoadingScreen';

export default function FillProfile() {;
    const [stage, setStage] = useState(1);

    const stages = {
        1: <ProfileInfo setStage={setStage} />,
        2: <LoadingScreen />
    } as Record<number, JSX.Element>;

    return (
        <>
            {stages[stage]}
        </>
    )
}
