import express from 'express'

const router = express.Router();

import userRouter from './user.routes.js';
import accountRouter from './account.routes.js';

router.use("/users", userRouter);
router.use("/accounts", accountRouter);



export default router;