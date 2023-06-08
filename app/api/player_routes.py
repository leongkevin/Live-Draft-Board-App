from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Player, db
from datetime import datetime


player_routes = Blueprint('players', __name__)


@player_routes.route('', methods=['GET'])
@login_required
def read_players():
    # Query for all player and returns them in a list of user dictionaries
    players = Player.query.all()
    return {'players': [player.to_dict() for player in players]}
