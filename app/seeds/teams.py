from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text

def seed_teams():
    teams = [

        Team(name="Demo's Majestic Team", user_id=1, league_id=1),
        Team(name="Kevin's Agile Team", user_id=2, league_id=1),
        Team(name="James's Pioneering Team", user_id=3, league_id=1),
        Team(name="Crystal's Enigmatic Team", user_id=4, league_id=1),
        Team(name="Bill's Phenomenal Team", user_id=5, league_id=1),
        Team(name="Ethan's Explosive Team", user_id=6, league_id=1),
        Team(name="Robert's Enigmatic Team", user_id=7, league_id=1),
        Team(name="Gabriel's Creative Team", user_id=8, league_id=1),
        Team(name="Chris Unbelievable Team", user_id=9, league_id=1),
        Team(name="Jesse's Unyielding Team", user_id=10, league_id=1),
        Team(name="Philip's Flawless Team", user_id=11, league_id=1),
        Team(name="Kristen's Dauntless Team", user_id=12, league_id=1),
        Team(name="Kevin's Gifted Team", user_id=2, league_id=2),
        Team(name="Demo's Dauntless Team", user_id=1, league_id=2),
        # Team(name="James's Pioneering Team", user_id=3, league_id=3),
        # Team(name="Crystal's Enigmatic Team", user_id=4, league_id=4),
        # Team(name="Bill's Phenomenal Team", user_id=5, league_id=5),
        # Team(name="Ethan's Explosive Team", user_id=6, league_id=6),
    ]

    for el in teams:
        db.session.add(el)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the Teams table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))
        db.session.commit()
