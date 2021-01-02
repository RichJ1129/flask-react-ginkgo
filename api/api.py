from flask import Flask, session, jsonify, request, abort, make_response
import datetime
import os
from rq.job import Job
from rq import Queue
from worker import redis_conn
from .functions import search_for_protein
from flask_cors import CORS, cross_origin


app = Flask(__name__, static_folder='../build', static_url_path='/')
app.permanent_session_lifetime = datetime.timedelta(days=365)
app.secret_key = 'any random string'
cors = CORS(app)

redis_queue = Queue(connection=redis_conn)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/get_proteins', methods=['GET'])
def get_found_proteins():
	all_sequences = []

	for name in session:
		print('1: ', name)
		print('2:', session[name])
		if name == 'empty':
			continue

		sequence_iteration = get_results(session[name])
		print('3: ', sequence_iteration)
		sequence_iteration = sequence_iteration['Sequence Info']
		print('4: ', sequence_iteration)

		all_sequences.append({'name': sequence_iteration['name'],
							  'start_pos': sequence_iteration['start_pos'],
							  'end_pos': sequence_iteration['end_pos'],
							  'search_string': sequence_iteration['search_string'],
							  'time': sequence_iteration['time']})

	all_sequences = sorted(all_sequences, key=lambda i: i['time'], reverse=True)

	return jsonify({'sequences': all_sequences})


@app.route('/api/clear_searches', methods=['GET'])
def clear_searches():
	session.clear()

	return 'Sessions Cleared'


@app.route('/api/search_protein', methods=['POST'])
def search_queue():

	search_string = request.json
	job = redis_queue.enqueue(search_for_protein, search_string, result_ttl=500)

	if search_string['sequence'] == '':
		session['empty'] = job.get_id()
		res = make_response("Not Acceptable")
		res.status_code = 406
		return res
	else:
		session[search_string['sequence']] = job.get_id()
		return jsonify({"job_id": job.id})


@app.route("/api/results/<job_key>", methods=['GET'])
def get_results(job_key):
	"""Takes a job_id and gets it's result as long as it has been completed"""
	job = Job.fetch(job_key, connection=redis_conn)
	print(job)

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

