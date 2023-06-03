import json
from datetime import datetime

def save_to_json(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4, sort_keys=True)

def read_json_file(file_path):
    with open(file_path) as file:
        data = json.load(file)
    return data


def convert_to_unix_timestamp(date_string, date_format="%a %b %d %H:%M:%S %z %Y"):
    # Convert the string to a datetime object
    datetime_object = datetime.strptime(date_string, date_format)

    # Convert the datetime object to a Unix timestamp
    unix_timestamp = datetime_object.timestamp()

    # Convert the Unix timestamp to an integer
    unix_timestamp_int = int(unix_timestamp)

    return unix_timestamp_int