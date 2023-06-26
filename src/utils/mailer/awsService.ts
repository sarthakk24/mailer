import aws from 'aws-sdk'
import nodemailer from 'nodemailer'
import config from '../../config'

const ses = new aws.SES({
    apiVersion: '2019-09-27',
    region: config.region,
    credentials: new aws.Credentials({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
    }),
})

export const sendEmail = async (mail: any) => {
    console.log(config)

    let transporter = nodemailer.createTransport({
        SES: { ses, aws },
    })
    let request = transporter.sendMail(mail)
    return request
}

export const createNodemailerMail = (
    html: any,
    text: string,
    subject: string,
    receiverEmail: string,
    attachments?: any // attachments as an optional parameter
) => {
    const mail = attachments
        ? {
              from: config.from,
              to: receiverEmail,
              replyTo: config.replyTo,
              subject,
              text,
              html,
              attachments,
          }
        : {
              from: config.from,
              to: receiverEmail,
              replyTo: config.replyTo,
              subject,
              text,
              html,
          }
    return mail
}

export const templatedMassMailer = async (
    emails,
    templateName,
    template_data
) => {
    try {
        const params = {
            Source: config.from,
            Template: templateName,
            Destination: {
                ToAddresses: emails,
            },
            TemplateData: template_data,
        }
        const res = await ses.sendTemplatedEmail(params).promise()
        return {
            success: true,
            message: 'Email sent Successfully!',
            data: res,
        }
    } catch (error) {
        return {
            status: error.status,
            success: false,
            message: 'Email Not sent',
            error: error,
        }
    }
}

export const templatedBulkMailer = async (users, templateName) => {
    try {
        const res = await ses
            .sendBulkTemplatedEmail({
                Destinations: users.map((user) => ({
                    Destination: { ToAddresses: [user.email] },
                    ReplacementTemplateData: JSON.stringify({
                        name: user.name,
                        email: user.email,
                    }),
                })),
                DefaultTemplateData: JSON.stringify({
                    name: 'Default Name',
                    email: 'Default Email',
                }),
                Source: config.from,
                Template: templateName,
            })
            .promise()
        return {
            success: true,
            message: 'Email sent Successfully!',
            data: res,
        }
    } catch (error) {
        return {
            status: error.status,
            success: false,
            message: 'Email Not sent',
            error: error,
        }
    }
}
