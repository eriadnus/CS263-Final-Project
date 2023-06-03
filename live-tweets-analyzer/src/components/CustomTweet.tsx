import React from 'react';
import FakeTweet from 'fake-tweet';
import './CustomTweet.css';
import {Container} from "@mui/material";
import {Team, TeamLogoUrlMapping} from '../utils/utils';
import {strptime} from "../utils/strptime";

export interface CustomTweetProps {
    team: Team,
    user: {
        nickname: string,
        name: string,
    }
    text: string,
    date: Date,
    retweets: number,
    quotedTweets: number,
    likes: number
}
export const CustomTweet = (props: CustomTweetProps) => {
    const config = {
        user: {
            nickname: props.user.nickname,
            name: props.user.name,
            avatar: TeamLogoUrlMapping.get(props.team) || '',
            verified: false,
            locked: false,
        },
        display: "default",
        text: props.text,
        image: "",
        // date: "3:32 PM · Feb 14, 1997",
        date: strptime('%I:%M %p · %b %e, %Y', props.date),
        app: "Twitter for iPhone",
        retweets: props.retweets,
        quotedTweets: props.quotedTweets,
        likes: props.likes
    };
    return (
        <Container maxWidth={'md'}>
            <FakeTweet config={config} />
        </Container>
    );
}