from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Team, db
from .lists import team_words
from datetime import datetime

import random
import datetime

today = datetime.date.today()
current_year = today.year

team_routes = Blueprint('teams', __name__)


@team_routes.route('', methods=['GET'])
@login_required
def read_teams():
    # Query for all leagues and returns them in a list of user dictionaries
    teams = Team.query.all()
    return {'teams': [team.to_dict() for team in teams]}

@team_routes.route('/<int:id>', methods=['GET'])
@login_required
def read_team(id):
    # View a specific team
    team = Team.query.get(id)
    return team.to_dict()
