import React from 'react';
import FakeTweet from 'fake-tweet';
import './CustomTweet.css';
import {Container} from "@mui/material";
import {Team, TeamLogoUrlMapping} from '../utils/utils';
import {strptime} from "../utils/strptime";

export interface CustomTweetProps {
    user: {
        name: string,
        nickname: string,
    }
    team: Team,
    text: string,
    date: Date,
    retweets: number,
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
        date: strptime('%I:%M %p · %b %e, %Y', props.date),
        app: "Twitter for iPhone",
        retweets: props.retweets,
        quotedTweets: 0,
        likes: props.likes
    };
    return (
        <Container maxWidth={'md'}>
            <FakeTweet config={config} />
        </Container>
    );
}