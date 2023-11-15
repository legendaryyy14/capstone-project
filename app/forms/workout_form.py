from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, URL
from app.api.aws import ALLOWED_EXTENSIONS

class WorkoutForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), Length(min=3, max=50)])
    description = StringField('description', validators=[DataRequired(), Length(min=3, max=255)])
    public = BooleanField('public')
    image_url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
