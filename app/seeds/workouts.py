from app.models import db, Workout, environment, SCHEMA
from sqlalchemy.sql import text


def seed_workouts():
    workout1 = Workout(user_id=1, title='Full Body Workout', description='A complete workout targeting all muscle groups', public=True, image_url='https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    workout2 = Workout(user_id=2, title='Cardio Blast', description='High-intensity cardio exercises to burn calories', public=True, image_url='https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    workout3 = Workout(user_id=3, title='Core Strengthening', description='Focus on core muscles for strength and stability', public=True, image_url='https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    workout4 = Workout(user_id=4, title='Leg Day', description='Intense workout for legs and lower body muscles', public=True, image_url='https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    workout5 = Workout(user_id=5, title='Arm Sculpting', description='Exercises to tone and sculpt arm muscles', public=True, image_url='https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    workout6 = Workout(user_id=6, title='Yoga Flow', description='Gentle yoga flow for flexibility and relaxation', public=True, image_url='https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    workout7 = Workout(user_id=7, title='HIIT Workout', description='High-Intensity Interval Training for full-body conditioning', public=True, image_url='https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    workout8 = Workout(user_id=8, title='Pilates Session', description='Pilates exercises for core strength and balance', public=True, image_url='https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    workout9 = Workout(user_id=9, title='Circuit Training', description='Circuit-based workout for overall fitness', public=True, image_url='https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    workout10 = Workout(user_id=10, title='Meditation and Mindfulness', description='Guided meditation and mindfulness exercises', public=True, image_url='https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')

    db.session.add_all([workout1, workout2, workout3, workout4, workout5, workout6, workout7, workout8, workout9, workout10])
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the Workouts table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_workouts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.workouts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM workouts"))

    db.session.commit()
