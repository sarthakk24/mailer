import { template } from 'dot'
import Logger from '../../loaders/logger'
import config from '../../config'
import { error } from 'console'

const AWS = require('aws-sdk')
AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
})

const ses = new AWS.SES()

export const getTemplatedString = (data: any, html: any): string => {
    try {
        let templateVariable = template(html)
        return templateVariable(data)
    } catch (err) {
        Logger.error(err || 'Error in getting template string')
        throw error
    }
}

export const createTemplate = async (name, subject, text, html) => {
    try {
        const params = {
            Template: {
                TemplateName: name,
                SubjectPart: subject,
                TextPart: text,
                HtmlPart: html,
            },
        }
        const res = await ses.createTemplate(params).promise()
        return { success: true, message: 'Template Created', data: res }
    } catch (error) {
        return {
            status: error.status,
            success: false,
            message: 'Template Creation Failed',
            error,
        }
    }
}

export const getTemplate = async (name) => {
    try {
        const params = {
            TemplateName: name,
        }
        const res = await ses.getTemplate(params).promise()
        return { success: true, message: 'Template Received', data: res }
    } catch (error) {
        return {
            status: error.status,
            success: false,
            message: 'Template Get Failed',
            error,
        }
    }
}
