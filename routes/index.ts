import express, { Router } from 'express'
const router: Router = express.Router()

import currencyRoutes from '../routes/currency.routes'

router.use('/service', currencyRoutes)

export default router
