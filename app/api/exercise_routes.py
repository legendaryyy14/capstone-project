from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.models import Exercise, db
from app.forms.exercise_form import ExerciseForm
from app.forms.exercise_edit_form import ExerciseEditForm
from .auth_routes import validation_errors_to_error_messages

exercise_routes = Blueprint('exercises', __name__)

# GET ALL EXERCISES
@exercise_routes.route('/')
@login_required
def get_exercises():
    """
    Query for all exercises and returns them in a list of exercises dictionaries
    """
    exercises = Exercise.query.all()
    return jsonify([exercise.to_dict() for exercise in exercises])

#GET EXERCISE BY ID
@exercise_routes.route('/<int:id>')
@login_required
def get_exercise(id):
    """
    Query for an exercise by id and returns it in a dictionary
    """
    exercise = Exercise.query.get(id)

    if exercise:
        return exercise.to_dict()
    else:
        return {"error": "Exercise not found"}, 404

# CREATE EXERCISE
@exercise_routes.route('/create', methods=["POST"])
@login_required
def create_exercise():
    """
    Create a new exercise and returns it
    """
    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        exercise = Exercise(
            workout_id = form.data['workout_id'],
            user_id = form.data['user_id'],
            title = form.data['title'],
            description = form.data['description'],
            sets = form.data['sets'],
            reps = form.data['reps'],
            image_url = form.data['image_url']
        )
        db.session.add(exercise)
        db.session.commit()
        return exercise.to_dict()
    return {'errors': form.errors}, 400


# UPDATE AN EXERCISE
@exercise_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_exercise(id):
    form = ExerciseEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        exercise = Exercise.query.get(id)
        exercise.workout_id = form.data['workout_id']
        exercise.title = form.data['title']
        exercise.description = form.data['description']
        exercise.sets = form.data['sets']
        exercise.reps = form.data['reps']
        exercise.image_url = form.data['image_url']

        db.session.commit()
        return exercise.to_dict()
    return {'errors': form.errors}, 400

# DELETE AN EXERCISE
@exercise_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_exercise(id):
    exercise = Exercise.query.get(id)

    if exercise is None:
        return {"error": "Exercise does not exist"}, 404

    db.session.delete(exercise)
    db.session.commit()
    return exercise.to_dict()
