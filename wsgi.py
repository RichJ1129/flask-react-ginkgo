from main import api
import os

if __name__ == "__main__":
	api.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

