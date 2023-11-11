from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.models import Workout, Favorite, db
from app.forms.workout_form import WorkoutForm
from app.forms.workout_edit_form import WorkoutEditForm
from .auth_routes import validation_errors_to_error_messages

workout_routes = Blueprint('workouts', __name__)


# GET ALL WORKOUTS
@workout_routes.route('/')
@login_required
def get_workouts():
    """
    Query for all workouts and returns them in a list of workout dictionaries
    """
    workouts = Workout.query.all()
    return jsonify([workout.to_dict() for workout in workouts])

# GET WORKOUT BY ID
@workout_routes.route('/<int:id>')
@login_required
def get_workout(id):
    """
    Query for a workout by id and returns it in a dictionary
    """
    workout = Workout.query.get(id)

    if workout:
        return workout.to_dict()
    else:
        return {"error": "Workout not found"}, 404


# GET WORKOUTS OF LOGGED IN USER - maybe we delete off of wiki page
# @workout_routes.route('/user/<user_id>')


# CREATE A WORKOUT
@workout_routes.route('/create', methods=['POST'])
@login_required
def create_workout():
    """
    Create a new workout and returns it
    """
    form = WorkoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workout = Workout(
            user_id = form.data['user_id'],
            title = form.data['title'],
            description = form.data['description'],
            public = form.data['public'],
            image_url = form.data['image_url']
        )
        db.session.add(workout)
        db.session.commit()
        return workout.to_dict()
    return {'errors': form.errors}, 400


# UPDATE A WORKOUT
@workout_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_workout(id):
    form = WorkoutEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workout = Workout.query.get(id)
        workout.title = form.data['title']
        workout.description = form.data['description']
        workout.public = form.data['public']
        workout.image_url = form.data['image_url']

        db.session.commit()
        return workout.to_dict()
    return {'errors': form.errors}, 400


# DELETE A WORKOUT
@workout_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_workout(id):
    workout = Workout.query.get(id)

    if workout is None:
        return {"error": "Workout does not exist"}, 404

    db.session.delete(workout)

    db.session.commit()
    return workout.to_dict()

#GET ALL OF LOGGED IN USER'S FAVORITED WORKOUTS
@workout_routes.route('/favorites/<int:user_id>')
@login_required
def get_favorites(user_id):
    """
    Query for all logged in user's favorited workouts and returns them in a list
    """
    res = db.session.query(Favorite, Workout).join(Workout, Favorite.workout_id == Workout.id).filter(Favorite.user_id == user_id).all()
    print(res)

    workouts = [workout[1] for workout in res]
    return jsonify([workout.to_dict() for workout in workouts])


#GET ALL FAVORITES
@workout_routes.route('/favorites')
@login_required
def get_likes_count():
    """
    Query for all entries in Favorites table that has equals passed in workout_id
    """
    result = Favorite.query.all()

    print(result)

    return jsonify([workout.to_dict() for workout in result])


# FAVORITE A WORKOUT
@workout_routes.route('/<int:workout_id>/favorite/<int:user_id>', methods=['POST'])
@login_required
def add_like(workout_id, user_id):
    fave_workout = Favorite.query.filter_by(workout_id=workout_id, user_id=user_id).first()
    if fave_workout is not None:
        return {"error": "Workout already liked"}, 400
    else:
        fave = Favorite(user_id=user_id, workout_id=workout_id)
        db.session.add(fave)
        db.session.commit()
        return fave.to_dict()

#UNFAVORITE A WORKOUT
@workout_routes.route('/<int:workout_id>/favorite/<int:user_id>', methods=['DELETE'])
@login_required
def remove_fave(workout_id, user_id):
    fave_workout = Favorite.query.filter_by(workout_id=workout_id, user_id=user_id).first()
    print(fave_workout)

    if fave_workout is None:
        return {"error": "Favorited workout does not exist"}, 404

    db.session.delete(fave_workout)

    db.session.commit()
    return jsonify("Unfavorited Workout!")
