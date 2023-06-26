import { Router } from 'express'
import healthCheckRoute from './healthcheck'
import mailRoutes from './mailer/routes'

export default (): Router => {
    const app = Router()
    //TODO: add routes here...
    app.use('/health', healthCheckRoute)
    app.use('/mail', mailRoutes)
    return app
}
