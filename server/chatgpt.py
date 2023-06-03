"""
Wrapper around chatgpt api
"""

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

class ChatGPT:
    def __init__(self):
        pass

    def prompt_gpt(self, prompt: str) -> dict:
        """
        Return the result of the prompt
        Follow format of EXAMPLE_RESULT above
        """
        print("Running following prompt")
        print(prompt)
        return EXAMPLE_RESPONSE.copy()
