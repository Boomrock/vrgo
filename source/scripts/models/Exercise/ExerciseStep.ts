import { StepType } from "@scripts/descriptionOfExercises/allExercises";

export class ExerciseStep {
    private _image?: any;
    private _instruction: string;
    private _type: StepType;

    constructor(instruction: string, image?: string, type: StepType = StepType.Sample){
        this._instruction = instruction;
        this._image = image;
        this._type = type;
    }

    get image(){
        return this._image;
    }
    get instruction(){
        return this._instruction;
    }
    get type(){
        return this._type;
    }
}

