
import express from "express";
const router = express.Router();

import { SignUser, loginUser } from "../controllers/userController.js";
import { uploadImage } from '../controllers/imageController.js'
import upload from "../utils/upload.js";
import { createpost, getallposts , getpost , updatepost, deletepost } from "../controllers/postController.js";
import { authenticateToken } from "../controllers/jwtController.js";


router.post('/signup', SignUser) //end point aur ek call back function hoga 
//vo call back function ham controllers me likhte hai

router.post('/login', loginUser)

router.post('/file/upload', upload.single('file'), uploadImage);

router.post('/create' ,authenticateToken ,  createpost)

//  router.get('/file/:filename' , getImage)

router.get('/posts',authenticateToken , getallposts)
router.get('/post/:id',authenticateToken , getpost)

router.put('/update/:id',authenticateToken , updatepost)

router.delete('/delete/:id' ,authenticateToken , deletepost)
export default router //isko import ab karna padega index.js