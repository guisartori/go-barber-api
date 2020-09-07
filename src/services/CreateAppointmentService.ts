/* eslint-disable camelcase */
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'

interface RequestDTO {
	provider_id: string
	date: Date
}
class CreateAppointmentService {
	public async run({ date, provider_id }: RequestDTO): Promise<Appointment> {
		const appointmentRepository = getCustomRepository(AppointmentRepository)
		const formattedDate = startOfHour(date)

		const hasSameDate = await appointmentRepository.findByDate(formattedDate)

		if (hasSameDate) {
			throw Error('This appointment is already booked.')
		}

		const newAppointment = appointmentRepository.create({
			provider_id,
			date: formattedDate
		})

		await appointmentRepository.save(newAppointment)

		return newAppointment
	}
}

export default CreateAppointmentService
