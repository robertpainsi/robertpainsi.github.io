'use strict';

class Match {
    constructor(firstNation, secondNation) {
        this._firstNation = firstNation;
        this._secondNation = secondNation;
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

    // get winner() {
    //     if (this._firstScore > this._secondScore) {
    //         return this.firstNation;
    //     } else if (this._secondScore > this.firstScore) {
    //         return this.secondNation;
    //     }
    //     return null;
    // }
}

export default Match;