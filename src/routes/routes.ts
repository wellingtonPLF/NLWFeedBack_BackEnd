import express from 'express'
import { NodemailderMailAdapter } from '../features/emailFeature/featureMailAdapter/nodemailerAdapter'
import { PrismaFeedBackRepository } from '../repositories/feedbackRepository/feedBackRepositoryAdapter/prismaFeedBackRepository'
import { SubmitFeedBackService } from '../services/submitFeedback'

export const routes = express.Router()

routes.get('/feedbacks', async (req, res) => {
    try {
        return res.status(201).json({status: "200 OK"})
    }
    catch (e) {
        console.error(e)
        return res.status(500).send()
    }
})

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body
    
    try {
        const feedBackRepository = new PrismaFeedBackRepository()
        const mailerAdapter = new NodemailderMailAdapter()

        const submitFeedBack = new SubmitFeedBackService(
            feedBackRepository,
            mailerAdapter
        )
        
        await submitFeedBack.execute({
            type,
            comment,
            screenshot
        })

        // return res.status(201).json({data: feedback})
        return res.status(201).send()
    } catch (e){
        console.error(e)

        return res.status(500).send({"error": 'erro'})
    }
})