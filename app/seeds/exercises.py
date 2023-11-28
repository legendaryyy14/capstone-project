from app.models import db, Exercise, environment, SCHEMA
from sqlalchemy.sql import text

def seed_exercises():
    exercise1 = Exercise(workout_id=1, user_id=1, title='Push-Ups', description='A bodyweight exercise that targets the chest, shoulders, triceps, and core muscles. Start in a plank position, lower your body towards the ground, and then push back up.', sets=3, reps=15, image_url='https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise2 = Exercise(workout_id=1, user_id=1, title='Squats', description='A lower body exercise that strengthens the quadriceps, glutes, and hamstrings. Stand with feet shoulder-width apart, lower your body as if sitting down in a chair, and then return to standing position.', sets=3, reps=20, image_url='https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise3 = Exercise(workout_id=1, user_id=1, title='Bent Over Rows', description='A dumbbell exercise that works the back and arm muscles. Bend your knees slightly, hinge at your hips, and pull the dumbbells towards your hips, squeezing your shoulder blades together.', sets=4, reps=12, image_url='https://kinxlearning.com/cdn/shop/articles/bent_over_db_row.png?v=1662329166')
    exercise4 = Exercise(workout_id=2, user_id=2, title='Burpees', description='A full-body exercise that combines a squat, push-up, and jump. Start in a standing position, lower into a squat, perform a push-up, jump your feet back to the squat position, and explosively jump up.', sets=3, reps=15, image_url='https://www.healthbenefitstimes.com/9/uploads/2020/10/burpees-exercise-steps.jpg')
    exercise5 = Exercise(workout_id=2, user_id=2, title='Mountain Climbers', description='A cardio and core exercise performed from a push-up position. Alternate bringing your knees towards your chest in a running motion while maintaining a plank position.', sets=3, reps=20, image_url='https://rejuvage.com/wp-content/uploads/2019/07/iStock-957699448.jpg')
    exercise6 = Exercise(workout_id=2, user_id=2, title='Plank', description='A core-strengthening exercise held in a push-up position. Keep your body in a straight line from head to heels, engaging your core muscles, and hold the position for the specified duration.', sets=3, reps=60, image_url='https://images.pexels.com/photos/917653/pexels-photo-917653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise7 = Exercise(workout_id=3, user_id=3, title='Plank Twists', description='A core exercise involving a twisting motion to engage the obliques. Start in a plank position and rotate your hips to one side, then switch to the other side in a controlled manner.', sets=3, reps=20, image_url='https://www.thegymkc.com/uploads/5/4/1/0/5410956/2477232_orig.jpg')
    exercise8 = Exercise(workout_id=3, user_id=3, title='Russian Twists', description='A seated core exercise with rotational movements. Sit on the ground, lean back slightly, lift your feet off the ground, and twist your torso to touch the ground on each side.', sets=3, reps=15, image_url='https://hips.hearstapps.com/hmg-prod/images/russian-twist-sharpened-1548270008.jpg')
    exercise9 = Exercise(workout_id=3, user_id=3, title='Leg Raises', description='A supine exercise targeting lower abdominal muscles. Lie on your back, keep your legs straight, and lift them upward towards the ceiling, then lower them back down without touching the ground.', sets=4, reps=12, image_url='https://health.clevelandclinic.org/wp-content/uploads/sites/3/2018/04/legLift-1147315288-770x533-1-650x428.jpg')
    exercise10 = Exercise(workout_id=4, user_id=4, title='Lunges', description='A lower body exercise targeting quadriceps and glutes. Step forward with one foot, lower your body until your front thigh is parallel to the ground, then push back up to the starting position.', sets=3, reps=20, image_url='https://images.pexels.com/photos/5067743/pexels-photo-5067743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise11 = Exercise(workout_id=4, user_id=4, title='Leg Press', description='A machine exercise for strengthening leg muscles. Sit on the leg press machine, push the platform away by extending your legs, then slowly bring the platform back towards you.', sets=3, reps=15, image_url='https://images.pexels.com/photos/136404/pexels-photo-136404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    exercise12 = Exercise(workout_id=4, user_id=4, title='Calf Raises', description='A standing exercise to work calf muscles. Stand with feet hip-width apart, rise onto your toes by lifting your heels off the ground, then lower them back down.', sets=3, reps=20, image_url='https://fitnessvolt.com/wp-content/uploads/2021/02/dumbbell-standing-calf-raise-.jpg')
    exercise13 = Exercise(user_id=1, title='Dumbbell Rows', description='A back exercise using dumbbells. Stand with feet shoulder-width apart, hold a dumbbell in each hand, bend your knees slightly, hinge at your hips, and pull the dumbbells towards your hips, keeping your back straight.', sets=4, reps=12, image_url='https://images.pexels.com/photos/5836640/pexels-photo-5836640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')

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
