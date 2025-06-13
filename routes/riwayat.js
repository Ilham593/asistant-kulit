import express from 'express';
import { simpanRiwayat, getRiwayatByUser } from '../controllers/riwayatController.js';
const router = express.Router();

router.post('/', simpanRiwayat); 
router.get('/:userId', getRiwayatByUser); 
export default router;
