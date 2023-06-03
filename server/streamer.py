import pandas as pd
import time
from chatgpt import ChatGPT

class Tweet:
    def __init__(self, text):
        self.text = text

class TweetSentimentResult:
    def __init__(self, tweet: Tweet, team: str, sentiment_score: int):
        assert team in ["Warriors", "Cavliers"]
        assert sentiment_score <= 5 and sentiment_score >= -5

        self.tweet = tweet
        self.team = team
        self.sentiment_score = sentiment_score

    def create_dictionary_representation(self):
        return {
            "text": self.tweet.text,
            "team": self.team,
            "sentiment_score": self.sentiment_score
        }
    
    @staticmethod
    def from_dict(dict):
        
        pass

class Streamer: 
    """
    """
    def __init__(self, csv_path):
        self.df = pd.read_csv(csv_path)
        self.curr_index = 0
        self.tweets= []
        
    def get_next_tweet(self):
        next_tweet_text = self.df.iloc[self.curr_index]['text']
        next_tweet = Tweet(next_tweet_text)
        self.tweets.append(next_tweet)

        self.curr_index += 1

        return next_tweet

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
def construct_prompt(tweet: Tweet):
    return EXAMPLE_PROMPT + tweet.text



class Processor:
    def __init__(self, streamer: Streamer):
        self.streamer = streamer
        self.chatgpt = ChatGPT()
        self.processed_tweets = []

    def begin_processing(self):
        for i in range(1,2):
            time.sleep(0.2)
            next_tweet = self.streamer.get_next_tweet()

            # Get the sentiment result of the tweet
            result = self.chatgpt.prompt_gpt(construct_prompt(next_tweet))
            result_obj = TweetSentimentResult.from_dict({"test": "hi"})
            

 
