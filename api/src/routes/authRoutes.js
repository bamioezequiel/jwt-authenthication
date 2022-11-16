import express from 'express';
import { checkUser } from '../middlewares/authMiddlewares.js'; 
import { login, register } from '../controllers/authControllers.js';

const router = express.Router();
router.post('/verifyUser', checkUser);
router.post('/login', login);
router.post('/register', register);

export default router;