import { SubmitFeedBackService } from "../services/submitFeedback"

//Grants that parameters works
const createFeedBackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedBack = new SubmitFeedBackService(
    {create: createFeedBackSpy },
    {sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedBack.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'picture.jpg'
        })).resolves.not.toThrow()

        expect(createFeedBackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it("shouldn't be able to submit feedback without type", async () => {
        await expect(submitFeedBack.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'picture.jpg'
        })).rejects.toThrow()
    })

    it("shouldn't be able to submit feedback without comment", async () => {
        await expect(submitFeedBack.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'picture.jpg'
        })).rejects.toThrow()
    })

    it("shouldn't be able to submit feedback with an invalid screenshot", async () => {
        await expect(submitFeedBack.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,test'
        })).rejects.toThrow()
    })
})