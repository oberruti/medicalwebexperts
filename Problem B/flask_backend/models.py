from flask_backend import db
from flask_login import UserMixin

from sqlalchemy.inspection import inspect


class Serializer(object):
    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}

    @staticmethod
    def serialize_list(l):
        return [m.serialize() for m in l]


class User(db.Model, UserMixin):
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True, unique=True, nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    security_social_number = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)

    # son
    appointment = db.relationship('Appointment', backref='user', lazy=True)

    def __repr__(self):
        return f"User('email: {self.email}', 'social_security_number: {self.social_security_number}')"

    def serialize(self):
        d = Serializer.serialize(self)
        return d

    @staticmethod
    def serialize_list(elements):
        d = Serializer.serialize_list(elements)
        return d


class Worker(db.Model, UserMixin):
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True, unique=True, nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    security_social_number = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    worker_id = db.Column(db.String(250), unique=True, nullable=False)

    def __repr__(self):
        return f"Worker('email: {self.email}', 'social_security_number: {self.social_security_number}', 'worker_id: {self.worker_id}')"

    def serialize(self):
        d = Serializer.serialize(self)
        return d

    @staticmethod
    def serialize_list(elements):
        d = Serializer.serialize_list(elements)
        return d


class Appointmenttype(db.Model):
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True, unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    initial_hour = db.Column(db.String(50), nullable=False)
    final_hour = db.Column(db.String(50), nullable=False)
    duration = db.Column(db.String(10), nullable=False)
    spots = db.Column(db.String(10), nullable=False)

     # son
    appointment = db.relationship('Appointment', backref='Appointmenttype', lazy=True)

    def __repr__(self):
        return f"Appointment Type('Name: {self.name}', 'From: {self.initial_hour}', 'To: {self.final_hour}', 'Duration: {self.duration}', 'Spots: {self.spots}')"

    def serialize(self):
        d = Serializer.serialize(self)
        del d['appointment type']
        return d

    @staticmethod
    def serialize_list(elements):
        d = Serializer.serialize_list(elements)
        return d        


class Appointment(db.Model):
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True, unique=True, nullable=False)
    day = db.Column(db.String(50), nullable=False)
    initial_hour = db.Column(db.String(50), nullable=False)
    final_hour = db.Column(db.String(50), nullable=False)

    # parent
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    appointment_type = db.Column(db.Integer, db.ForeignKey('appointmenttype.id'), nullable=True)

    def __repr__(self):
        return f"Appointment('Day: {self.day}', 'From: {self.initial_hour}', 'To: {self.final_hour}')"

    def serialize(self):
        d = Serializer.serialize(self)
        del d['appointment']
        return d

    @staticmethod
    def serialize_list(elements):
        d = Serializer.serialize_list(elements)
        return d
