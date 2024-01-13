from Google import Create_Service, convert_to_RFC_datetime
import os

CLIENT_SECRET_FILE = "client_secret_136706650376-bavdpbp4npid8mb8cko7vj1un9h15emr.apps.googleusercontent.com.json"
API_NAME = "calendar"
API_VERSION = "v3"
SCOPES = ["https://www.googleapis.com/auth/calendar"]

calenId = ""
calenName = "O2legal booking test"

service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

#calenList_res = service.calendarList().list().execute()
#calenItems  = calenList_res.get('items')
#myCalenGen = filter(lambda x: calenName in x['summary'], calenItems)
#myCalen = next(myCalenGen)
#calenId = myCalen.get('id')

def get_calendar(name):
	calenList_res = service.calendarList().list().execute()
	calenItems  = calenList_res.get('items')
	myCalenGen = filter(lambda x: name in x['summary'], calenItems)
	return list(myCalenGen)


def create_calendar(body):
	if len(get_calendar(calenName)) == 0:
		createCalen_res = service.calendars().insert(body=body).execute()
		return createCalen_res
	return



def create_event(*args, **kwargs):
#	print(client, start, end, summary, description, calenId)
	print(kwargs)
	event_request_body = {
		'start': {
			'dateTime': kwargs['start']
		},
		'end': {
			'dateTime': kwargs['end']
		},
		"summary": kwargs['summary'],
		"description": kwargs['description'],
		"status": "confirmed",
		"transparency": "opaque",
		"attendees": [
			{
				"displayName": kwargs['client'],
				"email": kwargs['client'],
			}
		]
	}

	sendUpdates = "all"

	response = service.events().insert(
		calendarId = calenId,
		sendUpdates = sendUpdates,
		body = event_request_body
		).execute()

	print(f'***response*** {response}')


calen_ret = get_calendar(calenName)
if len(calen_ret) > 0:
	calenId = calen_ret[0].get('id')
else:
	request_body = {
		"summary": calenName
	}
	create_response = create_calendar(request_body)
	calenId =  create_response.get("id")
