from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favorites():
    favorite1 = Favorite(workout_id=1, user_id=2)
    favorite2 = Favorite(workout_id=2, user_id=3)
    favorite3 = Favorite(workout_id=3, user_id=4)
    favorite4 = Favorite(workout_id=4, user_id=5)
    favorite5 = Favorite(workout_id=5, user_id=6)
    favorite6 = Favorite(workout_id=6, user_id=7)
    favorite7 = Favorite(workout_id=7, user_id=8)
    favorite8 = Favorite(workout_id=8, user_id=9)
    favorite9 = Favorite(workout_id=9, user_id=10)
    favorite10= Favorite(workout_id=1, user_id=4)

    db.session.add_all([favorite1, favorite2, favorite3, favorite4, favorite5, favorite6, favorite7, favorite8, favorite9, favorite10])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the favorites table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
