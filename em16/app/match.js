'use strict';

class Match {
    constructor(firstNation, secondNation, type) {
        this._firstNation = firstNation;
        this._secondNation = secondNation;
        this._type = type;
    }

    get firstNation() {
        return this._firstNation;
    }

    get firstScore() {
        return this._firstScore;
    }

    set firstScore(score) {
        this._firstScore = score;
    }

    get secondNation() {
        return this._secondNation;
    }

    get secondScore() {
        return this._secondScore;
    }

    set secondScore(score) {
        this._secondScore = score;
    }

    get type() {
        return this._type;
    }
}

export const TypeEighthFinal = Symbol('EighthFinal');
export const TypeQuarterFinal = Symbol('QuarterFinal');
export const TypeSemiFinal = Symbol('SemiFinal');
export const TypeFinal = Symbol('Final');
export const TypePetiteFinal = Symbol('PetiteFinal');

export default Match;