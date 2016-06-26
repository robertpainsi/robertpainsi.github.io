'use strict';

class Match {
    get firstScore() {
        return this._firstScore;
    }

    set firstScore(score) {
        this._firstScore = score;
    }

    get secondScore() {
        return this._secondScore;
    }

    set secondScore(score) {
        this._secondScore = score;
    }

    get winner() {
        if (this._firstScore > this._secondScore) {
            return this.firstNation;
        } else if (this._secondScore > this.firstScore) {
            return this.secondNation;
        }
        return null;
    }
}

class InitialMatch extends Match {
    constructor(firstNation, secondNation) {
        super();
        this._firstNation = firstNation;
        this._secondNation = secondNation;
    }

    get firstNation() {
        return this._firstNation;
    }

    get secondNation() {
        return this._secondNation;
    }
}

class EvaluatedMatch extends Match {
    constructor(firstPreviousMatch, secondPreviousMatch) {
        super();
        this._firstPreviousMatch = firstPreviousMatch;
        this._secondPreviousMatch = secondPreviousMatch;
    }

    get firstNation() {
        return this._firstPreviousMatch.winner || '';
    }

    get secondNation() {
        return this._secondPreviousMatch.winner || '';
    }
}

export {InitialMatch, EvaluatedMatch};