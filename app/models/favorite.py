from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
  __tablename__ = 'favorites'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  workout_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("workouts.id")), nullable=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

  workouts = db.relationship('Workout', back_populates='favorite')
  users = db.relationship('User', back_populates='favorite')

  def to_dict(self):
      return {
          'id': self.id,
          'workout_id': self.workout_id,
          'user_id': self.user_id
      }
