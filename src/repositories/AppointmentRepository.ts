import { isEqual } from 'date-fns'
import Appointment from '../models/Appointment'

interface AppointmentRepositoryDTO {
	provider: string
	date: Date
}

class AppointmentRepository {
	private appointments: Appointment[]

	constructor() {
		this.appointments = []
	}

	public create({ provider, date }: AppointmentRepositoryDTO): Appointment {
		const newAppointment = new Appointment({ provider, date })
		this.appointments.push(newAppointment)
		return newAppointment
	}

	public findByDate(date: Date): Appointment | null {
		return (
			this.appointments.find(appointment => isEqual(date, appointment.date)) ||
			null
		)
	}

	public all(): Appointment[] {
		return this.appointments
	}
}

export default AppointmentRepository
