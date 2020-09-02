import { startOfHour } from 'date-fns'
import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'

interface RequestDTO {
	provider: string
	date: Date
}
class CreateAppointmentService {
	private appointmentRepository: AppointmentRepository

	constructor(appointmentRepository: AppointmentRepository) {
		this.appointmentRepository = appointmentRepository
	}

	public run({ date, provider }: RequestDTO): Appointment {
		const formattedDate = startOfHour(date)

		const hasSameDate = this.appointmentRepository.findByDate(formattedDate)

		if (hasSameDate) {
			throw Error('This appointment is already booked.')
		}

		const newAppointment = this.appointmentRepository.create({
			provider,
			date: formattedDate
		})

		return newAppointment
	}
}

export default CreateAppointmentService
