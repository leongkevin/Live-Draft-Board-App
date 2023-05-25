from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text

def seed_teams():
    teams = [

        Team(name="Demo's Dashing Team", user_id=1),
        Team(name="Kevin's Killer Team", user_id=1),
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
