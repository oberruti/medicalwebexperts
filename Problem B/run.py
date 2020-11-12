from flask_backend import db, create_app
from flask_backend.config import Config
from flask_backend.models import AppointmentType

app = create_app(Config)

def check_appointment_types():
    appointment_types = AppointmentType.query.all()
    return len(appointment_types) > 0


def create_appointment_types():
    create_jedi_stress_management()
    create_light_saber_skills()
    create_fighting_the_dark_side()


def create_jedi_stress_management():
    name = "JEDI STRESS MANAGEMENT"
    initial_hour = "540" # 540/60minutes = 9 hs 
    final_hour = "840" # 840/60minutes = 14 hs
    duration = "45" #minutes
    spots = "4"
    registered_appointment_type = AppointmentType(name=name, initial_hour=initial_hour, final_hour=final_hour, duration=duration, spots=spots)
    db.session.add(registered_appointment_type)
    db.session.commit()



def create_light_saber_skills():
    name = "LIGHT SABER SKILLS"
    initial_hour = "540" # 540/60minutes = 9 hs 
    final_hour = "840" # 840/60minutes = 14 hs
    duration = "45" #minutes
    spots = "4"
    registered_appointment_type = AppointmentType(name=name, initial_hour=initial_hour, final_hour=final_hour, duration=duration, spots=spots)
    db.session.add(registered_appointment_type)
    db.session.commit()


def create_fighting_the_dark_side():
    name = "FIGHTING THE DARK SIDE"
    initial_hour = "540" # 540/60minutes = 9 hs 
    final_hour = "960" # 960/60minutes = 16 hs
    duration = "60" #minutes
    spots = "1"
    registered_appointment_type = AppointmentType(name=name, initial_hour=initial_hour, final_hour=final_hour, duration=duration, spots=spots)
    db.session.add(registered_appointment_type)
    db.session.commit()


if __name__ == '__main__':
    db.create_all()
    are_appointment_types_created = check_appointment_types()
    if not are_appointment_types_created:
        create_appointment_types()
    app.run(port=3002, debug=True)
