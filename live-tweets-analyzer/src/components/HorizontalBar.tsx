import React from 'react';
import {Container, LinearProgress, Typography} from '@mui/material';

export type HexColor = `#${string}`;

interface HorizontalBarProps {
    leftTeamWinningProbability: number,
    leftTeamColor: HexColor,
    rightTeamColor: HexColor
}
export const HorizontalBar = (props: HorizontalBarProps) => {
    return (
        <Container maxWidth={'sm'}>
            <Typography align={'center'} variant={'h6'} component={'h6'}>
                Who will win?
            </Typography>
            <LinearProgress
                variant={'determinate'}
                sx={{
                    height: 30,
                    backgroundColor: props.rightTeamColor,
                    '& .MuiLinearProgress-barColorPrimary': {
                        backgroundColor: props.leftTeamColor,
                    }
                }}
                value={props.leftTeamWinningProbability * 100}
            />
        </Container>
    );
}