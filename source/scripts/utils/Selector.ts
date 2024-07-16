import { Exercise } from "@models/Exercise/Exercise";
import { IExerciseSelectorBuilder, ISelector } from "../interfaces/IExerciseSelector";
import { ExerciseStep } from "@scripts/models/Exercise/ExerciseStep";
 
class Selector implements ISelector<Exercise> {
    private pathology: string;
    private affectedRegions: string[];

    constructor(pathology: string, affectedRegions: string[]) {
        this.pathology = pathology;
        this.affectedRegions = affectedRegions;
    }

    Select(array: Exercise[]): Exercise[] {
        return array.filter(item => {
            if (item instanceof Exercise) {
                let exercise = item as Exercise;
                return this.affectedRegions.some(region => exercise.bodyPart == region) && this.pathology == exercise.pathology
                // return exercise.description.indexOf(this.pathology) !== -1 && this.affectedRegions.some(region => exercise.description.indexOf(region) !== -1);
            }
            return false;
        });
    }
}

export class ExerciseSelectorBuilder implements IExerciseSelectorBuilder {
    private pathology: string = "";
    private affectedRegion: string[] = [];

    AddPathology(pathology: string): IExerciseSelectorBuilder {
        this.pathology = pathology;
        return this;
    }

    AddAffectedRegion(affectedRegion: string[]): IExerciseSelectorBuilder {
        this.affectedRegion.push(...affectedRegion);
        return this;
    }

    Build(): ISelector<Exercise> {
        return new Selector(this.pathology, this.affectedRegion);
    }
}

// Example usage
let selectorBuilder = new ExerciseSelectorBuilder();
let selector = selectorBuilder.AddPathology("Патология").AddAffectedRegion(["Рука", "Нога"]).Build();
let exercises = [
    new Exercise(90, "Exercise 1 with Патология and Рука", [new ExerciseStep("")]),
    new Exercise(90, "Exercise 2 with Нога",[new ExerciseStep("")]),
    new Exercise(90, "Exercise 3 without Патология",[new ExerciseStep("")])
];
let selectedExercises = selector.Select(exercises);
console.log(selectedExercises);