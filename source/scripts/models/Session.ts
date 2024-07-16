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
    }
    // Добавление упражнения в очередь
    enqueue(exercise: Exercise): void {
        this._exerciseQueue.push(exercise);
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

    dequeue(): Exercise | null {
        if (this._exerciseQueue.length === 0) {
            this.close();
            console.log("сессия небыло упражений Session:start");
            return null;
        }
        const exercise = this._exerciseQueue.shift()!;
        if (exercise != null) {
            this._currentExercise = exercise;
        }

        if (this.start()) {
            this.emitter.emit(SessionEvent.refreshExerciseNotify, this._currentExercise);
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
