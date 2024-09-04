import express from 'express';
import {deleteSchool,  getUserSchool, setSchool, setSchoolEmail, setUserType, deleteSchoolEmail } from '../../../../controllers/ConnectUser/profiles/school/school';
import { authenticate } from '../../../../middleware/authMiddleware';

import {sendVerificationEmailController, verifyEmailCodeController, } from '../../../../controllers/ConnectUser/profiles/school/schoolEmailVerification';


import { createCourse } from '../../../../controllers/ConnectUser/profiles/school/createCourse';

const router = express.Router();

// Route to get user profiles
router.get('/', authenticate as express.RequestHandler, getUserSchool as express.RequestHandler);

// Change this to POST since it's updating data
router.post('/setSchool', authenticate as express.RequestHandler, setSchool as express.RequestHandler);

router.post('/deleteSchoolCampus', authenticate as express.RequestHandler,  deleteSchool as express.RequestHandler);

router.post('/setSchoolEmail', authenticate as express.RequestHandler,  setSchoolEmail as express.RequestHandler);

router.post('/deleteSchoolEmail', authenticate as express.RequestHandler,  deleteSchoolEmail as express.RequestHandler);

router.post('/sendVerificationEmail',  authenticate as express.RequestHandler, sendVerificationEmailController as express.RequestHandler);

router.post('/verifyCode', authenticate as express.RequestHandler, verifyEmailCodeController  as express.RequestHandler);

router.post('/setUserType', authenticate as express.RequestHandler,  setUserType as express.RequestHandler);

router.post('/createCourse', authenticate as express.RequestHandler,  createCourse as express.RequestHandler);


export default router;
