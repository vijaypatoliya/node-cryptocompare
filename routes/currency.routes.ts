import express, { Router } from 'express'
import { getPrice } from '../controllers/currency.controller'


const router: Router = express.Router()

/** Get Currency Price List */
router.get('/price', getPrice)

export default router
