from app.models import db, Player, environment, SCHEMA
from sqlalchemy.sql import text

def seed_players():
    players = [

        Player(full_name="Stephen Wardell Curry", first_name="Stephen", last_name="Curry", stats="sports.yahoo.com/nba/players/4612"),
        Player(full_name="Giannis Antetokounmpo", first_name="Giannis", last_name="Antetokounmpo", stats="sports.yahoo.com/nba/players/5185"),
        Player(full_name="LeBron James", first_name="LeBron", last_name="James", stats="sports.yahoo.com/nba/players/2544"),
        Player(full_name="Kevin Durant", first_name="Kevin", last_name="Durant", stats="sports.yahoo.com/nba/players/4610"),
        Player(full_name="James Harden", first_name="James", last_name="Harden", stats="sports.yahoo.com/nba/players/3826"),
        Player(full_name="Kawhi Leonard", first_name="Kawhi", last_name="Leonard", stats="sports.yahoo.com/nba/players/4611"),
        Player(full_name="Joel Embiid", first_name="Joel", last_name="Embiid", stats="sports.yahoo.com/nba/players/3827"),
        Player(full_name="Nikola Jokic", first_name="Nikola", last_name="Jokic", stats="sports.yahoo.com/nba/players/5184"),
        Player(full_name="Luka Doncic", first_name="Luka", last_name="Doncic", stats="sports.yahoo.com/nba/players/4609"),

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
def undo_players():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.players RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM leagues"))
        db.session.commit()
