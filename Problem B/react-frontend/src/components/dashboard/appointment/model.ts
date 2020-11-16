import axios from 'axios'
import { isNil, nil } from 'utils/checks'
import { Appointment } from './common'

export class AppointmentModel {
    constructor(private accessToken: string) {
    }

    tryToSaveAppointment = async (
        day: string,
        initial_hour: string,
        final_hour: string,
        appointment_type_name: string,
        email: string | nil,
        setErrorMessage: (value: string) => void,
    ): Promise<boolean> => {
        const response = await this.saveAppointment(
            day,
            initial_hour,
            final_hour,
            appointment_type_name,
            email,
        )

        if (response.status === 'ok') {
            return true
        }
        if (response.msg === '') {
            setErrorMessage('Something went wrong, please try again')
            return false
        }
        setErrorMessage(response.msg)
        return false
    }

    saveAppointment = async (
        day: string,
        initial_hour: string,
        final_hour: string,
        appointment_type_name: string,
        email: string | nil,
    ): Promise<{ msg: any; status: string }> => {
        const params = isNil(email) ? {
            day,
            initial_hour,
            final_hour,
            appointment_type_name,
        } : {
            day,
            initial_hour,
            final_hour,
            appointment_type_name,
            email,
        }
        const response = axios
            .post(
                '/appointment',
                params,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                }
            )
            .then((response) => {
                return {
                    status: response.data.status,
                    msg: response.data.appointment || response.data.msg,
                }
            })
            .catch(() => {
                return {
                    status: 'error',
                    msg: '',
                }
            })
        return await response
    }
}


export const processAppointments = (appointments: any): Appointment[] => {
    if (Array.isArray(appointments)) {
        return appointments.map((appointment: any) => {
            return {
                userId: appointment.user_id,
                appointmentTypeId: appointment.appointment_type,
                day: appointment.day,
                initialHour: appointment.initial_hour,
                finalHour: appointment.final_hour,
            }
        })
    }
    return [
        {
            userId: appointments.user_id,
                appointmentTypeId: appointments.appointment_type,
                day: appointments.day,
                initialHour: appointments.initial_hour,
                finalHour: appointments.final_hour,
        },
    ]
}
