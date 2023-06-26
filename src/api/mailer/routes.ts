import { Request, Response, NextFunction, Router } from 'express'
import Logger from '../../loaders/logger'
import { MassMail } from './controllers/massMail.service'
import { createTemplate, getTemplate } from '../../utils/mailer/template'
import {
    templatedBulkMailer,
    templatedMassMailer,
} from '../../utils/mailer/awsService'
const mailRoutes = Router()

mailRoutes.get('/', HandleCheck)

mailRoutes.get('/get-template/:name', HandleTemplateRequest)
mailRoutes.post('/create-template', HandleTemplateCreation)

mailRoutes.post('/massMailer', HandleMassMail)
mailRoutes.post('/templatedMassMailer', HandleTemplatedMassMail)
mailRoutes.post('/templatedBulkMailer', HandleTemplatedBulkMail)

async function HandleCheck(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json({
            success: 'true',
            message: 'MassMailer Working :)',
        })
    } catch (error) {
        Logger.error(error.err)
        res.status(error.status).json({
            status: error.status,
            success: false,
            error: error.err || 'ISR',
            message: 'MassMailer Not working :(',
        })
    }
}

async function HandleMassMail(req: Request, res: Response, next: NextFunction) {
    try {
        const { emails, subject, text, html } = req.body
        const { success, message, data } = await MassMail(
            emails,
            subject,
            text,
            html
        )
        res.status(200).json({
            success,
            message,
            data,
        })
    } catch (error) {
        res.status(error.status).json({
            status: error.status,
            success: false,
            message: error.message,
            error: error.err || 'ISR',
        })
    }
}

async function HandleTemplatedMassMail(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { emails, templateName, template_data } = req.body
        const user_data = JSON.stringify(template_data)
        const { success, message, data } = await templatedMassMailer(
            emails,
            templateName,
            user_data
        )
        res.status(200).json({
            success,
            message,
            data,
        })
    } catch (error) {
        Logger.error(error.err)
        res.status(error.status).json({
            status: error.status,
            success: false,
            error: error.err || 'ISR',
            message: 'Template sending failed :(',
        })
    }
}

async function HandleTemplatedBulkMail(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { users, templateName } = req.body
        const { success, message, data } = await templatedBulkMailer(
            users,
            templateName
        )
        res.status(200).json({
            success,
            message,
            data,
        })
    } catch (error) {
        Logger.error(error.err)
        res.status(error.status).json({
            status: error.status,
            success: false,
            error: error.err || 'ISR',
            message: 'Template sending failed :(',
        })
    }
}

async function HandleTemplateCreation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { name, subject, text, html } = req.body
        await createTemplate(name, subject, text, html)
        res.status(200).json({
            success: 'true',
            message: `${name} Template was created successfully :)`,
        })
    } catch (error) {
        Logger.error(error.err)
        res.status(error.status).json({
            status: error.status,
            success: false,
            error: error.err || 'ISR',
            message: 'Template creation failed :(',
        })
    }
}

async function HandleTemplateRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { name } = req.params
        const { success, message, data } = await getTemplate(name)
        res.status(200).json({
            success,
            message,
            data,
        })
    } catch (error) {
        Logger.error(error.err)
        res.status(error.status).json({
            status: error.status,
            success: false,
            error: error.err || 'ISR',
            message: 'Template creation failed :(',
        })
    }
}

export default mailRoutes
