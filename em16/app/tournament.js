'use strict';

import Match from "./match";
import {
    belgium,
    croatia,
    england,
    france,
    germany,
    hungary,
    iceland,
    ireland,
    italy,
    northernIreland,
    poland,
    portugal,
    slovakia,
    spain,
    switzerland,
    wales,
    unknown
} from "./nation";

class Tournament {
    constructor() {
        this.matchs = new Map();

        let match1 = new Match(switzerland, poland);
        let match2 = new Match(croatia, portugal);
        let match3 = new Match(wales, northernIreland);
        let match4 = new Match(hungary, belgium);
        let match5 = new Match(germany, slovakia);
        let match6 = new Match(italy, spain);
        let match7 = new Match(france, ireland);
        let match8 = new Match(england, iceland);

        let match9 = new Match(unknown, unknown);
        let match10 = new Match(unknown, unknown);
        let match11 = new Match(unknown, unknown);
        let match12 = new Match(unknown, unknown);

        let match13 = new Match(unknown, unknown);
        let match14 = new Match(unknown, unknown);

        let match15 = new Match(unknown, unknown);

        this.add(1, match1);
        this.add(2, match2);
        this.add(3, match3);
        this.add(4, match4);
        this.add(5, match5);
        this.add(6, match6);
        this.add(7, match7);
        this.add(8, match8);
        this.add(9, match9);
        this.add(10, match10);
        this.add(11, match11);
        this.add(12, match12);
        this.add(13, match13);
        this.add(14, match14);
        this.add(15, match15);
    }

    add(id, match) {
        this.matchs.set(id, match);
    }

    get(id) {
        return this.matchs.get(id);
    }

    setScore(nation1, score1, nation2, score2) {
        for (var [id, match] of this.matchs) {
            if (match.firstNation === nation1 && match.secondNation === nation2) {
                match.firstScore = score1;
                match.secondScore = score2;
                return true;
            } else if (match.firstNation === nation2 && match.secondNation === nation1) {
                match.firstScore = score2;
                match.secondScore = score1;
                return true;
            }
        }
        return false;
    }

    toHash() {
        let goalsToHash = function (goals) {
            return (Number.isInteger(goals)) ? goals : '';
        };

        let hash = '';
        for (var [id, match] of this.matchs) {
            hash += id + '#' + goalsToHash(match.firstScore) + ':' + goalsToHash(match.secondScore) + ';';
        }
        return hash;
    }
}

export default Tournament;