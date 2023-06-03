import React, {useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Typography} from "@mui/material";
import {TeamLogo} from "./TeamLogo";
import {CustomTweet, CustomTweetProps} from "./CustomTweet";
import {HorizontalBar} from "./HorizontalBar";
import {Team, TeamHexColorMapping} from "../utils/utils";

interface DashboardProps {
    leftTeam: Team;
    rightTeam: Team;
}

const defaultTweet: CustomTweetProps = {
    team: 'Lakers',
    user: {
        nickname: 'thada',
        name: 'Tanmaya Hada',
    },
    text: 'Let\'s go Lakers!',
    date: new Date(),
    retweets: 0,
    quotedTweets: 0,
    likes: 0
}
export const Dashboard = (props: DashboardProps) => {
    const [aggregateScore, setAggregateScore] = useState(50);
    const [tweetCount, setTweetCount] = useState(1);
    const [tweet, setTweet] = useState(defaultTweet);
    const [liveData, setLiveData] = useState([]);
    const [tableData, setTableData] = useState([]);
    return (
        <Box>
            <Grid2 container sx={{pt: 8}} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid2 xs={12} md={12} lg={12}>
                    <Typography align={'center'} variant={'h2'} component={'h2'}>
                        NBA Tweet Sentiment Analysis
                    </Typography>
                </Grid2>
                <Grid2 container xs={12} md={12} lg={12}>
                    <Grid2 xs={3} md={3} lg={3}>
                        <TeamLogo teamLogo={props.leftTeam} />
                    </Grid2>
                    <Grid2 xs={6} md={6} lg={6}>
                        <CustomTweet
                            {...tweet}
                        />
                    </Grid2>
                    <Grid2 xs={3} md={3} lg={3}>
                        <TeamLogo teamLogo={props.rightTeam} />
                    </Grid2>
                </Grid2>
                <Grid2 xs={12} md={12} lg={12}>
                    <HorizontalBar
                        leftTeamWinningProbability={aggregateScore / tweetCount}
                        leftTeamColor={TeamHexColorMapping.get(props.leftTeam) || '#000000'}
                        rightTeamColor={TeamHexColorMapping.get(props.rightTeam) || '#000000'}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
}