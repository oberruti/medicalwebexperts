from datetime import timedelta

from flask import Blueprint, request, session
from flask_backend import jwt
from flask_backend.models import User, Worker, Appointment, Appointmenttype
from flask_backend.users.utils import register_user, register_worker, is_user_registered, is_worker_registered, register_appointment, is_appointment_id_valid, delete_appointment, modify_appointment
from flask_jwt_extended import create_access_token, jwt_required, get_raw_jwt, get_jwt_identity

users = Blueprint('users', __name__)


@users.route('/logout', methods=["DELETE"])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return dict(status="ok")


blacklist = set()


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist


# USER METHODS


@users.route('/sign_up', methods=["POST"])
def sign_up():
    if request.method == "POST":
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        security_social_number = request.json.get("security_social_number", None)
        worker_id = request.json.get("worker_id", None)
        if not email:
            return dict(status="error", msg="Missing email")
        if not password:
            return dict(status="error", msg="Missing password")
        if not security_social_number:
            return dict(status="error", msg="Missing Security Social Number")
        if not worker_id:
            if register_user(email, password, security_social_number):
                return dict(status="ok")
            return dict(status="error", msg="Already registered")
        if register_worker(email, password, security_social_number, worker_id):
            return dict(status="ok")
        return dict(status="error", msg="Worker did not registered")
    return dict(status="error", msg="Request not allowed")


@users.route('/login', methods=["POST"])
def log_in():
    if request.method == "POST":
        session.permanent = True
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        worker_id = request.json.get("worker_id", None)
        if not email:
            return dict(status="error", msg="Missing email")
        if not password:
            return dict(status="error", msg="Missing password")
        if not worker_id:
            user_registered = is_user_registered(email, password)
            if user_registered:
                user = User.query.filter_by(email=email).first()
                expires = timedelta(days=365)
                access_token = create_access_token(identity=user.email, expires_delta=expires)
                return dict(status="ok", data=dict(access_token=access_token, is_worker='false'))
            return dict(status="error", msg="Bad user name or password")
        worker_registered = is_worker_registered(email, password, worker_id)
        if worker_registered:
            worker = Worker.query.filter_by(email=email).first()
            expires = timedelta(days=365)
            access_token = create_access_token(identity=worker.email, expires_delta=expires)
            return dict(status="ok", data=dict(access_token=access_token, is_worker='true'))
        return dict(status="error", msg="Bad user name or password or worker id")
    return dict(status="error", msg="Request not allowed")


# APPOINTMENT METHODS


@users.route('/appointment', methods=["POST", "DELETE", "PUT"])
@jwt_required
def appointment():
    if request.method == "POST":
        email = request.json.get("email", get_jwt_identity())
        day = request.json.get("day", None)
        initial_hour = request.json.get("initial_hour", None)
        final_hour = request.json.get("final_hour", None)
        appointment_type_name = request.json.get("appointment_type_name", None)

        registered_appointment = register_appointment(
            email,
            day,
            initial_hour,
            final_hour,
            appointment_type_name
        )
        if registered_appointment['status'] == "ok":
            return dict(status="ok")
        return dict(status="error", msg=registered_appointment['msg'])

    if request.method == "DELETE":
        appointment_id_delete = request.json.get("id", None)
        appointment_to_delete = Appointment.query.filter_by(id=appointment_id_delete).first()
        if appointment_to_delete is not None:
            if delete_appointment(appointment_to_delete):
                return dict(status="ok")
            return dict(status="error", msg="appointment not deleted")
        return dict(status="error", msg="appointment not found")

    if request.method == "PUT":
        appointment_id_put = request.json.get("id", None)
        day = request.json.get("day", None)
        initial_hour = request.json.get("initial_hour", None)
        final_hour = request.json.get("final_hour", None)
        appointment_type_name = request.json.get("appointment_type_name", None)

        if is_appointment_id_valid(appointment_id_put):
            if modify_appointment(
                appointment_id_put,
                day,
                initial_hour,
                final_hour,
                appointment_type_name,
            ):
                return dict(status="ok")
            return dict(status="error", msg="appointment not updated")
        return dict(status="error", msg="appointment not found")
    return dict(status="error", msg="request not allowed")


@users.route('/getappointment', methods=["POST"])
@jwt_required
def get_appointment():
    if request.method == "POST":
        appointment_id = request.json.get("id", None)
        appointment = Appointment.query.filter_by(id=appointment_id).first()
        if appointment is None:
            return dict(status="error", msg="Appointment not found")
        return dict(status="ok", data=dict(appointment=appointment.serialize()))
    return dict(status="error", msg="Request not allowed")


@users.route('/appointmentsbyuser', methods=["POST"])
@jwt_required
def get_appointmentsbyuser():
    if request.method == "POST":
        user_id_get_appointment = request.json.get("id", None)
        if is_appointment_id_valid(user_id_get_appointment):
            appointments = Appointment.query.filter_by(user_id=user_id_get_appointment).all()
            return dict(status="ok", data=dict(appointments=Appointment.serialize_list(elements=appointments)))
        return dict(status="error", msg="user id not found")
    return dict(status="error", msg="Request not allowed")


@users.route('/appointments', methods=["GET"])
@jwt_required
def get_tasks():
    if request.method == "GET":
        appointments = Appointment.query.all()
        return dict(status="ok", data=dict(appointments=Appointment.serialize_list(elements=appointments)))
    return dict(status="error", msg="Request not allowed")


# APPOINTMENT TYPES

@users.route('/getappointmenttype', methods=["POST"])
@jwt_required
def get_appointment_type():
    if request.method == "POST":
        appointment_type_id = request.json.get("id", None)
        appointment_type = Appointmenttype.query.filter_by(id=appointment_type_id).first()
        if appointment_type is None:
            return dict(status="error", msg="Appointment type not found")
        return dict(status="ok", data=dict(appointmenttype={
            'id': appointment_type.id,
            'name': appointment_type.name,
            'initial_hour':appointment_type.initial_hour,
            'final_hour': appointment_type.final_hour,
            'duration': appointment_type.duration,
            'spots': appointment_type.spots,
            'appointment': appointment_type.serialize_list(elements=appointment_type.appointment),
        }))
    return dict(status="error", msg="Request not allowed")


@users.route('/appointmenttypes', methods=["GET"])
@jwt_required
def get_appointment_types():
    if request.method == "GET":
        appointments_types = Appointmenttype.query.all()
        final = []
        for at in appointments_types:
            appointments = []
            for ap in at.appointment:
                appointments.append({
                    'id': ap.id,
                    'day': ap.day,
                    'initial_hour': ap.initial_hour,
                    'final_hour': ap.final_hour,
                    'user_id': ap.user_id,
                    'appointment_type': ap.appointment_type,
                })
            final.append({
            'id': at.id,
            'name': at.name,
            'initial_hour':at.initial_hour,
            'final_hour': at.final_hour,
            'duration': at.duration,
            'spots': at.spots,
            'appointment': appointments,
        })
        return dict(status="ok", data=dict(appointmenttypes=final))
    return dict(status="error", msg="Request not allowed")