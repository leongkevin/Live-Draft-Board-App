# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.sql import func
# from .league import leagues_teams_players

# class Team(db.Model):
#     __tablename__ = 'teams'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     team_id = db.Column(db.Integer, primary_key=True, nullable=False)
#     name = db.Column(db.String(55), nullable=False)
#     user_id = db.Column(db.Integer, nullable=False)
#     created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
#     updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

#     leagues = db.relationship('League', secondary=leagues_teams_players, back_populates='teams')
#     players = db.relationship('Player', secondary=leagues_teams_players, back_populates='teams')


#     def to_dict(self):
#         return{
#             'team_id': self.team_id,
#             'name': self.name,
#             'user_id': self.user_id,
#             'created_at': self.created_at,
#             'updated_at': self.updated_at
#         }
