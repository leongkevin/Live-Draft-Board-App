from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    kevin = User(
        username='Kevin', email='kevin@aa.io', password='password')
    james = User(
        username='James', email='james@aa.io', password='password')
    crystal = User(
        username='Crystal', email='crystal@aa.io', password='password')
    bill = User(
        username='Bill', email='bill@aa.io', password='password')
    ethan = User(
        username='Ethan', email='ethan@aa.io', password='password')
    robert = User(
        username='Robert', email='robert@aa.io', password='password')
    gabriel = User(
        username='Gabriel', email='gabriel@aa.io', password='password')
    chris = User(
        username='Chris', email='chris@aa.io', password='password')
    dylan = User(
        username='Dylan', email='dylan@aa.io', password='password')
    philip = User(
        username='Philip', email='philip@aa.io', password='password')
    kristen = User(
        username='Kristen', email='kristen@aa.io', password='password')
    caleb = User(
        username='Caleb', email='caleb@aa.io', password='password')

    db.session.add(demo)
    db.session.add(kevin)
    db.session.add(james)
    db.session.add(crystal)
    db.session.add(bill)
    db.session.add(ethan)
    db.session.add(robert)
    db.session.add(gabriel)
    db.session.add(chris)
    db.session.add(dylan)
    db.session.add(philip)
    db.session.add(kristen)
    db.session.add(caleb)

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
