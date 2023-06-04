import React, {useState} from 'react';
import { useInterval } from 'usehooks-ts';
import Grid2 from '@mui/material/Unstable_Grid2';
import {
    Box,
    Button,
    Typography
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import {TeamLogo} from './TeamLogo';
import {CustomTweet, CustomTweetProps} from './CustomTweet';
import {HorizontalBar} from "./HorizontalBar";
import {Team, TeamHexColorMapping} from "../utils/utils";
import {TweetTable} from "./TweetTable";

export interface TweetData {
    team: Team;
    sentiment_score: number;
    text: string;
    date: Date;
    retweets: number;
    likes: number;
}

const defaultTweet: CustomTweetProps = {
    team: 'Lakers',
    text: 'Let\'s go Lakers!',
    date: new Date(),
    retweets: 0,
    likes: 0
};

const defaultTweetData: TweetData = {
    team: 'Lakers',
    sentiment_score: 10,
    text: 'Let\'s go Lakers!',
    date: new Date(),
    retweets: 0,
    likes: 0
};

interface DashboardProps {
    leftTeam: Team;
    rightTeam: Team;
}

const MIN_SCORE = 0;
const MAX_SCORE = 10;
const DELAY_MILLIS = 500;
const MAX_TABLE_LENGTH = 5;
const NEW_TWEET_WEIGHT = 0.5;
const scaleLeftTeam = (input: number) => {
    const percentage = (input - MIN_SCORE) / MAX_SCORE
    return 50 * (1 + percentage);
}

const scaleRightTeam = (input: number) => {
    const percentage = (input - MIN_SCORE) / MAX_SCORE;
    return 50 * (1 - percentage);
}

export const Dashboard = (props: DashboardProps) => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [currentProbability, setCurrentProbability] = useState<number>(0.5);
    const [aggregateScore, setAggregateScore] = useState<number>(50);
    const [scoreCount, setScoreCount] = useState<number>(1);
    const [tweet, setTweet] = useState<CustomTweetProps>(defaultTweet);
    const [liveData, setLiveData] = useState<Array<TweetData>>([]);
    const [tableData, setTableData] = useState<Array<TweetData>>([]);

    // Update tweet and move live data to table data every second
    useInterval(
        () => {
            if (liveData.length == 0) {
                // TODO: Add data fetch
                const simulatedFetchedData: Array<TweetData> = [];
                for (let i = 0; i < 5; i++) {
                    const team: Team = Math.random() > 0.5 ? 'Cavaliers' : 'Warriors';
                    simulatedFetchedData.push(
                        {
                            team: team,
                            sentiment_score: Math.random() * 10,
                            text: `Let's go ${team}`,
                            date: new Date(),
                            retweets: 0,
                            likes: 0
                        }
                    );
                }
                setLiveData(simulatedFetchedData);
            } else {
                const curLiveData: Array<TweetData> = liveData;
                const curTableData: Array<TweetData> = tableData;
                if (curTableData.length == MAX_TABLE_LENGTH) {
                    curTableData.shift();
                }

                const curTweet = curLiveData.shift() || defaultTweetData;

                curTableData.push(curTweet);
                setTweet({
                    team: curTweet.team,
                    text: curTweet.text,
                    date: curTweet.date,
                    retweets: curTweet.retweets,
                    likes: curTweet.likes
                });
                const currentWeightedAggregate = aggregateScore / scoreCount;
                if (curTweet.team == props.leftTeam) {
                    setCurrentProbability((NEW_TWEET_WEIGHT * scaleLeftTeam(curTweet.sentiment_score) + (1 - NEW_TWEET_WEIGHT) * currentWeightedAggregate) / 100);
                    setAggregateScore(aggregateScore + scaleLeftTeam(curTweet.sentiment_score));
                } else {
                    setCurrentProbability((NEW_TWEET_WEIGHT * scaleRightTeam(curTweet.sentiment_score) + (1 - NEW_TWEET_WEIGHT) * currentWeightedAggregate) / 100);
                    setAggregateScore(aggregateScore + scaleRightTeam(curTweet.sentiment_score));
                }
                setScoreCount(scoreCount + 1)
                setLiveData(curLiveData);
                setTableData(curTableData);
            }
        },
        isRunning ? DELAY_MILLIS : null,
    );

    return (
        <Box sx={{ px: 32, py: 12 }}>
            <Grid2 container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid2 xs={12} md={12} lg={12}>
                    <Typography align={'center'} variant={'h2'} component={'h2'}>
                        NBA Tweet Sentiment Analysis
                    </Typography>
                </Grid2>
                <Grid2 xs={12} md={12} lg={12}>
                    <HorizontalBar
                        leftTeamWinningProbability={currentProbability}
                        leftTeamColor={TeamHexColorMapping.get(props.leftTeam) || '#000000'}
                        rightTeamColor={TeamHexColorMapping.get(props.rightTeam) || '#000000'}
                    />
                </Grid2>
                <Grid2 xs={12} md={12} lg={12}>
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Button onClick={() => {
                            setIsRunning(!isRunning);
                        }}>
                            {isRunning?
                                <StopCircleIcon/>
                                : <PlayCircleIcon/>
                            }
                        </Button>
                    </Box>
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
                    {tableData.length != 0 ?
                        <Box
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <TweetTable tableData={tableData}/>
                        </Box>
                        : null}
                </Grid2>
            </Grid2>
        </Box>
    );
}
