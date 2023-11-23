from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, Optional
from app.api.aws import ALLOWED_EXTENSIONS

class ExerciseEditForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    workout_id = IntegerField('workout_id', validators=[Optional(strip_whitespace=True)])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), Length(min=3, max=50)])
    description = StringField('description', validators=[DataRequired(), Length(min=3, max=255)])
    sets = IntegerField('sets', validators=[DataRequired()])
    reps = IntegerField('reps', validators=[DataRequired()])
    image_url = FileField("Image File", validators=[ FileAllowed(list(ALLOWED_EXTENSIONS))])
