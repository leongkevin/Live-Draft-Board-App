from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Draft, League, Team, db
from datetime import datetime


draft_routes = Blueprint('drafts', __name__)


@draft_routes.route('', methods=['GET'])
@login_required
def read_drafts():
    # Query for all players in a draft and returns them in a list of user dictionaries
    drafts = Draft.query.all()
    # print(drafts)
    return {'drafts': [draft.to_dict() for draft in drafts]}


# @draft_routes.route('/<int:id>', methods=['GET'])
# @login_required
# def read_draft(id):
#     # View a specific drafted player
#     draft = Draft.query.get(id)
#     return draft.to_dict()


# @draft_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_draft(id):
#     # Deletes an existing team with the given id if the user is the league's admin or the team owner
#     draft = Draft.query.get(id)
#     if draft == None:
#         return jsonify(error=["team_id is not valid."]), 401
#     # if team.admin_id != current_user.id:
#     #     return jsonify(error=["You don't have the permission to delete this league."]), 401

#     db.session.delete(draft)
#     db.session.commit()

#     return {"draft": draft.to_dict()}

@draft_routes.route('', methods=['POST'])
@login_required
def draft_player(id):
    # Post a player to the draft
    try:
        # league_id = League.query.get(id)
        # team = Team.query.filter_by(user_id=current_user.id).all()

        team_id = db.session.query(Team).filter(
            Team.user_id == current_user.id,
            Team.league_id==id
        )

        new_draft_pick = Draft(
            team_id=team_id, player_id=4)
        db.session.add(new_draft_pick)
        db.session.commit()

    except ValueError:
        return "Invalid integer value."

    return jsonify({'draft': new_draft_pick.to_dict()})
