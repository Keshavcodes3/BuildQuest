import express from 'express'
import cookie from 'cookie-parser'


const app = express()
app.use(express.json())
app.use(cookie())




import router from './modules/users/users.routes.js'

app.use('/api/v1/auth', router)


export default app