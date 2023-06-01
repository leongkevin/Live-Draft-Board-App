from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .teamplayer import TeamPlayer
from sqlalchemy.ext.associationproxy import association_proxy

# # join table for many to many relationship between Team and Player models
# teams_players = db.Table('teams_players',
#     db.Column('team_id', db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')), primary_key=True),
#     db.Column('player_id', db.Integer, db.ForeignKey(add_prefix_for_prod('players.id')), primary_key=True),
#     # db.column('draft_id', db.Integer, primary_key=True),
#     # db.column('created_at', db.DateTime(timezone=True), server_default=func.now()),
#     # db.column('updated_at', db.DateTime(timezone=True), server_default=func.now()),
# )

class Player(db.Model):
    __tablename__ = 'players'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    full_name = db.Column(db.String(55), nullable=False)
    first_name = db.Column(db.String(55), nullable=False)
    last_name = db.Column(db.String(55), nullable=False)
    stats = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # teams = db.relationship('Team', secondary=teams_players, back_populates='players')

    team_association = db.relationship('TeamPlayer', back_populates='player')
    teams = association_proxy('team_association', 'team')

    def to_dict(self):
        return{
            'id': self.id,
            'full_name': self.full_name,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'stats': self.stats,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
