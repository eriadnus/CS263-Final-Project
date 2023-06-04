import pandas as pd
import time
from chatgpt import ChatGPT
from utils import save_to_json, convert_to_unix_timestamp

class Streamer: 
    """
    """
    def __init__(self, csv_path):
        self.df = pd.read_csv(csv_path, encoding='Latin-1')
        self.curr_index = 0
        self.tweets= []
        
    def get_next_tweet(self):
        tweet_row = self.df.iloc[self.curr_index]

        tweet = create_tweet(tweet_row)

        self.curr_index += 1

        return tweet

    def get_and_refresh_tweet_buffer(self):
        co = self.tweets.copy()
        self.tweets = []
        return co
    
EXAMPLE_PROMPT = """
The task is to take some text and determine whether the text is leaning towards the Warriors or the Cavaliers.
Next, determine the sentiment towards the team on a scale from 0 to 5.
Addionally, extract any entities found in the tweet and assign a sentiment score to that entity.

Some additional rules:
- team can only be either "Warriors" or "Cavaliers"

ONLY output your analysis in the following format, without any additional tokens
{
    "team": "Warriors"
    "sentiment_score": 4,
    "entities_to_sentiment": 
    {
        "Draymond Green":  3
    }
}

Here is the text to analyze:
"""
def construct_prompt(tweet):
    return EXAMPLE_PROMPT + tweet['text']

def create_tweet(df_row):
    tweet = {
        "text": df_row['text'],
        "date": df_row['created_at'],
        "unixtimestamp": convert_to_unix_timestamp(df_row['created_at']),
        "retweets": int(df_row['retweet_count']),
        "likes": int(df_row['favorite_count'])
    }
    return tweet

class Processor:
    MAX_TWEETS_TO_PROCESS = 100 # Just so we accidentally make too many API calls for testing

    def __init__(self, streamer: Streamer):
        self.streamer = streamer
        self.chatgpt = ChatGPT()
        self.processed_tweets = []

    def begin_processing(self):
        for i in range(1,Processor.MAX_TWEETS_TO_PROCESS):
            # time.sleep(0.2)
            tweet = self.streamer.get_next_tweet()

            # Get the sentiment result of the tweet
            result = self.chatgpt.prompt_gpt(construct_prompt(tweet))
            # Add any tweet metadata
            for key in tweet:
                result[key] = tweet[key]

            self.processed_tweets.append(result)

            save_to_json(self.processed_tweets, "output.json")


            

 
