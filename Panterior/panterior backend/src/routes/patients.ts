/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { getSafePatients, createNewPatient, getPatient, createEntry, addEntrty } from '../services/patientService';
const router = express.Router();

router.get('/',(_req, res) => {
    res.status(200).send(getSafePatients());
});
router.get('/:id',(req, res) => {
    res.status(200).send(getPatient(req.params.id));
});
router.post('/',(req, res) => {
    try{
        const { name, dateOfBirth, ssn, gender, occupation} = req.body;
        const newPatient = createNewPatient({
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation,
            entries: []
        });
        res.status(200).send(newPatient);
    }
    catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/:id/entries',(req, res) => {
    try{
        console.log(req.body);
        const { description, diagnosisCodes, specialist, date, type, healthCheckRating, employerName, sickLeave, discharge} = req.body;
        const newEntry = createEntry({
            description,
            diagnosisCodes,
            specialist,
            date,
            type,
            healthCheckRating,
            employerName,
            sickLeave,
            discharge
        });
        addEntrty(newEntry, getPatient(req.params.id));
        res.status(200).send(newEntry);
    }
    catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;