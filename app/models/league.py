from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

# join table for many to many relationship between League and User models
leagues_users = db.Table('leagues_users',
    db.Column('league_id', db.Integer, db.ForeignKey(add_prefix_for_prod('leagues.league_id')), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)
# join table for many to many relationship between League, Team and Player models
leagues_teams_players = db.Table('leagues_teams_players',
    db.Column('league_id', db.Integer, db.ForeignKey(add_prefix_for_prod('leagues.league_id')), primary_key=True),
    db.Column('team_id', db.Integer, db.ForeignKey(add_prefix_for_prod('teams.team_id')), primary_key=True),
    db.Column('player_id', db.Integer, db.ForeignKey(add_prefix_for_prod('players.player_id')), primary_key=True),
    db.column('draft_id', db.Integer, nullable=False)

    # or the index, which will ensure uniqueness as well
    Index('idx_leagues_teams_players', leagues_teams_players.c.league_id, leagues_teams_players.c.team_id, leagues_teams_players.c.player_id,, unique=True)
)

class League(db.Model):
    __tablename__ = 'leagues'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    league_id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(55), nullable=False)
    admin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False) # default=
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    users = db.relationship('User', secondary=leagues_users, back_populates='leagues')

    def to_dict(self):
        return{
            'league_id': self.league_id,
            'name': self.name,
            'admin_id': self.admin_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
