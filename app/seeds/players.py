from app.models import db, Player, environment, SCHEMA
from sqlalchemy.sql import text

def seed_players():
    players = [

        Player(full_name="Stephen Wardell Curry", first_name="Stephen", last_name="Curry", stats="espn.com/nba/player/_/id/3975/stephen-curry"),
        Player(full_name="Giannis Antetokounmpo", first_name="Giannis", last_name="Antetokounmpo", stats="espn.com/nba/player/_/id/3032977/giannis-antetokounmpo"),
        Player(full_name="LeBron James", first_name="LeBron", last_name="James", stats="espn.com/nba/player/_/id/1966/lebron-james"),
        Player(full_name="Kevin Durant", first_name="Kevin", last_name="Durant", stats="espn.com/nba/player/_/id/3202/kevin-durant"),
        Player(full_name="James Harden", first_name="James", last_name="Harden", stats="espn.com/nba/player/_/id/3992/jamesharden"),
        Player(full_name="Kawhi Leonard", first_name="Kawhi", last_name="Leonard", stats="espn.com/nba/player/_/id/6450/kawhi-leonard"),
        Player(full_name="Joel Embiid", first_name="Joel", last_name="Embiid", stats="espn.com/nba/player/_/id/3059318/joel-embiid"),
        Player(full_name="Nikola Jokic", first_name="Nikola", last_name="Jokic", stats="espn.com/nba/player/_/id/3112335/nikola-jokic"),
        Player(full_name="Luka Doncic", first_name="Luka", last_name="Doncic", stats="espn.com/nba/player/_/id/3945274/luka-doncic"),

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
