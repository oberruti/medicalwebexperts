import axios from 'axios'

export class AppointmentModel {
    constructor(private accessToken: string) {
    }

    tryToSaveAppointment = async (
        day: string,
        initial_hour: string,
        final_hour: string,
        appointment_type_name: string,
        setErrorMessage: (value: string) => void,
    ): Promise<boolean> => {
        const response = await this.saveAppointment(
            day,
            initial_hour,
            final_hour,
            appointment_type_name,
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
    ): Promise<{ msg: any; status: string }> => {
        const response = axios
            .post(
                '/appointment',
                {
                    day,
                    initial_hour,
                    final_hour,
                    appointment_type_name,
                },
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