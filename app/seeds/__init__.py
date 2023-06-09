from flask.cli import AppGroup
from .users import seed_users, undo_users
from .leagues import seed_leagues, undo_leagues
from .teams import seed_teams, undo_teams
from .players import seed_players, undo_players
from .drafts import seed_drafts, undo_drafts

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_leagues()
        undo_teams()
        undo_players()
        undo_drafts()
    seed_users()
    seed_leagues()
    seed_teams()
    seed_players()
    seed_drafts()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_leagues()
    undo_teams()
    undo_players()
    # Add other undo functions here
