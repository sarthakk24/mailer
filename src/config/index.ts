require('dotenv').config()
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
    port: parseInt(process.env.PORT) || 5050, // PORT
    dbURL: process.env.MONGODB_URI, // Mongo URI
    dbName: process.env.MONGODB_NAME, // Database Name
    jwtSecret: process.env.JWT_SECRET, // JWT Secret
    logs: {
        level: process.env.LOG_LEVEL || 'silly', // Logger Level
    },
    api: {
        prefix: '/api', // API Prefix
    },
    region: process.env.AWS_REGION || 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    replyTo: process.env.EMAIL_REPLY_TO,
    from: process.env.EMAIL_FROM,
}
