import React from 'react';
import {Team, TeamLogoUrlMapping} from "../utils/utils";
import {Box} from "@mui/material";

interface TeamLogoProps {
    teamLogo: Team;
}
export const TeamLogo = (props: TeamLogoProps) => {
    return (
        <Box
            component={'img'}
            alt={`Team Logo for ${props.teamLogo}`}
            src={TeamLogoUrlMapping.get(props.teamLogo) || ''}
        />
    )
}