# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.sql import func
# from .league import leagues_teams_players

# class Player(db.Model):
#     __tablename__ = 'players'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     player_id = db.Column(db.Integer, primary_key=True, nullable=False)
#     full_name = db.Column(db.String(55), nullable=False)
#     first_name = db.Column(db.String(55), nullable=False)
#     last_name = db.Column(db.String(55), nullable=False)
#     stats = db.Column(db.String(255), nullable=False)
#     created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
#     updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

#     leagues = db.relationship('League', secondary=leagues_teams_players, back_populates='players')
#     teams = db.relationship('Player', secondary=leagues_teams_players, back_populates='players')

#     def to_dict(self):
#         return{
#             'team_id': self.team_id,
#             'full_name': self.full_name,
#             'first_name': self.first_name,
#             'last_name': self.last_name,
#             'stats': self.stats,
#             'user_id': self.user_id,
#             'created_at': self.created_at,
#             'updated_at': self.updated_at
#         }
