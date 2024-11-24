import { Exercise } from "@models/Exercise/Exercise";
import { IExerciseSelectorBuilder, ISelector } from "../interfaces/IExerciseSelector";
import { ExerciseStep } from "@scripts/models/Exercise/ExerciseStep";
import { combineTransition } from "react-native-reanimated";
 
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
                let flag = this.affectedRegions.some(region => exercise.bodyPart == region);
                return flag && this.pathology == exercise.pathology
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

