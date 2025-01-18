import express from 'express'
import {signin, signup, updateUser, searchUser, logout, getCurrentUser} from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middlewares.js';
const router = express.Router();


router.route("/sign-up").post(signup);
router.route("/sign-in").post(signin);
router.route("/log-out").post(logout);

router.route("/update-user").put(verifyJWT, updateUser);
router.route("/search-user").get(verifyJWT, searchUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);


export default router;