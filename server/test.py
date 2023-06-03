from streamer import Streamer
from streamer import Processor

"""
Streamer()
Processor(streamer)
processor.begin_processing()
processor.get_results
"""

CSV_PATH = "../data/TweetsNBA.csv"
streamer = Streamer(CSV_PATH)

# for i in range(1,10):
#     streamer.load_next_tweet()
# print(streamer.get_and_refresh_tweet_buffer())

processor = Processor(streamer=streamer)
processor.begin_processing()


EXAMPLE_PROMPT = """
Please decide which team this tweet is leaning towards, the Warriors or the Cavaliers.
Provide a sentiment score from -5 to +5, where a higher score indicates a more positive sentiment towards the Warriors.
Addionally, extract any entities found in the tweet and assign a sentiment score to that entity.

Here is the input: 
tweet: {
    [put tweet information here]
}

Return the sentiment_score following this format:
{
    "overall_sentiment_score": 4,
    "entities_to_sentiment": 
    {
        "Draymond Green":  3
    }
}
"""