from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import League, db
import random

import datetime

today = datetime.date.today()
current_year = today.year

league_routes = Blueprint('leagues', __name__)


@league_routes.route('/', methods=['POST'])
@login_required
def create_leagues():
    """
    Create a new league
    """
    words = [
        "Competitive",
        "Thrilling",
        "Exciting",
        "Dynamic",
        "High-scoring",
        "Fast-paced",
        "Elite",
        "Entertaining",
        "Prestigious",
        "Professional",
        "Popular",
        "Global",
        "Diverse",
        "Talented",
        "Intense",
        "Fierce",
        "Passionate",
        "Iconic",
        "Historic",
        "Progressive",
        "Electric",
        "Unpredictable",
        "Well-organized",
        "Engaging",
        "Celebrated",
        "Impactful",
        "Respected",
        "Innovative",
        "Fanatical",
        "Iconic"
    ]

    random_num = random.randint(1, 30)

    try:
        new_league = League(name=F"{current_user.username}'s {words[random_num]} league {current_year}", admin_id=current_user.id)
        db.session.add(new_league)
        db.session.commit()
    except ValueError:
        return "Invalid integer value."

    return jsonify({'league': new_league.to_dict()}), 201
