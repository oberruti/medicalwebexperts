import axios from 'axios'
import { getValueOrDefault } from 'utils/checks'
import { noop } from 'utils/utils'
import { processAppointments } from '../appointment/model'
import { AppointmentType } from './common'

export class AppointmentTypeModel {
    constructor(private accessToken: string) {}

    getAppointmentTypes = async (
        maybeSetErrorMessage?: (error: string) => void
    ): Promise<AppointmentType[]> => {
        const response = await this.tryToGetAppointmentTypes()

        if (response.status === 'ok') {
            const appointmenttypes = response.msg.appointmenttypes
            return processAppointmentTypes(appointmenttypes)
        }
        if (response.msg === '') {
            const setErrorMessage = getValueOrDefault(maybeSetErrorMessage, noop)
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


export const processAppointmentTypes = (appointmenttypes: any): AppointmentType[] => {
    if (Array.isArray(appointmenttypes)) {
        return appointmenttypes.map((appointmenttype: any) => {
            return {
                id: appointmenttype.id,
                name: appointmenttype.name,
                initialHour: appointmenttype.initial_hour,
                finalHour: appointmenttype.final_hour,
                duration: appointmenttype.duration,
                spots: appointmenttype.spots,
                appointments: processAppointments(appointmenttype.appointment),
            }
        })
    }
    return [
        {
            id: appointmenttypes.id,
                name: appointmenttypes.name,
                initialHour: appointmenttypes.initial_hour,
                finalHour: appointmenttypes.final_hour,
                duration: appointmenttypes.duration,
                spots: appointmenttypes.spots,
                appointments: processAppointments(appointmenttypes.appointment),
        },
    ]
}
