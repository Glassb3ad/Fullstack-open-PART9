/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi/', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(weight)  || isNaN(height)) res.status(400).send({error: "malformatted parameters"});
    const result:object = {
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight)
    };
    res.status(200).send(result); 
  });

app.post('/exercises', (req, res) => {
  console.log(req.body);
  if (req.body === undefined){
    res.status(401).send({error: "No body found"});
  }
  else {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const daily_exercises = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target = req.body.target;
  if(daily_exercises === undefined || target === undefined  ){
    res.status(400).send({error: "parameters missing"});   
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises (daily_exercises, target);
    res.status(200).send(result);
  }
  catch(error) {
    res.status(400).send({error: "malformatted parameters"});
  }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});