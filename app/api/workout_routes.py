from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.models import Workout, Favorite, db
from app.forms.workout_form import WorkoutForm
# from app.forms.album_edit_form import AlbumEditForm
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
@workout_routes.route('/<workout_id>')
@login_required
def get_workout(workout_id):
    """
    Query for a workout by id and returns it in a dictionary
    """
    workout = Workout.query.get(workout_id)

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
            user_id=form.data['user_id'],
            title=form.data['title'],
            description=form.data['description'],
            public=form.data['public'],
            image_url=form.data['image_url']
        )
        db.session.add(workout)
        db.session.commit()
        return workout.to_dict()
    return {'errors': form.errors}, 400
