from app.models import db, Player, environment, SCHEMA
from sqlalchemy.sql import text

def seed_players():
    players = [

        Player(full_name="Stephen Wardell Curry", first_name="Stephen", last_name="Curry", stats="https://sports.yahoo.com/nba/players/4612"),
        Player(full_name="Giannis Antetokounmpo", first_name="Giannis", last_name="Antetokounmpo", stats="https://sports.yahoo.com/nba/players/5185"),
    ]

    for el in players:
        db.session.add(el)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the Players table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def seed_players():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.players RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM leagues"))
        db.session.commit()
