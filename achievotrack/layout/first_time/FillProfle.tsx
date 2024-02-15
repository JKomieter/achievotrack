import React from 'react'
import ProfileInfo from './ProfileInfo';

export default function FillProfle({
    setStage
}: {
    setStage: React.Dispatch<React.SetStateAction<number>>
}) {;
    const stages = {
        1: <ProfileInfo setStage={setStage} />
    } as Record<number, JSX.Element>;

    return (
        <>
            {stages[1]}
        </>
    )
}
