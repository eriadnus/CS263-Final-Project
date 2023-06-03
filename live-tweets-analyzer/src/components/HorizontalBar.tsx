import React from 'react';
import {Container, LinearProgress} from '@mui/material';

type HexColor = `#${string}`;

interface HorizontalBarProps {
    leftTeamWinningProbability: number,
    leftTeamColor: HexColor,
    rightTeamColor: HexColor
}
export const HorizontalBar = (props: HorizontalBarProps) => {
    return (
        <Container maxWidth={'sm'}>
            <LinearProgress
                variant={'determinate'}
                sx={{
                    height: 30,
                    backgroundColor: props.rightTeamColor,
                    '& .MuiLinearProgress-barColorPrimary': {
                        backgroundColor: props.leftTeamColor,
                    }
                }}
                value={props.leftTeamWinningProbability}
            />
        </Container>
    );
}