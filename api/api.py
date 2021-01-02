import json
from flask import Flask, session, jsonify, request, render_template, abort
import random
from Bio import SeqIO
import datetime
import os
from rq.job import Job
from redis_resc import redis_conn, redis_queue
from functions import search_for_protein


app = Flask(__name__)
app.permanent_session_lifetime = datetime.timedelta(days=365)
app.secret_key = 'any random string'



@app.route('/api/get_proteins', methods=['GET'])
def get_found_proteins():
	all_sequences = []

	# session.clear()
	for name in session:
		sequence_iteration = get_results(session[name])
		sequence_iteration = sequence_iteration['Sequence Info']

		all_sequences.append({'name': sequence_iteration['name'], 'start_pos': sequence_iteration['start_pos'],
							  'end_pos': sequence_iteration['end_pos'],
							  'search_string': sequence_iteration['search_string'],
							  'time': sequence_iteration['time']})

	return jsonify({'sequences': all_sequences})
	return 'hello'


@app.route('/api/search_protein', methods=['POST'])
def search_queue():

	search_string = request.json
	job = redis_queue.enqueue(search_for_protein, search_string)

	session[search_string['sequence']] = job.get_id()

	return jsonify({"job_id": job.id})


@app.route("/api/results/<job_key>", methods=['GET'])
def get_results(job_key):
	"""Takes a job_id and gets it's result as long as it has been completed"""
	job = Job.fetch(job_key, connection=redis_conn)

	if job.is_finished:
		return job.result
	else:
		return 'Not Found'

@app.route("/check_status/<job_key>")
def check_status(job_key):
    """Takes a job_id and checks its status in redis queue."""
    try:
        job = Job.fetch(job_key, connection=redis_conn)
    except Exception as exception:
        abort(404, description=exception)

    return jsonify({"job_id": job.id, "job_status": job.get_status()})


if __name__ == '__main__':
	app.run()
