import React from 'react';
import FakeTweet from 'fake-tweet';
import 'react-fake-tweet/dist/index.css';
import './CustomTweet.css';
import {Container} from "@mui/material";
import { TeamLogoUrlMapping } from '../utils/utils';

export const CustomTweet = () => {
    const config = {
        user: {
            nickname: "thada",
            name: "Tanmaya Hada",
            avatar: TeamLogoUrlMapping.get('Lakers') || '',
            verified: false,
            locked: false,
        },
        display: "default",
        text: "I'm a Laker's simp.",
        image: "",
        date: "3:32 PM · Feb 14, 1997",
        app: "Twitter for iPhone",
        retweets: 32000,
        quotedTweets: 100,
        likes: 12700
    };
    return (
        <Container maxWidth={'md'}>
            <FakeTweet config={config} />
        </Container>
    );
}