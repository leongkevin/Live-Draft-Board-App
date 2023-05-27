from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .player import teams_players

class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    team_id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(55), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    league_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('leagues.league_id')), nullable=False) # default=
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    players = db.relationship('Player', secondary=teams_players, back_populates='teams')


    def to_dict(self):
        return{
            'team_id': self.team_id,
            'name': self.name,
            'user_id': self.user_id,
            'league_id': self.league_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
