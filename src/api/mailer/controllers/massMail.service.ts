import { mailerServiceMass } from '../../../utils/mailer'
import { sleep } from '../../../utils/mailer/sleeper'

export const MassMail = async (emails, subject, text, html) => {
    try {
        for (const email of emails) {
            await mailerServiceMass(html, subject, text, '', email)
            await sleep(1000)
            console.log(`mail sent to ${email}`)
        }

        return {
            success: true,
            message: 'Mails sent to following emails',
            data: emails,
        }
    } catch (error) {
        return {
            status: error.status,
            success: false,
            error: error.message,
            message: 'Mails Not sent',
        }
    }
}
