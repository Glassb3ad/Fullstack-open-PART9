import { Diagnose, Gender, HealthCheckRating } from "./types";
export const parseString = (a: unknown): string => {
    if ( !a || ! isString(a)){
        throw new Error('Incorrect or missing string: ' + a);
    }
    return a;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };
export const parseCodeArray = (a: unknown): Array<Diagnose['code']> => {
    if ( !a || ! isCodeArray(a)){
        throw new Error('Incorrect or missing stringArray: ' + a);
    }
    return a;
};

const isCodeArray = (array: unknown): array is Array<Diagnose['code']> => {
    return (Array.isArray(array) && array.reduce((a: boolean,b) => (a && (typeof b === typeof 'string')), true));
};

export const parseHealthCheckRating = (a: unknown): HealthCheckRating => {
    if ( !a || !isString(a) || !isHealthCheck(Number (a))) {
        throw new Error('Incorrect or missing HealthCheckRating: ' + a);
    }
    return (Number (a));
};

const isHealthCheck = (text: number): text is HealthCheckRating => {
    return [0,1,2,3].reduce(((a: boolean,b) => a || text === b), false);
};

export const parseSickLeave = (a: any): {startDate: string, endDate: string} => {
    if ( !a || !a.startDate || !a.endDate || !isString(a.startDate) || !isString(a.startDate) ) {
        throw new Error('Incorrect or missing HealthCheckRating: ' + a);
    }
    return (a as {startDate: string, endDate: string});
};

export const parseGender = (a: unknown): Gender => {
    if ( !a || ! isGender(a)){
        throw new Error('Incorrect or missing gender: ' + a);
    }
    return a;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender); 
};
