from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, URL

class ExerciseEditForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    workout_id = IntegerField('workout_id')
    user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), Length(min=3, max=50)])
    description = StringField('description', validators=[DataRequired(), Length(min=3, max=255)])
    sets = IntegerField('sets', validators=[DataRequired()])
    reps = IntegerField('reps', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired(), URL(require_tld=False)])
