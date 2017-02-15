"use strict";

import snutils from "snutils";
import github from "./github";
import regression from "regression";

const {MINUTE, DAY} = snutils.time;

const repo = github.Users.$Catrobat.Repositories.$Catroid;

let pulls = repo.ClosedPullRequests.filter((pr) => pr.Duration >= 10 * MINUTE)
    .sort((pr1, pr2) => snutils.collection.compareDescent(pr1.Duration, pr2.Duration));

let pullRequestStatusPerDay = new Map();
let totalMerges = 0;
let totalRejects = 0;
for (let pull of pulls) {
    const day = Math.ceil(pull.Duration / DAY);
    if (!pullRequestStatusPerDay.has(day)) {
        pullRequestStatusPerDay.set(day, {merges: 0, rejects: 0});
    }

    const entry = pullRequestStatusPerDay.get(day);
    if (pull.merged) {
        totalMerges++;
        entry.merges++;
    } else {
        totalRejects++;
        entry.rejects++;
    }
}

let remainingMerges = totalMerges;
let remainingRejects = totalRejects;
let mergeProbabilityPerDay = [];
for (let [day, details] of pullRequestStatusPerDay) {
    remainingMerges -= details.merges;
    remainingRejects -= details.rejects;
    const mergeProbability = (remainingMerges / (remainingMerges + remainingRejects)) || 0;
    mergeProbabilityPerDay.push([day, mergeProbability]);
}

remainingMerges = totalMerges;
remainingRejects = totalRejects;
let mergeProbabilities = [];
for (let pull of pulls) {
    if (pull.merged) {
        remainingMerges--;
    } else {
        remainingRejects--;
    }
    const duration = pull.Duration / DAY;
    const mergeProbability = (remainingMerges / (remainingMerges + remainingRejects)) || 0;
    mergeProbabilities.push({duration, mergeProbability});
}

var plot = regression('logarithmic', mergeProbabilityPerDay);
console.log(plot);
snutils.io.writeJsonSync('./output/merged-after-probability.json', {
    points: mergeProbabilityPerDay.map(v => {
        return {duration: v[0] - 1, mergeProbability: v[1]};
    }),
    approximatedPoints: plot.points.map(v => {
        return {duration: v[0] - 1, mergeProbability: v[1]};
    }),
    fiftyPercentX: Math.pow(Math.E, (0.5 - plot.equation[0]) / plot.equation[1]) - 1
});
