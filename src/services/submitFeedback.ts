import { MailAdapter } from '../features/emailFeature/mailFeature';
import { FeedbackRepository } from '../repositories/feedbackRepository/feedbackRepository'

interface SubmitFeedBackRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedBackService {
    constructor(
        private feedbackRepository: FeedbackRepository,
        private mailAdapter: MailAdapter
    ){}

    async execute(request: SubmitFeedBackRequest) {
        const { type, comment, screenshot } = request;

        if(!type){
            throw new Error('Type is required')
        }

        if(!comment){
            throw new Error('Comment is required')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Screenshot invalid format')
        }

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo FeedBack',
            body: [
                `<div style="color: red">`,
                `<p>Type Feedback: ${type}</p>`,
                `<p>Comments: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />`: ``,
                `</div>`,
             ].join('\n')
        })

        // return { type, comment, screenshot }
    }    
}