import { Exercise } from "@models/Exercise/Exercise";
import { IExerciseSelectorBuilder, ISelector } from "../interfaces/IExerciseSelector";
import { ExerciseStep } from "@scripts/models/Exercise/ExerciseStep";
import { combineTransition } from "react-native-reanimated";
import { Pathology } from "@scripts/descriptionOfExercises/allExercises";
class Selector implements ISelector<Exercise> {
    private pathology: string; // Оставляем тип как string
    private affectedRegions: string[];

    constructor(pathology: string, affectedRegions: string[]) {
        this.pathology = pathology;
        this.affectedRegions = affectedRegions;
    }

    Select(array: Exercise[]): Exercise[] {
        // Если патология не указана (PathologyNotListed), выбираем 6 случайных упражнений
        if (this.pathology === Pathology.PathologyNotListed) {
            return this.getRandomExercises(array, 6);
        }

        return array.filter(item => {
            if (item instanceof Exercise) {
                let exercise = item as Exercise;
                let flag = this.affectedRegions.some(region => exercise.bodyPart == region);
                return flag && this.pathology === exercise.pathology;
            }
            return false;
        });
    }

    private getRandomExercises(array: Exercise[], count: number): Exercise[] {
        const shuffled = array.sort(() => 0.5 - Math.random()); // Перемешиваем массив
        return shuffled.slice(0, count); // Возвращаем первые 'count' элементов
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

