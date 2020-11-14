import axios from 'axios'

export class AppointmentTypeModel {
    constructor(private accessToken: string) {}

    getAppointmentTypes = async (
        setErrorMessage: (error: string) => void
    ): Promise<any> => {
        const response = await this.tryToGetAppointmentTypes()

        if (response.status === 'ok') {
            const appointmenttypes = response.msg.appointmenttypes
            return processAppointmentTypes(appointmenttypes)
        }
        if (response.msg === '') {
            setErrorMessage('Something went wrong, please try again')
            return []
        }
        return []
    }

    tryToGetAppointmentTypes = async (): Promise<{ msg: any; status: string }> => {
        const response = axios
            .get('/appointmenttypes', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.accessToken}`,
                },
            })
            .then((response) => {
                return {
                    status: response.data.status,
                    msg: response.data.msg || response.data.data,
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


export const processAppointmentTypes = (appointmenttypes: any): any => {
    if (Array.isArray(appointmenttypes)) {
        return appointmenttypes.map((appointmenttype: any) => {
            return {
                id: appointmenttype.id,
                name: appointmenttype.name,
                initial_hour: appointmenttype.initial_hour,
                final_hour: appointmenttype.final_hour,
                duration: appointmenttype.duration,
                spots: appointmenttype.spots,
                appointmets: appointmenttype.appointment,
                //appointments: processAppointments(appointmenttype.appointment)
            }
        })
    }
    return [
        {
            id: appointmenttypes.id,
                name: appointmenttypes.name,
                initial_hour: appointmenttypes.initial_hour,
                final_hour: appointmenttypes.final_hour,
                duration: appointmenttypes.duration,
                spots: appointmenttypes.spots,
                appointmets: appointmenttypes.appointment,
                //appointments: processAppointments(appointmenttypes.appointment)
        },
    ]
}
