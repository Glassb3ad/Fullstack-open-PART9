import patientsAll from '../data/patients';
import { Patient, NewPatient, Diagnose, Entry} from '../types';
import { parseString, parseGender, parseCodeArray, parseHealthCheckRating, parseSickLeave } from '../utils';
let patiensJSON: Patient[] = patientsAll; 
export const getSafePatients = ():Array<Omit<Patient,'ssn'|'entries'>> => {
    const patients: Array<Omit<Patient, 'ssn'|'entries'>> = patiensJSON.map(({id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender: parseGender(gender),
            occupation
        };
    });
    return patients; 
};
export const getPatient = (id: string): Patient => {
    const patient = patiensJSON.find(a => a.id === id);
    return patient as Patient;
};
export const createNewPatient = (patient: NewPatient) => {
    const newPatient: Patient = {
        id: `${Math.random()}`,
        name: parseString(patient.name),
        dateOfBirth: parseString(patient.dateOfBirth),
        ssn: parseString(patient.ssn),
        gender: parseGender(patient.gender),
        occupation: parseString(patient.occupation),
        entries: []
    };
    patiensJSON.push(newPatient);
    return newPatient;
};
export const createEntry = (entry: EntryTemplate): Entry => {
    const newEntry: EntryBeginner = {
        id: `${Math.random()}`,
        description: parseString(entry.description),
        specialist: parseString(entry.specialist), 
        date: parseString(entry.date),
        type: parseString(entry.type)     
    };
    try {
        newEntry.diagnosisCodes = parseCodeArray(entry.diagnosisCodes);
    }
    catch(e: unknown){
        console.log(e);
    }
    switch(newEntry.type){
        case('HealthCheck'):
            const healthCheck = {
                ...newEntry,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(String(entry.healthCheckRating))
            };
            return healthCheck as Entry;
        case("OccupationalHealthcare"):
            const occupationalHealthcareEntry = {
                ...newEntry,
                type: "OccupationalHealthcare",
                employerName: parseString(entry.employerName),
                sickLeave: parseSickLeave(entry.sickLeave)
            };
            return occupationalHealthcareEntry as Entry;
        case('Hospital'): 
            const hospitalEntry = {
                ...newEntry,
                discharge: entry.discharge
            };
            return hospitalEntry as Entry;
        default: 
            throw new Error("Not of a correct type");
    }
};
export const addEntrty = (entry: Entry, patient: Patient) => {
    const newPatient = {
        ...patient,
        entries: patient.entries.concat([entry])
    };
    console.log(newPatient);
    patiensJSON = patiensJSON.map(a => a.id === newPatient.id ? newPatient : a);
};

interface EntryTemplate {
    description: string,
    diagnosisCodes?: string[],
    specialist: string,
    date: string,
    type: string,
    healthCheckRating?: number,
    employerName?: string,
    sickLeave?: {startDate: string, endDate: string},
    discharge?: {date: string, criteria: string}
}
interface EntryBeginner {
    id: string,
    description: string,
    specialist: string,
    date: string,
    type: string,
    diagnosisCodes?: Array<Diagnose['code']>,
}