from app.models import db, Exercise, environment, SCHEMA
from sqlalchemy.sql import text

def seed_exercises():
    exercise1 = Exercise(workout_id=1, user_id=1, title='Push-Ups', description='Bodyweight exercise for upper body strength', sets=3, reps=15, image_url='https://images.pexels.com/photos/841134/pexels-photo-841134.jpeg')
    exercise2 = Exercise(workout_id=1, user_id=1, title='Squats', description='Lower body exercise targeting quadriceps and glutes', sets=3, reps=20, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise3 = Exercise(workout_id=1, user_id=1, title='Bent Over Rows', description='Dumbbell exercise for back and arm muscles', sets=4, reps=12, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise4 = Exercise(workout_id=2, user_id=2, title='Burpees', description='Full body exercise combining squat, push-up, and jump', sets=3, reps=15, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise5 = Exercise(workout_id=2, user_id=2, title='Mountain Climbers', description='Cardio and core exercise performed from a push-up position', sets=3, reps=20, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise6 = Exercise(workout_id=2, user_id=2, title='Plank', description='Core-strengthening exercise held in a push-up position', sets=3, reps=60, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise7 = Exercise(workout_id=3, user_id=3, title='Plank Twists', description='Core exercise involving twisting motion to engage obliques', sets=3, reps=20, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise8 = Exercise(workout_id=3, user_id=3, title='Russian Twists', description='Seated core exercise with rotational movements using a weight or without', sets=3, reps=15, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise9 = Exercise(workout_id=3, user_id=3, title='Leg Raises', description='Supine exercise targeting lower abdominal muscles', sets=4, reps=12, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise10 = Exercise(workout_id=4, user_id=4, title='Lunges', description='Lower body exercise targeting quadriceps and glutes', sets=3, reps=20, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise11 = Exercise(workout_id=4, user_id=4, title='Leg Press', description='Machine exercise for strengthening leg muscles', sets=3, reps=15, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise12 = Exercise(workout_id=4, user_id=4, title='Calf Raises', description='Standing exercise to work calf muscles', sets=3, reps=20, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise13 = Exercise(user_id=1, title='Dumbbell Rows', description='Back exercise using dumbbells', sets=4, reps=12, image_url='https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')

    db.session.add_all([exercise1, exercise2, exercise3, exercise4, exercise5, exercise6, exercise7, exercise8, exercise9, exercise10, exercise11, exercise12, exercise13])
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the exercises table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_exercises():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercises"))

    db.session.commit()
