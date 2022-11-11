import { FeedBackCreateData, FeedbackRepository } from "../feedbackRepository";
import { prisma } from '../../../prisma'

export class PrismaFeedBackRepository implements FeedbackRepository {
    async create({ type, comment, screenshot }: FeedBackCreateData){
        await prisma.feedback.create({
            data: {
                type: type,  
                comment: comment,
                screenshot: screenshot
            }
        })
    }
}