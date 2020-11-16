export interface Appointment {
    userId: number
    appointmentTypeId?: number
    day: string
    initialHour: string
    finalHour: string
}