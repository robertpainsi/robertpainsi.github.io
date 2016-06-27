'use strict';

import {TypeEighthFinal, TypeQuarterFinal, TypeSemiFinal} from "./match";

export const getMatchScore = function (userMatch, actualMatch) {
    let score = 0;
    if (!Number.isInteger(userMatch.firstScore)
        || !Number.isInteger(userMatch.secondScore)
        || !Number.isInteger(actualMatch.firstScore)
        || !Number.isInteger(actualMatch.secondScore)) return 0;

    if (userMatch.firstScore == actualMatch.firstScore && userMatch.secondScore == actualMatch.secondScore) {
        score += 8;
    } else {
        if (userMatch.firstNationWins() && actualMatch.firstNationWins() || userMatch.secondNationWins() && actualMatch.secondNationWins()) {
            score += 4;
        }

        if (userMatch.firstScore == actualMatch.firstScore || userMatch.secondScore == actualMatch.secondScore) {
            score += 1;
        }
    }

    let factor = 1000;
    if (userMatch.type === TypeEighthFinal) {
        factor *= (1 / 8);
    } else if (userMatch.type === TypeQuarterFinal) {
        factor *= (1 / 4);
    } else if (userMatch.type === TypeSemiFinal) {
        factor *= (1 / 2);
    }
    score *= factor;

    return score;
};

export const getTournamentScore = function (userTournament, actualTournament) {
    let score = 0;
    for (let i = 1; i <= 15; i++) {
        score += getMatchScore(userTournament.get(i), actualTournament.get(i));
    }
    return score;
};