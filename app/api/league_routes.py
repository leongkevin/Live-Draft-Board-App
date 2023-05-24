from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import League, db
from .lists import words

import random
import datetime

today = datetime.date.today()
current_year = today.year

league_routes = Blueprint('leagues', __name__)


@league_routes.route('', methods=['POST'])
@login_required
def create_leagues():
    # Create a new league
    random_num = random.randint(1, 30)

    try:
        new_league = League(name=F"{current_user.username}'s {words[random_num]} League {current_year}", admin_id=current_user.id)
        db.session.add(new_league)
        db.session.commit()
    except ValueError:
        return "Invalid integer value."

    return jsonify({'league': new_league.to_dict()}), 201


@league_routes.route('', methods=['GET'])
@login_required
def read_leagues():
    # Query for all leagues and returns them in a list of user dictionaries
    leagues = League.query.all()
    return {'leagues': [league.to_dict() for league in leagues]}


@league_routes.route('/<int:league_id>', methods=['GET'])
@login_required
def read_league(league_id):
    # View a league
    league = League.query.get(league_id)
    return league.to_dict()

@league_routes.route('/<int:league_id>', methods=['DELETE'])
@login_required
def delete_league(league_id):
    # Deletes an existing league with the given id if the user is the league's admin
    league = League.query.get(league_id)

    if league.admin_id != current_user.id:
        return jsonify(error=["You don't have the permission to delete this league."]), 401

    db.session.delete(league)
    db.session.commit()

    return {"league": league.to_dict()}
