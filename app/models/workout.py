from .db import db, environment, SCHEMA, add_prefix_for_prod

class Workout(db.Model):
  __tablename__ = 'workouts'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String, nullable=False)
  public = db.Column(db.Boolean)
  image_url = db.Column(db.String, nullable=True)

  exercises = db.relationship('Exercise', back_populates='workout')
  favorite = db.relationship('Favorite', back_populates='workouts')
  user = db.relationship('User', back_populates='workouts')

  def to_dict(self):
      return {
          'id': self.id,
          'user_id': self.user_id,
          'title': self.title,
          'description': self.description,
          'public': self.public,
          'image_url': self.image_url
      }
