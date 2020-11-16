import { AppointmentType } from '../appointmentType/common';
import { Appointment } from '../appointment/common';
import { getValueOrDefault } from '../../../utils/checks';

export class HourModel {

    getHoursAvailable = (date: Date, maybeAppointmentTypeSelected?: AppointmentType): any => {
        const appointmentTypeSelected = getValueOrDefault(maybeAppointmentTypeSelected, {
            appointments: [],
            duration: '',
            initialHour: '',
            finalHour: '',
            id: -1,
            name: '',
            spots: '',
        })
        const appointments = appointmentTypeSelected.appointments
        const dateAppointments = appointments.filter(appointment => appointment.day==date.toString())
        const baseHours = this.getBaseHours(appointmentTypeSelected)
        const dateHoursNonAvailable = this.getNonAvailableHours(dateAppointments)
        return this.getAvailableHours(baseHours, dateHoursNonAvailable)
    }

    getBaseHours = (appointmentTypeSelected: AppointmentType) => {
        const baseHours = []
        const initialHour = Number.parseInt(appointmentTypeSelected.initialHour)
        const finalHour = Number.parseInt(appointmentTypeSelected.finalHour)
        const duration = Number.parseInt(appointmentTypeSelected.duration)
        const spots = Number.parseInt(appointmentTypeSelected.spots)
        for(let i=initialHour; i<finalHour; i=i+duration) {
            for (let h=1; h<=spots; h++) {
                baseHours.push(i)
            }
        }

        return baseHours
    }

    getNonAvailableHours = (appointments: Appointment[]) => {
        const hours: number[] = []
        appointments.forEach(appointment => {
            const hourInt = Number.parseInt(appointment.initialHour)
            hours.push(hourInt)
        })
        return hours
    }

    getAvailableHours = (baseHours: number[], nonAvailableHours: number[]) => {
        nonAvailableHours.map(nonAvailableHour => {
            baseHours.forEach((baseHour, index) => {
                if (baseHour === nonAvailableHour) {
                    baseHours.splice(index, 1)
                }
            })
        })
        return baseHours
    }

    getHoursToShow = (hours: number[]) => {
        const uniqueHours = Array.from(new Set(hours))
        return uniqueHours.map(hour => {
            const hourToShow = () => {
                const hours = Math.trunc(hour/60)
                const minutes = hour % 60 < 10 ? hour % 60 + '0' : hour % 60 
                return `${hours}:${minutes}`
            }
            return {
                minutes: hour,
                hour: hourToShow(),
            }
        })
    }
}