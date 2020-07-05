# coding=utf-8
import os

import webapp2
import jinja2

# from flask import Flask, make_response, jsonify
# app2 = Flask(__name__)

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir), autoescape=True)

import urllib2
import json

class MainPage(webapp2.RequestHandler):
	def get(self):
		self.response.out.write(jinja_env.get_template('index.html').render())

import logging
class JSONPage(webapp2.RequestHandler):
	def post(self):
		global j
		global s
		j = self.request.POST.get('joyLikelihood')
		s = self.request.POST.get('sorrowLikelihood')

# @app2.route('/webhook')
# def webhook():
#     return 'Hello World!'

# # function for responses
# def results():

#     # return a fulfillment response
#     return {'fulfillmentText': 'This is a response from webhook.'}

# # create a route for webhook
# @app2.route('/dialogflow', methods=['GET', 'POST'])
# def dialogflow():
#     # return response
#     return make_response(jsonify(results()))

class DialogflowPage(webapp2.RequestHandler):
	def get(self):
		self.response.out.write(jinja_env.get_template('dialogflow.html').render(sentiment=j))
	def post(self):
		query = self.request.POST.get('queryResult')
		query_json = json.loads(query)
		logging.debug("INVOKED")
		logging.debug(query)
		if query_json['queryText'] == "come sto" or query_json['queryText'] == "qual e il mio umore":
			if j == "POSSIBLE":
				self.response.write(json.dumps({"fulfillmentMessages":[{"text":{"text":["Sei abbastanza rilassato. Mantieni la tua energia. Parlami di cosa stai pensando e analizzero meglio il tuo stato d'animo."]}}]}))
			if j == "LIKELY":
				self.response.write(json.dumps({"fulfillmentMessages":[{"text":{"text":["Sei abbastanza motivato. Continua così! Parlami di cosa stai pensando e analizzero meglio il tuo stato d'animo."]}}]}))
			if j == "VERY_LIKELY":
				self.response.write(json.dumps({"fulfillmentMessages":[{"text":{"text":["Sei molto motivato. Continua così! Parlami di cosa stai pensando e analizzero meglio il tuo stato d'animo."]}}]}))
			if j == "UNLIKELY":
				if s == "UNLIKELY":
					self.response.write(json.dumps({"fulfillmentMessages":[{"text":{"text":["Non riconosco il tuo umore. Parlami di cosa stai pensando e analizzero meglio il tuo stato d'animo."]}}]}))
				if s == "POSSIBLE":
					self.response.write(json.dumps({"fulfillmentMessages":[{"text":{"text":["Sembri un po' stanco. Ti consiglio una breve pausa. Parlami di cosa stai pensando e analizzero meglio il tuo stato d'animo."]}}]}))
				if s == "LIKELY":
					self.response.write(json.dumps({"fulfillmentMessages":[{"text":{"text":["Sei abbastanza stanco. Ti consiglio una pausa. Parlami di cosa stai pensando e analizzero meglio il tuo stato d'animo."]}}]}))
				if s == "VERY_LIKELY":
					self.response.write(json.dumps({"fulfillmentMessages":[{"text":{"text":["Sei molto stanco. Rilassati! Parlami di cosa stai pensando e analizzero meglio il tuo stato d'animo."]}}]}))
app = webapp2.WSGIApplication([
	('/', MainPage),
	('/json', JSONPage),
	('/dialogflow', DialogflowPage)
], debug = True)

# if __name__ == '__main__':
#    app2.run()
