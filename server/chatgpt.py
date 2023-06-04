"""
Wrapper around chatgpt api
"""

import openai
import json
import os

API_KEY = os.environ.get("OPENAI_API_KEY")

openai.api_key = API_KEY

EXAMPLE_RESPONSE  = {
    "team": "Cavaliers",
    "sentiment_score": 3,
    "entities_to_sentiment": {
        "George Hill": 3,
        "J.R. Smith": 2,
        "LeBron James": 4,
        "Kevin Love": 3,
        "Tristan Thompson": 2
    }
}

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
RT @NBA: Game 3 of the #NBAFinals is underway!

#WhateverItTakes x #DubNation 

: #NBAonABC
"""

class ChatGPT:
    def __init__(self):
        pass

    def prompt_gpt(self, prompt: str, verbose=False) -> dict:
        """
        Return the result of the prompt
        Follow format of EXAMPLE_RESULT above
        """
        if verbose:
            print("Running following prompt")
            print(prompt)
    
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Don't provide any explanation for your answers."},
                {"role": "user", "content": prompt}
            ]
        )
        try:
            response_content = json.loads(response["choices"][0]["message"]["content"])
            print("response: ", response["choices"][0]["message"]["content"])
            return response_content
        except:
            print("Failed to decode chatgpt response: SKIPPING TWEET")
            return None


if __name__ == '__main__':
    gpt = ChatGPT()
    gpt.prompt_gpt(EXAMPLE_PROMPT)