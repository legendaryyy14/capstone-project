from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, URL

class WorkoutForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), Length(min=3, max=50)])
    description = StringField('description', validators=[DataRequired(), Length(min=3, max=255)])
    public = BooleanField('public')
    image_url = StringField('image_url', validators=[DataRequired(), URL(require_tld=False)])
