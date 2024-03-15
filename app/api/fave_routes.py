from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.models import Workout, Favorite, db
from .auth_routes import validation_errors_to_error_messages
from app.api.aws import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3)

fave_routes = Blueprint('faves', __name__)

#GET ALL FAVORITES
@fave_routes.route('/')
@login_required
def get_all_faves():
    """
    Query for all entries in Favorites table that has equals passed in workout_id
    """
    result = Favorite.query.all()

    print(result)

    return jsonify([workout.to_dict() for workout in result])

#GET ALL OF LOGGED IN USER'S FAVORITED WORKOUTS
@fave_routes.route('/<int:user_id>')
@login_required
def get_user_favorites(user_id):
    """
    Query for all logged in user's favorited workouts and returns them in a list
    """
    res = db.session.query(Favorite, Workout).join(Workout, Favorite.workout_id == Workout.id).filter(Favorite.user_id == user_id).all()
    print(res)

    workouts = [workout[1] for workout in res]
    return jsonify([workout.to_dict() for workout in workouts])


# FAVORITE A WORKOUT
@fave_routes.route('/<int:workout_id>/<int:user_id>', methods=['POST'])
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
@fave_routes.route('/<int:workout_id>/<int:user_id>', methods=['DELETE'])
@login_required
def remove_fave(workout_id, user_id):
    fave_workout = Favorite.query.filter_by(workout_id=workout_id, user_id=user_id).first()
    print(fave_workout)

    if fave_workout is None:
        return {"error": "Favorited workout does not exist"}, 404

    db.session.delete(fave_workout)

    db.session.commit()
    return jsonify("Unfavorited Workout!")
