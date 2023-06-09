from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import League, Team, db
from .lists import league_words, team_words
from datetime import datetime

import random

# import datetime
# today = datetime.date.today()
# current_year = today.year

league_routes = Blueprint('leagues', __name__)


@league_routes.route('', methods=['GET'])
# @login_required
def read_leagues():
    # Query for all leagues and returns them in a list of user dictionaries
    leagues = League.query.all()
    return {'leagues': [league.to_dict() for league in leagues]}


@league_routes.route('/<int:id>', methods=['GET'])
@login_required
def read_league(id):
    # View a specific league
    league = League.query.get(id)
    return league.to_dict()


@league_routes.route('', methods=['POST'])
@login_required
def create_leagues():
    # Create a new league and create a team
    random_num = random.randint(1, 30)

    try:
        new_league = League(name=F"{current_user.username}'s {league_words[random_num]} League", admin_id=current_user.id)
        db.session.add(new_league)
        db.session.commit()

        # not working in frontend
        # comment out for prod
        new_team = Team(name=F"Commissioner {current_user.username}'s {team_words[random_num]} Team", user_id=current_user.id, league_id=new_league.id)
        db.session.add(new_team)
        db.session.commit()

        data = new_team.query.get('id') # why did this update the dictionary
    except ValueError:
        return "Invalid integer value."

    return jsonify({'league': new_league.to_dict(), 'team': new_team.to_dict()}), 201


@league_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_league(id):
    # Deletes an existing league with the given id if the user is the league's admin
    league = League.query.get(id)

    if league.admin_id != current_user.id:
        return jsonify(error=["You don't have the permission to delete this league."]), 401

    db.session.delete(league)
    db.session.commit()

    return {"league": league.to_dict()}

@league_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_league(id):
    # Updates an existing league with the given id if the user is the league's admin
    league = League.query.get(id)
    # print(league.admin_id)
    # print(current_user.id)
    if league.admin_id != current_user.id:
        return jsonify(error=["You don't have the permission to edit this league."]), 401

    name = request.json.get('name')
    draft_date = request.json.get('draft_date')

    league.name = name or league.name
    # league.draft_date = draft_date or league.draft_date
    league.updated_at = datetime.now()

    db.session.commit()

    return league.to_dict()


@league_routes.route('/<int:id>/teams', methods=['POST'])
@login_required
def create_team(id):
    # Create a new team in the current league
    random_num = random.randint(1, 35)

    try:
        new_team = Team(name=F"{current_user.username}'s {team_words[random_num]} Team", user_id=current_user.id, league_id=id)
        db.session.add(new_team)
        db.session.commit()
    except ValueError:
        return "Invalid integer value."

    return jsonify({'team': new_team.to_dict()}), 201
