from flask import Flask, request
from flask_cors import CORS
import json
from utils import read_json_file

app = Flask(__name__)
CORS(app)

def fetch_sentiment_analysis(not_before: int) -> dict:
    """
    Given a not_before unix timestamp, fetch all sentiment analyzed tweets *after* the time.
    """
    tweets = read_json_file("output.json")
    if not_before:
        tweets = [tweet for tweet in tweets if tweet['tweet_index']  > not_before]

    return tweets


# Route takes the form /analysis?notBefore=1543409290654
@app.route("/analysis")
def get_sentiment_analysis():
    """
    Given an int tweet_index notBefore, return all the sentiment-analyzed tweets of the following form.
    [
       {
           TODO: Albert/Tanmaya decide on the shape of this object
       }
    ]
    """
    print('Received notBefore tweet index: {}'.format(request.args.get('notBefore', type=int)))
    response = app.response_class(
        response=json.dumps(fetch_sentiment_analysis(request.args.get('notBefore', type=int))),
        status=200,
        mimetype='application/json',
    )
    return response

if __name__ == "__main__":
    app.run(port=8000, debug=True)