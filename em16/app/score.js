'use strict';

import {TypeQuarterFinal, TypeSemiFinal, TypePetiteFinal, TypeFinal} from "./match";

export const getMatchScore = function (userMatch, actualMatch) {
    let score = 0;
    if (!Number.isInteger(userMatch.firstScore)
        || !Number.isInteger(userMatch.secondScore)
        || !Number.isInteger(actualMatch.firstScore)
        || !Number.isInteger(actualMatch.secondScore)) return 0;

    if (userMatch.firstScore == actualMatch.firstScore && userMatch.secondScore == actualMatch.secondScore) {
        score += 1000;
    } else {
        if (userMatch.firstNationWins() && actualMatch.firstNationWins() || userMatch.secondNationWins() && actualMatch.secondNationWins()) {
            score += 500;
        }

        if (userMatch.firstScore == actualMatch.firstScore || userMatch.secondScore == actualMatch.secondScore) {
            score += 150;
        }
    }

    if (userMatch.type === TypeQuarterFinal) {
        score *= 1.2;
    } else if (userMatch.type === TypeSemiFinal) {
        score *= 1.5;
    } else if (userMatch.type === TypeFinal || userMatch.type === TypePetiteFinal) {
        score *= 2;
    }
    return score;
};

export const getTournamentScore = function (userTournament, actualTournament) {
    let score = 0;
    for (let i = 1; i <= 16; i++) {
        score += getMatchScore(userTournament.get(i), actualTournament.get(i));
    }
    return score;
};