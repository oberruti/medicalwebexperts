import { Appointment } from "../appointment/common";

export interface AppointmentType {
    appointments: Appointment[]
    duration: string
    initialHour: string
    finalHour: string
    id: number
    name: string
    spots: string
}