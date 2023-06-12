from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import League, Team, User, db, leagues_users
from sqlalchemy.orm import joinedload
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

    return new_league.to_dict(), 201
    # return jsonify({'league': new_league.to_dict(), 'team': new_team.to_dict()}), 201


@league_routes.route('/<int:leagueId>', methods=['DELETE'])
@login_required
def delete_league(leagueId):
    # Deletes an existing league with the given id if the user is the league's admin
    league = League.query.get(leagueId)

    if league.admin_id != current_user.id:
        return jsonify(error=["You don't have the permission to delete this league."]), 401

    db.session.delete(league)
    db.session.commit()

    return league.to_dict()




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
    # team = Team.query.get(user_id)
    # print(team)
    # # print(current_user.id)
    # # if league.admin_id != current_user.id:
    # #     return jsonify(error=["You don't have the permission to edit this league."]), 401

    # Create a new team in the current league
    random_num = random.randint(1, 35)

    try:
        new_team = Team(name=F"{current_user.username}'s {team_words[random_num]} Team", user_id=current_user.id, league_id=id)
        # user = User.query.get(id)

        # new_team.league.users.append(user)
        db.session.add(new_team)
        db.session.commit()
    except ValueError:
        return "Invalid integer value."

    return new_team.to_dict(), 201


@league_routes.route('/<int:id>/teams', methods=['GET'])
@login_required
def get_teams_for_league(id):
    # Load teams of current league
    teams = Team.query.filter_by(league_id=id).all()
    my_leagues = [team.to_dict() for team in teams]

    return {'Leagues': my_leagues}, 201



@league_routes.route("/comish", methods=['GET'])
@login_required
def get_all_current_as_commissioner():
    all_leagues = League.query.options(joinedload(League.users)).filter(League.admin_id == current_user.id).all()

    if not all_leagues:
        return {'You have not created any leagues yet'}

    my_leagues = [league.to_dict() for league in all_leagues]

    return {'Leagues': my_leagues}, 201


@league_routes.route("/comissoner", methods=['GET'])
@login_required
def get_all_current():
#     # all_leagues = League.query.options(joinedload(League.users)).filter(League.admin_id == current_user.id).all()

#     # user_id = current_user.id
#     # user = User.query.get(id)

    league = db.session.query(League).join(leagues_users).filter(leagues_users.c.user_id == current_user.id).all()
    print(league, "Line 130")

    # if league is None:
    #     return {'This league does not exist.'}
    return jsonify([leagues_users.to_dict() for leagues_users in league])

#     # all_leagues = League.query.options(joinedload(League.users)).filter(League.admin_id == 5).all()
#     # my_leagues = [league.to_dict() for league in all_leagues]
#     # print(my_leagues)
#     # return {'Leagues': my_leagues}, 201





# find user by admin id
# @league_routes.route("comissoner", methods=['GET'])
# @login_required
# def get_by_comissoner():
#     all_leagues = League.query.options(joinedload(League.users)).filter(League.admin_id == 5).all()
#     my_leagues = [league.to_dict() for league in all_leagues]
#     print(my_leagues)
#     return {'Leagues': my_leagues}, 201
