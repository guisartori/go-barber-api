import { isEqual } from 'date-fns'
import { EntityRepository, Repository } from 'typeorm'
import Appointment from '../models/Appointment'

interface AppointmentRepositoryDTO {
	provider: string
	date: Date
}

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
	public async findByDate(date: Date): Promise<Appointment | null> {
		const findAppointment = await this.findOne({
			where: { date }
		})

		return findAppointment || null
	}
}

export default AppointmentRepository
