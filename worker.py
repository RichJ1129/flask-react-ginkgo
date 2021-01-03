"""Sets up the redis connection and the redis queue."""
import os

import redis
from rq import Queue, Connection, Worker

redis_conn = redis.Redis(
    host=os.getenv("REDIS_HOST", "127.0.0.1"),
    port=os.getenv("REDIS_PORT", "6379"),
    password=os.getenv("REDIS_PASSWORD", ""),
)
listen = ['high', 'default', 'low']

# redis_conn = redis.from_url('os.environ['REDIS_URL']')
# redis_queue = Queue(connection=redis_conn)

if __name__ == '__main__':
    with Connection(redis_conn):
        worker = Worker(map(Queue, listen))
        worker.work()