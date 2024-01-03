from Google import Create_Service

CLIENT_SECRET_FILE = "client_secret_136706650376-bavdpbp4npid8mb8cko7vj1un9h15emr.apps.googleusercontent.com.json"
API_NAME = "Calendar"
API_VERSION = "v3"
SCOPES = ["https://www.googleapis.com/auth/calendar"]

service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

print(dir(service))
