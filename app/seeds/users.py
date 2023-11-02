from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password')
    marnie = User(username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(username='bobbie', email='bobbie@aa.io', password='password')
    alice = User(username='alice', email='alice@aa.io', password='password')
    eve = User(username='eve', email='eve@aa.io', password='password')
    charlie = User(username='charlie', email='charlie@aa.io', password='password')
    frank = User(username='frank', email='frank@aa.io', password='password')
    grace = User(username='grace', email='grace@aa.io', password='password')
    harry = User(username='harry', email='harry@aa.io', password='password')
    isabel = User(username='isabel', email='isabel@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(alice)
    db.session.add(eve)
    db.session.add(charlie)
    db.session.add(frank)
    db.session.add(grace)
    db.session.add(harry)
    db.session.add(isabel)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
