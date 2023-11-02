from .db import db, environment, SCHEMA, add_prefix_for_prod

class Exercise(db.Model):
  __tablename__ = 'exercises'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  workout_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("workouts.id")), nullable=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String, nullable=False)
  sets = db.Column(db.Integer, nullable=False)
  reps = db.Column(db.Integer, nullable=False)
  image_url = db.Column(db.String, nullable=True)

  workout = db.relationship('Workout', back_populates='exercises')
  user = db.relationship('User', back_populates='exercises')

  def to_dict(self):
      return {
          'id': self.id,
          'workout_id': self.workout_id,
          'user_id': self.user_id,
          'title': self.title,
          'description': self.description,
          'sets': self.sets,
          'reps': self.reps,
          'image_url': self.image_url
      }
