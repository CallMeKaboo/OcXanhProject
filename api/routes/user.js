const express = require("express");
import { addUser } from "../controllers/home/user";

const router = express.Router();

router.get('/',addUser)

export default router