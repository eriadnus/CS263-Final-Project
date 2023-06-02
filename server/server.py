from flask import Flask, request
import json

app = Flask(__name__)


def fetch_sentiment_analysis(not_before: int) -> dict:
    """
    Given a not_before unix timestamp, fetch all sentiment analyzed tweets *after* the time.
    """
    pass


# Route takes the form /analysis?notBefore=1543409290654
@app.route("/analysis")
def get_sentiment_analysis():
    """
    Given a unix timestamp notBefore, return all the sentiment-analyzed tweets of the following form.
    [
       {
           TODO: Albert/Tanmaya decide on the shape of this object
       }
    ]
    """
    print('Received notBefore unix timestamp: {}'.format(request.args.get('notBefore', type=int)))
    response = app.response_class(
        response=json.dumps(fetch_sentiment_analysis(request.args.get('notBefore', type=int))),
        status=200,
        mimetype='application/json',
    )
    return response