from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import League

user_routes = Blueprint('leagus', __name__)


@user_routes.route('/<int:league_id>')
@login_required
def leagues(league_id):
    """
    Query for all leagues and returns them in a list of user dictionaries
    """
    leagues = League.query.filter_by(league_id=4).all()
    return {'leagues': [league.to_dict() for league in leagues]}
