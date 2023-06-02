import pandas as pd

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

class Streamer: 
    """
    """
    def __init__(self, csv_path):
        self.df = pd.read_csv(csv_path)
        self.curr_index = 0
        self.tweets= []
        
    def load_next_tweet(self):
        next_tweet_text = self.df.iloc[self.curr_index]['text']
        next_tweet = Tweet(next_tweet_text)
        self.tweets.append(next_tweet)

    def get_and_refresh_tweet_buffer(self):
        co = self.tweets.copy()
        self.tweets = []
        return co

    
    