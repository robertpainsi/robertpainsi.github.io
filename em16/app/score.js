'use strict';

export default function (userTournament, actualTournament) {
    let score = 0;
    for (let i = 1; i <= 15; i++) {
        let userMatch = userTournament.get(i);
        let actualMatch = actualTournament.get(i);

        if (!Number.isInteger(userMatch.firstScore)
            || !Number.isInteger(userMatch.secondScore)
            || !Number.isInteger(actualMatch.firstScore)
            || !Number.isInteger(actualMatch.secondScore)) continue;

        let intermediateScore = 0;

        if (userMatch.firstScore == actualMatch.firstScore && userMatch.secondScore == actualMatch.secondScore) {
            intermediateScore += 8;
        } else {
            if (userMatch.firstScore < userMatch.secondScore && actualMatch.firstScore < actualMatch.secondScore) {
                intermediateScore += 3;
            } else if (userMatch.firstScore > userMatch.secondScore && actualMatch.firstScore > actualMatch.secondScore) {
                intermediateScore += 3;
            }

            if (userMatch.firstScore == actualMatch.firstScore || userMatch.secondScore == actualMatch.secondScore) {
                intermediateScore += 1;
            }
        }

        let factor = 1000;
        if (i <= 8) {
            factor *= (1 / 8);
        } else if (i <= 12) {
            factor *= (1 / 4);
        } else if (i <= 14) {
            factor *= (1 / 2);
        }

        score += intermediateScore * factor;
    }

    return score;
}