import pandas as pd
import time
from chatgpt import ChatGPT
from utils import save_to_json, convert_to_unix_timestamp

class Streamer: 
    """
    """
    def __init__(self, csv_path):
        self.df = self.get_df(csv_path)
        self.curr_index = 0
        self.tweets= []

    def get_df(self, csv_path):
        df = pd.read_csv(csv_path, encoding='Latin-1')
        df = df[(df['lang'] == 'en') & (df['name'].str.contains("<")== False) & (df['text'].str.contains("<")== False) & (df['text'].str.contains("RT")== False)].sample(200, random_state=0).sort_index()
        return df
        
    def get_next_tweet(self):
        tweet_row = self.df.iloc[self.curr_index]

        tweet = create_tweet(tweet_row, self.curr_index)

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

def create_tweet(df_row,i):
    tweet = {
        "text": df_row['text'],
        "date": df_row['created_at'],
        "unixtimestamp": convert_to_unix_timestamp(df_row['created_at']),
        "retweets": int(df_row['retweet_count']),
        "likes": int(df_row['favorite_count']),
        "user": {
            "name": df_row['name'],
            "nickname": df_row['screen_name']
        },
        "tweet_index":int(i) 
    }
    return tweet

def try_to_fix(response):
        assert response != None

        for key in ["team", "sentiment_score"]:
            assert key in response
        assert response['team'] in ["Warriors", "Cavaliers"]

        if "entities_to_sentiment" not in response:
            response["entities_to_sentiment"] = {}

        entity_dict = response["entities_to_sentiment"]
        for key in entity_dict:
            value = int(entity_dict[key])
            assert (value >=-5 or value <=5)
            entity_dict[key] = value

class Processor:

    def __init__(self, streamer: Streamer, max_tweets_to_process=2):
        self.streamer = streamer
        self.chatgpt = ChatGPT()
        self.processed_tweets = []
        self.max_tweets_to_process = max_tweets_to_process

    def begin_processing(self):
        counter = 0

        while counter < self.max_tweets_to_process:
            # time.sleep(0.2)
            tweet = self.streamer.get_next_tweet()

            # Get the sentiment result of the tweet
            result = self.chatgpt.prompt_gpt(construct_prompt(tweet))
            # try_to_fix(result)
            try:
                try_to_fix(result)
            except:
                # Some error, either gpt returned None or we have
                # missing keys
                print("Failed to validate tweet no", counter)
                continue

            # Add any tweet metadata
            for key in tweet:
                result[key] = tweet[key]

            self.processed_tweets.append(result)

            save_to_json(self.processed_tweets, "output.json")

            counter += 1


            

 
