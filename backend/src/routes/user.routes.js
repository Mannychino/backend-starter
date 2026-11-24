 import { Router } from "express";
 import {getUser} from "../controllers/user.controller.js";


 const router = Router();


 router.route('/register').post(getUser);  // Route to handle user registration

 export default router;