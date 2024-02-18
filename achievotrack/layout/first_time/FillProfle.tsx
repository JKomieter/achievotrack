import React from 'react'
import ProfileInfo from './ProfileInfo';

export default function FillProfle({
    setStage
}: {
    setStage: React.Dispatch<React.SetStateAction<number>>
}) {;
    const stages = {
        1: <ProfileInfo setStage={setStage} />,
        2: <></>
    } as Record<number, JSX.Element>;

    return (
        <>
            {stages[1]}
        </>
    )
}
