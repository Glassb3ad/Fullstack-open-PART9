const calculateExercises = (trainingDays: Array<number>, target: number): Result => {
    
    const trainedHours = trainingDays.reduce((x:number, y:number) => x+y);
    const calculateRating = (x:number, y: number):number => {
        if (x <= (y/2)) return 1;
        if (x < y) return 2;
        return 3;
    }; 
    const describeRating = (x: number):string => {
        switch (x) {
            case 1: 
                return "That's just awfull!";
            case 2: 
                return "You were lazy";
            case 3:
                return "Whew, you made it this time";
        }
        return "What is this???";
    }; 

    const result: Result = {
        periodLength: trainingDays.length,
        trainingDays: trainingDays.reduce((x:number ,y:number ):number => {
            if (y != 0) return x+1;
            else return x+0;
        }, 0),
        success: trainedHours >= target,
        rating: calculateRating(trainedHours, target),
        ratingDescription: describeRating(calculateRating(trainedHours, target)),
        target: target,
        average: trainedHours/trainingDays.length
    };    
    return result; 
};

interface Result {
    periodLength: number
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
//console.log(calculateExercises ([3,0,2,4.5,0,3,1], 2))

if(process.argv[2] || process.argv[3] ){
    const a: Array<number> = ((process.argv[2]).split(" ").map(Number));
    const b = Number(process.argv[3]);
    if (a.includes(NaN)) throw new Error ("List of exercises is not in correct format. Should be like \"0 1 2 3 4\" ");
    console.log(calculateExercises (a, b));
}
else console.log("too few arguments");
export {calculateExercises}; 