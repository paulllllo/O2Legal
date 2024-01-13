#function to test the create_event function
from calen_ser import create_event
from Google import convert_to_RFC_datetime

response = create_event(client='onepaul00@gmail.com', start=convert_to_RFC_datetime(2024, 2, 2, 10, 30), \
    end=convert_to_RFC_datetime(2024, 2, 2, 11, 0), summary='Test 2 of funtion',\
    description='Created this to test  the importation of create_event')

print(response)

