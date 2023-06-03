from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

# join table for many to many relationship between League and User models
leagues_users = db.Table('leagues_users',
    db.Column('league_id', db.Integer, db.ForeignKey(add_prefix_for_prod('leagues.id')), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)

class League(db.Model):
    __tablename__ = 'leagues'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(55), nullable=False)
    admin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False) # default=
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    users = db.relationship('User', secondary=leagues_users, back_populates='leagues')
    teams = db.relationship('Team', foreign_keys='Team.league_id', cascade="all,delete")

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'admin_id': self.admin_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
