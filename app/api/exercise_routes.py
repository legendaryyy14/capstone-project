from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.models import Exercise, db
# from app.forms.album_form import AlbumForm
# from app.forms.album_edit_form import AlbumEditForm
from .auth_routes import validation_errors_to_error_messages

exercise_routes = Blueprint('exercises', __name__)
