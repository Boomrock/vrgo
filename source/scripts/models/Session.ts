import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Exercise } from "@models/Exercise/Exercise";
import { Timer } from "@utils/Timer";
import Navigate, { ClearStackAndNavigate } from "@navigations/navigate";
import { ExerciseType } from "@scripts/descriptionOfExercises/allExercises";

const timerRefreshRate = 1000; // 1 секунда

export class Session {
    
    public emitter = new EventEmitter();
    public get runtime() { return this._timer.runTime; }
    public get currentExercise() { return this._currentExercise; }

    private _exerciseQueue: Exercise[] = [];
    private _history: Exercise[] = []; 
    private _timer: Timer;
    private _currentExercise: Exercise | null = null;
    private _intervalID: NodeJS.Timeout | null = null;

    constructor() {
        this._timer = new Timer(0, this.timerOverHandler.bind(this));
        this.enqueue = this.enqueue.bind(this);
        this.dequeue = this.dequeue.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }
    clear():void{
        this._exerciseQueue = [];
        this._intervalID = null;
        this._history = [];
        this._timer.stop();
        this._intervalID = null;

    }

    getTotalCountExercise(): number {
        return this._exerciseQueue.length + this._history.length;
    }

    getQueueLength(): number {
        return this._exerciseQueue.length;
    }

    stopTimer(): void {
        this._timer.pause();
        
        if (this._intervalID !== null) {
            clearInterval(this._intervalID);

            this.emitter.emit(SessionEvent.refreshRunTimeNotify, this.runtime);
            this._intervalID = null;
        }
    }

    startTimer(): void {
        if (this._currentExercise?.exerciseType === ExerciseType.TIMER) {
            this._timer.start();
            this._intervalID = setInterval(() => {
                this.emitter.emit(SessionEvent.refreshRunTimeNotify, this.runtime);
            }, timerRefreshRate);
            this.emitter.emit(SessionEvent.refreshRunTimeNotify, this.runtime);
        }
    }
    // Добавление упражнения в очередь
    enqueue(exercise: Exercise): void {
        this._exerciseQueue.push(exercise);
    }
    // Извлечение
    dequeue(): Exercise | null {
        if (this._exerciseQueue.length === 0) {
            this.close();
            console.error("сессия не было упражений Session:start");
            return null;
        }

        if (this._currentExercise?.exerciseType === ExerciseType.TIMER) {
            this._timer.stop();
        }

        const exercise = this._exerciseQueue.shift()!;
        if (exercise != null) {
            this._currentExercise = exercise;
        }


        if (this.start()) {
            this.emitter.emit(SessionEvent.refreshExerciseNotify, this._currentExercise);
            this._history.push(this._currentExercise!);
            return this._currentExercise;
        }
        return null;
    }

    private start(): boolean {
        this.executeExercise();
        return true;
    }

    close(): void {
        if (this._intervalID !== null) {
            clearInterval(this._intervalID);
            this._intervalID = null;
        }
        this._exerciseQueue = [];
        this.emitter.emit(SessionEvent.closeSessionNotify, this._currentExercise);
    }

    back():Exercise | null {
        if(this._history.length <= 1){
            return null
        }

        let currentExercise = this._history.pop();
        let lastExercise = this._history.pop();

        if(lastExercise == null){
            this._history.push(currentExercise!);
            return null
        }
        
        this._exerciseQueue.unshift(currentExercise!);
        this._exerciseQueue.unshift(lastExercise);
        return this.dequeue();

    }

    private executeExercise(): void {
        if (this._currentExercise?.exerciseType === ExerciseType.TIMER) {
            this._timer = new Timer(this._currentExercise!.executeTime, this.timerOverHandler.bind(this));
        }
    }

    private timerOverHandler = (): void => {
        this.emitter.emit(SessionEvent.timerOverNotify);
        this.emitter.emit(SessionEvent.refreshRunTimeNotify, 0);
    }
}

export enum SessionEvent {
    refreshExerciseNotify = "refreshExercise",
    timerOverNotify = "timerOverNotify",
    refreshRunTimeNotify = "refreshRunTime",
    closeSessionNotify = "exerciseOver"
}
