import Logger from '../../loaders/logger'
import { createNodemailerMail, sendEmail } from './awsService'
import { getTemplatedString } from './template'

interface attachmentsArgs {
    filename: string
    path: string
    cid?: string
}

export const mailerServiceMass = async (
    html: string,
    subject: string,
    text: string,
    data: any,
    email: string,
    attachments?: attachmentsArgs[]
) => {
    let mail = createNodemailerMail(html, text, subject, email, attachments)

    try {
        await sendEmail(mail)
    } catch (err) {
        console.log(err)
        Logger.error(err.err || 'Error sending mail')
        throw {
            status: err.status,
            success: false,
            message: `Error sending mail to ${mail}`,
            error: err.err,
        }
    }
}

export const mailerServiceTemplate = async (
    html: string,
    subject: string,
    text: string,
    data: any,
    email: string,
    attachments?: attachmentsArgs[]
) => {
    let mail = createNodemailerMail(html, text, subject, email, attachments)

    try {
        await sendEmail(mail)
    } catch (err) {
        console.log(err)
        Logger.error(err.err || 'Error sending mail')
        throw {
            status: err.status,
            success: false,
            message: `Error sending mail to ${mail}`,
            error: err.err,
        }
    }
}
