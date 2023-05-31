from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(username='Demo', email='demo@aa.io', password='password'),
        User(username='Kevin', email='kevin@aa.io', password='password'),
        User(username='James', email='james@aa.io', password='password'),
        User(username='Crystal', email='crystal@aa.io', password='password'),
        User(username='Bill', email='bill@aa.io', password='password'),
        User(username='Ethan', email='ethan@aa.io', password='password'),
        User(username='Robert', email='robert@aa.io', password='password'),
        User(username='Gabriel', email='gabriel@aa.io', password='password'),
        User(username='Chris', email='chris@aa.io', password='password'),
        User(username='Jesse', email='jesse@aa.io', password='password'),
        User(username='Philip', email='philip@aa.io', password='password'),
        User(username='Kristen', email='kristen@aa.io', password='password'),
    ]

    for el in users:
        db.session.add(el)
        db.session.commit()

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
