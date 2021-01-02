"""Sets up the redis connection and the redis queue."""
import os

import redis
from rq import Queue, Worker, Connection

# redis_conn = redis.Redis(
#     host=os.getenv("REDIS_HOST", "127.0.0.1"),
#     port=os.getenv("REDIS_PORT", "6379"),
#     password=os.getenv("REDIS_PASSWORD", ""),
# )

listen = ['high', 'default', 'low']
redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')

redis_conn = redis.from_url(redis_url)

if __name__ == '__main__':
    with Connection(redis_conn):
        worker = Worker(map(Queue, listen))
        worker.work()

