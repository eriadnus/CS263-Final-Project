from streamer import Streamer
from streamer import Processor

CSV_PATH = "../data/TweetsNBA.csv"
streamer = Streamer(CSV_PATH)
processor = Processor(streamer=streamer)
processor.begin_processing()