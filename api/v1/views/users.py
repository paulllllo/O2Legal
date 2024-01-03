#!/usr/bin/python3
""" objects that handle all default RestFul API actions for users """
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def get_user():
    """
    Create a user or retrieve the user
    """
    print('get user route POST')
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'email' not in request.get_json():
        abort(400, description="Missing email")

    data = request.get_json()
    users = storage.all(User)
    for user in users.values():
        if (user.email == data['email']) or (user.username == data['username']):
            print(f"Inside first if -- user.email = {user.email} -- data['email'] = {data['email']} user.username = {user.username} -- data['username'] = {data['username']}")
            if (user.email == data['email']) and (user.username == data['username']):
                return make_response(jsonify(user.to_dict()), 200)
            else:
                abort(404, description="User already exists")
    new_user = User(**data)
    new_user.save()
    return make_response(jsonify(new_user.to_dict()), 201)
