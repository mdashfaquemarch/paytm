import express from 'express'
import { checkBalance, transferBalance } from '../controllers/account.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';


const router = express.Router();


router.route("/check-balance").get(verifyJWT, checkBalance);

router.route("/transfer-money").post(verifyJWT, transferBalance);

export default router;