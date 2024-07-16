import { ExerciseType } from "@scripts/descriptionOfExercises/allExercises";
import { ExerciseStep } from "./ExerciseStep";


export class Exercise{
    
    public static emptyExercise: Exercise = new Exercise(0,"", [new ExerciseStep('')]);

    public exerciseCompleted: () => void;

    private _pathology: string = "";
    private _bodyPart: string = "";

    private _exerciseType: ExerciseType;
    private _description: string;

    private _preface: string;

    private _executeTime: number;
    private _countOfRepeat: number;


    private _steps: ExerciseStep[];




    constructor(
        executeTime: number = 40, 
        description: string, 
        steps: ExerciseStep[],
        preface: string = 'Предисловие к упажнению',
        exerciseType: ExerciseType = ExerciseType.COUNT,
        countOfRepeat: number = 10){

        this._description = description;
        this._preface = preface;
        this._executeTime = executeTime;
        this._exerciseType = exerciseType
        this._countOfRepeat = countOfRepeat;
        this._steps = steps;
        this.exerciseCompleted = () => {};
    }



    get pathology() {
        return this._pathology
    }
    set pathology(value) {
        this._pathology = value;
    }
    
    get bodyPart() {
        return this._bodyPart
    }
    set bodyPart(value) {
        this._bodyPart = value;
    }
    
    get description(){
        return this._description
    }
    get executeTime(){
        return this._executeTime
    }
    get exerciseType(){
        return this._exerciseType;
    }
    get countOfReapeat(){
        return this._countOfRepeat;
    }
    get steps(){
        return this._steps;
    }
    get preface(){
        return this._preface;
    }
}
