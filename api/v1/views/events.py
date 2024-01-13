#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Events """
from models.event import Event
from models import storage
from datetime import datetime, timedelta
from dateutil import parser
from api.v1.views import app_views
from calen_ser import create_event
from Google import convert_to_RFC_datetime
from flask import abort, jsonify, make_response, request


@app_views.route('/events', methods=['GET'], strict_slashes=False)
def get_events():
    """
    Retrieves all Event objects
    """
    all_events = storage.all(Event).values()
    for event in all_events:
        temp = storage.get(Event, event.id)
        date = parser.isoparse(temp.date)
        if int(round(datetime.now().timestamp())) > int(round(date.timestamp())):
            storage.delete(temp)
    list_events = [event.to_dict() for event in all_events]
    return jsonify(list_events)


@app_views.route('/eventdates', methods=['GET'], strict_slashes=False)
def get_eventdates():
    """
    Retrieves all Event dates objects
    """
    all_events = storage.all(Event).values()
    list_dates = []
    for event in all_events:
        temp = storage.get(Event, event.id)
        date = parser.isoparse(temp.date)
        if int(round(datetime.now().timestamp())) > int(round(date.timestamp())):
            storage.delete(temp)
    list_dates = [event.date for event in all_events]
    return jsonify(list_dates)

@app_views.route('/events', methods=['POST'], strict_slashes=False)
def create_new_event():
    """
    Creates an Event
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'date' not in request.get_json():
        abort(400, description="Missing date")

    data = request.get_json()
    new_event = Event(**data)
    new_event.save()
    return make_response(jsonify(new_event.to_dict()), 201)

@app_views.route('/confirm-date', methods=['POST'], strict_slashes=False)
def confirm_date():
    """
    Confirms an appointment
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'id' not in request.get_json():
        abort(400, description="Missing id")

    data = request.get_json()
    event = storage.get(Event, data['id'])
    date = parser.isoparse(event.date)
    end_date = date + timedelta(minutes=30)
    try:
        create_event(**{'client':event.client, 'start':event.date, 'end':end_date.isoformat(), \
        'summary':event.topic, 'description':event.description})
        setattr(event, "state", "confirmed")
        event.save()
        return make_response(jsonify({"message": "Calendar event created successfully"}))
    except Exception as err:
        abort(500, description=err)


@app_views.route('/cancel-date', methods=['POST'], strict_slashes=False)
def cancel_date():
    """
    Cancel an appointment
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'id' not in request.get_json():
        abort(400, description="Missing id")

    data = request.get_json()
    event = storage.get(Event, data['id'])
    storage.delete(event)
    return make_response(jsonify(event.to_dict()))
