import datetime

from flask_backend.models import User, Appointment, Worker, AppointmentType
from flask_backend import db, bcrypt


# APPOINTMENT METHODS


def is_appointment_id_valid(appointment_id):
    try:
        appointment = Appointment.query.filter_by(id=appointment_id).first()
        return appointment is not None
    except:
        return False


def register_appointment(email, day, initial_hour, final_hour, appointment_type_name):
    user_id = User.query.filter_by(email=email).first().id
    appointment_type = AppointmentType.query.filter_by(name=appointment_type_name).first()
    try:
        registered_appointment = Appointment(email=email, day=day, initial_hour=initial_hour, final_hour=final_hour, user_id=user_id, appointment_type=appointment_type)
        db.session.add(registered_appointment)
        db.session.commit()
        return dict(status="ok", data=dict(registered_appointment.serialize()))
    except:
        return dict(status="false")


def modify_appointment(appointment_id, day, initial_hour, final_hour, appointment_type_name):
    appointment = Appointment.query.filter_by(id=appointment_id).first()
    appointment_type = AppointmentType.query.filter_by(name=appointment_type_name).first()
    try:
        appointment.day = day
        appointment.initial_hour = initial_hour
        appointment.final_hour = final_hour
        appointment.appointment_type = appointment_type
        db.session.commit()
        return True
    except:
        return False


def delete_appointment(appointment):
    try:
        db.session.delete(appointment)
        db.session.commit()
        return True
    except:
        return False


# USER METHODS


def register_user(email, password, security_social_number):
    if is_user_created(email, security_social_number):
        return False
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    registered_user = User(email=email, security_social_number=security_social_number, password=hashed_password)
    db.session.add(registered_user)
    db.session.commit()
    return True


def is_user_created(email=None, security_social_number=None):
    email_registered = User.query.filter_by(email=email).first()
    security_social_number_registered = User.query.filter_by(security_social_number=security_social_number).first()
    return email_registered is not None and security_social_number_registered is not None


def is_user_registered(email, password):
    temporal_user = User.query.filter_by(email=email).first()
    if temporal_user is None:
        return False
    return bcrypt.check_password_hash(temporal_user.password, password)


# Worker methods

def is_worker_registered(email, password, worker_id):
    temporal_worker = Worker.query.filter_by(email=email).first()
    if temporal_worker is None:
        return False
    return bcrypt.check_password_hash(temporal_worker.password, password)


def is_worker_created(email=None, security_social_number=None, worker_id=None):
    email_registered = Worker.query.filter_by(email=email).first()
    security_social_number_registered = Worker.query.filter_by(security_social_number=security_social_number).first()
    worker_id = Worker.query.filter_by(worker_id=worker_id).first()
    return email_registered is not None and security_social_number_registered is not None and worker_id is not None


def register_worker(email, password, security_social_number, worker_id):
    if is_worker_created(email, security_social_number, worker_id):
        return False
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    registered_worker = Worker(email=email, security_social_number=security_social_number, password=hashed_password, worker_id=worker_id)
    db.session.add(registered_worker)
    db.session.commit()
    return True
