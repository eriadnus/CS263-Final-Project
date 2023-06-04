from streamer import Streamer
from streamer import Processor

CSV_PATH = "../data/TweetsNBA.csv"
streamer = Streamer(CSV_PATH)
processor = Processor(streamer=streamer,max_tweets_to_process=100)
processor.begin_processing()