# Example Prompt to ChatGPT
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

# Classes
Streamer
- stream tweets from NBA tweets
- get_next_tweet

TweetResultGenerator
- generate tweet result
- call 

ChatGPT: wrapper around chatgpt API
- get_prompt_result(str: prompt) -> str: output
    handle making the api call and getting the result


# Proposed Format
[
    {
        "tweet_text": "Lebron the GOAT",
        "entity": "Cavaliers",
        "sentiment_score": "-3"
    },
    {
        "tweet_text": "Curry ",
        "entity": "Warriors",
        "sentiment_score": "4"
    },
    {
        "tweet_text": "great play by the warriors",
        "entity": "Warriors",
        "sentiment_score": "3"
    }     
]
