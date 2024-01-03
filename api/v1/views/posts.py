#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Posts """
from models.post import Post
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


def get_upvotes(element):
        if(element.get('upvotes')):
                upvotes = element['upvotes']
                return len(upvotes)
        return 0


@app_views.route('/posts', methods=['GET'], strict_slashes=False)
def get_posts():
    """
    Retrieves the sorted list of all Post objects
    """
    print("Hurray O2legal baby")
    all_posts = storage.all(Post).values()
    for post in all_posts:
        temp = storage.get(Post, post.id)
        comments = temp.comments
        len_comments = len(comments)
        setattr(post, 'comment_count', len_comments)
        post.save()
    list_posts = [post.to_dict() for post in all_posts]
    for post in list_posts:
        if post.get('comments'):
                del post['comments']
    list_posts.sort(key=get_upvotes, reverse=True)
    return jsonify(list_posts)

@app_views.route('/post/<post_id>', methods=['GET'], strict_slashes=False)
def get_post(post_id):
    """
    Retrieves a single post
    """
    post = storage.get(Post, post_id)
    comments = post.comments
    setattr(post, 'comment_count', len(comments))
    post.save()
    post_dict = post.to_dict()
    comments_dict = [comment.to_dict() for comment in comments]
    for comment in comments_dict:
        author = storage.get(User, comment['author_id'])
        comment['author'] = author.username
    comments_dict.sort(key=get_upvotes, reverse=True)
    post_dict['comments'] = comments_dict
    return jsonify(post_dict)


@app_views.route('/posts', methods=['POST'], strict_slashes=False)
def create_post():
    """
    Creates a Post
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'author_id' not in request.get_json():
        abort(400, description="Missing author_id")

    data = request.get_json()
    new_post = Post(**data)
    new_post.save()
    return make_response(jsonify(new_post.to_dict()), 201)

@app_views.route('/post/<post_id>/addUpvote', methods=['POST'], strict_slashes=False)
def upvote_post(post_id):
    """
    upvote a post
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'user_id' not in request.get_json():
        abort(400, description="Missing user_id")

    data = request.get_json()
    post = storage.get(Post, post_id)
    post.upvotes.append(data['user_id'])
    post.save()
    return make_response(jsonify(post.to_dict()), 200)

@app_views.route('/post/<post_id>/removeUpvote', methods=['POST'], strict_slashes=False)
def remove_upvote(post_id):
    """
    remove upvote from a post
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'user_id' not in request.get_json():
        abort(400, description="Missing user_id")

    data = request.get_json()
    post = storage.get(Post, post_id)
    post.upvotes.remove(data['user_id'])
    post.save()
    return make_response(jsonify(post.to_dict()), 200)
