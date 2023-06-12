from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
# from .player import teams_players
from .draft import Draft
from sqlalchemy.ext.associationproxy import association_proxy

class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(55), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    league_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('leagues.id'))) # default=
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # players = db.relationship('Player', secondary=teams_players, back_populates='teams')

    players = db.relationship('Draft', back_populates='team', passive_deletes=True)


    # # new stuff peter added
    # league = db.relationship('League', back_populates = "teams")

    # player_association = db.relationship('TeamPlayer', back_populates='team')
    # players = association_proxy('player_association', 'player')


    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'league_id': self.league_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
