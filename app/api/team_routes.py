from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Team, db
from .lists import team_words
from datetime import datetime

import random

# import datetime
# today = datetime.date.today()
# current_year = today.year

timestamp = datetime.now()


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


@team_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_team(id):
    # Deletes an existing team with the given id if the user is the league's admin or the team owner
    team = Team.query.get(id)
    if team == None:
        return jsonify(error=["team_id is not valid."]), 401
    # if team.admin_id != current_user.id:
    #     return jsonify(error=["You don't have the permission to delete this league."]), 401

    db.session.delete(team)
    db.session.commit()

    return {"team": team.to_dict()}


@team_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_team(id):
    # Updates an existing team with the given id if the user is the league's admin or the team owner
    team = Team.query.get(id)
    # if team == None:
    #     return jsonify(error=["team_id is not valid."]), 401

    if team.user_id != current_user.id:
        return jsonify(error=["You don't have the permission to edit this team."]), 401

    name = request.json.get('name')
    # print(name)
    team.name = name or team.name
    team.updated_at = timestamp

    db.session.commit()

    return team.to_dict()
