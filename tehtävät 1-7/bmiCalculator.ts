const calculateBmi = (heigth: number, weigth: number): string => {
    const BMI: number = (weigth / ((heigth/100) ** 2));
    if (BMI <= 16.0) return "Underweight (Severe thinness)";
    if (BMI <= 16.9) return "Underweight (Moderate thinness)";
    if (BMI <= 18.4) return "Underweight (Mild thinness)";
    if (BMI <= 24.9) return "Normal (healthy weight)";
    if (BMI <= 29.9) return "Overweight (Pre-obese)";
    if (BMI <= 34.9) return "Obese (Class I)";
    if (BMI <= 39.9) return "Obese (Class II)";
    else return "Obese (Class III)";
};

const x = Number(process.argv[2]);
const y = Number(process.argv[3]);
console.log(calculateBmi (x, y)); 

export {calculateBmi as calculateBmi };