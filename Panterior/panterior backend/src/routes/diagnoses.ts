import express from 'express';
import diagnosesJSON from '../data/diagnoses.json';
import { Diagnose } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses: Array<Diagnose> = diagnosesJSON; 
  res.status(200).send(diagnoses);
});

export default router;