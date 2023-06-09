from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.ext.associationproxy import association_proxy

class Draft(db.Model):
    __tablename__ = 'drafts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id'), ondelete='CASCADE'))
    player_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('players.id')))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    player = db.relationship('Player', back_populates='team_association')
    team = db.relationship('Team', back_populates='players')

    def to_dict(self):
        return{
            'id': self.id,
            'team_id': self.team_id,
            'player_id': self.player_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
