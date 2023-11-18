from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length
from app.api.aws import ALLOWED_EXTENSIONS

class WorkoutEditForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=3, max=50)])
    description = StringField('description', validators=[DataRequired(), Length(min=3, max=255)])
    public = BooleanField('public')
    image_url = FileField("Image File", validators=[ FileAllowed(list(ALLOWED_EXTENSIONS))])
