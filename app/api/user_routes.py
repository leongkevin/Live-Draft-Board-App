from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, League

user_routes = Blueprint('users', __name__)


@user_routes.route('/', methods=['GET'])
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=['GET'])
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# get leagues by id, then get songs from playlist
@user_routes.route('/<int:id>/leagues', methods=['GET'])
@login_required
def user_leagues(id):
    """
    Query for all the leagues of a specific player and return them in a list of user dictionaries
    """
    leagues = League.query.filter_by(admin_id=current_user.id).all()
    print(leagues)
    return {'leagues': [league.to_dict() for league in leagues]}
