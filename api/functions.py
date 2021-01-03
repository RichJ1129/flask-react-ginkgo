import json
from flask import Flask, session, jsonify, request, render_template
import random
from Bio import SeqIO
import datetime
import os.path

permanent_session_lifetime = datetime.timedelta(days=365)

def search_for_protein(search_string):
	print(os.path.dirname(__file__))

	seq_files = ['NC_000852.fasta', 'NC_007346.fasta', 'NC_008724.fasta', 'NC_009899.fasta', 'NC_014637.fasta',
				 'NC_020104.fasta', 'NC_023423.fasta', 'NC_023640.fasta', 'NC_023719.fasta', 'NC_027867.fasta']

	searched_files = set()

	search_string = search_string['sequence'].upper()
	search_string = search_string.replace('\n', '')
	search_string = search_string.replace(' ', '')

	seq_information = {
		'name': '',
		'start_pos': -1,
		'end_pos': -1,
		'search_string': search_string,
		'time': datetime.datetime.today()
	}

	if len(search_string) == 0:
		seq_information['name'] = "Sequence length cannot be 0"
		session[search_string] = seq_information
		return seq_information

	while len(searched_files) < len(seq_files):
		random_file_choice = random.choice(seq_files)
		if random_file_choice not in searched_files:
			searched_files.add(random_file_choice)
			for seq_record in SeqIO.parse(os.path.dirname(__file__) + "/static/proteins/" + random_file_choice, "fasta"):
				random_file_string = str(seq_record.seq)
				random_file_string = random_file_string.replace('\n', '')
				search_result = random_file_string.find(search_string)
				search_result += 1
				if search_string in seq_record.seq:
					seq_information['name'] = seq_record.description
					seq_information['start_pos'] = search_result
					seq_information['end_pos'] = search_result + len(search_string) - 1
					return {'Sequence Info': seq_information}

	seq_information['name'] = "Sequence not Found"
	return {'Sequence Info': seq_information}
