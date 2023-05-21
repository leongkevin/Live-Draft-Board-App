from app.models import db, League, environment, SCHEMA
from sqlalchemy.sql import text

def seed_leagues():
    leagues = [

        League(admin_id=1),
        League(admin_id=2),
        League(admin_id=3),
        League(admin_id=4),
        League(admin_id=5),

    ]

    for el in leagues:
        db.session.add(el)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the Leagues table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_leagues():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.leagues RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM leagues"))
        db.session.commit()
