/* eslint-disable camelcase */
import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', async (request, response) => {
	try {
		const { provider_id, date } = request.body
		const parsedDate = parseISO(date)

		const createAppointment = new CreateAppointmentService()
		const newAppointment = await createAppointment.run({
			date: parsedDate,
			provider_id
		})

		return response.status(201).json(newAppointment)
	} catch (error) {
		return response.status(400).json({ error: error.message })
	}
})

appointmentsRouter.get('/', async (request, response) => {
	const appointmentRepository = getCustomRepository(AppointmentRepository)
	const appointments = await appointmentRepository.find()

	return response.json(appointments)
})

export default appointmentsRouter
